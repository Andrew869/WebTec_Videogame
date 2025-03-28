import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class Records extends Phaser.Scene {
    constructor() {
        super('Records');
    }

    create() {
        const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
        pergamino.setDepth(0);

        this.add.text(512, 180, 'Leaderboard 🏆', {
            fontFamily: 'Alagard', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
	
        // 🔹 Recuperar y ordenar tiempos de menor a mayor
        let storedRecords = JSON.parse(localStorage.getItem('gameRecords')) || [];
        storedRecords.sort((a, b) => b.score - a.score);  // Menor a mayor (el más rápido primero)

        // 🔹 Guardar el top 10 en localStorage
        storedRecords = storedRecords.slice(0, 7);
        localStorage.setItem('gameRecords', JSON.stringify(storedRecords));

        console.log(`📊 Leaderboard ordenado:`, storedRecords);

        const leaderboardText = this.add.text(400, 250, "", {
            fontFamily: 'Alagard', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'left',
            wordWrap: { width: 600 }
        })

        let recordsText = "";

        // 🔹 Mostrar los mejores tiempos en pantalla
        for (let i = 0; i < storedRecords.length; i++) {
            recordsText += `${i + 1}. ${storedRecords[i].name.padStart(8, '_')}: ✯ ${storedRecords[i].score} ⏳ ${storedRecords[i].time}s  📅  ${storedRecords[i].date} \n`;
        }

        leaderboardText.setText(recordsText);

        // 🔹 Botón para volver al menú principal
        const MainMenu = () => {
            this.sound.play('menuSelect');
            this.scene.start('MainMenu');
        };
        createButton(this, 900, 550, 'Back', MainMenu);
    }
}
