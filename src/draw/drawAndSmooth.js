/* eslint-disable no-mixed-operators */
/* eslint-disable max-statements */
/* eslint-disable no-shadow */

import simplifyLineRDP from './simplifyLineRDP';
import smoothLine from './smoothLine';
import getPosition from './getPosition';
import drawSmoothedLine from './drawSmoothedLine';

function createCanvas(w, h) {
  const image = document.createElement('canvas');

  image.width = w;
  image.height = h;
  image.ctx = image.getContext('2d');

  return image;
}

export default (canvas, ctx) => {
  let currentLine;
  let pos;
  const backBuffer = createCanvas(canvas.width, canvas.height);

  const lineSmooth = {
    lengthMin: 19.9, // 0 - 20 ?
    angle: 0.1 // 0 - 1 ?
  };

  function startLine(ev) {
    currentLine = [];
    pos = getPosition(ev);

    backBuffer.ctx.clearRect(0, 0, canvas.width, canvas.height);
    backBuffer.ctx.drawImage(canvas, 0, 0);
    currentLine.push([pos.x, pos.y]);
  }

  function appendLine(ev) {
    const lp = currentLine[currentLine.length - 1]; // get last point

    pos = getPosition(ev);

    if (pos.x !== lp[0] || pos.y !== lp[1]) {
      currentLine.push([pos.x, pos.y]);
      ctx.beginPath();
      ctx.moveTo(lp[0], lp[1]);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      return true;
    }

    return false;
  }

  function performSmooth() {
    const newLine = smoothLine(simplifyLineRDP(currentLine, lineSmooth.lengthMin), lineSmooth.angle, lineSmooth.match);

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
    performSmooth();
  });
};
