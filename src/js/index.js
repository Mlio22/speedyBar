// Jam Dihabiskan : 6
function speedyFunc(wrap, bar, times, time) {
    let one = wrap.offsetWidth / times;

    // menghapus style speedyKeyframes jika ada
    let style = document.getElementsByTagName('style');
    if (style.length > 0) {
        for (let i = 0; i < style.length; i++) {
            if (style[i].className == 'speedyKeyframes') {
                style[i].parentNode.removeChild(style[i]);
            }
        }
    }

    // menambahkan keyframes baru yang akan ditambahkan sebagai stylesheet
    let keyframe = '';
    for (var i = 0; i < times; i++) {
        data = '@keyframes bar' + i + '{0%{width : ' + one * i + 'px;} 100%{ width : ' + one * (i + 1) + 'px}}';
        keyframe += data;
    }

    // menciptakan element style baru dan menambahkan di 
    let para = document.createElement('style');
    para.innerHTML = keyframe;
    para.className = 'speedyKeyframes';
    let body = document.getElementsByTagName('body');
    body = body[0];

    body.insertBefore(para, body.childNodes[0]);

    // membuat object speedy 
    const speedyObject = {
        counter: 0,
        width: one,
        rep: times,
        AnimateLength: time,
        forward: function() {
            let that = this;
            bar.style.width = that.width * this.counter + 'px';
            bar.style.animation = 'bar' + this.counter + ' ' + this.AnimateLength + 'ms';
            this.counter++;
            a = setTimeout(function() {
                bar.style.animation = 'none 0s';
                bar.style.width = that.width * that.counter + 'px';
            }, this.AnimateLength);
            if (this.counter >= this.rep) {
                this.counter = 0;
            }
        }
    };

    speedyObj = Object.create(speedyObject);

    // inisialisasi bar awal
    bar.style.animation = 'none 0s';
    bar.style.width = '0px';
}


var startButton = document.getElementsByClassName('startButton'),
    counterButton = document.getElementsByClassName('counterButton');
startButton = startButton[0];
counterButton = counterButton[0];
counterButton.setAttribute('disabled', true);


startButton.addEventListener('click', function(e) {
    e.preventDefault();
    // inisialisasi

    let speedy = document.getElementsByClassName("speedy");
    speedy = speedy[0];

    let speedyBar = document.getElementsByClassName("speedyBar");
    speedyBar = speedyBar[0];

    let angka = document.getElementsByName("speedySet");
    angka = angka[0].value;

    let waktu = document.getElementsByName("speedySpeed");
    waktu = waktu[0].value;


    speedyFunc(speedy, speedyBar, angka, waktu);
    counterButton.removeAttribute('disabled');
});

counterButton.addEventListener('click', function(e) {
    e.preventDefault();
    speedyObj.forward();

});