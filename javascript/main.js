let image = document.getElementById('slogan-image');
let text = document.getElementById('slogan-text');
let acc = 'creative';

setInterval(() => {
    switch (acc) {
        case 'creative':
            image.style.animation = 'reverse-appears 1s ease-in-out forwards';
            setTimeout(() => {
                text.innerText = 'Sente-se e medite!';
                setTimeout(() => image.style.animation = 'appears 2s ease-in-out forwards', 5);
                image.src = './assets/meditar.svg';
                acc = 'meditate';
            }, 1000);
            break;
        case 'meditate':
            image.style.animation = 'reverse-appears 1s ease-in-out forwards';

            setTimeout(() => {
                text.innerText = 'Liberte seu lado criativo!';
                setTimeout(() => image.style.animation = 'appears 2s ease-in-out forwards', 5);
                image.src = '/ako.music-player/assets/criativo.svg';
                acc = 'creative';
            }, 1000);
            break;
    }
}, 8000);
