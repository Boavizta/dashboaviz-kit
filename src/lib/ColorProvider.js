export class ColorProvider {
    DEFAULT_COLORS = ["rgb(24, 61, 93)", "#008A8C", "rgb(84, 182, 189)", " rgb(202, 231, 227)", " rgb(247, 210, 72)", "rgb(202, 162, 124)", "rgb(157, 181, 183)"];
    constructor(c = null) {
        if (c === null){
            this.colors = this.DEFAULT_COLORS;
        }else{
            this.colors = c;
        }
        this.index = 0;
    }
    next() {
        if (this.index >= this.colors.length) {
            this.index = 0;
        }
        return this.colors[this.index++];
    }
    previous() {
        if (this.index < 0) {
            this.index = this.colors.length - 1;
        }
        return this.colors[this.index--];
    }
    reset() {
        this.index = 0;
        return ""
    }
}
