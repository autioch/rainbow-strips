import $ from 'jquery';

export default (canvas, ctx) => {
  let mousePressed = false;
  let lastX;
  let lastY;

  const $canvas = $(canvas);

  function draw(x, y, isDown) {
    if (isDown) {
      ctx.beginPath();
      ctx.strokeStyle = $('#selColor').val();
      ctx.lineWidth = $('#selWidth').val();
      ctx.lineJoin = 'round';
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }
    lastX = x;
    lastY = y;
  }

  $canvas.mousedown((e) => {
    mousePressed = true;
    draw(e.pageX - $canvas.offset().left, e.pageY - $canvas.offset().top, false);
  });

  $canvas.mousemove((e) => {
    if (mousePressed) {
      draw(e.pageX - $canvas.offset().left, e.pageY - $canvas.offset().top, true);
    }
  });

  $canvas.mouseup(() => {
    mousePressed = false;
  });

  $canvas.mouseleave(() => {
    mousePressed = false;
  });
};
