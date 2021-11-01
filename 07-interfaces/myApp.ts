import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";


let myCircle = new Circle(5);
let myRectangle = new Rectangle(2,5);

let theShapes: Shape[] = [];

theShapes.push(myCircle);
theShapes.push(myRectangle);

for (let theShape of theShapes) {
    console.log(theShape.calculateArea());
}