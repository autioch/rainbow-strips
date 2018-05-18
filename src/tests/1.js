export default (canvas, ctx) => {
  // ctx.lineWidth = 20;

  let drawing = false;
  let oldX = null;
  let oldY = null;

  canvas.onmousedown = canvas.onmouseout = canvas.onmouseup = (ev) => {
    drawing = ev.type === 'mousedown';
  };

  canvas.onmousemove = (ev) => {
    const x = ev.offsetX;
    const y = ev.offsetY;

    if (drawing) {
      if (oldX === null) {
        // Else simply move to current coordinates
        ctx.moveTo(x, y);
        ctx.beginPath();
      } else {
        // If drawing, move to old coordinates for continual line
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
      }

      // Draw a line
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();

      // Add an arc to the end of the line to make it smooth
      ctx.beginPath();
      ctx.arc(x, y, 0, 0, Math.PI * 2);
      ctx.closePath();
      ctx.stroke();

      // Save new coordinates as old for next draw cycle
      oldX = x;
      oldY = y;
    } else {
      // If not drawing, cut line byt setting "old" to null
      oldX = null;
      oldY = null;
    }
  };
};
