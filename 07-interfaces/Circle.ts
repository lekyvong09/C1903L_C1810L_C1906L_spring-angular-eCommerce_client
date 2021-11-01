import { Shape } from "./Shape";


export class Circle implements Shape {
    
    constructor(private _radius: number) {
    }

    public get radius(): number {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
    }

    getInfo(): string {
        return `, radius=${this._radius}`;
    }

    calculateArea(): number {
        return Math.PI * Math.pow(this._radius, 2);
    }
    
}