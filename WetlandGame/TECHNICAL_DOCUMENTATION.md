# 🎮 Mira's Wetland - Technical Documentation

## Project Structure

```
WetlandGame/
├── index.html           (216 lines) - Main game structure
├── style.css            (570+ lines) - Styling and animations
├── script.js            (500+ lines) - Game logic and mechanics
└── GAME_FEATURES.md     - Detailed features documentation
```

---

## Start Screen Implementation

### HTML Structure
```html
<div id="startScreen" class="start-screen active">
  <div class="wetland-background">
    <!-- SVG background with animations -->
  </div>
  <div class="bird bird-1"></div>
  <div class="bird bird-2"></div>
  <div class="start-content">
    <!-- Start box with title and button -->
  </div>
</div>
```

### Key CSS Classes
- `.start-screen` - Main container, fixed positioning
- `.wetland-background` - SVG graphics container
- `.start-box` - Content box with white background
- `.start-button` - Green play button with hover effects

### Animations Applied
| Animation | Duration | Effect |
|-----------|----------|--------|
| zoomIn | 0.8s | Start box scales from 80% to 100% |
| slideDown | 0.8-1s | Title slides down with delay |
| slideUp | 1s | Button appears from below |
| fadeIn | 1s | Description fades in |
| drift | 8-10s | Clouds move side to side |
| sway | 3s | Reeds bend in breeze |
| float | 4s | Water lilies bob up/down |
| ripple | 2-2.5s | Water ripples expand |
| fly | 15-18s | Birds fly across screen |

---

## Game Screen Implementation

### Screen Visibility Control
```javascript
// Start Screen Active by default
.start-screen { opacity: 1; pointer-events: auto; }

// Game Screen Inactive by default
.game-screen { opacity: 0; pointer-events: none; z-index: 0; }

// When player clicks Start:
.start-screen.hidden { opacity: 0; pointer-events: none; }
.game-screen.active { opacity: 1; pointer-events: auto; z-index: 1; }
```

### Transition Timing
1. **t=0ms**: Player clicks "Start Game" button
2. **t=0-500ms**: Start screen fades out
3. **t=500ms**: Game screen begins fading in
4. **t=1000ms**: Game chapter displays and game begins

---

## Story and Choice System

### Story Object Structure
```javascript
const story = {
  intro: {
    chapter: "Introduction",
    character: "Mira",
    emoji: "👧",
    text: "... dialogue ...",
    choices: [
      {
        text: "Choice text with emoji",
        action: "actionName",
        impact: 25  // Health change
      },
      // ... more choices
    ],
    turtleStatus: "...",
    fishStatus: "..."
  },
  // ... more chapters
};
```

### Action System
```javascript
const actions = {
  startJourney: () => {
    friendshipLevel += 15;
    displayChapter("chapter1");
  },
  cleanPlastic: () => {
    health += 30;
    plasticCleaned = true;
    friendshipLevel += 40;
    displayMessage("...");
    updateMissionStatus();
    setTimeout(() => displayChapter("chapter1b"), 2500);
  },
  // ... 20+ more actions
};
```

---

## Dynamic UI Updates

### Health Bar
```javascript
function updateHealth() {
  document.getElementById("healthValue").innerText = Math.round(health) + "%";
  const healthFill = document.getElementById("healthFill");
  healthFill.style.width = health + "%";
  
  // Color changes based on health
  if (health > 75) {
    healthFill.style.background = "linear-gradient(90deg, #4caf50, #81c784)";
  } else if (health > 50) {
    healthFill.style.background = "linear-gradient(90deg, #ff9800, #ffb74d)";
  } else {
    healthFill.style.background = "linear-gradient(90deg, #f44336, #ef5350)";
  }
}
```

### Mission Status Indicators
```javascript
function updateMissionStatus() {
  // Plastic mission
  const plasticDot = document.getElementById("plasticStatus");
  if (plasticCleaned) {
    plasticDot.classList.add("completed");
  } else {
    plasticDot.classList.add("pending");
  }
  // Similar for pollution and development
}
```

### Friendship Level
```javascript
document.getElementById("friendshipFill").style.width = friendshipLevel + "%";
```

---

## Ending System

### Ending Determination Logic
```javascript
if (health > 85 && friendshipLevel >= 80) {
  displayChapter("goodEnding");
} else if (health >= 60 && friendshipLevel >= 40) {
  displayChapter("balancedEnding");
} else {
  displayChapter("badEnding");
}
```

### Variables Affecting Ending
- `health` (0-100): Overall wetland condition
- `friendshipLevel` (0-100): Relationship with animals
- `plasticCleaned` (boolean): Plastic pollution addressed
- `pollutionStopped` (boolean): Factory pollution stopped
- `illegalDevelopmentStopped` (boolean): Development halted

---

## Responsive Design Strategy

### Viewport Breakpoints
```css
/* Large screens: 1100px+ */
#gameContainer {
  flex-direction: row;
  max-width: 1100px;
}

/* Tablets: 600-900px */
@media (max-width: 900px) {
  #gameContainer {
    flex-direction: column;
  }
  #sidePanel {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

/* Mobile: <600px */
@media (max-width: 600px) {
  h1 { font-size: 1.8em; }
  #gameBox { width: 95vw; padding: 20px; }
  .choice-btn { font-size: 0.95em; }
}
```

---

## Performance Optimizations

### 1. **Efficient Animations**
- Uses CSS animations (GPU-accelerated)
- Minimal JavaScript animation calculations
- Staggered animation delays for smooth perception

### 2. **Selective Rendering**
- Start screen hidden with `pointer-events: none`
- Game screen elements only rendered when active
- Z-index layering prevents unnecessary repaints

### 3. **Clean Event Handling**
```javascript
window.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", startGame);
  }
});
```

### 4. **Minimal DOM Manipulation**
- Choices rendered dynamically once per decision
- Text content updated via `.innerText` (not innerHTML)
- CSS classes used for state management

---

## Browser Compatibility

### Supported Features
- CSS Grid and Flexbox
- CSS Animations and Transitions
- SVG Graphics
- ES6 JavaScript (const, arrow functions)
- CSS Gradients
- CSS Filters and Transforms

### Compatible Browsers
✅ Chrome 60+
✅ Firefox 55+
✅ Safari 12+
✅ Edge 79+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Customization Guide

### Change Game Colors
```css
/* Update in style.css */
body { background: linear-gradient(135deg, #YOUR_COLOR1, #YOUR_COLOR2); }
.start-button { background: linear-gradient(135deg, #NEW_GREEN, #NEW_GREEN); }
```

### Modify Story Content
```javascript
// In script.js, update story object
const story = {
  intro: {
    text: "Your new dialogue here",
    // ... rest of structure
  }
};
```

### Add New Chapters
```javascript
const story = {
  // ... existing chapters
  newChapter: {
    chapter: "Chapter X: Title",
    character: "Character Name",
    emoji: "👤",
    text: "Story text",
    choices: [
      { text: "Option 1", action: "action1", impact: 20 },
      { text: "Option 2", action: "action2", impact: 15 }
    ]
  }
};

const actions = {
  action1: () => {
    health += 20;
    friendshipLevel += 10;
    setTimeout(() => displayChapter("nextChapter"), 2500);
  }
};
```

---

## Debugging Tips

### Console Logging
```javascript
// Add to actions to debug state:
console.log("Health:", health);
console.log("Friendship:", friendshipLevel);
console.log("Mission Status:", {
  plastic: plasticCleaned,
  pollution: pollutionStopped,
  development: illegalDevelopmentStopped
});
```

### Check Element States
```javascript
// In browser console:
document.getElementById("startScreen").className
document.getElementById("gameScreen").className
```

### Animation Inspection
```css
/* Disable animations for debugging */
* {
  animation: none !important;
  transition: none !important;
}
```

---

## File Size Overview

- **index.html**: ~9KB
- **style.css**: ~22KB
- **script.js**: ~20KB
- **Total**: ~51KB (Very lightweight!)

---

## Future Enhancement Roadmap

### Phase 1 (Current)
✅ Start screen with animations
✅ Story-driven gameplay
✅ Health and mission tracking
✅ Multiple endings
✅ Responsive design

### Phase 2
- [ ] Audio (background music, sound effects)
- [ ] Persistent save/load system
- [ ] Achievement badges
- [ ] Character profiles

### Phase 3
- [ ] Multiplayer voting system
- [ ] Extended story branches
- [ ] Wildlife facts database
- [ ] Resource impact calculator

### Phase 4
- [ ] Mobile app version
- [ ] Internationalization (multiple languages)
- [ ] Accessibility improvements
- [ ] Learning management system integration

---

**For questions or modifications, refer to the inline comments in each file.**
