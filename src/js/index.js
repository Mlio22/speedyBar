// Jam Dihabiskan : 12

'use strict';

function speedyFunc(wrap, bar, times, time) {
    // untuk mematikan timeout pada fungsi forward dibawah
    if (typeof(a) != 'undefined') {
        clearTimeout(a);
        bar.style.animation = 'none 0s';
    }

    // setting panjang satuan bar per step
    let percentage = ((wrap.offsetWidth / times) / wrap.offsetWidth) * 100;

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
        let data = '@keyframes bar' + i + '{0%{ width : ' + percentage * i + '%;} 100%{ width : ' + percentage * (i + 1) + '%}}';
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
        counter: 0, //  current position counter
        width: percentage, //  width unit per one counter++
        rep: times, //  total repetition 
        animateLength: time, //  animation length

        // membuat fungsi untuk step by step speedyBar
        forward: function() {

            this.skip();

            if (this.counter >= this.rep) {
                this.counter = 0;
            }

            // memulai animasi menuju setting ke counter + 1
            bar.style.animation = 'bar' + this.counter + ' ' + this.animateLength + 'ms';

            // increment counter menjadi counter + 1
            this.counter++;
            console.log(this.counter);


            // agar variabel object ini dapat digunakan dalam timeout dibawah
            let that = this;

            // membuat timeout untuk mensetting bar ke kondisi counter + 1
            a = setTimeout(function() {
                bar.style.animation = 'none 0s';
                console.log("animation stoped");

                if (that.counter == 0) {
                    bar.style.width = that.width * that.rep + '%';
                } else {
                    bar.style.width = that.width * that.counter + '%';

                }
            }, this.animateLength);

            // mengembalikan nilai counter ke 0
            if (this.counter >= this.rep) {
                this.counter = 0;
            }
        },
        // fungsi skip
        skip: function() {
            let that = this;

            if (typeof(a) != 'undefined' || typeof(typeof(a)) == 'string') {
                console.log("a deleted");
                clearTimeout(a);
                bar.style.animation = 'none 0s';
            }

            if (that.counter == 0) {
                bar.style.width = '0%';
            } else {
                bar.style.width = that.width * that.counter + '%';
            }
        },
        // fungsi goPos untuk pindah ke step / posisi tertentu
        goPos: function(toPos) {
            let that = this;
            if (bar.style.animationDuration != '0s') {
                if (typeof(a) != 'undefined' || typeof(typeof(a)) == 'string') {
                    console.log("a deleted");
                    clearTimeout(a);
                }

                // menjadikan panjang speedyBar saat itu juga
                // untuk memperbagus animasi
                bar.style.webkitAnimationPlayState = 'paused';
                bar.style.width = bar.offsetWidth.toString() + 'px';
                bar.style.animation = 'none 0s';

            }
            bar.style.transition = 'all 500ms';

            this.counter = toPos;

            // menjadikan panjang dari speedybar sesuai dengan step/counter yang diinginkan
            setTimeout(function() {
                let width = that.width * that.counter;
                if (width >= 100) {
                    bar.style.width = '100%';
                } else {
                    bar.style.width = width + '%';
                }
            }, 10);

            // mematikan transisi
            b = setTimeout(function() {
                bar.style.transition = 'none';
            }, 500);
        }
    };

    // menciptakan variabel speedyObj
    speedyObj = Object.create(speedyObject);

    // inisialisasi bar awal
    bar.style.webkitAnimationPlayState = 'paused';
    bar.style.width = bar.offsetWidth.toString() + 'px';
    bar.style.animation = 'none 0s';

    bar.style.transition = '.5s all';

    let c = setTimeout(function() {
        bar.style.width = '0%';
        let b = setTimeout(function() {
            bar.style.transition = 'none';
        }, 500);
    }, 10);


}

// pengenalan tombol start dan counter
var startButton = document.getElementsByClassName('startButton')[0],
    counterButton = document.getElementsByClassName('counterButton')[0],
    goPosButton = document.getElementsByClassName('goPosButton')[0],
    goPosInput = document.getElementsByName('certainPos')[0];
var speedyObj, a, b;

counterButton.setAttribute('disabled', true);
goPosButton.setAttribute('disabled', true);

document.getElementById('formulir').addEventListener('submit', function(e) {
    console.log('diterima');

});


// saat tombol start ditekan
startButton.addEventListener('click', function(event) {
    // mencegah refresh dan linking
    event.preventDefault();


    // inisialisasi
    let speedy = document.getElementsByClassName("speedy");
    speedy = speedy[0];

    let speedyBar = document.getElementsByClassName("speedyBar");
    speedyBar = speedyBar[0];

    let angka = document.getElementsByName("totalSet");
    angka = angka[0].value;

    let waktu = document.getElementsByName("totalTime");
    waktu = waktu[0].value;

    // pemanggilan fungsi
    speedyFunc(speedy, speedyBar, angka, waktu);
    counterButton.removeAttribute('disabled');
    goPosButton.removeAttribute('disabled');
    goPosInput.setAttribute('max', angka);

});

// saat tombol counter ditekan
counterButton.addEventListener('click', function(e) {
    e.preventDefault();
    speedyObj.forward();
});

goPosButton.addEventListener('click', function(e) {
    e.preventDefault();
    speedyObj.goPos(goPosInput.value);

});


// jika salah satu nilai berubah maka counter akan dikunci
// dan harus dimulai ulang lagi
function stop() {
    counterButton.setAttribute('disabled', true);
    goPosButton.setAttribute('disabled', true);
    if (typeof(speedyObj) != 'undefined') {
        speedyObj.skip();
    }
}