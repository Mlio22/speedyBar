// Jam Dihabiskan : 6
function speedyFunc(wrap, bar, times, time) {
    // untuk mematikan timeout pada fungsi forward dibawah
    if (typeof(a) != 'undefined') {
        clearTimeout(a);
        bar.style.animation = 'none 0s';
    }

    // setting panjang satuan bar per step
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

        // membuat fungsi untuk step by step speedyBar
        forward: function() {
            this.skip();

            // memulai animasi menuju setting ke counter + 1
            bar.style.animation = 'bar' + this.counter + ' ' + this.AnimateLength + 'ms';

            // increment counter menjadi counter + 1
            this.counter++;

            // agar variabel object ini dapat digunakan dalam timeout dibawah
            let that = this;

            // membuat timeout untuk mensetting bar ke kondisi counter + 1
            a = setTimeout(function() {
                bar.style.animation = 'none 0s';
                if (that.counter == 0) {
                    bar.style.width = that.width * that.rep + 'px';
                } else {
                    bar.style.width = that.width * that.counter + 'px';

                }
            }, this.AnimateLength);

            // mengembalikan nilai counter ke 0
            if (this.counter >= this.rep) {
                this.counter = 0;
            }
        },
        skip: function() {
            let that = this;

            if (typeof(a) != 'undefined') {
                clearTimeout(a);
                bar.style.animation = 'none 0s';
                if (that.counter == 0) {
                    bar.style.width = that.width * that.rep + 'px';
                } else {
                    bar.style.width = that.width * that.counter + 'px';
                }
            }
        }
    };

    // menciptakan variabel speedyObj
    speedyObj = Object.create(speedyObject);

    // inisialisasi bar awal
    bar.style.animation = 'none 0s';
    bar.style.width = '0px';
}

// pengenalan tombol start dan counter
var startButton = document.getElementsByClassName('startButton'),
    counterButton = document.getElementsByClassName('counterButton');
startButton = startButton[0];
counterButton = counterButton[0];
counterButton.setAttribute('disabled', true);

// saat tombol start ditekan
startButton.addEventListener('click', function(e) {
    // mencegah refresh dan linking
    e.preventDefault();

    // inisialisasi
    let speedy = document.getElementsByClassName("speedy");
    speedy = speedy[0];

    let speedyBar = document.getElementsByClassName("speedyBar");
    speedyBar = speedyBar[0];

    let angka = document.getElementsByName("speedySet");
    angka = angka[0].value;

    c = setInterval(function() {
        console.log(speedyBar.style.width);
    }, 50);

    let waktu = document.getElementsByName("speedySpeed");
    waktu = waktu[0].value;

    // pemanggilan fungsi
    speedyFunc(speedy, speedyBar, angka, waktu);
    counterButton.removeAttribute('disabled');
});

// saat tombol counter ditekan
counterButton.addEventListener('click', function(e) {
    e.preventDefault();
    b = setInterval(function() {
        speedyObj.forward();
    }, 100);
});

// jika salah satu nilai berubah maka counter akan dikunci
// dan harus dimulai ulang lagi
function stop() {
    counterButton.setAttribute('disabled', true);
    speedyObj.skip();
    clearInterval(b);
    clearInterval(c);
}