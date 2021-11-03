import { Shape } from "./Shape";


export class Rectangle implements Shape {
    
    constructor(private _width: number, private _length: number) {
    }

    public get length(): number {
        return this._length;
    }
    public set length(value: number) {
        this._length = value;
    }
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }


    getInfo(): string {
        return `, width=${this._width}, length=${this._length}`;
    }

    calculateArea(): number {
        return this._length * this._width;
    }
    

}