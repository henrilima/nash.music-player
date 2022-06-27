let audioArrays = [];
let songs = [{
        name: 'Looking at Me',
        artist: 'Sabrina Carpenter',
        image: './images/sabrina.jpg',
        audio: './musics/SabrinaCarpenter.mp3'
    },
    {
        name: 'Princesses Don\'t Cry',
        artist: 'Carys',
        image: './images/carys.jpg',
        audio: './musics/Carys.mp3'
    },
    {
        name: 'Butterflies',
        artist: 'Zendaya',
        image: './images/zendaya.jpg',
        audio: './musics/Zendaya.mp3'
    },
    {
        name: 'Tears of Gold',
        artist: 'Faouzia',
        image: './images/faouzia.jpg',
        audio: './musics/Faouzia.mp3'
    },
    {
        name: 'Good in Goodbye',
        artist: 'Madison Beer',
        image: './images/madison.jpg',
        audio: './musics/Madison.mp3'
    },
];
var navDetails = document.getElementById('nav-details');
var songPercent = 0;
var thisPercent = 0;
var song = false;
var playing = {};

function started() {
    song = true;
    document.getElementById('play-button').classList.remove('fa-play');
    document.getElementById('play-button').classList.add('fa-pause');

    setTimeout(() => {
        navDetails.style.animation = 'appears 2s ease-in-out forwards';
        document.getElementById('nav-image').src = audioArrays[0].image;
        document.getElementById('nav-music').innerText = audioArrays[0].name;
        document.getElementById('nav-artist').innerText = audioArrays[0].artist;
    }, 3);
};

function finished() {
    navDetails.style.animation = 'reverse-appears 1s ease-in-out forwards';
    document.getElementById('play-button').classList.add('fa-play');
    document.getElementById('play-button').classList.remove('fa-pause');

    document.getElementById('nav-image').src = '';
    document.getElementById('nav-music').innerText = '';
    document.getElementById('nav-artist').innerText = '';
};


function play(id = null) {
    if (id !== null && !isNaN(id)) {
        audioArrays.push(songs[id]);
    };

    if (song === true) return;
    if (!audioArrays[0]) return;
    lastPlayed = audioArrays[0];

    var mySound = new buzz.sound(audioArrays[0].audio);
    playing = mySound;
    mySound.play();
    setTimeout(() => {
        thisPercent = mySound.getDuration();
    }, 2000);

    var intervalo = setInterval(() => {
        songPercent = songPercent + 1;
        if (songPercent > thisPercent) {
            songPercent = 0;
            thisPercent = 0;
        };
        document.getElementById('countdown').innerText = `${toTimer(songPercent)} / ${toTimer(thisPercent)}`;
    }, 1000);

    started();
    mySound.bind("ended", () => {
        audioArrays = audioArrays.slice(1, 1000);
        songPercent = 0;
        song = false;
        document.getElementById('countdown').innerText = `--:-- / --:--`;
        clearInterval(intervalo);

        finished();
        play();
    });
};

function boxClick(id) {
    document.getElementsByClassName('box')[id].style.animation = 'click 2s ease-in-out forwards';
    setTimeout(() => {
        document.getElementsByClassName('box')[id].style.animation = 'none';
    }, 2000);
};

function togglePauseAndResume() {
    if (song === false) return;
    playing.togglePlay();

    if ([...document.getElementById('play-button').classList].includes('fa-play')) {
        document.getElementById('play-button').classList.remove('fa-play');
        document.getElementById('play-button').classList.add('fa-pause');
    } else {
        document.getElementById('play-button').classList.add('fa-play');
        document.getElementById('play-button').classList.remove('fa-pause');
    };
};

function loop() {
    if (song === false) return;
    var loop = playing.get("loop");
    if (loop === true) {
        playing.unloop();
        document.getElementById('loop-button').classList.remove('emphasis');
    } else {
        playing.loop();
        document.getElementById('loop-button').classList.add('emphasis');
    };
};

function shuffle() {
    if (song === false) return;
    audioArrays = audioArrays.sort(function () {
        return Math.random() - 0.5
    });
    if ([...document.getElementById('shuffle-button').classList].includes('emphasis')) {
        document.getElementById('shuffle-button').classList.remove('emphasis');
    } else {
        document.getElementById('shuffle-button').classList.add('emphasis');
    };
};

function toTimer(time, withHours) {
    var h, m, s;
    h = Math.floor(time / 3600);
    h = isNaN(h) ? "--" : h >= 10 ? h : "0" + h;
    m = withHours ? Math.floor(time / 60 % 60) : Math.floor(time / 60);
    m = isNaN(m) ? "--" : m >= 10 ? m : "0" + m;
    s = Math.floor(time % 60);
    s = isNaN(s) ? "--" : s >= 10 ? s : "0" + s;
    return withHours ? h + ":" + m + ":" + s : m + ":" + s;
}
