"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
var Circle = /** @class */ (function () {
    function Circle(_radius) {
        this._radius = _radius;
    }
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
        },
        enumerable: false,
        configurable: true
    });
    Circle.prototype.getInfo = function () {
        return ", radius=" + this._radius;
    };
    Circle.prototype.calculateArea = function () {
        return Math.PI * Math.pow(this._radius, 2);
    };
    return Circle;
}());
exports.Circle = Circle;
