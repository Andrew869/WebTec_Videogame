import { GlobalData } from '../main.js';
import { socket } from '../socket.js';
import { characters } from '../characters.js';
import { SendPos, CreateStartZone, CreatePlatform, CreateWall, CreatePortal } from '../utilities.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });

        this.keyObjects;

        this.diffHeight = 720 - GlobalData.mapSizeY

<<<<<<< HEAD
        this.tiempoTranscurrido = 0;
=======
        this.startTime = 0;  // Variable para almacenar el tiempo de inicio

        this.levelCompleted = false; // 🔹 Evita completar el nivel varias veces

        this.elapsedSeconds = 0;  // 🔹 Contador en segundos

>>>>>>> b3a97e2 (los records en base a tiempo funcionando en el localstorage)
    }

    preload() {
    }

    create() {
        console.log("🎮 Juego iniciado...");

        // 🔹 INICIAR TEMPORIZADOR
        this.startTimer();

        // 🔹 CREAR EL PORTAL FINAL (CON DELAY PARA ASEGURAR GUARDADO)
        this.time.delayedCall(500, () => {
            this.finalPortal = this.physics.add.staticSprite(110, 200, 'portal').setOrigin(0.5, 1).setScale(4);
            this.finalPortal.body.immovable = true;

            console.log("✅ Portal final creado en:", this.finalPortal.x, this.finalPortal.y);

            // 🔹 DETECTAR CUANDO EL JUGADOR LLEGA AL PORTAL
            this.physics.add.overlap(GlobalData.player, this.finalPortal, this.completeLevel, null, this);
        });

        /*console.log("🎮 Juego iniciado...");

        // 🔹 INICIAR EL TEMPORIZADOR
        this.timerEvent = this.time.addEvent({
            delay: 1000,  // 🔹 Suma cada 1 segundo
            callback: () => {
                this.elapsedSeconds++;
                localStorage.setItem("currentTime", this.elapsedSeconds);  // 🔹 Guardar cada segundo
                console.log(`⏳ Tiempo transcurrido: ${this.elapsedSeconds}s`);
            },  
            callbackScope: this,
            loop: true  // 🔹 Se repite indefinidamente
        });

         // 🔹 ESPERAMOS UN PEQUEÑO RETRASO ANTES DE CREAR EL PORTAL
         this.time.delayedCall(500, () => {
            console.log("✅ Guardando tiempo antes de crear el portal...");
            
            // 🔹 GUARDAR TIEMPO FINAL EN `localStorage`
            localStorage.setItem("finalTime", this.elapsedSeconds);
            console.log(`🟢 Tiempo FINAL guardado correctamente: ${this.elapsedSeconds} segundos`);

            // 🔹 CREAR EL PORTAL FINAL (CON DELAY PARA ASEGURAR GUARDADO)
            this.finalPortal = this.physics.add.staticSprite(110, 200, 'portal').setOrigin(0.5, 1).setScale(4);
            this.finalPortal.body.immovable = true;

            // 🔹 DETECTAR CUANDO EL JUGADOR LLEGA AL PORTAL
            this.physics.add.overlap(GlobalData.player, this.finalPortal, this.completeLevel, null, this);
        }, [], this);*/
       


        /*this.timerEvent = this.time.addEvent({
            delay: 1000,  // 🔹 Suma cada 1 segundo
            callback: () => {
                this.elapsedSeconds++;
                localStorage.setItem("currentTime", this.elapsedSeconds);  // 🔹 Guardar cada segundo
                console.log(`⏳ Tiempo transcurrido: ${this.elapsedSeconds}s`);
            },
            callbackScope: this,
            loop: true  // 🔹 Se repite indefinidamente
        });*/

        GlobalData.currGameScene = this;
        GlobalData.currLvl = 1;

        this.textoCronometro = this.add.text(10, 10, 'Tiempo: 0.00', { fontSize: '32px', fill: '#fff' });

        switch (GlobalData.charName) {
            case "archer":
                GlobalData.currChar = characters.archer;
                break;
            case "rogue":
                GlobalData.currChar = characters.rogue;
                break;
        }

        
        


        this.physics.world.setBounds(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY);

        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer0').setOrigin(0, 0).setScrollFactor(0, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer1').setOrigin(0, 0).setScrollFactor(0, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer2').setOrigin(0, 0).setScrollFactor(0.1, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer3').setOrigin(0, 0).setScrollFactor(0.2, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer4').setOrigin(0, 0).setScrollFactor(0.3, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer5').setOrigin(0, 0).setScrollFactor(0.4, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer6').setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer7').setOrigin(0, 0).setScrollFactor(0.6, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer8').setOrigin(0, 0).setScrollFactor(0.7, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer9').setOrigin(0, 0).setScrollFactor(0.8, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer10').setOrigin(0, 0).setScrollFactor(1, 1);
        this.add.tileSprite(-120, this.diffHeight, GlobalData.mapSizeX * 1.2, GlobalData.mapSizeY, 'lvl_1_layer11').setOrigin(0, 0).setScrollFactor(1.2, 1).setDepth(3);

        GlobalData.ground = this.physics.add.staticBody(0, this.scale.height - 58, GlobalData.mapSizeX, 10);

// 🔹 Verificar si this.startTime ya fue inicializado
if (!this.startTime || this.startTime === 0) {
    this.startTime = this.time.now;  // Guardar el tiempo de inicio del nivel
    console.log("⏳ Temporizador iniciado correctamente:", this.startTime);
}

        // 🔹 Corregir el bucle for para imprimir correctamente el tiempo
        for (let i = 0; i < 100; i++) {
            console.log(`⏳ Temporizador iniciado [Iteración ${i + 1}]: ${this.startTime}`);
        }


        CreateStartZone(this, 410, 0, 3, 20);
        // CreateWall(this, 410, 0, 20 * 16);

<<<<<<< HEAD

        CreatePlatform(this, 60, 64, 300);
=======
        CreatePlatform(this, 60, 60, 300);
>>>>>>> b3a97e2 (los records en base a tiempo funcionando en el localstorage)
        CreatePlatform(this, 480, 80, 100);
    
        CreatePortal(this, "", 80, 250, 8, true);
<<<<<<< HEAD
        CreatePortal(this, "Game2", 500, 200, 8, false);
=======
        CreatePortal(this, "Level2", 500, 200, 8, false);
//        CreatePortal(this, "Final", 110, 200, 8, false);

this.finalPortal = CreatePortal(this, "Final", 900, 200, 8, false);

if (!this.finalPortal) {
    console.error("❌ ERROR: CreatePortal() no devolvió un objeto válido. Creando portal manualmente.");
    
    // 🔹 Crear un portal manualmente si CreatePortal() falla
    this.finalPortal = this.physics.add.staticSprite(900, 200, 'portal')
        .setOrigin(0.5, 1)
        .setScale(4)
        .setDepth(2)
        .refreshBody();
}

// 🔹 Asegurar que el portal no tenga gravedad y sea fijo
this.finalPortal.body.immovable = true;
console.log("✅ Portal final creado en:", this.finalPortal.x, this.finalPortal.y);




        // this.initialPortal = this.physics.add.sprite(300, translateY(0), 'portal')
        // .setOrigin(0.5, 1)
        // .setSize(3, 15)
        // .setOffset(18, 10)
        // .setScale(4)
        // .setDepth(2)
        // .setImmovable(true)
        // .refreshBody();

        // this.finalPortal = this.physics.add.sprite(GlobalData.mapSizeX - 300, translateY(40), 'portal')
        //     .setOrigin(0.5, 1)
        //     .setScale(4)
        //     .setDepth(2)
        //     .refreshBody();
        // this.finalPortal.body.setSize(50, 70);
        // this.finalPortal.body.setOffset(20, 30);

        // this.initialPortal.body.allowGravity = false;
        // this.finalPortal.body.allowGravity = false;

        // this.physics.add.collider(this.initialPortal, this.ground);
        // this.physics.add.collider(this.finalPortal, this.ground);

        

        // this.initialPortal.anims.play('portal_anim', true);
        // this.finalPortal.anims.play('portal_anim', true);

        // this.physics.add.overlap(this.player, this.finalPortal, this.completeLevel, null, this);

        // this.physics.add.collider(this.player, this.platforms);
>>>>>>> b3a97e2 (los records en base a tiempo funcionando en el localstorage)

        this.keyObjects = this.input.keyboard.addKeys({
            up: "SPACE",
            down: "S",
            left: "A",
            right: "D",
            hability_1: "ONE",
            hability_2: "TWO",
            hability_3: "THREE"
        }); // keyObjects.up, keyObjects.down, keyObjects.left, keyObjects.right

        // Música
        GlobalData.backgroundMusic = this.sound.add('bg_m_lvl_1', { loop: true });
        GlobalData.backgroundMusic.play();

        socket.connect();
        socket.emit("LevelReady", {lvl: 1 ,charName: GlobalData.charName});
    }

    update() {
        if (!GlobalData.player) {
            return;
        }

        if (GlobalData.playerReady && !this.physics.world.overlap(GlobalData.player, GlobalData.start_line) && !GlobalData.levelStarted) {
            GlobalData.playerReady = false;
            socket.emit("playerReady", {isReady : false});
        }

        const playerData = GlobalData.playerData;
        const vel = GlobalData.player.body.velocity;

        playerData.prevOnGround = playerData.isOnGround;
        playerData.isOnGround = GlobalData.player.body.touching.down;

        if (this.keyObjects.right.isDown && !playerData.isAttacking) {
            GlobalData.player.setVelocityX(playerData.currentSpeed);
            GlobalData.player.setFlipX(false);
            socket.emit("playerVelX", { playerVelX: playerData.currentSpeed });
        }
        else if (this.keyObjects.left.isDown && !playerData.isAttacking) {
            GlobalData.player.setVelocityX(-playerData.currentSpeed);
            GlobalData.player.setFlipX(true);
            socket.emit("playerVelX", { playerVelX: -playerData.currentSpeed });
            // console.log("moveLeft");
        }
        else if (playerData.isOnGround && (vel.x !== 0)) {
            GlobalData.player.setVelocityX(0);
            socket.emit("playerVelX", { playerVelX: 0});
            SendPos();
        }

        if (!this.levelCompleted && this.finalPortal && this.physics.world.overlap(GlobalData.player, this.finalPortal)) {
            console.log("🎯 Jugador tocó el portal final. Guardando tiempo...");
            this.completeLevel();
        }
        
        // if (Phaser.Input.Keyboard.JustUp(this.keyObjects.right) || Phaser.Input.Keyboard.JustUp(this.keyObjects.left)) {
        //     socket.emit("playerVelX", { playerVelX: 0});
        // }

        if (playerData.isOnGround) {
            if ((this.keyObjects.up.isDown && !playerData.isAttacking)) {
                // socket.emit("playerVelY", { playerVelY: -300 });
                socket.emit("playerAction", { playerAction: "jump" });
                GlobalData.player.setVelocityY(-playerData.currentJumpForce);
                // console.log("jump");
                playerData.isJumping = true;
                GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'jump', true);
                SendPos();
                GlobalData.player.on('animationcomplete', (animation, frame) => {
                    playerData.isJumping = false;
                });
            }
            else if (this.keyObjects.hability_1.isDown && !playerData.isAttacking) {
                socket.emit("playerAction", { playerAction: "attack" });
                // console.log("attack");
                playerData.isAttacking = true;
                GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'attack', true);
                SendPos();
                GlobalData.player.on('animationcomplete', (animation, frame) => {
                    playerData.isAttacking = false;
                });
            }
            else if (playerData.prevOnGround !== playerData.isOnGround) {
                // socket.emit("playerEvent", { playerEvent: "landing" });
                // console.log("landing");
                playerData.isLanding = true;
                GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'landing', true);
                SendPos();
                GlobalData.player.on('animationcomplete', (animation, frame) => {
                    playerData.isLanding = false;
                });
            }
        }

        let movingOnAir = vel.y !== 0 && !playerData.isOnGround

        if (!playerData.isAttacking && !playerData.isJumping && !playerData.isLanding) {
            if (!movingOnAir) {
                if (!vel.x)
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'idle', true);
                else {
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'run', true);
                }
            }
            else {
                if (vel.y < 0)
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'rising', true);
                else
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'falling', true);
            }
        }

        for (let playerId in GlobalData.playersData) {
            const player = GlobalData.players[playerId];
            const playerData = GlobalData.playersData[playerId];
            let velX = player.body.velocity.x;
            let velY = player.body.velocity.y;
            
            playerData.prevOnGround = playerData.isOnGround;  
            playerData.isOnGround = player.body.touching.down;

            if (playerData.prevOnGround !== playerData.isOnGround) {
                playerData.isLanding = true;
                player.anims.play(player.texture.key + '_' + 'landing', true);
                player.on('animationcomplete', (animation, frame) => {
                    playerData.isLanding = false;
                });
            }

            let movingOnAir = velY !== 0 && !playerData.isOnGround;

            if (!playerData.isAttacking && !playerData.isJumping && !playerData.isLanding) {
                if (!movingOnAir) {
                    if (!velX)
                        player.anims.play(player.texture.key + '_' + 'idle', true);
                    else {
                        player.anims.play(player.texture.key + '_' + 'run', true);
                    }
                }
                else {
                    if (velY < 0)
                        player.anims.play(player.texture.key + '_' + 'rising', true);
                    else
                        player.anims.play(player.texture.key + '_' + 'falling', true);
                }
            }
        }
<<<<<<< HEAD
=======

        // if (!this.gameOver && !this.isPaused) {
        //     this.movePlatform(this.movingPlatform, 500, 200, 300, 1.5);
        // }
    
>>>>>>> b3a97e2 (los records en base a tiempo funcionando en el localstorage)
    }

    // 🔹 FUNCIÓN PARA OBTENER EL TIEMPO ACTUAL
getElapsedSeconds() {
    return this.elapsedSeconds;
}


startTimer() {
    // 🔹 TEMPORIZADOR QUE SE EJECUTA HASTA QUE `levelCompleted` SEA `true`
    this.time.addEvent({
        delay: 1000,
        callback: () => {
            if (!this.levelCompleted) {
                this.elapsedSeconds++;
                localStorage.setItem("currentTime", this.elapsedSeconds);  // 🔹 Guardar cada segundo
                console.log(`⏳ Tiempo transcurrido: ${this.elapsedSeconds}s`);
            }
        },
        callbackScope: this,
        loop: true
    });
}

completeLevel() {
    console.log("✅ Jugador tocó el portal final. Guardando tiempo...");

    if (this.levelCompleted) return;
    this.levelCompleted = true;

    // 🔹 FORZAR que `finalTime` sea el `currentTime`
    let finalTime = localStorage.getItem("currentTime");

    finalTime = finalTime ? parseInt(finalTime, 10) : 0;

    console.log(`🟢 Tiempo FINAL calculado: ${finalTime} segundos`);

    // 🔹 Guardar `finalTime` en `localStorage` por seguridad
    localStorage.setItem("finalTime", finalTime);

    // 🔹 Cambiar a `FinalScene` PASANDO el tiempo directamente
    this.scene.start("Final", { finalTime });
}






}
