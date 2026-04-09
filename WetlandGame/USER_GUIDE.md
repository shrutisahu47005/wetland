# 🎮 User Guide - New Features v2.1

## Welcome to Mira's Wetland v2.1! 🌿

Your game has been upgraded with three major new features designed to make gameplay more engaging, immersive, and educational.

---

## 📖 Feature 1: Level Completion Gating

### What's New?
You can't simply beat a level by making some good choices anymore. To progress to the next biome, you now must **complete ALL objectives** and restore the wetland to health.

### Requirements to Complete a Level
✅ **Complete All 3 Missions**
- Each biome has 3 specific conservation missions
- They appear in the mission panel on the right
- Make choices that directly address each mission

✅ **Restore Biome Health to 70% or Higher**
- Your choices increase or decrease biome health
- Watch the health bar in the status panel
- Healing actions restore health gradually

✅ **Reduce Pollution to 30% or Lower**
- Pollution comes from industrial, agricultural, or residential waste
- Make eco-friendly choices to reduce it
- The pollution meter shows your progress

### How to Use
1. **Start a Level** - You'll see the "⚠️ Complete Missions & Clean Biome" button
2. **Check Progress** - A message appears showing what you still need to do:
   - `✓ Missions: 2/3`
   - `🌍 Biome Health: 65% (need 70%+)`
   - `☠️ Pollution: 35% (need 30%-)`
3. **Make Strategic Choices** - Focus on missions AND environmental health
4. **Watch the Updates** - Progress message changes as you make choices
5. **Complete Objectives** - When all requirements are met, button turns green
6. **Click "→ Continue to Next Level"** - Proceed to the next biome

### Example
```
Level 1: Freshwater Wetland

Starting:
- Missions: 0/3
- Health: 60%
- Pollution: 40%
Button: [⚠️ DISABLED]

After some choices:
- Missions: 2/3  ← Need 1 more
- Health: 68%    ← Need 2% more
- Pollution: 32% ← Need 2% less
Button: [⚠️ DISABLED]

Final result:
- Missions: 3/3  ✓
- Health: 71%    ✓
- Pollution: 28% ✓
Button: [→ ENABLED]
```

### Progress Message
The progress message appears below your choice buttons when you haven't completed the level yet. It shows:
- How many missions you've completed
- What your current biome health is
- What your current pollution level is

The message **disappears when the level is complete**, and the green button appears.

---

## 🔊 Feature 2: Soothing Background Audio

### What's New?
When you start a level, peaceful ambient background music automatically plays! Each biome has its own unique, soothing tone that reflects the environment.

### How It Works
1. **Automatic Start** - Audio begins when you enter a level (no clicking needed)
2. **Biome-Specific Tones**:
   - **Freshwater** (Level 1): Deep, bass tone (110Hz) - calming and grounding
   - **Mangrove** (Level 2): Natural mid-range tone (146.83Hz) - balanced and serene
   - **Urban** (Level 3): Balanced tone (130.81Hz) - hopeful and harmonious
3. **Continuous Loop** - Audio repeats smoothly for 6 seconds (barely perceptible)
4. **Soothing Filter** - Low-pass filter creates muffled, peaceful quality

### Audio Quality
- **Technology**: Web Audio API (modern, browser-based)
- **Quality**: High-fidelity ambient sound
- **Loudness**: Subtle and non-intrusive (won't disturb)
- **CPU Impact**: Minimal (optimized algorithm)

### Supported Browsers
✅ Chrome / Chromium
✅ Firefox
✅ Safari
✅ Edge

### Audio Tips
- Wear headphones for the best atmospheric experience
- Audio is very subtle - listen carefully
- Each biome's tone represents its environmental character
- Audio changes when you move to a new level

---

## 🔊 Feature 3: Audio Toggle Button

### What's It For?
The floating button at the bottom-right corner lets you turn the background music on or off anytime.

### Where Is It?
Look for a circular button in the **bottom-right corner** of your screen.

### How to Use It

**To Mute Audio:**
1. Click the button showing 🔊 (speaker icon)
2. Button changes to 🔇 (muted speaker icon)
3. Audio stops playing immediately
4. Progress continues, audio stays off

**To Unmute Audio:**
1. Click the button showing 🔇 (muted speaker icon)
2. Button changes back to 🔊 (speaker icon)
3. Audio resumes playing
4. Choose new button will start audio again if you're still in a level

### Button Features
- **Size**: Large round button (easy to click)
- **Color**: Green (matches game theme)
- **Position**: Fixed bottom-right (visible always)
- **Hover Effect**: Button grows slightly when you hover over it
- **Click Effect**: Button shrinks slightly when you click it

### When Audio Stays Muted
- Audio preference continues through all levels
- If you mute audio on Level 1, it stays muted on Level 2 and 3
- Restarting the game resets audio to ON

### Mobile Note
On mobile devices, the button is smaller (48px) but works the same way.

---

## 🎨 Feature 4: Enhanced UI/UX - Wetland Feeling

### Visual Changes
The entire game now has a **nature-inspired green theme** instead of the previous purple:

**Color Changes:**
- Buttons: Green (#1a7d4d) - representing nature
- Hover Effects: Brighter green (#2d9b6d)
- Dark Accents: Deep forest green (#0f4c30)
- Text: Clear, readable

### Atmospheric Design
- **Water Elements**: Visible water, ripples, flowing animations
- **Wetland Life**: Reeds swaying, water lilies, flying birds
- **Sky**: Blue gradient sky with clouds
- **Natural Ambiance**: Everything feels like you're in a real wetland

### Animation & Movement
- Smooth button transitions (hover rises up)
- Gentle floating particles
- Rippling water effects
- Swaying vegetation
- Drifting clouds

### Overall Feel
The game now feels:
- ✨ Peaceful and calming
- 🌿 Connected to nature
- 🌊 Immersive and atmospheric
- 💚 Environmentally conscious

---

## 📊 How All Features Work Together

### Gameplay Flow with New Features

```
1. START LEVEL
   ├─ Audio begins automatically 🔊
   ├─ Progress message appears (if incomplete)
   └─ Green environment surrounds you 🌿

2. MAKE CHOICES
   ├─ Each choice affects health/pollution
   ├─ Missions progress when addressed
   ├─ Audio plays softly in background
   └─ Progress message updates

3. TRACK PROGRESS
   ├─ Mission count updates
   ├─ Health bar changes
   ├─ Pollution level changes
   ├─ Progress message shows what's needed
   └─ Audio creates peaceful atmosphere

4. COMPLETE LEVEL
   ├─ When ALL requirements met...
   ├─ Progress message disappears
   ├─ Button turns GREEN
   ├─ Audio continues playing
   └─ "→ Continue to Next Level" available

5. ADVANCE (OR TOGGLE AUDIO)
   ├─ Click "Continue to Next Level"
   ├─ New level loads with new biome tone 🎵
   └─ You can click 🔊 anytime to toggle
```

---

## 🎯 Strategy Tips

### To Complete Levels Faster
1. **Read Mission Descriptions** - Know exactly what needs to be done
2. **Watch Health Meter** - Make choices that restore health
3. **Monitor Pollution** - Every choice affects pollution level
4. **Strategic Thinking** - Choose actions that address missions AND environment
5. **Check Progress Message** - It shows you what's missing

### Audio Tips
- Keep audio ON for best immersion
- Different biomes sound different - listen for the change!
- If distracted, use 🔊 to mute
- Audio helps create emotional connection to the environment

### Environmental Tips
- Always consider the impact on wildlife
- Pollution affects all living things
- Restoration takes multiple good choices
- Community involvement is key

---

## ❓ FAQ

### Q: Why can't I finish the level?
A: Check the progress message below your choices. You need:
- All 3 missions completed
- 70%+ biome health
- 30%- pollution

### Q: Where's the audio button?
A: Look at the bottom-right corner of your screen. It's a circular green button showing 🔊.

### Q: Can I turn audio off?
A: Yes! Click the 🔊 button and it becomes 🔇. Click again to turn it back on.

### Q: Does audio affect gameplay?
A: No! Audio is purely atmospheric. It doesn't change the game mechanics.

### Q: What if my browser doesn't support audio?
A: The game works fine without audio. Make choices and complete missions as normal.

### Q: Do I need headphones?
A: No, but headphones provide better audio quality and immersion.

### Q: Will audio drain my battery?
A: No, Web Audio API is very efficient. The battery impact is minimal.

### Q: Can I play on mobile?
A: Yes! The game is fully responsive. The audio button is smaller on mobile but works the same way.

### Q: What if the progress message doesn't appear?
A: It only appears when the level is incomplete. Once all requirements are met, it disappears.

---

## 🎮 New Game Features Summary

| Feature | What It Does | How to Use | Where |
|---------|-------------|-----------|-------|
| **Level Gating** | Blocks progress until all objectives complete | Make choices to meet all 3 requirements | On-screen button |
| **Progress Message** | Shows what you still need to do | Read message below choices | Below choice buttons |
| **Background Audio** | Plays peaceful nature sounds | Just enjoy it! (Automatic) | Everywhere |
| **Audio Toggle** | Control whether audio plays | Click 🔊 or 🔇 button | Bottom-right corner |
| **Green Theme** | Wetland-inspired visual design | Just enjoy the environment! | Entire screen |

---

## 🌟 Enjoy the Enhanced Experience!

Your Mira's Wetland game is now:
- ✅ More challenging (real environmental goals)
- ✅ More immersive (atmospheric audio)
- ✅ More beautiful (wetland-themed design)
- ✅ More meaningful (strategic choices matter)

**Now go help Mira save the wetlands!** 🌿💚

---

*Remember: Your choices shape the future of nature, both in the game and in the real world.*
