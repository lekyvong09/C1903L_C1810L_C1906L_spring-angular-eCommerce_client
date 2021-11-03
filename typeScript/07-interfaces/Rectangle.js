"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
var Rectangle = /** @class */ (function () {
    function Rectangle(_width, _length) {
        this._width = _width;
        this._length = _length;
    }
    Object.defineProperty(Rectangle.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (value) {
            this._length = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        },
        enumerable: false,
        configurable: true
    });
    Rectangle.prototype.getInfo = function () {
        return ", width=" + this._width + ", length=" + this._length;
    };
    Rectangle.prototype.calculateArea = function () {
        return this._length * this._width;
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
