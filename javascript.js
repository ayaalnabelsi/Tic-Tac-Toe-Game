const spelers = ['O', 'X'];
let huidigeSpelerIndex = 0;
let spelBord = ['', '', '', '', '', '', '', '', ''];

function maakVierkantElement(vierkantNummer) {
    const vierkantElement = document.createElement('div');
    vierkantElement.classList.add('game-square');

    vierkantElement.onclick = function () {
        if (spelBord[vierkantNummer] === '') {
            this.textContent = spelers[huidigeSpelerIndex];
            spelBord[vierkantNummer] = spelers[huidigeSpelerIndex];
            switchSpeler();
            controleerBord();
        }
    };
    return vierkantElement;
}

function switchSpeler() {
    if (huidigeSpelerIndex === 0) {
        huidigeSpelerIndex = 1;
    } else {
        huidigeSpelerIndex = 0;
    }
}

function controleerBord() {
    const winnendeToestand = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combinatie of winnendeToestand) {
        const [positie1, positie2, positie3] = combinatie;
        if (spelBord[positie1] && spelBord[positie1] === spelBord[positie2] && spelBord[positie1] === spelBord[positie3]) {
            completeerSpel(`${spelBord[positie1]} wint!`);
            return;
        }
    }

    if (spelBord.every(vierkant => vierkant !== '')) {
        completeerSpel("Het is een gelijkspel!");
    }
}

function completeerSpel(boodschap) {
    const boodschapElement = document.getElementById('boodschap');
    boodschapElement.textContent = boodschap;

    const overlayElement = document.getElementById('overlay');
    overlayElement.style.display = 'block';
}

function resetSpel() {
    spelBord = ['', '', '', '', '', '', '', '', ''];
    const overlayElement = document.getElementById('overlay');
    overlayElement.style.display = 'none';

    const spelBordElement = document.getElementById('game-board');
    spelBordElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const vierkantElement = maakVierkantElement(i);
        spelBordElement.appendChild(vierkantElement);
    }

    huidigeSpelerIndex = Math.floor(Math.random() * 2);
}

function startSpel() {
    resetSpel();
    setInterval(controleerBord, 1000);

    const audio = document.getElementById('backgroundMusic');
    audio.play();
}

startSpel();

