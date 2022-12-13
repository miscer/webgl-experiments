import {mat4} from "gl-matrix";
import { createIndicesBuffer, createVerticesBuffer } from "./buffers";
import { createProgram } from "./shaders";

export function createEye(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("webgl2");
  if (ctx == null) {
    throw new Error("WebGL2 is not supported");
  }

  const program = createProgram(ctx);
  ctx.useProgram(program);

  const verticesBuffer = createVerticesBuffer(ctx);
  const indicesBuffer = createIndicesBuffer(ctx);

  const positionAttrib = ctx.getAttribLocation(program, "position_attr");
  ctx.bindBuffer(ctx.ARRAY_BUFFER, verticesBuffer);
  ctx.vertexAttribPointer(positionAttrib, 3, ctx.FLOAT, false, 0, 0);
  ctx.enableVertexAttribArray(positionAttrib);

  const projectionMatrix = mat4.create();
  mat4.ortho(projectionMatrix, -3, 3, -3, 3, -3, 3);
  
  const projectionMatrixUniform = ctx.getUniformLocation(program, "projection_matrix");
  ctx.uniformMatrix4fv(projectionMatrixUniform, false, projectionMatrix);

  return {
    render() {
      ctx.clear(ctx.COLOR_BUFFER_BIT);
      ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, indicesBuffer);
      ctx.drawElements(ctx.TRIANGLES, 4, ctx.UNSIGNED_SHORT, 0);
    },
  };
}