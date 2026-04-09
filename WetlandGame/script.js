// ============================================
// GAME STATE MANAGEMENT
// ============================================

const gameState = {
    currentScreen: 'startScreen',
    selectedBiome: null,
    playerName: '',
    characterTurn: 'mira',
    chapter: 0,
    choices: 0,
    health: 60,
    biodiversity: 50,
    pollution: 40,
    missionsCompleted: 0,
    totalMissions: 5,
    lastChoice: '',
    endingType: null,
    level: 0, // 0: freshwater, 1: mangrove, 2: saltmarsh, 3: swamp, 4: bog, 5: estuary, 6: urban
    levels: ['freshwater', 'mangrove', 'saltmarsh', 'swamp', 'bog', 'estuary', 'urban'],
    levelsCompleted: [false, false, false, false, false, false, false],
    backgroundAudio: null,
    audioEnabled: true,
    collectibles: [], // Items collected in current level
    requiredCollectibles: [], // Items that need to be collected for current task
    // Visual game state
    visualGameActive: false,
    character: {
        x: 100,
        y: 200,
        width: 40,
        height: 40,
        speed: 3,
        emoji: '\u{1F467}'
    },
    visualItems: [], // Items to collect visually
    keys: {} // Keyboard state
};

// ============================================
// CHARACTER DATA
// ============================================

const characters = {
    mira: {
        name: 'Mira',
        emoji: '\u{1F467}',
        emotion: 'emotional',
        dialogueStyle: 'personal and feeling-based'
    },
    professor: {
        name: 'Professor Neeraj',
        emoji: '\u{1F468}\u{200D}\u{1F52C}',
        emotion: 'scientific',
        dialogueStyle: 'educational and fact-based'
    },
    loco: {
        name: 'Ranger Loco',
        emoji: '\u{1F9D9}',
        emotion: 'adventurous',
        dialogueStyle: 'encouraging and spirited'
    }
};

// ============================================
// BIOME DATA
// ============================================

const biomes = {
    freshwater: {
        name: 'Freshwater Marsh',
        emoji: '\u{1F4A7}',
        description: 'A vital freshwater ecosystem teeming with life. Marshes filter water and provide habitats for countless species.',
        animals: ['🐢 Turtles', '🐟 Fish', '🦆 Ducks'],
        baseHealth: 60,
        baseBiodiversity: 50,
        basePollution: 40,
        missions: [
            '🗑️ Collect 5 pieces of plastic pollution',
            '🐢 Protect turtle nesting grounds',
            '🌾 Restore native marsh vegetation',
            '🧪 Clean up chemical waste',
            '🌱 Plant wetland seeds',
            '🐟 Build fish habitats'
        ],
        collectibles: [
            { id: 'plastic_bottle', name: 'Plastic Bottle', emoji: '🍼', count: 0, required: 2 },
            { id: 'plastic_bag', name: 'Plastic Bag', emoji: '🛍️', count: 0, required: 1 },
            { id: 'fishing_line', name: 'Fishing Line', emoji: '🎣', count: 0, required: 1 },
            { id: 'chemical_can', name: 'Chemical Can', emoji: '🧪', count: 0, required: 1 },
            { id: 'wetland_seed', name: 'Wetland Seed', emoji: '🌱', count: 0, required: 3 }
        ],
        chapters: [
            {
                miraText: "I can hear the turtles calling for help! Their nesting grounds are covered with plastic trash. Freshwater marshes cover only 6% of Earth's surface but support 40% of ALL species! We must clean this up before they can nest safely. Click on the plastic items floating in the water to collect them!",
                collectiblesRequired: ['plastic_bottle', 'plastic_bag', 'fishing_line'],
                choices: [
                    { text: "🗑️ Remove collected plastic trash from nesting area", effect: { health: +10, biodiversity: +5, pollution: -12 }, requiresCollection: true },
                    { text: "🐢 Create protected turtle nesting areas", effect: { health: +8, biodiversity: +12, pollution: 0 } },
                    { text: "😒 Leave it - too much work", effect: { health: -5, biodiversity: -8, pollution: +10 } }
                ]
            },
            {
                miraText: "Good work cleaning up! But now I see the real problem - a nearby farm is pouring fertilizer runoff into the marsh. The water is turning green and murky. Fish eggs can't develop in this polluted water. We need to talk to the farmers!",
                choices: [
                    { text: "🚜 Talk to farmers about sustainable practices", effect: { health: +9, biodiversity: +7, pollution: -10 } },
                    { text: "🏞️ Create natural buffer zones with plants", effect: { health: +11, biodiversity: +8, pollution: -8 } },
                    { text: "🚜 Report the farm to environmental agency", effect: { health: +13, biodiversity: +6, pollution: -15 } }
                ]
            },
            {
                miraText: "The water is getting clearer! But now I see another problem - the native marsh plants like cattails and reeds have been replaced by invasive water hyacinths. They're choking out the ecosystem and the ducks can't find food. We need to restore the native plants!",
                choices: [
                    { text: "🌾 Plant native cattails and reeds everywhere", effect: { health: +12, biodiversity: +14, pollution: -5 } },
                    { text: "🦆 Remove invasive plants by hand", effect: { health: +10, biodiversity: +12, pollution: -3 } },
                    { text: "🦆 Bring in herbivorous fish to eat invasive plants", effect: { health: +8, biodiversity: +11, pollution: 0 } }
                ]
            },
            {
                miraText: "Excellent! The native plants are returning! But wait - I'm hearing worried calls from the birds. They're saying the nesting areas are still too exposed. We need to build more protected zones and create safe shallow areas for them to raise their young.",
                choices: [
                    { text: "🛡️ Build protective barriers around nesting zones", effect: { health: +9, biodiversity: +13, pollution: 0 } },
                    { text: "🌊 Create shallow wetland pools for nesting", effect: { health: +11, biodiversity: +15, pollution: -4 } },
                    { text: "🦆 Establish no-entry zones for human activity", effect: { health: +10, biodiversity: +14, pollution: -2 } }
                ]
            },
            {
                miraText: "The birds are nesting safely now! But I sense there's still chemical waste contaminating the water. I can see old cans and containers that need to be removed. Let's clean up this hazardous waste!",
                collectiblesRequired: ['chemical_can'],
                choices: [
                    { text: "🧪 Safely dispose of collected chemical waste", effect: { health: +8, biodiversity: +6, pollution: -15 }, requiresCollection: true },
                    { text: "⚠️ Mark the area as hazardous and cordon it off", effect: { health: +5, biodiversity: +4, pollution: -8 } },
                    { text: "🚫 Ignore the chemical waste for now", effect: { health: -3, biodiversity: -5, pollution: +12 } }
                ]
            },
            {
                miraText: "Great! The chemical waste is gone. Now let's help restore the wetland by planting native seeds. I can see some seed pods floating around - collect them and plant them in the marsh!",
                collectiblesRequired: ['wetland_seed'],
                choices: [
                    { text: "🌱 Plant collected wetland seeds in restoration areas", effect: { health: +12, biodiversity: +16, pollution: -3 }, requiresCollection: true },
                    { text: "🌿 Create a community seed bank for future planting", effect: { health: +10, biodiversity: +14, pollution: 0 } },
                    { text: "🌾 Wait for natural regeneration", effect: { health: +6, biodiversity: +8, pollution: 0 } }
                ]
            },
            {
                miraText: "The seeds are planted and sprouting! But the fish need better habitats. Let's build some underwater structures to give them places to hide and spawn.",
                choices: [
                    { text: "🐟 Build artificial reefs for fish habitats", effect: { health: +11, biodiversity: +15, pollution: -2 } },
                    { text: "🌿 Restore submerged vegetation beds", effect: { health: +13, biodiversity: +14, pollution: -3 } },
                    { text: "💧 Create deeper pools for larger fish", effect: { health: +9, biodiversity: +12, pollution: 0 } }
                ]
            },
            {
                miraText: "🎉 Success! The marsh is thriving! Turtles are nesting safely in protected areas, fish populations are booming, birds are raising their young, and the ecosystem is healing beautifully! All the collected items have been properly disposed of or used for restoration.",
                choices: []
            }
        ]
    },
    
    mangrove: {
        name: 'Mangrove Swamp',
        emoji: '\u{1F333}',
        description: 'Coastal trees with complex root systems. Provides shelter for fish and protects coasts from storms.',
        animals: ['🦀 Crabs', '🐠 Fish', '🦜 Birds'],
        baseHealth: 65,
        baseBiodiversity: 70,
        basePollution: 35,
        missions: [
            '🌳 Plant new mangrove saplings',
            '🧹 Remove invasive species',
            '🦀 Protect crab breeding grounds'
        ],
        chapters: [
            {
                miraText: "The mangroves are struggling! Humans are cutting them down for development. These ancient trees protect 80% of all commercial fish species and shield coasts from hurricanes! I can hear the birds panicking - their nesting sites are disappearing!",
                choices: [
                    { text: "🌳 Plant new mangrove saplings to restore forest", effect: { health: +12, biodiversity: +14, pollution: 0 } },
                    { text: "✋ Stop the illegal logging immediately", effect: { health: +10, biodiversity: +10, pollution: 0 } },
                    { text: "💼 Allow limited development - economic growth matters", effect: { health: -15, biodiversity: -18, pollution: +8 } }
                ]
            },
            {
                miraText: "The logging has stopped, but now we have a bigger problem! Invasive saltcedar plants are spreading rapidly, choking out the native mangroves. They drink 10x more water than mangroves and the ecosystem is drying out!",
                choices: [
                    { text: "🧹 Remove invasive saltcedar plants by hand", effect: { health: +14, biodiversity: +16, pollution: 0 } },
                    { text: "🌿 Use natural predators to control the invaders", effect: { health: +12, biodiversity: +13, pollution: 0 } },
                    { text: "👀 Wait and see if balance occurs naturally", effect: { health: -8, biodiversity: -12, pollution: 0 } }
                ]
            },
            {
                miraText: "Great progress! The invasive plants are being removed! But now the crabs are confused - their breeding grounds are still exposed and damaged. The root systems are broken from all the disturbance. We need to focus on protecting their nurseries!",
                choices: [
                    { text: "🦀 Create protected crab breeding zones", effect: { health: +11, biodiversity: +15, pollution: -2 } },
                    { text: "🌳 Restore damaged root systems carefully", effect: { health: +13, biodiversity: +14, pollution: 0 } },
                    { text: "🐟 Improve fish spawning grounds too", effect: { health: +10, biodiversity: +16, pollution: -3 } }
                ]
            },
            {
                miraText: "The crabs are returning to breed! Baby fish are hiding in the roots! But we're still not done - hurricane season is coming and the mangroves are still recovering. We need to ensure we have enough mature trees to protect the coast!",
                choices: [
                    { text: "🌳 Plant fast-growing mangrove species", effect: { health: +9, biodiversity: +12, pollution: -2 } },
                    { text: "🌀 Build storm barriers to protect young trees", effect: { health: +11, biodiversity: +10, pollution: 0 } },
                    { text: "🦜 Focus on helping the bird population recover", effect: { health: +8, biodiversity: +14, pollution: -1 } }
                ]
            },
            {
                miraText: "🎉 The mangrove forest is thriving again! Young saplings are becoming adults, crabs are breeding successfully, fish are thriving, and birds are building nests! The coast is now protected and resilient. Hurricane season won't devastate this ecosystem anymore!",
                choices: []
            }
        ]
    },
    
    saltmarsh: {
        name: 'Salt Marsh',
        emoji: '\u{1F30A}',
        description: 'Where freshwater meets ocean. Supports migratory birds and filters nutrients for marine ecosystems.',
        animals: ['🦆 Migrating birds', '🦐 Shrimp', '🐚 Mollusks'],
        baseHealth: 55,
        baseBiodiversity: 60,
        basePollution: 45,
        missions: [
            '🦆 Create bird resting platforms',
            '🌿 Restore salt marsh grasses',
            '⚖️ Stop coastal development'
        ],
        chapters: [
            {
                miraText: "Thousands of migratory birds depend on this salt marsh! They need rest stops during their long journeys. These birds fly 15,000 miles annually! But developers want to drain the marsh for hotels and resorts. The birds are calling out in distress!",
                choices: [
                    { text: "🦆 Build bird resting platforms", effect: { health: +11, biodiversity: +13, pollution: 0 } },
                    { text: "⚖️ Protect the wetland legally", effect: { health: +13, biodiversity: +10, pollution: 0 } },
                    { text: "💰 Support the development project", effect: { health: -12, biodiversity: -14, pollution: +10 } }
                ]
            },
            {
                miraText: "The birds are resting safely now, but a new crisis is happening! Fertilizer runoff from agricultural lands is poisoning the marsh. The water is turning green with algae blooms and shrimp are dying. The ecosystem is choking!",
                choices: [
                    { text: "🌿 Plant nutrient-absorbing native grasses", effect: { health: +12, biodiversity: +14, pollution: -8 } },
                    { text: "👨‍🌾 Create buffer zones with farmers", effect: { health: +10, biodiversity: +11, pollution: -6 } },
                    { text: "💧 Install treatment wetlands", effect: { health: +11, biodiversity: +12, pollution: -7 } }
                ]
            },
            {
                miraText: "The algae blooms are fading and the water is clearer! But now we face another threat - coastal erosion. The marsh edges are washing away! The shrimp breeding grounds are exposed and vulnerable. We need to stabilize the shoreline!",
                choices: [
                    { text: "🧱 Build natural erosion barriers", effect: { health: +11, biodiversity: +9, pollution: 0 } },
                    { text: "🦪 Restore oyster reefs to break waves", effect: { health: +13, biodiversity: +15, pollution: 0 } },
                    { text: "🌾 Plant marsh grasses densely", effect: { health: +10, biodiversity: +13, pollution: 0 } }
                ]
            },
            {
                miraText: "The oyster reefs are thriving and the shoreline is stable! The salt marsh is looking healthy again! But one final challenge remains - the freshwater and saltwater balance is off. We need proper freshwater flow to maintain the ecosystem's perfect balance!",
                choices: [
                    { text: "💧 Restore freshwater stream flows", effect: { health: +12, biodiversity: +13, pollution: -3 } },
                    { text: "🔬 Install salinity monitoring stations", effect: { health: +10, biodiversity: +11, pollution: 0 } },
                    { text: "⚙️ Remove dam restrictions", effect: { health: +11, biodiversity: +14, pollution: -2 } }
                ]
            },
            {
                miraText: "🎉 The salt marsh is fully restored! Migrating birds are stopping here to eat and rest! Shrimp populations are abundant! Oyster reefs are bustling with life! The ocean is receiving clean, nutrient-rich water filtered by the marsh grasses! This vital ecosystem is thriving!",
                choices: []
            }
        ]
    },
    
    swamp: {
        name: 'Cypress Swamp',
        emoji: '🌲',
        description: 'Ancient forest with standing water. Home to alligators, birds, and unique plant species.',
        animals: ['🐊 Alligators', '🦅 Eagles', '🐍 Water snakes'],
        baseHealth: 50,
        baseBiodiversity: 65,
        basePollution: 50,
        missions: [
            '🌲 Stop illegal logging',
            '🐊 Protect alligator nests',
            '💧 Maintain water levels'
        ],
        chapters: [
            {
                miraText: "The ancient cypress trees have stood for hundreds of years, but illegal loggers are cutting them down for profit! These trees take 600 years to grow! Alligators, eagles, and countless species depend on this forest. We can hear the chainsaws!",
                choices: [
                    { text: "🌲 Protect the ancient cypress trees", effect: { health: +14, biodiversity: +16, pollution: 0 } },
                    { text: "✋ Stop and arrest the illegal loggers", effect: { health: +12, biodiversity: +13, pollution: 0 } },
                    { text: "💵 Buy the logging rights", effect: { health: +8, biodiversity: +7, pollution: 0 } }
                ]
            },
            {
                miraText: "The loggers are stopped! But now alligators are panicking - water levels are dropping due to drainage projects for agriculture! The nesting sites are exposed and eggs won't survive! The entire alligator population is at risk!",
                choices: [
                    { text: "💧 Restore natural water levels", effect: { health: +15, biodiversity: +14, pollution: -6 } },
                    { text: "🐊 Create artificial nesting pools", effect: { health: +12, biodiversity: +13, pollution: 0 } },
                    { text: "🚜 Allow some agricultural water use", effect: { health: -10, biodiversity: -12, pollution: +5 } }
                ]
            },
            {
                miraText: "Water levels are rising and alligators are returning! But there's another crisis - invasive plants are taking over! They're choking out native vegetation that the snakes and other species need for survival. The ecosystem balance is breaking!",
                choices: [
                    { text: "🌿 Remove invasive plants manually", effect: { health: +11, biodiversity: +14, pollution: 0 } },
                    { text: "🐢 Use native herbivores to eat invaders", effect: { health: +10, biodiversity: +15, pollution: 0 } },
                    { text: "🧪 Apply herbicide to invasive species", effect: { health: +8, biodiversity: +9, pollution: +6 } }
                ]
            },
            {
                miraText: "The native plants are returning and snakes are thriving! The forest canopy is dense again! But we need to ensure the eagle population recovers - they were hit hard when trees were cut. We need tall, sturdy nesting trees!",
                choices: [
                    { text: "🦅 Plant tall cypress for eagle nests", effect: { health: +13, biodiversity: +15, pollution: -2 } },
                    { text: "🌳 Create protected eagle nesting zones", effect: { health: +11, biodiversity: +14, pollution: 0 } },
                    { text: "🔭 Monitor eagle population recovery", effect: { health: +10, biodiversity: +12, pollution: 0 } }
                ]
            },
            {
                miraText: "🎉 The cypress swamp is fully restored! Ancient trees stand tall and proud! Alligators are nesting and hatchlings are thriving! Eagles are hunting and building nests! Water snakes are abundant! This primeval ecosystem has been saved!",
                choices: []
            }
        ]
    },
    
    bog: {
        name: 'Peat Bog',
        emoji: '🪨',
        description: 'Acidic wetland with unique plants. Stores more carbon than all forests combined!',
        animals: ['🐝 Bees', '🦅 Birds of prey', '🦌 Deer'],
        baseHealth: 58,
        baseBiodiversity: 45,
        basePollution: 42,
        missions: [
            '♻️ Protect carbon storage',
            '🌸 Restore sphagnum moss',
            '⛏️ Stop peat extraction'
        ],
        chapters: [
            {
                miraText: "Bogs are Earth's lungs! This peat bog stores more carbon than all the forests on Earth! But extraction companies want to harvest the peat for fuel, releasing all that stored carbon into the atmosphere and accelerating climate change!",
                choices: [
                    { text: "⛏️ Stop the peat extraction company", effect: { health: +16, biodiversity: +12, pollution: -10 } },
                    { text: "♻️ Protect the bog as nature's carbon store", effect: { health: +14, biodiversity: +10, pollution: -8 } },
                    { text: "💼 Allow sustainable harvesting", effect: { health: -8, biodiversity: -6, pollution: +15 } }
                ]
            },
            {
                miraText: "The sphagnum moss is dying from pollution and drainage! This moss creates the entire bog ecosystem! Without it, we lose carbon storage and the unique plants that only grow here. The moss beds are turning brown!",
                choices: [
                    { text: "🌸 Restore sphagnum moss cover", effect: { health: +13, biodiversity: +14, pollution: -9 } },
                    { text: "💧 Restore water table levels", effect: { health: +12, biodiversity: +11, pollution: -7 } },
                    { text: "🧪 Reduce acid mine drainage", effect: { health: +11, biodiversity: +12, pollution: -8 } }
                ]
            },
            {
                miraText: "The moss is recovering and water levels are rising! But unique bog plants are disappearing - they're being crowded out by invasive species that don't belong here. The special ecosystem is being lost! We must protect these rare plants!",
                choices: [
                    { text: "🌺 Replant native bog plants", effect: { health: +12, biodiversity: +15, pollution: -3 } },
                    { text: "🧹 Remove invasive plant species", effect: { health: +11, biodiversity: +14, pollution: 0 } },
                    { text: "🐝 Attract pollinating bees back", effect: { health: +10, biodiversity: +13, pollution: 0 } }
                ]
            },
            {
                miraText: "The unique bog plants are thriving again! Rare sundews and pitcher plants are visible! But the deer population has declined - they need diverse vegetation to survive. We need to support their recovery too!",
                choices: [
                    { text: "🌿 Expand vegetation diversity", effect: { health: +13, biodiversity: +15, pollution: -2 } },
                    { text: "🦌 Create protected deer refuges", effect: { health: +11, biodiversity: +12, pollution: 0 } },
                    { text: "🛡️ Build wildlife corridors", effect: { health: +12, biodiversity: +14, pollution: 0 } }
                ]
            },
            {
                miraText: "🎉 The peat bog is fully restored! Sphagnum moss is thriving! Rare bog plants are flourishing! Deer are grazing peacefully! Bees are pollinating! The carbon storage is secure! This ancient ecosystem is preserving carbon and life!",
                choices: []
            }
        ]
    },
    
    estuary: {
        name: 'Coastal Estuary',
        emoji: '🌅',
        description: 'Where river meets ocean. One of Earth\'s most productive ecosystems supporting fish nurseries and migrating whales.',
        animals: ['🐳 Whales', '🦈 Sharks', '🦑 Squid'],
        baseHealth: 52,
        baseBiodiversity: 68,
        basePollution: 48,
        missions: [
            '🐳 Protect whale migration routes',
            '🐠 Restore fish nurseries',
            '🚢 Reduce ship pollution'
        ],
        chapters: [
            {
                miraText: "This estuary is one of Earth's most productive ecosystems! Whales migrate through here twice a year, and it's a nursery for fish that feed billions of people. But massive ships are striking whales and the noise is devastating their migration!",
                choices: [
                    { text: "🐳 Create whale-safe shipping lanes", effect: { health: +13, biodiversity: +14, pollution: -8 } },
                    { text: "📢 Reduce ship noise pollution", effect: { health: +11, biodiversity: +13, pollution: -7 } },
                    { text: "🚢 Expand shipping for profit", effect: { health: -14, biodiversity: -16, pollution: +14 } }
                ]
            },
            {
                miraText: "The whales are safer now, but agricultural and industrial runoff is poisoning the water! Young fish are dying before they can escape to the ocean. The water is brown with sediment and chemicals. Squid are leaving!",
                choices: [
                    { text: "🏭 Stop industrial discharge", effect: { health: +15, biodiversity: +12, pollution: -14 } },
                    { text: "🚜 Regulate agricultural runoff", effect: { health: +12, biodiversity: +10, pollution: -10 } },
                    { text: "🪨 Build sedimentation basins", effect: { health: +11, biodiversity: +9, pollution: -8 } }
                ]
            },
            {
                miraText: "The water is clearing! Young fish are thriving! Sharks are returning to hunt! But we need to ensure the estuary maintains the perfect balance of fresh and salt water. The river is being diverted upstream and it's affecting the ecosystem!",
                choices: [
                    { text: "💧 Restore river flow patterns", effect: { health: +13, biodiversity: +15, pollution: -5 } },
                    { text: "🌊 Allow natural tidal rhythms", effect: { health: +12, biodiversity: +14, pollution: -4 } },
                    { text: "⚙️ Build water management systems", effect: { health: +11, biodiversity: +12, pollution: -3 } }
                ]
            },
            {
                miraText: "The fish nursery is booming! Young fish are developing into strong juveniles! Sharks are hunting successfully! But the whale pod is still small - we need to ensure they have enough food and migration support to recover their population!",
                choices: [
                    { text: "🐳 Increase fishing restrictions", effect: { health: +14, biodiversity: +15, pollution: -2 } },
                    { text: "🐠 Ensure abundant prey species", effect: { health: +13, biodiversity: +16, pollution: -3 } },
                    { text: "📡 Track and monitor whale health", effect: { health: +12, biodiversity: +13, pollution: 0 } }
                ]
            },
            {
                miraText: "🎉 The estuary is thriving! Whale pods are migrating safely! Young fish are abundant and healthy! Sharks are hunting! Squid are breeding! The ocean water is crystal clear! This vital nursery is producing life for all the oceans!",
                choices: []
            }
        ]
    },
    
    urban: {
        name: 'Urban Wetland',
        emoji: '🏙️',
        description: 'Polluted wetland near a city, affected by factories, waste, and urban development.',
        animals: ['🦢 Swans', '🦗 Insects', '⚠️ Struggling species'],
        baseHealth: 30,
        baseBiodiversity: 25,
        basePollution: 75,
        missions: [
            '♻️ Organize cleanup campaign',
            '🏭 Stop illegal dumping',
            '💨 Reduce pollution emissions'
        ],
        chapters: [
            {
                miraText: "This wetland is suffocating! I can hear the animals crying in pain. There's plastic everywhere - bags, bottles, foam. The water smells horrible from industrial pollution. This used to be thriving habitat! Can we save it?",
                choices: [
                    { text: "♻️ Organize a massive cleanup campaign", effect: { health: +18, biodiversity: +8, pollution: -22 } },
                    { text: "🏭 Report the factories to authorities", effect: { health: +12, biodiversity: +5, pollution: -15 } },
                    { text: "😔 The situation is hopeless", effect: { health: -12, biodiversity: -10, pollution: +20 } }
                ]
            },
            {
                miraText: "Amazing progress! Volunteers have filled 100 dumpsters with plastic! But we discovered the factories are dumping chemicals illegally at night! The water still burns the skin of fish and insects. We need to stop this dumping NOW!",
                choices: [
                    { text: "⚖️ Take legal action against polluters", effect: { health: +20, biodiversity: +10, pollution: -25 } },
                    { text: "🤝 Work with communities to protest", effect: { health: +15, biodiversity: +8, pollution: -18 } },
                    { text: "📹 Install monitoring cameras", effect: { health: +13, biodiversity: +6, pollution: -12 } }
                ]
            },
            {
                miraText: "The dumping has stopped! The factories face huge fines! But the wetland air quality is still terrible - car exhaust and factory emissions are poisoning everything. We need to reduce air pollution from the city itself!",
                choices: [
                    { text: "🚗 Promote electric vehicles", effect: { health: +12, biodiversity: +7, pollution: -16 } },
                    { text: "🏭 Push factories to clean tech", effect: { health: +14, biodiversity: +8, pollution: -18 } },
                    { text: "🌳 Plant air-filtering trees", effect: { health: +11, biodiversity: +9, pollution: -14 } }
                ]
            },
            {
                miraText: "The air is clearer! Some animals are returning! But the swans and insects are still weak - they need proper habitat restored. The wetland banks are eroded, there's no vegetation for nesting. We need to rebuild the ecosystem structure!",
                choices: [
                    { text: "🌿 Replant native wetland plants", effect: { health: +15, biodiversity: +14, pollution: -8 } },
                    { text: "🦢 Create protected nesting zones", effect: { health: +13, biodiversity: +12, pollution: -5 } },
                    { text: "🧟 Build boardwalks to prevent erosion", effect: { health: +12, biodiversity: +11, pollution: -6 } }
                ]
            },
            {
                miraText: "🎉 VICTORY! The urban wetland has been transformed! Swans are nesting! Insects are thriving! Native plants are abundant! The city has embraced conservation! This once-polluted wetland is now a symbol of hope - proving that even damaged ecosystems can recover with community action!",
                choices: []
            }
        ]
    }
};

// ============================================
// EDUCATION FACTS
// ============================================

const educationFacts = {
    freshwater: [
        "Freshwater wetlands cover only 6% of Earth's surface but support 40% of all species!",
        "Marshes filter water naturally, removing pollutants and creating clean water for downstream communities.",
        "Turtles can live for 50+ years and are indicators of ecosystem health.",
        "Cattails produce more biomass per acre than wheat crops!",
        "Fish eggs need freshwater vegetation to attach and develop safely."
    ],
    mangrove: [
        "Mangrove roots can filter salt from water - they're nature's desalination plants!",
        "80% of commercial fish species depend on mangroves as nurseries during their juvenile stage.",
        "Mangrove forests absorb 10x more carbon than other forests!",
        "A single mangrove tree can produce up to 100,000 offspring in a year.",
        "Mangrove coasts experience 90% less hurricane damage than unprotected coasts!"
    ],
    saltmarsh: [
        "Salt marshes produce more oxygen per acre than rainforests!",
        "They filter millions of gallons of pollution from rivers every single day.",
        "Migratory birds depend on salt marshes for fuel during their 3,000+ mile journeys.",
        "Salt marsh fish are worth $1 million per acre to the fishing industry annually.",
        "These ecosystems disappear 24/7 due to coastal development!"
    ],
    swamp: [
        "Cypress trees in swamps can live for over 1,500 years!",
        "Swamps contain rich biodiversity - one swamp can have more species than an entire forest.",
        "Alligators are ecosystem engineers - they create and maintain water channels.",
        "Swamps store twice as much carbon as all the forests on Earth!",
        "Swamp water filters 99% of pollutants before reaching groundwater."
    ],
    bog: [
        "Bogs store MORE carbon than all forests combined - they're carbon time bombs!",
        "Sphagnum moss grows at 1mm per year and can live for 300+ years.",
        "Bogs only cover 3% of Earth's land but store 30% of all terrestrial carbon.",
        "The water in bogs is so acidic it can preserve bodies for thousands of years!",
        "Draining a bog for peat releases as much CO2 as driving a car for 70 years."
    ],
    estuary: [
        "Estuaries are among Earth's most productive ecosystems - more productive than rainforests!",
        "They provide nurseries for 80% of marine commercial fish species.",
        "Estuaries filter pollutants from rivers before they reach the ocean.",
        "Whales migrate through estuaries during their 12,000+ mile journeys.",
        "Estuary loss costs the world economy billions in fish stocks annually."
    ],
    urban: [
        "Urban wetlands clean millions of gallons of polluted water each year for free!",
        "Cities are losing wetlands 3x faster than rural areas due to development.",
        "Wetlands help prevent flooding by absorbing excess water during storms.",
        "Urban birds rely on wetlands as rest stops during migration - critical for survival.",
        "Restoring 1 hectare of urban wetland removes tons of pollution annually!"
    ]
};

// ============================================
// SCREEN NAVIGATION
// ============================================

function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const target = document.getElementById(screenId);
    if (!target) return;
    target.classList.add('active');
    gameState.currentScreen = screenId;
}

function goToGuide() {
    const nameInput = document.getElementById('playerName');
    gameState.playerName = nameInput.value.trim() || 'Friend';
    const selected = document.querySelector('input[name="playerCharacter"]:checked');
    gameState.characterTurn = selected ? selected.value : 'mira';
    gameState.character.emoji = characters[gameState.characterTurn].emoji;
    showScreen('guideScreen');
    updateGuideDialogue();
}

function goBiomeSelect() {
    showScreen('biomeScreen');
}

function selectBiome(biomeType) {
    gameState.selectedBiome = biomeType;
    gameState.chapter = 0;
    gameState.choices = 0;
    gameState.health = biomes[biomeType].baseHealth;
    gameState.biodiversity = biomes[biomeType].baseBiodiversity;
    gameState.pollution = biomes[biomeType].basePollution;
    gameState.missionsCompleted = 0;
    gameState.totalMissions = biomes[biomeType].missions.length;
    startGameplay();
}

function startFirstLevel() {
    gameState.level = 0;
    gameState.selectedBiome = gameState.levels[0];
    gameState.chapter = 0;
    gameState.choices = 0;
    gameState.health = biomes[gameState.selectedBiome].baseHealth;
    gameState.biodiversity = biomes[gameState.selectedBiome].baseBiodiversity;
    gameState.pollution = biomes[gameState.selectedBiome].basePollution;
    gameState.missionsCompleted = 0;
    gameState.totalMissions = biomes[gameState.selectedBiome].missions.length;
    gameState.collectibles = biomes[gameState.selectedBiome].collectibles ? 
        JSON.parse(JSON.stringify(biomes[gameState.selectedBiome].collectibles)) : [];
    gameState.requiredCollectibles = [];
    startGameplay();
}

function goToNextLevel() {
    gameState.level++;
    if (gameState.level < gameState.levels.length) {
        const nextBiome = gameState.levels[gameState.level];
        gameState.selectedBiome = nextBiome;
        gameState.chapter = 0;
        gameState.choices = 0;
        gameState.health = biomes[nextBiome].baseHealth;
        gameState.biodiversity = biomes[nextBiome].baseBiodiversity;
        gameState.pollution = biomes[nextBiome].basePollution;
        gameState.missionsCompleted = 0;
        gameState.totalMissions = biomes[nextBiome].missions.length;
        gameState.collectibles = biomes[nextBiome].collectibles ? 
            JSON.parse(JSON.stringify(biomes[nextBiome].collectibles)) : [];
        gameState.requiredCollectibles = [];
        startGameplay();
    } else {
        goToResult();
    }
}

function startGameplay() {
    showScreen('gameScreen');
    updateGameDisplay();
    playBackgroundAudio(gameState.selectedBiome);
}

function playBackgroundAudio(biome) {
    // Stop any previous ambient sound sources cleanly
    if (gameState.backgroundAudio) {
        try {
            if (gameState.backgroundAudio.source) {
                gameState.backgroundAudio.source.stop();
            }
            if (gameState.backgroundAudio.lfo) {
                gameState.backgroundAudio.lfo.stop();
            }
            if (gameState.backgroundAudio.windLfo) {
                gameState.backgroundAudio.windLfo.stop();
            }
            if (gameState.backgroundAudio.birdChirpTimer) {
                clearInterval(gameState.backgroundAudio.birdChirpTimer);
            }
        } catch (err) {
            // ignore if already stopped
        }
    }

    gameState.backgroundAudio = null;

    if (!gameState.audioEnabled) return;

    // Create ambient sound for current biome
    createAmbientSound(biome);
}

function createAmbientSound(biome) {
    if (!gameState.audioEnabled) return;

    try {
        const audioContext = gameState.audioContext || new (window.AudioContext || window.webkitAudioContext)();
        gameState.audioContext = audioContext;

        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        // Noise buffer for water-like texture
        const bufferSize = audioContext.sampleRate * 2;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.15;
        }

        const source = audioContext.createBufferSource();
        source.buffer = noiseBuffer;
        source.loop = true;

        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';

        // Biome-specific water timbre
        let cutoff = 900;
        if (biome === 'freshwater') cutoff = 900;
        else if (biome === 'mangrove') cutoff = 850;
        else if (biome === 'saltmarsh') cutoff = 1000;
        else if (biome === 'swamp') cutoff = 800;
        else if (biome === 'bog') cutoff = 750;
        else if (biome === 'estuary') cutoff = 950;

        filter.frequency.setValueAtTime(cutoff, audioContext.currentTime);
        filter.Q.setValueAtTime(1.2, audioContext.currentTime);

        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.12, audioContext.currentTime);

        // Gentle dynamic swell to mimic water movement
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.08, audioContext.currentTime);
        lfoGain.gain.setValueAtTime(0.04, audioContext.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);

        // Add slow “wind/flow” motion via second LFO to the filter frequency
        const windLfo = audioContext.createOscillator();
        const windLfoGain = audioContext.createGain();
        windLfo.type = 'sine';
        windLfo.frequency.setValueAtTime(0.1, audioContext.currentTime);
        windLfoGain.gain.setValueAtTime(100, audioContext.currentTime); // modulates cutoff by +/-100 Hz

        windLfo.connect(windLfoGain);
        windLfoGain.connect(filter.frequency);

        // Occasional bird chirps layered over water
        const birdChirpTimer = setInterval(() => {
            if (!gameState.audioEnabled) return;
            const bird = audioContext.createOscillator();
            const birdGain = audioContext.createGain();
            bird.type = 'triangle';
            bird.frequency.setValueAtTime(700 + Math.random() * 400, audioContext.currentTime);
            birdGain.gain.setValueAtTime(0.0, audioContext.currentTime);
            birdGain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.04);
            birdGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.35);

            bird.connect(birdGain);
            birdGain.connect(audioContext.destination);

            bird.start();
            bird.stop(audioContext.currentTime + 0.35);
        }, 7500 + Math.random() * 5000);

        source.start();
        lfo.start();
        windLfo.start();

        gameState.backgroundAudio = { source, lfo, windLfo, gain, filter, audioContext, birdChirpTimer };
    } catch (e) {
        console.log('Audio context not available', e);
    }
}

function goToResult() {
    showScreen('resultScreen');
    calculateEnding();
    updateResultDisplay();
}

// ============================================
// GUIDE SCREEN
// ============================================

function updateGuideDialogue() {
    const guideSpeaker = document.getElementById('guideSpeaker');
    const guideText = document.getElementById('guideText');

    const activeCharacter = characters[gameState.characterTurn] || characters.mira;
    guideSpeaker.textContent = `${activeCharacter.emoji} ${activeCharacter.name}`;
    guideText.textContent = `${activeCharacter.name}: "Hi ${gameState.playerName}! I'm ${activeCharacter.name} and I hear the wetlands crying for help. Mira is with me in this mission as we track down pollution, rescue wildlife, and restore habitat. Use your keyboard to move through the level and collect waste items by touching them. Let's protect nature together!"`;

    const characterArea = document.querySelector('.character-area');
    if (characterArea) {
        characterArea.innerHTML = `
            <div class="character character-${gameState.characterTurn}">
                <div class="character-emoji">${activeCharacter.emoji}</div>
                <p class="character-name">${activeCharacter.name}</p>
            </div>
        `;
    }
}

// ============================================
// GAME SCREEN
// ============================================

function updateGameDisplay() {
    const biome = biomes[gameState.selectedBiome];
    const chapter = biome.chapters[gameState.chapter];
    
    // Set required collectibles for this chapter
    gameState.requiredCollectibles = chapter.collectiblesRequired || [];
    
    // Update header
    document.querySelector('.game-header h1').textContent = `Level ${gameState.level + 1}: ${biome.emoji} ${biome.name}`;
    
    // Update character display
    const activeCharacter = characters[gameState.characterTurn] || characters.mira;
    gameState.character.emoji = activeCharacter.emoji;
    const charDisplay = document.querySelector('.character-speaking');
    charDisplay.innerHTML = `
        <div class="char-emoji-large">${activeCharacter.emoji}</div>
        <div class="char-name-large">${activeCharacter.name}</div>
        <p class="user-role" style="font-size: 0.9em; color: #667eea; margin-top: 5px;">You (${gameState.playerName}) are supporting ${activeCharacter.name} 💪</p>
    `;
    
    // Update dialogue
    const storyText = document.getElementById('storyText');
    storyText.textContent = chapter.miraText;
    
    // Update collection area
    updateCollectionDisplay(chapter);
    
    // Update choices
    const choicesBox = document.getElementById('choicesBox');
    choicesBox.innerHTML = '';
    
    if (chapter.choices.length > 0) {
        chapter.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn panel';
            button.textContent = choice.text;
            
            // Check if choice requires collection and if collection is complete
            if (choice.requiresCollection) {
                const requiredItems = chapter.collectiblesRequired || [];
                const collectionComplete = requiredItems.every(itemId => {
                    const collectible = gameState.collectibles.find(c => c.id === itemId);
                    return collectible && collectible.count >= collectible.required;
                });
                
                if (!collectionComplete) {
                    button.classList.add('disabled-btn');
                    button.disabled = true;
                    button.textContent += ' (Collect items first!)';
                }
            }
            
            button.onclick = () => makeChoice(index, choice);
            choicesBox.appendChild(button);
        });
    } else {
        // Final chapter - Check if level is complete
        const isLevelComplete = canProgressLevel();
        const button = document.createElement('button');
        button.className = 'choice-btn panel';
        
        if (isLevelComplete) {
            if (gameState.level < gameState.levels.length - 1) {
                button.textContent = '→ Continue to Next Level';
                button.onclick = () => goToNextLevel();
            } else {
                button.textContent = '→ Continue to Results';
                button.onclick = () => goToResult();
            }
        } else {
            button.textContent = '⚠️ Complete Missions & Clean Biome';
            button.classList.add('disabled-btn');
            button.disabled = true;
        }
        choicesBox.appendChild(button);
        
        // Show level status message
        if (!isLevelComplete) {
            updateLevelProgressMessage();
        }
    }
    
    // Update status panels
    updateStatusPanels();
    updateMissionPanel();
    updateLevelProgressMessage();
    
    // Trigger random education popup
    if (Math.random() > 0.6) {
        const facts = educationFacts[gameState.selectedBiome];
        showEducationPopup(facts[Math.floor(Math.random() * facts.length)]);
    }
}

function updateCollectionDisplay(chapter) {
    const collectionArea = document.getElementById('collectionArea');
    const visualGameArea = document.getElementById('visualGameArea');
    const collectiblesContainer = document.getElementById('collectiblesContainer');
    const collectionStatus = document.getElementById('collectionStatus');
    
    if (chapter.collectiblesRequired && chapter.collectiblesRequired.length > 0) {
        // Check if there are actually items to collect
        const hasItemsToCollect = chapter.collectiblesRequired.some(itemId => {
            const collectible = gameState.collectibles.find(c => c.id === itemId);
            return collectible && collectible.count < collectible.required;
        });
        
        if (hasItemsToCollect) {
            // Show visual game area for collection
            visualGameArea.style.display = 'block';
            collectionArea.style.display = 'none';
            
            // Initialize visual game if not already active
            if (!gameState.visualGameActive) {
                initVisualGame();
            }
        } else {
            // All items already collected, hide both areas
            visualGameArea.style.display = 'none';
            collectionArea.style.display = 'none';
            if (gameState.visualGameActive) {
                stopVisualGame();
            }
            return;
        }
        
        // Update collection status
        const allCollected = chapter.collectiblesRequired.every(itemId => {
            const collectible = gameState.collectibles.find(c => c.id === itemId);
            return collectible && collectible.count >= collectible.required;
        });
        
        const statusElement = document.getElementById('visualCollectionStatus');
        if (statusElement) {
            statusElement.textContent = allCollected ? 
                '✅ All required items collected!' : 
                'Move Mira with arrow keys or WASD to collect items by touching them';
            statusElement.className = allCollected ? 'collection-status complete' : 'collection-status';
        }
        
        // Stop visual game when collection is complete
        if (allCollected && gameState.visualGameActive) {
            setTimeout(() => {
                stopVisualGame();
            }, 2000); // Show completion message for 2 seconds
        }
        
    } else {
        // Hide both collection areas
        visualGameArea.style.display = 'none';
        collectionArea.style.display = 'none';
        
        // Stop visual game if active
        if (gameState.visualGameActive) {
            stopVisualGame();
        }
    }
}

function collectItem(itemId) {
    const collectible = gameState.collectibles.find(c => c.id === itemId);
    if (collectible && collectible.count < collectible.required) {
        collectible.count++;
        
        // Update visual items - mark one as collected
        const visualItem = gameState.visualItems.find(item => item.id === itemId && !item.collected);
        if (visualItem) {
            visualItem.collected = true;
        }
        
        updateCollectionDisplay(biomes[gameState.selectedBiome].chapters[gameState.chapter]);
        
        // Update mission progress
        updateMissionPanel();
    }
}

function canProgressLevel() {
    // Check if all missions are completed AND biome is clean
    const allMissionsComplete = gameState.missionsCompleted >= gameState.totalMissions;
    const biomeClean = gameState.health >= 70 && gameState.pollution <= 30;
    return allMissionsComplete && biomeClean;
}

function updateLevelProgressMessage() {
    const messageBox = document.getElementById('levelProgressMessage');
    if (!messageBox) return;
    
    const biome = biomes[gameState.selectedBiome];
    let messages = [];
    
    if (gameState.missionsCompleted < gameState.totalMissions) {
        messages.push(`✓ Missions: ${gameState.missionsCompleted}/${gameState.totalMissions}`);
    }
    if (gameState.health < 70) {
        messages.push(`🌍 Biome Health: ${gameState.health}% (need 70%+)`);
    }
    if (gameState.pollution > 30) {
        messages.push(`☠️ Pollution: ${gameState.pollution}% (need 30% or less)`);
    }
    
    messageBox.innerHTML = messages.join('<br>');
}

function makeChoice(index, choice) {
    // Check if choice requires collection and if it's complete
    if (choice.requiresCollection) {
        const chapter = biomes[gameState.selectedBiome].chapters[gameState.chapter];
        const requiredItems = chapter.collectiblesRequired || [];
        const collectionComplete = requiredItems.every(itemId => {
            const collectible = gameState.collectibles.find(c => c.id === itemId);
            return collectible && collectible.count >= collectible.required;
        });
        
        if (!collectionComplete) {
            return; // Don't proceed if collection not complete
        }
        
        // Mark collection mission as completed
        const collectionMissionIndex = gameState.missionsCompleted;
        if (collectionMissionIndex < gameState.totalMissions) {
            gameState.missionsCompleted++;
        }
    }
    
    // Apply choice effects
    gameState.health += choice.effect.health;
    gameState.biodiversity += choice.effect.biodiversity;
    gameState.pollution += choice.effect.pollution;
    gameState.choices++;
    
    // Track missions completed (good choices that help the biome)
    if (choice.effect.health > 5 || choice.effect.biodiversity > 5) {
        if (gameState.missionsCompleted < gameState.totalMissions) {
            gameState.missionsCompleted++;
        }
    }
    
    // Clamp values
    gameState.health = Math.max(0, Math.min(100, gameState.health));
    gameState.biodiversity = Math.max(0, Math.min(100, gameState.biodiversity));
    gameState.pollution = Math.max(0, Math.min(100, gameState.pollution));
    
    // Move to next chapter
    if (gameState.chapter < biomes[gameState.selectedBiome].chapters.length - 1) {
        gameState.chapter++;
        updateGameDisplay();
    } else {
        // Show final chapter - Level completion will be validated before progression
        updateGameDisplay();
    }
}

function updateStatusPanels() {
    // Health
    document.getElementById('healthFill').style.width = gameState.health + '%';
    document.getElementById('healthValue').textContent = gameState.health + '%';
    const healthMessage = gameState.health > 60 ? '✅ Thriving' : gameState.health > 30 ? '⚠️ Struggling' : '💔 Critical';
    document.getElementById('statusMessage').textContent = healthMessage;
    
    // Biodiversity
    const bioBars = document.querySelectorAll('.biodiversity-bar .bar-fill');
    bioBars.forEach(bar => {
        bar.style.width = gameState.biodiversity + '%';
        bar.style.background = 'linear-gradient(90deg, #ff9800, #4caf50)';
    });
    const bioValue = document.getElementById('bioValue');
    if (bioValue) bioValue.textContent = gameState.biodiversity + '%';
    
    // Pollution
    const pollBars = document.querySelectorAll('.pollution-bar .bar-fill');
    pollBars.forEach(bar => {
        bar.style.width = gameState.pollution + '%';
        bar.style.background = 'linear-gradient(90deg, #4caf50, #d32f2f)';
    });
    const pollValue = document.getElementById('pollValue');
    if (pollValue) pollValue.textContent = gameState.pollution + '%';
}

function updateMissionPanel() {
    const missionList = document.getElementById('missionList');
    if (!missionList) return;
    
    missionList.innerHTML = '';
    
    const biome = biomes[gameState.selectedBiome];
    biome.missions.forEach((mission, index) => {
        const completed = index < gameState.missionsCompleted;
        
        const item = document.createElement('div');
        item.className = 'mission-item';
        item.innerHTML = `
            <span style="${completed ? 'text-decoration: line-through; color: #999;' : ''}">${mission}</span>
            <div class="mission-dot${completed ? ' completed' : ''}"></div>
        `;
        missionList.appendChild(item);
    });
}

function showEducationPopup(text) {
    let popup = document.getElementById('educationPopup');
    
    if (!popup) {
        const newPopup = document.createElement('div');
        newPopup.id = 'educationPopup';
        newPopup.className = 'education-popup panel';
        newPopup.innerHTML = `
            <button class="popup-close" onclick="closePopup()">×</button>
            <div class="popup-header">💡 Did you know?</div>
            <p id="popupText"></p>
        `;
        document.getElementById('gameScreen').appendChild(newPopup);
        popup = newPopup;
    }
    
    document.getElementById('popupText').textContent = text;
    popup.style.display = 'block';
    
    setTimeout(closePopup, 6000);
}

function closePopup() {
    const popup = document.getElementById('educationPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// ============================================
// RESULT SCREEN
// ============================================

function calculateEnding() {
    const avgScore = (gameState.health + gameState.biodiversity + (100 - gameState.pollution)) / 3;
    
    if (avgScore > 70) {
        gameState.endingType = {
            title: 'Eco Hero ✨',
            emoji: '✨',
            message: "Congratulations! You've become a true guardian of the wetlands!",
            learning: "You've learned that small actions create big changes. Every choice matters when protecting ecosystems."
        };
    } else if (avgScore > 40) {
        gameState.endingType = {
            title: 'Neutral Guardian ⚖️',
            emoji: '⚖️',
            message: "You've made progress, but the wetlands still need more care.",
            learning: "Ecosystem restoration requires consistent effort and commitment. There's always more we can do!"
        };
    } else {
        gameState.endingType = {
            title: 'Disaster Warning 💔',
            emoji: '💔',
            message: "The wetlands are in critical condition. Urgent action is needed!",
            learning: "Wetlands are incredibly resilient but can't recover if damaged too severely. Prevention is key!"
        };
    }
}

function updateResultDisplay() {
    document.querySelector('.ending-emoji').textContent = gameState.endingType.emoji;
    document.querySelector('.ending-title').textContent = gameState.endingType.title;
    document.querySelector('.ending-message').textContent = gameState.endingType.message;
    document.getElementById('learningMessage').textContent = gameState.endingType.learning;
    
    // Update stats
    const statsHtml = `
        <div class="stat-item">
            <span class="stat-label">Wetland Health</span>
            <span class="stat-value">${gameState.health}%</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Biodiversity Level</span>
            <span class="stat-value">${gameState.biodiversity}%</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Pollution Level</span>
            <span class="stat-value">${gameState.pollution}%</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Missions Completed</span>
            <span class="stat-value">${gameState.missionsCompleted}/${gameState.totalMissions}</span>
        </div>
    `;
    document.querySelector('.ending-stats').innerHTML = statsHtml;
}

function goToMenu() {
    gameState.chapter = 0;
    gameState.characterTurn = 'mira';
    showScreen('nameScreen');
}

function toggleAudio() {
    gameState.audioEnabled = !gameState.audioEnabled;
    const btn = document.getElementById('audioToggleBtn');
    if (btn) {
        btn.textContent = gameState.audioEnabled ? '🔊' : '🔇';
    }

    if (!gameState.audioEnabled) {
        if (gameState.backgroundAudio) {
            try {
                if (gameState.backgroundAudio.source) gameState.backgroundAudio.source.stop();
                if (gameState.backgroundAudio.lfo) gameState.backgroundAudio.lfo.stop();
            } catch (err) {
                // ignore
            }
            gameState.backgroundAudio = null;
        }
    } else {
        if (gameState.selectedBiome) {
            playBackgroundAudio(gameState.selectedBiome);
        }
    }
}

function restart() {
    gameState.chapter = 0;
    gameState.characterTurn = 'mira';
    gameState.choices = 0;
    gameState.level = 0;
    gameState.levelsCompleted = [false, false, false];
    gameState.playerName = '';
    if (gameState.backgroundAudio) {
        gameState.backgroundAudio.pause();
    }
    showScreen('startScreen');
}

// ============================================
// VISUAL GAME FUNCTIONS
// ============================================

function initVisualGame() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    gameState.visualGameActive = true;
    
    // Set up keyboard listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    // Initialize visual items based on required collectibles
    initializeVisualItems();
    
    // Start game loop
    gameLoop();
}

function initializeVisualItems() {
    const canvas = document.getElementById('gameCanvas');
    gameState.visualItems = [];
    
    // Reset character position
    gameState.character.x = 100;
    gameState.character.y = 200;
    
    // Get current chapter's required collectibles
    const chapter = biomes[gameState.selectedBiome].chapters[gameState.chapter];
    if (chapter.collectiblesRequired) {
        chapter.collectiblesRequired.forEach(itemId => {
            const collectible = gameState.collectibles.find(c => c.id === itemId);
            if (collectible && collectible.count < collectible.required) {
                // Create multiple instances of each item
                const remaining = collectible.required - collectible.count;
                for (let i = 0; i < remaining; i++) {
                    let x, y;
                    let attempts = 0;
                    // Make sure items don't spawn too close to the character
                    do {
                        x = Math.random() * (canvas.width - 60) + 30;
                        y = Math.random() * (canvas.height - 80) + 30;
                        attempts++;
                    } while (
                        attempts < 50 && 
                        Math.sqrt(Math.pow(x - gameState.character.x, 2) + Math.pow(y - gameState.character.y, 2)) < 80
                    );
                    
                    gameState.visualItems.push({
                        id: itemId,
                        x: x,
                        y: y,
                        width: 30,
                        height: 30,
                        emoji: collectible.emoji,
                        collected: false,
                        color: itemId === 'plastic_bottle' ? '#0066ff' :
                               itemId === 'plastic_bag' ? '#ff9900' :
                               itemId === 'fishing_line' ? '#808080' :
                               itemId === 'chemical_can' ? '#cc0000' :
                               itemId === 'wetland_seed' ? '#339933' :
                               '#333333'
                    });
                }
            }
        });
    }
}

function handleKeyDown(event) {
    if (!gameState.visualGameActive) return;
    gameState.keys[event.key.toLowerCase()] = true;
}

function handleKeyUp(event) {
    if (!gameState.visualGameActive) return;
    gameState.keys[event.key.toLowerCase()] = false;
}

function updateCharacter() {
    const canvas = document.getElementById('gameCanvas');
    let moved = false;
    
    // Handle movement
    if (gameState.keys['arrowleft'] || gameState.keys['a']) {
        gameState.character.x -= gameState.character.speed;
        moved = true;
    }
    if (gameState.keys['arrowright'] || gameState.keys['d']) {
        gameState.character.x += gameState.character.speed;
        moved = true;
    }
    if (gameState.keys['arrowup'] || gameState.keys['w']) {
        gameState.character.y -= gameState.character.speed;
        moved = true;
    }
    if (gameState.keys['arrowdown'] || gameState.keys['s']) {
        gameState.character.y += gameState.character.speed;
        moved = true;
    }
    
    // Keep character within canvas bounds
    gameState.character.x = Math.max(0, Math.min(canvas.width - gameState.character.width, gameState.character.x));
    gameState.character.y = Math.max(0, Math.min(canvas.height - gameState.character.height, gameState.character.y));
    
    // Check collisions with items
    checkItemCollisions();
}

function checkItemCollisions() {
    gameState.visualItems.forEach((item, index) => {
        if (!item.collected) {
            const charCenterX = gameState.character.x + gameState.character.width / 2;
            const charCenterY = gameState.character.y + gameState.character.height / 2;
            const itemCenterX = item.x + item.width / 2;
            const itemCenterY = item.y + item.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(charCenterX - itemCenterX, 2) + 
                Math.pow(charCenterY - itemCenterY, 2)
            );
            
            if (distance < 35) { // Collision distance
                item.collected = true;
                collectItem(item.id);
            }
        }
    });
}

function drawGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.7, '#E0F6FF');
    gradient.addColorStop(1, '#90EE90');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw some simple background elements (water, grass)
    ctx.fillStyle = '#4A90E2';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    
    // Draw items
    gameState.visualItems.forEach(item => {
        if (!item.collected) {
            const centerX = item.x + item.width / 2;
            const centerY = item.y + item.height / 2;
            
            // Fallback shape if emoji not visible
            ctx.beginPath();
            ctx.arc(centerX, centerY, item.width / 2, 0, Math.PI * 2);
            ctx.fillStyle = item.color || '#333';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
            
            // Draw emoji on top
            ctx.font = '24px "Segoe UI Emoji", "Apple Color Emoji", "Segoe UI Symbol", "Noto Color Emoji", Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';
            ctx.fillText(item.emoji, centerX, centerY);
        }
    });
    
    // Draw character
    ctx.font = '32px "Segoe UI Emoji", "Apple Color Emoji", "Segoe UI Symbol", "Noto Color Emoji", Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(gameState.character.emoji, 
                gameState.character.x + gameState.character.width / 2, 
                gameState.character.y + gameState.character.height / 2);
}

function gameLoop() {
    if (!gameState.visualGameActive) return;
    
    updateCharacter();
    drawGame();
    
    requestAnimationFrame(gameLoop);
}

function stopVisualGame() {
    gameState.visualGameActive = false;
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
    
    // Hide visual game area
    const visualGameArea = document.getElementById('visualGameArea');
    if (visualGameArea) {
        visualGameArea.style.display = 'none';
    }
}

// ...existing code...

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Set up start button
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            showScreen('nameScreen');
        });
    }
    
    // Initial screen
    showScreen('startScreen');
});
