export const enemies = {
    eye: {
        charName: 'eye',
        size: { width: 32, height: 32 },
        offset: { x: 0, y: 0 },
        anims: {
            flight: {
                key: 'eye_flight',
                defaultKey: 'eye_flight', 
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                    { frame: 4 },
                    { frame: 5 },
                    { frame: 6 },
                    { frame: 7 },
                ],
                frameRate: 10,
                repeat: -1
            },
            attack: {
                key: 'eye_attack',
                defaultKey: 'eye_attack', 
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                    { frame: 4 },
                    { frame: 5 },
                    { frame: 6 },
                    { frame: 7 },
                ],
                frameRate: 12,
                repeat: 0
            },
            hit: {
                key: 'eye_take_hit',
                defaultKey: 'eye_take_hit', 
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                ],
                frameRate: 10,
                repeat: 0
            },
            death: {
                key: 'eye_death',
                defaultKey: 'eye_death',
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                ],
                frameRate: 10,
                repeat: 0
            }
        }
    },
    skeleton: {
        charName: 'skeleton',
        size: { width: 32, height: 32 },
        offset: { x: 0, y: 0 },
        anims: {
            idle: {
                key: 'skeleton_idle',
                defaultKey: 'skeleton_idle', 
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                ],
                frameRate: 6,
                repeat: -1
            },
            move: {
                key: 'skeleton_walk',
                defaultKey: 'skeleton_walk', 
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                ],
                frameRate: 10,
                repeat: -1
            },
            attack: {
                key: 'skeleton_attack',
                defaultKey: 'skeleton_attack', 
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                    { frame: 4 },
                    { frame: 5 },
                    { frame: 6 },
                    { frame: 7 },
                ],
                frameRate: 12,
                repeat: 0
            },
            hit: {
                key: 'skeleton_take_hit',
                defaultKey: 'skeleton_take_hit',
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                ],
                frameRate: 10,
                repeat: 0
            },
            death: {
                key: 'skeleton_death',
                defaultKey: 'skeleton_death',
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                ],
                frameRate: 10,
                repeat: 0
            }
        }
    },
    goblin: {
        charName: 'goblin',
        size: { width: 32, height: 32 },
        offset: { x: 0, y: 0 },
        anims: {
            idle: {
                key: 'goblin_idle',
                defaultKey: 'goblin_idle',
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                ],
                frameRate: 6,
                repeat: -1
            },
            move: {
                key: 'goblin_run',
                defaultKey: 'goblin_run',
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                    { frame: 4 },
                    { frame: 5 },
                    { frame: 6 },
                    { frame: 7 },
                ],
                frameRate: 10,
                repeat: -1
            },
            attack: {
                key: 'goblin_attack',
                defaultKey: 'goblin_attack',
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                    { frame: 4 },
                    { frame: 5 },
                    { frame: 6 },
                    { frame: 7 },
                ],
                frameRate: 12,
                repeat: 0
            },
            hit: {
                key: 'goblin_take_hit',
                defaultKey: 'goblin_take_hit',
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                ],
                frameRate: 10,
                repeat: 0
            },
            death: {
                key: 'goblin_death',
                defaultKey: 'goblin_death',
                frames: [
                    { frame: 0 },
                    { frame: 1 },
                    { frame: 2 },
                    { frame: 3 },
                ],
                frameRate: 10,
                repeat: 0
            }
        }
    },
    sickle: {
        charName: 'sickle',
        size: { width: 32, height: 32 },
        offset: { x: 0, y: 0 },
        anims: {
            idle: {
                key: 'sickle_idle',
                defaultKey: 'sickle', 
                frames: [
                    { frame: 11 },
                    { frame: 12 },
                    { frame: 13 },
                    { frame: 14 },
                    { frame: 15 },
                ],
                frameRate: 6,
                repeat: -1
            },
            move: {
                key: 'sickle_run',
                defaultKey: 'sickle',
                frames: [
                    { frame: 6 },
                    { frame: 7 },
                    { frame: 8 },
                    { frame: 9 },
                    { frame: 10 },
                ],
                frameRate: 10,
                repeat: -1
            },
            attack: {
                key: 'sickle_attack',
                defaultKey: 'sickle',
                frames: [
                    { frame: 23 },
                    { frame: 24 },
                    { frame: 25 },
                    { frame: 26 },
                ],
                frameRate: 12,
                repeat: 0
            },
            hurt: {
                key: 'sickle_take_hit',
                defaultKey: 'sickle',
                frames: [
                    { frame: 21 },
                    { frame: 22 },
                ],
                frameRate: 10,
                repeat: 0
            },
            death: {
                key: 'sickle_death',
                defaultKey: 'sickle',
                frames: [
                    { frame: 0 },
                    { frame: 16 },
                ],
                frameRate: 10,
                repeat: 0
            }
        }
    }
};