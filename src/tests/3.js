export default (canvas, ctx) => {
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  function draw(e) {
    if (!isDrawing) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  function stopDraw() {
    isDrawing = false;
  }

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseout', stopDraw);
};
