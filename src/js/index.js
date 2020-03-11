var speedyBar = document.getElementsByClassName("speedyBar");
speedyBar = speedyBar[0];
var counter = null,
    satuan = null,
    jumlah = null;


function start() {
    // inisialisasi
    var speedy = document.getElementsByClassName("speedy");
    speedy = speedy[0];
    console.log(speedy.offsetWidth);

    var angka = document.getElementsByClassName("steps");
    jumlah = angka[0].value;

    satuan = speedy.offsetWidth / jumlah;

    // menambahkan style baru
    style = document.getElementsByTagName('style');
    if (style.length > 0) {
        for (var i = 0; i < style.length; i++) {
            style[i].parentNode.removeChild(style[i]);
        }
    }
    var keyframe = '';

    for (var i = 0; i < jumlah; i++) {
        data = '@keyframes bar' + i + '{0%{width : ' + satuan * i + 'px;} 100%{ width : ' + satuan * (i + 1) + 'px}}';
        keyframe += data;
    }

    para = document.createElement('style');
    para.innerHTML = keyframe;
    body = document.getElementsByTagName('body');
    body = body[0];

    body.insertBefore(para, body.childNodes[0]);

    // menciptakan tombol counter
    var settings2 = document.getElementsByClassName("settings2");
    settings2 = settings2[0];
    para = document.createElement('button');
    para.innerHTML = 'Lanjutkan';
    para.onclick = function() {
        maju();
    };
    para.className = 'set';

    // check apakah ada tombol counter lain
    if (settings2.firstChild) {
        settings2.innerHTML = '';
    }
    settings2.appendChild(para);

    // set width bar ke 0px
    counter = 0;
    speedyBar.style.width = '0px';
}

function maju() {
    speedyBar.style.animation = 'bar' + counter + ' 2s';
    setTimeout(function() {
        speedyBar.style.width = counter * satuan + 'px';
    }, 2000);
    counter++;
    if (counter == jumlah) {
        counter = 0;
        speedyBar.style.width = '0px';
    }
}