export default (canvas, ctx) => {
  const r = 1;

  ctx.lineCap = 'round';
  ctx.fillStyle = 'black';
  let draw = false;
  let lineStart = true;
  let lastX;
  let lastY;

  function yesDraw() {
    draw = true;
    lineStart = true;
  }

  function drawing(x, y) {
    if (lineStart) {
      lastX = x;
      lastY = y;
      lineStart = false;
    }
    ctx.beginPath();
    ctx.lineTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
  }

  function mouseMove(e) {
    const bounds = canvas.getBoundingClientRect();
    const x = e.pageX - bounds.left - scrollX;
    const y = e.pageY - bounds.top - scrollY;

    if (draw && x > -r && x < canvas.width + r && y > -r && y < canvas.height + r) {
      drawing(x, y);
    }
  }

  function noDraw() {
    draw = false;
  }

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mousedown', yesDraw);
  document.addEventListener('mouseup', noDraw);
};
