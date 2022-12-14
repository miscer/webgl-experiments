import { mat4, vec3 } from "gl-matrix";
import { createColorsBuffer, createIndicesBuffer, createVerticesBuffer } from "./buffers";
import { createProgram } from "./shaders";

export function createEye(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("webgl2");
  if (ctx == null) {
    throw new Error("WebGL2 is not supported");
  }

  ctx.enable(ctx.CULL_FACE);
  ctx.enable(ctx.DEPTH_TEST);

  const program = createProgram(ctx);
  ctx.useProgram(program);

  const verticesBuffer = createVerticesBuffer(ctx);
  const colorsBuffer = createColorsBuffer(ctx);
  const indicesBuffer = createIndicesBuffer(ctx);

  const positionAttrib = ctx.getAttribLocation(program, "position_attr");
  ctx.bindBuffer(ctx.ARRAY_BUFFER, verticesBuffer);
  ctx.vertexAttribPointer(positionAttrib, 3, ctx.FLOAT, false, 0, 0);
  ctx.enableVertexAttribArray(positionAttrib);

  const colorAttrib = ctx.getAttribLocation(program, "color_attr");
  ctx.bindBuffer(ctx.ARRAY_BUFFER, colorsBuffer);
  ctx.vertexAttribPointer(colorAttrib, 4, ctx.FLOAT, false, 0, 0);
  ctx.enableVertexAttribArray(colorAttrib);

  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 10);

  const inverseProjectionMatrix = mat4.create();
  mat4.invert(inverseProjectionMatrix, projectionMatrix);

  const projectionMatrixUniform = ctx.getUniformLocation(program, "projection_matrix");
  ctx.uniformMatrix4fv(projectionMatrixUniform, false, projectionMatrix);

  const viewMatrix = mat4.create();
  mat4.translate(viewMatrix, viewMatrix, [0, 0, -6]);

  const viewMatrixUniform = ctx.getUniformLocation(program, "view_matrix");
  ctx.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);

  return {
    render(x: number, y: number) {
      const lookTarget = vec3.fromValues(
        2 * (x / canvas.width - 0.5),
        -2 * (y / canvas.height - 0.5),
        1
      );

      const modelMatrix = mat4.create();
      mat4.targetTo(modelMatrix, vec3.create(), lookTarget, vec3.fromValues(0, 1, 0));

      const modelMatrixUniform = ctx.getUniformLocation(program, "model_matrix");
      ctx.uniformMatrix4fv(modelMatrixUniform, false, modelMatrix);

      ctx.clear(ctx.COLOR_BUFFER_BIT);
      ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, indicesBuffer);
      ctx.drawElements(ctx.TRIANGLES, 12, ctx.UNSIGNED_SHORT, 0);
    },
  };
}