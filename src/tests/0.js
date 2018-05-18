export default (canvas, ctx) => {
  function addPixel(ev) {
    ctx.fillRect(ev.pageX, ev.pageY, 1, 1);
  }

  canvas.addEventListener('mousedown', () => window.addEventListener('mousemove', addPixel));
  window.addEventListener('mouseup', () => window.removeEventListener('mousemove', addPixel));
};
