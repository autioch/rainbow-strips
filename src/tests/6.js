export default (canvas, ctx) => {
  const mouse = {
    x: 0,
    y: 0
  };
  const lastMouse = {
    x: 0,
    y: 0
  };

  function onPaint() {
    ctx.beginPath();
    ctx.moveTo(lastMouse.x, lastMouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.closePath();
    ctx.stroke();
  }

  canvas.addEventListener('mousemove', (e) => {
    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;

    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
  }, false);

  canvas.addEventListener('mousedown', () => canvas.addEventListener('mousemove', onPaint, false), false);
  canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', onPaint, false), false);
};
