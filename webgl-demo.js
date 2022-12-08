function main() {
  const canvas = document.querySelector("#glcanvas");
  const ctx = canvas.getContext("webgl");

  if (ctx == null) {
    alert("No WebGL, sorry");
    return;
  }

  ctx.clearColor(0, 0, 0, 1);
  ctx.clear(ctx.COLOR_BUFFER_BIT);
}

main();