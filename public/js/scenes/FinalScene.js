import { GlobalData } from '../main.js';
import { exitGame, getCurrentDate, createButton } from '../utilities.js';
import Records from './Records.js';

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
            let time = GlobalData.timeElapsed.toFixed(2);

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

            if (!hasRecord) {
                storedRecords.push({ name: name, date: getCurrentDate(), score: score, time: time });
            }

            // 🔹 Guardar la lista actualizada en `localStorage`
            localStorage.setItem("gameRecords", JSON.stringify(storedRecords));

            // 🔹 Agregar la imagen del pergamino de fondo
            const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
            pergamino.setDepth(0); // Asegura que esté en la capa más baja

            // 🔹 Agregar el texto de "Congratulations", bajado más
            this.add.text(GlobalData.halfWidth, 170, "¡¡¡¡¡¡ Congratulations !!!!!!", {
                fontFamily: 'Alagard', fontSize: 38, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8, align: 'center'
            }).setOrigin(0.5).setDepth(1);

            // 🔹 Agregar el texto de "Final Score" bajado más
            this.add.text(GlobalData.halfWidth, 250, "🏆 Final Score 🏆", {
                fontFamily: 'Alagard', fontSize: 38, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8, align: 'center'
            }).setOrigin(0.5).setDepth(1);

            // 🔹 Agregar el texto del tiempo, bajado más
            this.add.text(GlobalData.halfWidth, GlobalData.halfHeight + 10, `⏳ ${name} - Tiempo final: ${time}s`, {
                fontFamily: 'Alagard', fontSize: 28, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8, align: 'center'
            }).setOrigin(0.5).setDepth(1);

            // 🔹 Botón para ver el leaderboard (Records)
            const leaderboardButton = () => {
                this.sound.play('menuSelect');
                exitGame('Records');
            };
            createButton(this, GlobalData.halfWidth, GlobalData.halfHeight + 90, '📊 Ver Leaderboard', leaderboardButton);

            // 🔹 Botón para volver al menú principal
            const MainMenu = () => {
                this.sound.play('menuSelect');
                exitGame('MainMenu');
            };

            createButton(this, GlobalData.halfWidth, GlobalData.halfHeight + 190, 'Back 2 Menu', MainMenu);
        }, 500);
    }
}
