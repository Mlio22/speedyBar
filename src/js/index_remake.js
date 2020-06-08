// jam dihabiskan : 1

//! remake ini menggunakan konsep custom element (ES6)

class SpeedyBar extends HTMLElement {
    constructor() {
        super();
        this.percentage = 100;
        this.counter = 0;
        this.max = 0;
        this.parentWidth = this.parentElement.offsetWidth;
    }

    setZeroWidth() {
        this.style.width = '0px';
    }

    set percent(times) {
        this.percentage = (this.parentWidth / times) / this.parentWidth * 100;
        this.max = times;
        this.counter = 0;
        this.setZeroWidth();
        // console.log(this);
    }

    set duration(ms) {
        this.style.transition = `${ms}ms all`;
    }

    setPos() {
        this.style.width = this.percentage * this.counter + '%'
    }

    step() {
        this.counter == this.max ? this.counter = 0 : this.counter++;
        this.offsetWidth === this.parentWidth ? this.style.width = '0px' : this.setPos();
    }

    goPos(pos) {
        this.counter = pos;
        this.setPos();
    }

}

customElements.define("speedy-bar", SpeedyBar);