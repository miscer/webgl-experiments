const {mat4} = glMatrix;

function drawScene(ctx, programInfo, buffers, squareRotation) {
  ctx.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  ctx.clearDepth(1.0); // Clear everything
  ctx.enable(ctx.DEPTH_TEST); // Enable depth testing
  ctx.depthFunc(ctx.LEQUAL); // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = ctx.canvas.clientWidth / ctx.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -4.0]
  ); // amount to translate

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    squareRotation,
    [0, 0, 1]
  );

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  setPositionAttribute(ctx, buffers, programInfo);
  setColorAttribute(ctx, buffers, programInfo);

  // Tell WebGL to use our program when drawing
  ctx.useProgram(programInfo.program);

  // Set the shader uniforms
  ctx.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  ctx.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  {
    const offset = 0;
    const vertexCount = 4;
    ctx.drawArrays(ctx.TRIANGLE_STRIP, offset, vertexCount);
  }
}

// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
function setPositionAttribute(ctx, buffers, programInfo) {
  ctx.bindBuffer(ctx.ARRAY_BUFFER, buffers.position);
  ctx.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, ctx.FLOAT, false, 0, 0);
  ctx.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

// Tell WebGL how to pull out the colors from the color buffer
// into the vertexColor attribute.
function setColorAttribute(ctx, buffers, programInfo) {
  ctx.bindBuffer(ctx.ARRAY_BUFFER, buffers.color);
  ctx.vertexAttribPointer(programInfo.attribLocations.vertexColor, 4, ctx.FLOAT, false, 0, 0);
  ctx.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export {drawScene};
