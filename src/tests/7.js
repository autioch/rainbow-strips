export default (canvas, ctx) => {
  const pos = {
    x: 0,
    y: 0
  };

  function setPosition(e) {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }

  function draw(e) {
    if (e.buttons !== 1) {
      return;
    }

    ctx.beginPath(); // begin
    ctx.moveTo(pos.x, pos.y); // from
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to
    ctx.stroke(); // draw it!
  }

  document.addEventListener('mousemove', draw);
  document.addEventListener('mousedown', setPosition);
  document.addEventListener('mouseenter', setPosition);
};
