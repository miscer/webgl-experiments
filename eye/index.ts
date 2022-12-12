import {createEye} from "./eye";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const eye = createEye(canvas);

eye.render();