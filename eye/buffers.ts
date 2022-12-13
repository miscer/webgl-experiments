import { triangles, vertices } from "./pyramid";

export function createVerticesBuffer(ctx: WebGL2RenderingContext) {
  const buffer = ctx.createBuffer();
  if (buffer == null) throw new Error("Failed to create a buffer");

  ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW);

  return buffer;
}

export function createIndicesBuffer(ctx: WebGL2RenderingContext) {
  const buffer = ctx.createBuffer();
  if (buffer == null) throw new Error("Failed to create a buffer");

  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, buffer);
  ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangles), ctx.STATIC_DRAW);

  return buffer;
}