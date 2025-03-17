import Preloader from './scenes/Preloader.js';
import MainMenu from './scenes/MainMenu.js';
import Game from './scenes/Game.js';
import Game2 from './scenes/Game2.js';
import UI from './scenes/UI.js';
import NameSelection from './scenes/NameSelection.js';
import CharSelection from './scenes/CharSelection.js';
import Help from './scenes/Help.js';
import About from './scenes/About.js';

import { getDefaultGlobalData } from './utilities.js';
import FinalScene from './scenes/FinalScene.js';
import Records from './scenes/Records.js';

export const GlobalData = getDefaultGlobalData();

export let game = null;

const games_container = document.getElementById('games_container');
const display_container = document.getElementById('display_container');
const game_container = document.getElementById('game_container');
const slot_container = document.getElementById('slot_container');
const phaserGame = document.getElementById('phaserGame');
const btn = document.getElementById('fullscreen-btn');
const canvas = document.getElementById('canvas');
const games = [
    {id: 0, name: "PLatform", img: ""},
    {id: 91, name: "Avoid The Germs", img: "https://phaserfiles.sfo3.digitaloceanspaces.com/phaser/v3.85.0/shots/FE3EBJNt.png"},
    {id: 100, name: "Bank Panic", img: "https://phaserfiles.sfo3.digitaloceanspaces.com/phaser/v3.85.0/shots/is3Egba5.png"},
    {id: 1141, name: "Snake", img: "https://phaserfiles.sfo3.digitaloceanspaces.com/phaser/v3.85.0/shots/WHskqe5L.png"},
    {id: 170, name: "Breakout", img: "https://phaserfiles.sfo3.digitaloceanspaces.com/phaser/v3.85.0/shots/K4mxLdxg.png"},
    {id: 1135, name: "firtgame", img: "https://phaserfiles.sfo3.digitaloceanspaces.com/phaser/v3.85.0/shots/Uc7rYApH.png"},
    {id: 208, name: "Card Memory", img: "https://phaserfiles.sfo3.digitaloceanspaces.com/phaser/v3.85.0/shots/pE7EXJwR.png"},
    {id: 283, name: "Coin Clicker", img: "https://phaserfiles.sfo3.digitaloceanspaces.com/phaser/v3.85.0/shots/avnVoeo5.png"},
    {id: 550, name: "Emoji Match", img: "https://phaserfiles.sfo3.digitaloceanspaces.com/phaser/v3.85.0/shots/1P3uFYDb.png"},
    {id: 1499, name: "Sliding Puzzle", img: "https://phaserfiles.sfo3.digitaloceanspaces.com/phaser/v3.85.0/shots/cj2PPZLy.png"},
    {id: 1511, name: "Snowmen Attack", img: "https://phaserfiles.sfo3.digitaloceanspaces.com/phaser/v3.85.0/shots/wR1GGdCQ.png"},
    {id: 12, name: "test_12", img: ""},
    {id: 13, name: "test_13", img: ""},
    {id: 14, name: "test_14", img: "https://phaserfiles.sfo3.digitaloceanspaces.com/phaser/v3.85.0/shots/1kxRvhWV.png"}
    // 0, 91, 100, 1141, 170, 1135, 208, 283, 550, 1499, 1511, 12, 13, 14
];

btn.addEventListener('click', () => {
    const elem = display_container;

    if (!document.fullscreenElement) {
        elem.requestFullscreen();
        // display_container.classList.add('fullscreen');
    } else {
        document.exitFullscreen();
        // display_container.classList.remove('fullscreen');
    }
});

games.forEach(game => {
    const gameElement = document.createElement('div');
    gameElement.id = `g_${game.id}`;
    gameElement.classList.add('game');
    gameElement.setAttribute('gameid', game.id);
    gameElement.textContent = game.name;
    gameElement.draggable = true;
    gameElement.style.background = `url('${game.img}')`;
    gameElement.style.backgroundSize = 'contain';

    gameElement.addEventListener('dragstart', drag);
    gameElement.addEventListener('dragend', dragEnd);

    games_container.appendChild(gameElement);
});

// for (let i = 0; i <= 99; i++) {
//     const gameElement = document.createElement('div');
//     gameElement.id = `g_${i}`;
//     gameElement.classList.add('game');
//     gameElement.setAttribute('gameid', i);
//     gameElement.textContent = `Game ${i}`;
//     gameElement.draggable = true;

//     gameElement.addEventListener('dragstart', drag);
//     gameElement.addEventListener('dragend', dragEnd);

//     games_container.appendChild(gameElement);
// }

slot_container.addEventListener('drop', drop);
slot_container.addEventListener('dragover', allowDrop);

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: GlobalData.width,
    height: GlobalData.height,
    parent: 'game_container',
    // backgroundColor: '#7693B3',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        MainMenu,
        NameSelection,
        CharSelection,
        Help,
        About,
        Game,
        Game2,
        UI,
        FinalScene,
        Records
    ]
};

function allowDrop(ev) {
    ev.preventDefault();
    // console.log(ev.target);
}

function drag(ev) {
    const element = ev.target;
    const parent = element.parentNode;
    ev.dataTransfer.setData("text", element.id);
    element.classList.add("selected");
}

function dragEnd(ev) {
    const element = ev.target;
    element.classList.remove("selected");
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const element = document.getElementById(data);
    const parent = ev.currentTarget;

    if (parent.firstElementChild.tagName === "CANVAS")
        parent.removeChild(canvas);
    // parent.firstElementChild.remove();


    element.classList.remove("selected");
    if (parent !== element && parent.classList.contains("empty")) {
        parent.appendChild(element);
        parent.classList.remove("empty");
    }
    else if (parent !== element && !parent.classList.contains("empty")) {
        const element_2 = parent.firstElementChild;
        const parent_2 = element.parentNode;
        parent.appendChild(element);
        parent_2.appendChild(element_2);
        parent_2.classList.remove("empty");
    }

    const id = element.getAttribute('gameid');

    if (id > 0) {
        phaserGame.src = `https://phaserexamples.com/examples-play-frame/phaser/${id}/main.js`;
        phaserGame.style.display = 'block';
        game_container.style.display = "none";
        if (game) {
            game.destroy(true);
            console.log(game);
        }
    }
    else {
        game_container.style.display = "block";
        phaserGame.style.display = 'none';
        game = new Phaser.Game(config);
    }
}

// export const game = new Phaser.Game(config);

const ctx = canvas.getContext('2d');

ctx.fillStyle = '#fff';
ctx.font = '24px system-ui';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

ctx.fillText('Drag & drop a cartridge here', canvas.width / 2, canvas.height / 4);

function drawArrow() {
    const startX = canvas.width / 2;
    const startY = canvas.height / 2 - 30;
    const endX = canvas.width / 2;
    const endY = canvas.height / 2 + 30;

    // Dibujar la línea de la flecha
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;  // Aumentar el grosor de la línea
    ctx.stroke();

    // Dibujar la punta de la flecha más ancha
    const arrowWidth = 20;  // Ancho de la punta de la flecha
    ctx.beginPath();
    ctx.moveTo(endX - arrowWidth / 2, endY - 10); // Flecha izquierda
    ctx.lineTo(endX + arrowWidth / 2, endY - 10); // Flecha derecha
    ctx.lineTo(endX, endY); // Flecha hacia abajo
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();
}

drawArrow();