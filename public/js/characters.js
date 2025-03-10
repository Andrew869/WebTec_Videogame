export let characters = {
    rogue: {
        charName: "rogue",
        size: { width: 10, height: 24 },
        offset: { x: 20, y: 11 },
        anims: {
            idle: {
                key: 'rogue_idle',
                defaultTextureKey: "rogue",
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 }
                ],
                frameRate: 5,
                repeat: -1
            },
            run: {
                key: 'rogue_run',
                defaultTextureKey: "rogue",
                frames: [
                    { frame: 10 },
                    { frame: 11 },
                    { frame: 12 },
                    { frame: 13 },
                    { frame: 14 },
                    { frame: 15 }
                ],
                frameRate: 10,
                repeat: -1
            },
            jump: {
                key: 'rogue_jump',
                defaultTextureKey: "rogue",
                frames: [
                    { frame: 20 },
                    { frame: 21 },
                    { frame: 22 },
                    { frame: 23 },
                    { frame: 24 }
                ],
                frameRate: 10,
                repeat: 0
            },
            rising: {
                key: 'rogue_rising',
                frames: [
                    {key: 'rogue', frame: 24 }
                ],
                frameRate: 20,
                repeat: -1
            },
            falling: {
                key: 'rogue_falling',
                defaultTextureKey: "rogue",
                frames: [
                    { frame: 25 },
                    { frame: 26 },
                    { frame: 27 }
                ],
                frameRate: 10,
                repeat: -1
            },
            landing: {
                key: 'rogue_landing',
                defaultTextureKey: "rogue",
                frames: [
                    { frame: 27 },
                    { frame: 28 },
                    { frame: 29 }
                ],
                frameRate: 20,
                repeat: 0
            },
            death: {
                key: 'rogue_death',
                defaultTextureKey: "rogue",
                frames: [
                    { frame: 90 },
                    { frame: 91 },
                    { frame: 92 },
                    { frame: 93 },
                    { frame: 94 }
                ],
                frameRate: 20,
                repeat: 0
            },
            attack: {
                key: 'rogue_attack',
                defaultTextureKey: "rogue",
                frames: [
                    { frame: 40 },
                    { frame: 41 },
                    { frame: 42 },
                    { frame: 43 },
                    { frame: 44 },
                    { frame: 45 },
                    { frame: 46 },
                    { frame: 47 },
                    { frame: 48 },
                    { frame: 49 },
                    { frame: 50 }
                ],
                frameRate: 12,
                repeat: 0
            }
        }
    },
    archer: {
        charName: "archer",
        size: { width: 10, height: 30 },
        offset: { x: 27, y: 22 },
        anims: {
            idle: {
                key: 'archer_idle',
                defaultTextureKey: "archer",
                frames: [
                    { frame: 0 },
                    { frame: 1 }
                ],
                frameRate: 3,
                repeat: -1
            },
            run: {
                key: 'archer_run',
                defaultTextureKey: "archer",
                frames: [
                    { frame: 10 },
                    { frame: 11 },
                    { frame: 12 },
                    { frame: 13 },
                    { frame: 14 },
                    { frame: 15 },
                    { frame: 16 },
                    { frame: 17 }
                ],
                frameRate: 10,
                repeat: -1
            },
            jump: {
                key: 'archer_jump',
                defaultTextureKey: "archer",
                frames: [
                    { frame: 20 },
                    { frame: 21 },
                    { frame: 22 },
                    { frame: 23 },
                    { frame: 24 }
                ],
                frameRate: 10,
                repeat: 0
            },
            rising: {
                key: 'archer_rising',
                frames: [
                    {key: 'archer', frame: 24 }
                ],
                frameRate: 20,
                repeat: -1
            },
            falling: {
                key: 'archer_falling',
                defaultTextureKey: "archer",
                frames: [
                    { frame: 25 },
                    { frame: 26 },
                    { frame: 27 }
                ],
                frameRate: 10,
                repeat: -1
            },
            landing: {
                key: 'archer_landing',
                defaultTextureKey: "archer",
                frames: [
                    { frame: 27 },
                    { frame: 28 },
                    { frame: 29 }
                ],
                frameRate: 20,
                repeat: 0
            },
            death: {
                key: 'archer_death',
                defaultTextureKey: "archer",
                frames: [
                    { frame: 30 },
                    { frame: 31 },
                    { frame: 32 },
                    { frame: 33 },
                    { frame: 34 },
                    { frame: 35 },
                    { frame: 36 },
                    { frame: 37 },
                    { frame: 38 },
                    { frame: 39 }
                ],
                frameRate: 20,
                repeat: 0
            },
            attack: {
                key: 'archer_attack',
                defaultTextureKey: "archer",
                frames: [
                    { frame: 40 },
                    { frame: 41 },
                    { frame: 42 },
                    { frame: 43 },
                    { frame: 44 },
                    { frame: 45 },
                    { frame: 46 },
                    { frame: 47 },
                    { frame: 48 },
                    { frame: 49 },
                    { frame: 50 }
                ],
                frameRate: 12,
                repeat: 0
            }
        }
    }
};