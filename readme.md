# 🏎️ Street Legends

> **A browser-based 3D open-world driving and racing game built with Babylon.js.**

Street Legends is a long-term game development project focused on creating an enjoyable driving experience before expanding into a complete open-world racing game.

The game begins as a small driving prototype and gradually grows into a polished experience with racing, exploration, garages, vehicle upgrades, missions, and more.

---

# Vision

Our goal is **not** to build a huge game immediately.

Instead, we will build a **small, polished game** and continuously improve it over time.

Every feature should be completed, tested, and polished before moving on to the next.

> **First make it work. Then make it better. Then make it beautiful.**

---

# Game Pillars

Every feature added to the game should support at least one of these pillars.

## 🚗 Fun Driving

Driving should always feel smooth, responsive, and enjoyable.

## 🌍 Exploration

Players should enjoy driving around the world, even when they are not racing.

## 🔧 Progression

Players should feel rewarded through unlocking new cars, upgrades, and achievements.

## 🏁 Competition

Races and driving challenges should reward skill rather than luck.

## ✨ Polish

A few polished features are better than many unfinished ones.

---

# Core Features

## Driving

- Smooth acceleration
- Braking
- Reverse
- Steering
- Camera follow
- Speedometer
- Collision detection

---

## Vehicles

- Multiple cars
- Different vehicle statistics
- Custom paint colors
- Unlockable vehicles
- Vehicle collection

---

## Garage

- Upgrade engine
- Upgrade transmission
- Upgrade brakes
- Upgrade tires
- Upgrade handling
- Customize appearance

---

## Economy

- Earn money
- Buy vehicles
- Purchase upgrades
- Complete challenges
- Daily rewards

---

## World

The final game world may include:

- City
- Highways
- Mountains
- Forest
- Desert
- Small towns
- Gas stations
- Hidden shortcuts

---

## Missions

- Sprint races
- Circuit races
- Time trials
- Delivery missions
- Driving challenges
- Collectibles

---

## Future Features

- Day/Night cycle
- Dynamic weather
- AI traffic
- Police system
- Damage system
- Replay mode
- Multiplayer (optional)

---

# Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6+)

## 3D Engine

- Babylon.js

## Rendering

- WebGL

## Development Tools

- Visual Studio Code
- Git
- GitHub

## Future Tools

- Blender (3D Models)
- Audacity (Audio)
- GIMP / Krita (Textures)

---

# Development Roadmap

---

## ✅ Phase 1 — Basic Driving (Current)

Goal:

Create a playable driving prototype.

Tasks

- [ ] Create Babylon.js project
- [ ] Create 3D scene
- [ ] Add camera
- [ ] Add lighting
- [ ] Create ground
- [ ] Create road
- [ ] Add simple car
- [ ] Keyboard controls
- [ ] Smooth acceleration
- [ ] Braking
- [ ] Steering
- [ ] Speedometer

Result

A simple but enjoyable driving prototype.

---

## Phase 2 — Better Driving

- [ ] Better steering
- [ ] Camera improvements
- [ ] Reverse gear
- [ ] Improved braking
- [ ] Collision system
- [ ] Physics improvements

---

## Phase 3 — Environment

- [ ] Road markings
- [ ] Trees
- [ ] Buildings
- [ ] Sky improvements
- [ ] Better lighting

---

## Phase 4 — Garage

- [ ] Garage scene
- [ ] Vehicle upgrades
- [ ] Save upgrades
- [ ] Paint shop

---

## Phase 5 — Economy

- [ ] Coins
- [ ] Rewards
- [ ] Shop
- [ ] Unlock cars

---

## Phase 6 — Racing

- [ ] AI opponents
- [ ] Checkpoints
- [ ] Lap system
- [ ] Finish line
- [ ] Leaderboard

---

## Phase 7 — Open World

- [ ] Larger city
- [ ] Highway
- [ ] Forest
- [ ] Desert
- [ ] Free exploration

---

## Phase 8 — Polish

- [ ] Better graphics
- [ ] Sound effects
- [ ] Music
- [ ] Particle effects
- [ ] Optimization
- [ ] Bug fixes

---

# Coding Principles

## Keep Code Simple

Always write code that is easy to understand.

Readable code is better than clever code.

---

## One Responsibility Per File

Each file should have one purpose.

Good

Scene.js

Creates the Babylon scene.

Bad

Scene.js

Creates scene, manages UI, saves data, handles upgrades, controls audio.

---

## Modular Design

Split code into reusable modules.

Never place the entire game inside one JavaScript file.

---

## Use Descriptive Names

Good

playerCar

followCamera

speedometer

currentSpeed

Bad

obj

x

test

temp

---

## Never Duplicate Code

If the same code appears multiple times, convert it into a reusable function.

---

## Keep Functions Small

Good

updateCar()

updateCamera()

updateUI()

Bad

gameLoopDoingEverything()

---

## Comment Important Logic

Explain why something exists.

Avoid comments that simply repeat the code.

---

## Organize Assets

Every asset belongs inside its proper folder.

Never place random files in the project root.

---

## Keep Code Consistent

Follow the same coding style throughout the project.

---

# Naming Convention

## Files

Use PascalCase

```
Car.js
CameraController.js
GarageUI.js
GameManager.js
```

---

## Variables

Use camelCase

```javascript
playerCar
cameraTarget
currentSpeed
enginePower
```

---

## Constants

Use UPPER_CASE

```javascript
MAX_SPEED
TURN_SPEED
BRAKE_FORCE
```

---

# Folder Structure

```
StreetLegends/

│
├── README.md
├── ROADMAP.md
├── CHANGELOG.md
├── LICENSE
├── .gitignore
├── index.html
│
├── docs/
│   ├── coding-standards.md
│   ├── folder-structure.md
│   ├── game-design.md
│   └── art-style.md
│
├── assets/
│   ├── models/
│   ├── textures/
│   ├── sounds/
│   ├── music/
│   ├── fonts/
│   └── icons/
│
├── public/
│
├── src/
│   │
│   ├── core/
│   │   ├── Engine.js
│   │   ├── Scene.js
│   │   ├── Config.js
│   │   └── Game.js
│   │
│   ├── entities/
│   │   ├── Car.js
│   │   ├── Player.js
│   │   └── Wheel.js
│   │
│   ├── systems/
│   │   ├── Input.js
│   │   ├── Camera.js
│   │   ├── Physics.js
│   │   ├── Audio.js
│   │   └── SaveSystem.js
│   │
│   ├── world/
│   │   ├── Ground.js
│   │   ├── Road.js
│   │   ├── Buildings.js
│   │   └── Environment.js
│   │
│   ├── ui/
│   │   ├── HUD.js
│   │   ├── Speedometer.js
│   │   ├── Garage.js
│   │   └── MainMenu.js
│   │
│   └── main.js
│
└── tests/
```

---

# Git Commit Style

Examples

```
feat: add basic driving

feat: create follow camera

feat: add speedometer

fix: steering bug

fix: camera clipping issue

refactor: split car controller

docs: update roadmap
```

---

# Project Rules

1. Build one feature at a time.
2. Never skip phases.
3. Test every feature before moving forward.
4. Fix bugs before adding new features.
5. Keep code modular.
6. Keep files organized.
7. Use meaningful commit messages.
8. Keep documentation updated.
9. Never sacrifice readability for shorter code.
10. Prefer polished features over many unfinished ones.

---

# Definition of Done

A feature is considered complete only when:

- It works correctly.
- No console errors exist.
- Code is clean and readable.
- Variable names are meaningful.
- The feature has been tested.
- Documentation has been updated if necessary.

---

# Current Goal

## Phase 1 — Basic Driving

Objective

Build a fun driving prototype.

Features

- 3D Scene
- Camera
- Lighting
- Ground
- Road
- Drivable Car
- Keyboard Controls
- Smooth Acceleration
- Braking
- Steering
- Speedometer

No AI.

No garage.

No upgrades.

No economy.

No racing.

Only focus on making driving feel fun.

---

# Long-Term Goal

Street Legends should eventually become a complete browser-based 3D driving game where players can:

- Explore a large open world
- Race against AI
- Earn money
- Buy new cars
- Upgrade vehicles
- Customize cars
- Complete missions
- Unlock achievements
- Continue progressing through gameplay

Every new feature should improve the player's driving experience while maintaining clean, organized, and maintainable code.