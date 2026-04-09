# 🎮 Testing Guide - Wetland Game v2.0

## Quick Start
1. Open `index.html` in a web browser
2. Click "Start Game"
3. Enter your player name
4. Begin the adventure!

## Feature Testing Checklist

### ✅ Level Gating System

**Test 1: Level Cannot Be Completed Without Missions**
- [ ] Start Level 1 (Freshwater)
- [ ] Observe the "⚠️ Complete Missions & Clean Biome" button
- [ ] Message should show: `✓ Missions: 0/3`
- [ ] Button should be disabled (gray, no hover effect)

**Test 2: Level Cannot Be Completed Without Clean Biome**
- [ ] Complete 2-3 missions to get `Missions: 3/3`
- [ ] If health < 70% or pollution > 30%, button should still be disabled
- [ ] Message should show: `🌍 Biome Health: XX% (need 70%+)` and/or `☠️ Pollution: XX% (need 30%-)`

**Test 3: Level Completes When All Conditions Met**
- [ ] Make choices that improve biome health to 70%+
- [ ] Make choices that reduce pollution to 30%-
- [ ] Complete all 3 missions
- [ ] Button should change to "→ Continue to Next Level" (green)
- [ ] Button should be clickable and functional

### 🔊 Audio System

**Test 4: Audio Starts Automatically**
- [ ] Start a level
- [ ] Listen for ambient background sound (soothing nature tone)
- [ ] Sound should play automatically without user interaction
- [ ] Different tones for different biomes:
  - Freshwater: Lower, deeper tone
  - Mangrove: Mid-range tone
  - Urban: Slightly different tone

**Test 5: Audio Toggle Button**
- [ ] Observe floating button at bottom-right (currently shows 🔊)
- [ ] Click button once
- [ ] Button should change to 🔇 (muted icon)
- [ ] Audio should stop playing
- [ ] Click again
- [ ] Button should change back to 🔊
- [ ] Audio should resume

**Test 6: Audio Button Styling**
- [ ] Button should be round (56px diameter)
- [ ] Color: Green gradient matching game theme
- [ ] Hover effect: Button enlarges slightly (scale 1.1)
- [ ] Active click: Button shrinks (scale 0.95)
- [ ] On mobile: Button should be smaller (48px)

**Test 7: Audio State Persistence**
- [ ] Toggle audio off (🔇)
- [ ] Navigate to next level
- [ ] Audio should remain off
- [ ] Toggle audio on (🔊)
- [ ] Move through levels
- [ ] Audio should remain on

### 🎨 UI/UX Improvements

**Test 8: Level Progress Message**
- [ ] Start Level 1
- [ ] Look below the choice buttons
- [ ] Should see progress message with green/nature styling
- [ ] Message updates as you make choices
- [ ] When all requirements met, message disappears

**Test 9: Color Theme (Wetland Feeling)**
- [ ] Main buttons: Green (#1a7d4d) - nature color
- [ ] Hover states: Brighter green with smooth transitions
- [ ] Disabled buttons: Gray gradient
- [ ] No purple colors (all changed to green)
- [ ] Wetland elements: Water, reeds, birds visible in backgrounds

**Test 10: Overall Atmosphere**
- [ ] Game feels calming and nature-focused
- [ ] Animation are smooth and not jarring
- [ ] Audio complements the visual atmosphere
- [ ] Loading/transitions are smooth

### 📊 Mission Tracking

**Test 11: Missions Display Correctly**
- [ ] Mission panel on right side shows missions
- [ ] Completed missions have checkmarks
- [ ] In-progress missions show progress
- [ ] Mission count matches total missions

**Test 12: Health & Pollution Updates**
- [ ] Health bar updates with each choice
- [ ] Pollution bar updates with each choice
- [ ] Values reflected in percentage
- [ ] Color changes: Red (bad) → Green (good)

### 🌍 Multi-Level Progression

**Test 13: Level 1 → Level 2 Transition**
- [ ] Complete Level 1 (Freshwater) properly
- [ ] Click "Continue to Next Level"
- [ ] Should enter Level 2 (Mangrove)
- [ ] Audio tone should change (different frequency)
- [ ] New missions should appear
- [ ] Health/pollution reset to level defaults
- [ ] Progress message clears

**Test 14: Level 2 → Level 3 Transition**
- [ ] Repeat Test 13 for Level 2 → Level 3
- [ ] Level 3 (Urban) should have different tone
- [ ] Different mission set appears

**Test 15: Final Level Completion**
- [ ] Complete Level 3 properly
- [ ] Button should say "→ Continue to Results"
- [ ] Click button
- [ ] Should show results/ending screen
- [ ] Audio should stop

### 📱 Responsive Design

**Test 16: Mobile View (< 768px)**
- [ ] Audio button: 48px (smaller than desktop)
- [ ] Level progress message: Smaller font
- [ ] All buttons remain clickable
- [ ] Text readable without horizontal scroll

**Test 17: Tablet View (768px - 1024px)**
- [ ] All elements scale appropriately
- [ ] Audio button in correct position
- [ ] Layout adjusts but maintains usability

**Test 18: Desktop View (> 1024px)**
- [ ] Full 56px audio button
- [ ] All panels visible and readable
- [ ] No element overlap

### 🐛 Edge Cases & Error Handling

**Test 19: Audio Support**
- [ ] Open in Chrome: Audio should work
- [ ] Open in Firefox: Audio should work
- [ ] Open in Safari: Audio should work
- [ ] Open in Edge: Audio should work

**Test 20: Restart Functionality**
- [ ] Complete levels and reach ending
- [ ] Click "Back to Start"
- [ ] Should return to start screen
- [ ] Audio should stop
- [ ] Game state should reset
- [ ] Clicking "Start Game" should restart cleanly

**Test 21: Rapid Button Clicking**
- [ ] Rapidly toggle audio button
- [ ] No console errors
- [ ] Button state stays consistent
- [ ] No duplicate audio contexts created

## Expected Scores for Level Completion

### Level 1: Freshwater
- **Missions**: 
  1. Clean plastic pollution
  2. Protect turtle habitat
  3. Maintain water quality
- **Requirements**: 70%+ health, 30%- pollution

### Level 2: Mangrove
- **Missions**:
  1. Prevent illegal cutting
  2. Protect bird nesting
  3. Restore mangrove roots
- **Requirements**: 70%+ health, 30%- pollution

### Level 3: Urban
- **Missions**:
  1. Stop industrial waste
  2. Build community gardens
  3. Restore natural wetland
- **Requirements**: 70%+ health, 30%- pollution

## Performance Metrics

- [ ] Game loads in < 2 seconds
- [ ] Audio plays without lag
- [ ] Buttons respond instantly
- [ ] No console errors
- [ ] No memory leaks on tab switch/refresh

## Success Criteria

✅ **All Features Working**:
- Level gating prevents progression until conditions met
- Audio plays automatically and can be toggled
- Progress message clearly shows requirements
- UI has wetland/nature theme
- Smooth transitions between levels
- Responsive on all device sizes
