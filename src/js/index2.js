const startButton = document.getElementsByClassName('startButton')[0],
    counterButton = document.getElementsByClassName('counterButton')[0],
    goPosButton = document.getElementsByClassName('goPosButton')[0],
    goPosInput = document.getElementsByName('certainPos')[0],
    speedybar = document.getElementsByTagName("speedy-bar")[0];


startButton.addEventListener("click", (e) => {
    e.preventDefault();

    let angka = document.getElementsByName("totalSet");
    angka = angka[0].value;

    let waktu = document.getElementsByName("totalTime");
    waktu = waktu[0].value;

    speedybar.init = {
        times: angka,
        duration: waktu
    };

    counterButton.removeAttribute('disabled');
    goPosInput.setAttribute('max', angka);
});

counterButton.addEventListener('click', (e) => {
    e.preventDefault();
    speedybar.step();
});

goPosButton.addEventListener('click', (e) => {
    e.preventDefault();
    speedybar.goPos(goPosInput.value);
});