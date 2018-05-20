import getPosition from './getPosition';

export default (canvas, ctx) => {
  let oldPos = null;

  function addPixel(ev) {
    const newPos = getPosition(ev);

    ctx.beginPath();
    ctx.moveTo(oldPos.x, oldPos.y);
    ctx.lineTo(newPos.x, newPos.y);
    ctx.closePath();
    ctx.stroke();

    oldPos = newPos;
  }

  canvas.addEventListener('mousedown', (ev) => {
    oldPos = getPosition(ev);
    window.addEventListener('mousemove', addPixel);
  });

  window.addEventListener('mouseup', () => {
    oldPos = null;
    window.removeEventListener('mousemove', addPixel);
  });
};
