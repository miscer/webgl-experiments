function initBuffers(ctx) {
  const positionBuffer = initPositionBuffer(ctx);
  const colorBuffer = initColorBuffer(ctx);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

function initPositionBuffer(ctx) {
  const positionBuffer = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(positions), ctx.STATIC_DRAW);

  return positionBuffer;
}

const colors = [
  1.0, 1.0, 1.0, 1.0, // white
  1.0, 0.0, 0.0, 1.0, // red
  0.0, 1.0, 0.0, 1.0, // green
  0.0, 0.0, 1.0, 1.0, // blue
];

function initColorBuffer(ctx) {
  const colorBuffer = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, colorBuffer);
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(colors), ctx.STATIC_DRAW);

  return colorBuffer;
}

export {initBuffers};
