import { GlobalData } from '../main.js';
import { exitGame, getCurrentDate } from '../utilities.js';

export default class FinalScene extends Phaser.Scene {
    constructor() {
        super({ key: "FinalScene" });
    }

    create() {
        GlobalData.currGameScene = this;
        this.sound.play('gameClear');
        setTimeout(() => {

            let name = GlobalData.playerName;
            let score = GlobalData.score;
            let time = GlobalData.timeElapsed.toFixed(2)

            // 🔹 Recuperar la lista de registros previos
            let storedRecords = JSON.parse(localStorage.getItem('gameRecords')) || [];

            let hasRecord = false;

            for (let i = 0; i < storedRecords.length; i++) {
                const Record = storedRecords[i];
                if (Record.name === name) {
                    hasRecord = true;
                    if (score > Record.score) Record.score = score;
                    break;
                }
            }

            if(!hasRecord) {
                storedRecords.push({ name: name, date: getCurrentDate(), score: score, time: time });
            }
            
            // 🔹 Guardar la lista actualizada en `localStorage`
            localStorage.setItem("gameRecords", JSON.stringify(storedRecords));

            // 🔹 Mostrar en pantalla el tiempo correctamente
            this.add.text(GlobalData.halfWidth, 150, "🏆 Final Score 🏆", {
                fontFamily: 'Arial',
                fontSize: '40px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6
            })

            this.add.text(400, 250, `⏳ ${name} - Tiempo final: ${time}s`, {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#00ff00'
            }).setOrigin(0.5);

            // 🔹 Botón para ver el leaderboard (Records)
            let leaderboardButton = this.add.text(400, 350, "📊 Ver Leaderboard", {
                fontFamily: 'Arial',
                fontSize: '28px',
                color: '#0000ff',
                backgroundColor: '#ffffff',
                padding: { x: 10, y: 5 }
            }).setOrigin(0.5).setInteractive();

            leaderboardButton.on("pointerdown", () => {
                exitGame('Records');
                this.sound.play('menuSelect');
                this.scene.start("Records");
            });

            // 🔹 Botón para volver al menú principal
            let menuButton = this.add.text(400, 450, "Back 2 Menu", {
                fontFamily: 'Arial',
                fontSize: '28px',
                color: '#ff0000',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            }).setOrigin(0.5).setInteractive();

            menuButton.on("pointerdown", () => {
                exitGame('MainMenu');
                this.sound.play('menuSelect');
                this.scene.start("MainMenu");
            });

        }, 500);
    }
}
