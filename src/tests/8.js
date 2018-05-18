import $ from 'jquery';

export default (canvas, context) => {
  const $canvas = $(canvas);
  const clickX = [];
  const clickY = [];
  const clickDrag = [];

  function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }

  // Also redraw
  function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    for (let i = 0; i < clickX.length; i++) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.stroke();
    }
  }

  $canvas.mousedown(function a(e) {
    addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    redraw();
  });
};
