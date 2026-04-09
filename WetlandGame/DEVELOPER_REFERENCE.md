# 🔧 Developer Reference Guide

## Code Architecture Overview

### Game State Structure
```javascript
gameState = {
    // Screen Management
    currentScreen: 'startScreen',
    
    // Player Information
    playerName: '',
    
    // Biome/Level Information
    selectedBiome: 'freshwater' | 'mangrove' | 'urban',
    level: 0-2,
    levels: ['freshwater', 'mangrove', 'urban'],
    levelsCompleted: [false, false, false],
    
    // Gameplay Metrics
    chapter: 0,
    choices: 0,
    health: 0-100,          // Required ≥ 70 to complete level
    biodiversity: 0-100,
    pollution: 0-100,       // Required ≤ 30 to complete level
    
    // Mission Tracking
    missionsCompleted: 0,
    totalMissions: 0,
    
    // Audio Control
    audioEnabled: true,
    backgroundAudio: null,  // Web Audio API context
    
    // Game Flow
    characterTurn: 'mira' | 'player',
    lastChoice: '',
    endingType: null
}
```

### Core Functions

#### 1. Level Gating
**Function**: `canProgressLevel()`
```javascript
// Returns: Boolean
// Purpose: Check if level completion conditions are met
// Conditions:
//   - missionsCompleted >= totalMissions
//   - health >= 70
//   - pollution <= 30
```

**Function**: `updateLevelProgressMessage()`
```javascript
// Purpose: Display what's needed to complete the level
// Shows missing requirements in #levelProgressMessage element
// Hides when all requirements met
```

#### 2. Audio System
**Function**: `playBackgroundAudio(biome)`
```javascript
// Parameters: biome ('freshwater' | 'mangrove' | 'urban')
// Purpose: Start ambient audio for current biome
// Called by: startGameplay()
```

**Function**: `createAmbientSound(biome)`
```javascript
// Uses Web Audio API:
// - OscillatorNode with biome-specific frequency
// - BiquadFilter for low-pass effect
// - GainNode for fade in/out
// - 6-second loop duration
// Frequencies:
//   - freshwater: 110Hz (A2)
//   - mangrove: 146.83Hz (D3)
//   - urban: 130.81Hz (C3)
```

**Function**: `toggleAudio()`
```javascript
// Purpose: Toggle audio on/off
// Updates button icon: 🔊 (on) → 🔇 (off)
// Called by: #audioToggleBtn onclick
```

#### 3. Game Flow
**Function**: `startGameplay()`
```javascript
// Called by: startFirstLevel(), goToNextLevel()
// Flow:
// 1. Show game screen
// 2. Update display
// 3. Start background audio
```

**Function**: `goToNextLevel()`
```javascript
// Purpose: Progress to next level/biome
// Steps:
// 1. Increment level counter
// 2. Set new biome
// 3. Reset missions/health/pollution
// 4. Call startGameplay()
```

---

## HTML Structure

### Key Elements
```html
<!-- Level Progress Display -->
<div id="levelProgressMessage" class="level-progress-message"></div>

<!-- Audio Control Button -->
<button id="audioToggleBtn" class="audio-toggle-btn" onclick="toggleAudio()">🔊</button>

<!-- Game Content -->
<div id="choicesBox" class="choices-box"></div>
```

### Dynamic Content Generation
```javascript
// Choice buttons created dynamically
const button = document.createElement('button');
button.className = 'choice-btn panel';

// Disabled state for level incomplete
button.classList.add('disabled-btn');
button.disabled = true;
```

---

## CSS Classes Reference

| Class | Purpose | Location |
|-------|---------|----------|
| `.level-progress-message` | Progress feedback panel | style.css:1886 |
| `.audio-toggle-btn` | Audio control button | style.css:1908 |
| `.audio-toggle-btn.muted` | Muted state styling | style.css:1939 |
| `.choice-btn.disabled-btn` | Disabled choice button | style.css:648 |

### Responsive Breakpoints
```css
@media (max-width: 768px) {
    .audio-toggle-btn {
        width: 48px;
        height: 48px;
        font-size: 24px;
    }
    
    .level-progress-message {
        font-size: 0.85em;
    }
}
```

---

## Web Audio API Implementation

### Audio Context Lifecycle
```javascript
// Creation
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Connection Chain
OscillatorNode → BiquadFilter → GainNode → audioContext.destination

// Lifecycle
1. Create nodes
2. Connect nodes
3. Set frequencies and parameters
4. Start oscillator
5. Schedule stop (6 seconds)
```

### Biome Frequencies (Hz)
| Biome | Frequency | Note | Character |
|-------|-----------|------|-----------|
| Freshwater | 110 | A2 | Deep, bass |
| Mangrove | 146.83 | D3 | Mid-range |
| Urban | 130.81 | C3 | Natural |

---

## Event Flow Diagram

```
User Opens Game
    ↓
Click "Start Game"
    ↓
Enter Player Name
    ↓
startFirstLevel()
    ├→ Select biome
    ├→ Initialize missions
    ├→ Reset health/pollution
    └→ startGameplay()
        ├→ showScreen('gameScreen')
        ├→ updateGameDisplay()
        └→ playBackgroundAudio()
            └→ createAmbientSound()

User Makes Choice
    ↓
makeChoice()
    ├→ Update health/pollution
    ├→ Check mission completion
    ├→ Check if level complete: canProgressLevel()
    └→ updateGameDisplay()
        ├→ updateLevelProgressMessage() [if incomplete]
        ├→ Enable/disable completion button
        └→ Display current state

Level Complete
    ↓
Click "Continue to Next Level"
    ↓
goToNextLevel()
    ├→ Increment level
    ├→ Load next biome
    └→ startGameplay() [with new audio]

Final Level Complete
    ↓
goToResult()
    └→ Show ending/results
```

---

## Common Modifications

### Add New Biome
1. Add to `gameState.levels` array
2. Add entry to `biomes` object with:
   - `missions: []`
   - `baseHealth`, `baseBiodiversity`, `basePollution`
   - `dialogues` for each chapter
3. Add audio frequency to `createAmbientSound()`

### Change Audio Frequency
```javascript
// In createAmbientSound()
if (biome === 'freshwater') {
    osc.frequency.setValueAtTime(110, now); // Change this
}
```

### Modify Level Completion Requirements
```javascript
// In canProgressLevel()
const biomeClean = gameState.health >= 70 && gameState.pollution <= 30;
// Change 70 and 30 to different thresholds
```

### Add Sound Effects
```javascript
// Create oscillator for sound effects
function playSound(frequency, duration) {
    const context = new AudioContext();
    const osc = context.createOscillator();
    const gain = context.createGain();
    // ... connect and play
}
```

---

## Browser Compatibility

| Browser | Web Audio API | Status |
|---------|---------------|--------|
| Chrome | ✅ | Fully supported |
| Firefox | ✅ | Fully supported |
| Safari | ✅ | Supported (webkit prefix) |
| Edge | ✅ | Fully supported |
| IE 11 | ❌ | Not supported |

---

## Troubleshooting

### Audio Not Playing
1. Check `gameState.audioEnabled` is `true`
2. Check browser supports Web Audio API
3. Check console for errors
4. Verify `audioContext` initialized successfully

### Level Can't Be Completed
1. Check `canProgressLevel()` function
2. Verify `health >= 70`
3. Verify `pollution <= 30`
4. Verify `missionsCompleted >= totalMissions`

### Button Not Disabling
1. Check `.choice-btn.disabled-btn` CSS class exists
2. Check `button.disabled = true` is set
3. Check button has `disabled-btn` class added

### Responsive Issues
1. Check media query breakpoints
2. Verify CSS for mobile includes needed rules
3. Check `viewport` meta tag in HTML

---

## Performance Optimization Tips

1. **Audio**: Only one Web Audio context at a time
2. **DOM**: Minimize reflows with batch updates
3. **CSS**: Use `transform` and `opacity` for animations
4. **Events**: Debounce frequency updates if needed
5. **Memory**: Stop audio contexts when not needed

---

## Testing Checklist

- [ ] Game state initializes correctly
- [ ] Audio plays on level start
- [ ] Audio stops on restart
- [ ] Level button disables when needed
- [ ] Progress message appears/disappears
- [ ] Button styling correct for all states
- [ ] Responsive design works
- [ ] No console errors
- [ ] Cross-browser tested
