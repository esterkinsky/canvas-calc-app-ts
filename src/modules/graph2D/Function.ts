export default class Function {
    constructor({
        index,
        func = null,
        color = '#000000',
        width = 2,
        a = 0,
        b = 0,
        showDerivative = false,
        showIntegral = false,
    }) {
        this.index = index;
        this.func = func;
        this.color = color;
        this.width = width;
        this.a = a;
        this.b = b;
        this.showDerivative = showDerivative;
        this.showIntegral = showIntegral;
    }
}