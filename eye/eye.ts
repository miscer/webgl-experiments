export function createEye(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("webgl2");
  if (ctx == null) {
    throw new Error("WebGL2 is not supported");
  }

  return {
    render() {}
  };
}