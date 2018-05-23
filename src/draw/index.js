import createCanvas from './createCanvas';
import drawSmoothedLine from './drawSmoothedLine';
import simplifyLineRDP from './simplifyLineRDP';
import smoothLine from './smoothLine';

function getPosition(ev) {
  return [ev.offsetX, ev.offsetY];
}

export default (canvas, ctx) => {
  let linePoints = [];
  let currentPos;
  let previousPos;

  const backBuffer = createCanvas(canvas.width, canvas.height);
  const lineSmooth = {
    lengthMin: 19.9, // 0 - 20 ?
    angle: 0.99 // 0 - 1 ?
  };

  function startLine(ev) {
    linePoints = [];
    previousPos = getPosition(ev);
    backBuffer.ctx.clearRect(0, 0, canvas.width, canvas.height);
    backBuffer.ctx.drawImage(canvas, 0, 0);
    linePoints.push(previousPos);
  }

  function appendLine(ev) {
    currentPos = getPosition(ev);
    linePoints.push(currentPos);
    ctx.beginPath();
    ctx.moveTo(...previousPos);
    ctx.lineTo(...currentPos);
    ctx.stroke();
    previousPos = currentPos;
  }

  function finishLine() {
    const simplified = simplifyLineRDP(linePoints, lineSmooth.lengthMin);
    const newLine = smoothLine(simplified, lineSmooth.angle, lineSmooth.match);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backBuffer, 0, 0);
    drawSmoothedLine(newLine, ctx);
  }

  canvas.addEventListener('mousedown', (ev) => {
    startLine(ev);
    window.addEventListener('mousemove', appendLine);
  });

  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', appendLine);
    finishLine();
  });
};
