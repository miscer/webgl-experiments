import {initBuffers} from "./buffers.js";
import {drawScene} from "./draw.js";

function main() {
  const canvas = document.querySelector("#glcanvas");
  const ctx = canvas.getContext("webgl");

  if (ctx == null) {
    alert("No WebGL, sorry");
    return;
  }

  const shaderProgram = initShaderProgram(ctx, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: ctx.getAttribLocation(shaderProgram, "aVertexPosition"),
    },
    uniformLocations: {
      projectionMatrix: ctx.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: ctx.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };

  const buffers = initBuffers(ctx);
  drawScene(ctx, programInfo, buffers);
}

function initShaderProgram(ctx, vsSource, fsSource) {
  const vertexShader = loadShader(ctx, ctx.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(ctx, ctx.FRAGMENT_SHADER, fsSource);

  const shaderProgram = ctx.createProgram();
  ctx.attachShader(shaderProgram, vertexShader);
  ctx.attachShader(shaderProgram, fragmentShader);
  ctx.linkProgram(shaderProgram);

  if (!ctx.getProgramParameter(shaderProgram, ctx.LINK_STATUS)) {
    alert(`Unable to initialize the shader program: ${ctx.getProgramInfoLog(shaderProgram)}`);
    return null;
  }

  return shaderProgram;
}

function loadShader(ctx, type, source) {
  const shader = ctx.createShader(type);
  ctx.shaderSource(shader, source);
  ctx.compileShader(shader);

  if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
    alert(`An error occurred compiling the shaders: ${ctx.getShaderInfoLog(shader)}`);
    ctx.deleteShader(shader);
    return null;
  }

  return shader;
}

const vsSource = `
  attribute vec4 aVertexPosition;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
`;

const fsSource = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
`;

main();