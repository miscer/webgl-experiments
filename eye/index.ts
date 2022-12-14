import {createEye} from "./eye";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const eye = createEye(canvas);

canvas.addEventListener("mousemove", (event) => {
  eye.render(event.offsetX, event.offsetY);
});

eye.render(0, 0);