import {createEye} from "./eye";

const input = document.querySelector("#rotation") as HTMLInputElement;
const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const eye = createEye(canvas);

function render() {
  const value = parseInt(input.value, 10);
  const rotation = Math.PI * (value / 180);
  eye.render(rotation);
}

input?.addEventListener("input", () => {
  render();
});

render();