import { GlobalData } from '../main.js';

export default class FinalScene extends Phaser.Scene {
    constructor() {
        super({ key: "OverScene" });
    }

    create() {
        this.sound.play('gameOver');
        setTimeout(() => {

            let score = GlobalData.score;
            let currentTime = GlobalData.timeElapsed.toFixed(2)

            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Los meses empiezan desde 0
            const day = date.getDate();
            const dateText = `${year}-${month}-${day}`;

            // 🔹 Obtener el nombre del jugador
            let playerName = GlobalData.charName || "Jugador";

            // 🔹 Recuperar la lista de registros previos
            let storedRecords = JSON.parse(localStorage.getItem('gameRecords')) || [];
            console.log(storedRecords);
            
            // 🔹 Agregar el nuevo tiempo con el nombre del jugador
            storedRecords.push({ playerName: playerName, date: dateText, score: score, time: currentTime });

            // 🔹 Guardar la lista actualizada en `localStorage`
            localStorage.setItem("gameRecords", JSON.stringify(storedRecords));

            // 🔹 Guardar el tiempo final para visualizarlo en la pantalla final
            localStorage.setItem("finalTime", currentTime);

            // console.log(`✅ Tiempo final guardado correctamente: ${currentTime} segundos`);
            // console.log(`📊 Lista de tiempos actualizada:`, storedRecords);

            // 🔹 Mostrar en pantalla el tiempo correctamente
            this.add.text(400, 150, "🏆 Final Score 🏆", {
                fontFamily: 'Arial',
                fontSize: '40px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6
            }).setOrigin(0.5);

            this.add.text(400, 250, `⏳ ${playerName} - Tiempo final: ${currentTime}s`, {
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
                this.sound.play('menuSelect');
                this.scene.start("MainMenu");
            });

        }, 500);
    }
}
