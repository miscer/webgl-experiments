import "./shaders/types.d";

import frag from "./shaders/eye.frag";
import vert from "./shaders/eye.vert";

function createShader(ctx: WebGL2RenderingContext, type: number, source: string) {
  const shader = ctx.createShader(type);
  if (shader == null) {
    throw new Error("Failed to create a shader with the specified type");
  }

  ctx.shaderSource(shader, source);
  ctx.compileShader(shader);

  const success = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
  if (!success) {
    throw new Error("Failed to compile shader");
  }

  return shader;
}

export function createProgram(ctx: WebGL2RenderingContext) {
  const vertexShader = createShader(ctx, ctx.VERTEX_SHADER, vert);
  const fragmentShader = createShader(ctx, ctx.FRAGMENT_SHADER, frag);

  const program = ctx.createProgram();
  if (program == null) {
    throw new Error("Failed to create a program");
  }

  ctx.attachShader(program, vertexShader);
  ctx.attachShader(program, fragmentShader);

  ctx.linkProgram(program);

  const success = ctx.getProgramParameter(program, ctx.LINK_STATUS);
  if (!success) {
    throw new Error("Failed to link program");
  }

  return program;
}