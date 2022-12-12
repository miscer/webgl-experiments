import { createProgram } from "./shaders";

export function createEye(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("webgl2");
  if (ctx == null) {
    throw new Error("WebGL2 is not supported");
  }

  const program = createProgram(ctx);
  ctx.useProgram(program);

  return {
    render() {}
  };
}