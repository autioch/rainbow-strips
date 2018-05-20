/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable max-depth */
/* eslint-disable max-statements */
/* eslint-disable complexity */
/* eslint-disable no-undefined */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable no-var */
/* eslint-disable func-style */
/* eslint-disable func-names */
/* eslint-disable one-var */
/* eslint-disable sort-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable block-scoped-var */
/* eslint-disable no-redeclare */
/* eslint-disable vars-on-top */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-negated-condition */
/* eslint-disable no-use-before-define */

import simplifyLineRDP from './simplifyLineRDP';
import smoothLine from './smoothLine';
import drawSmoothedLine from './drawSmoothedLine';

export default (canvas, ctx) => {
  // mouse stuff
  const mouse = {
    x: 0,
    y: 0,
    buttonLastRaw: 0, // user modified value
    buttonRaw: 0,
    buttons: [1, 2, 4, 6, 5, 3] // masks for setting and clearing button raw bits;
  };

  function mouseMove(ev) {
    mouse.x = ev.offsetX;
    mouse.y = ev.offsetY;
    if (mouse.x === undefined) {
      mouse.x = ev.clientX;
      mouse.y = ev.clientY;
    }
    if (ev.type === 'mousedown') {
      mouse.buttonRaw |= mouse.buttons[ev.which - 1];
    } else if (ev.type === 'mouseup') {
      mouse.buttonRaw &= mouse.buttons[ev.which + 2];
    } else if (ev.type === 'mouseout') {
      mouse.buttonRaw = 0;
      mouse.over = false;
    } else if (ev.type === 'mouseover') {
      mouse.over = true;
    }
    ev.preventDefault();
  }
  canvas.addEventListener('mousemove', mouseMove);
  canvas.addEventListener('mousedown', mouseMove);
  canvas.addEventListener('mouseup', mouseMove);
  canvas.addEventListener('mouseout', mouseMove);
  canvas.addEventListener('mouseover', mouseMove);
  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  }, false);

  // creates a drawable image
  const createImage = function(w, h) {
    const image = document.createElement('canvas');

    image.width = w;
    image.height = h;
    image.ctx = image.getContext('2d');

    return image;
  };

  // smoothing settings
  let liveSmooth;
  const lineSmooth = {};

  lineSmooth.lengthMin = 19.99; // square of the pixel length
  lineSmooth.angle = 0.99; // angle threshold
  lineSmooth.match = false; // not working.
  // back buffer to save the canvas allowing the new line to be erased
  const backBuffer = createImage(canvas.width, canvas.height);
  let currentLine = [];

  mouse.lastButtonRaw = 0; // add mouse last incase not there
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let drawing = false; // if drawing
  let input = false; // if menu input
  let smoothIt = false; // flag to allow feedback that smoothing is happening as it takes some time.

  function draw() {
    // if not drawing test for menu interaction and draw the menus
    if (!drawing) {
      if (mouse.x < 203 && mouse.y < 24) {
        if (mouse.y < 13) {
          if (mouse.buttonRaw === 1) {
            ctx.clearRect(3, 3, 200, 10);
            lineSmooth.angle = (mouse.x - 3) / 200;
            input = true;
          }
        } else
        if (mouse.buttonRaw === 1) {
          ctx.clearRect(3, 14, 200, 10);
          lineSmooth.lengthMin = (mouse.x - 3) / 10;
          input = true;
        }

        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = 'crosshair';
      }
      if (mouse.buttonRaw === 0 && input) {
        input = false;
        mouse.lastButtonRaw = 0;
      }
      ctx.lineWidth = 0.5;
      ctx.fillStyle = 'red';
      ctx.clearRect(3, 3, 200, 10);
      ctx.clearRect(3, 14, 200, 10);
      ctx.fillRect(3, 3, lineSmooth.angle * 200, 10);
      ctx.fillRect(3, 14, lineSmooth.lengthMin * 10, 10);

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#000';
      ctx.strokeRect(3, 3, 200, 10);
      ctx.fillText(`Smooth ${(lineSmooth.angle * (180 / Math.PI)).toFixed(0)}deg`, 5, 2);
      ctx.strokeRect(3, 14, 200, 10);
      ctx.fillText(`Detail ${lineSmooth.lengthMin.toFixed(0)}pixels`, 5, 13);
    } else {
      canvas.style.cursor = 'crosshair';
    }
    if (!input) {
      ctx.lineWidth = 3;
      if (mouse.buttonRaw === 4 && mouse.lastButtonRaw === 0) {
        currentLine = [];
        drawing = true;

        backBuffer.ctx.clearRect(0, 0, canvas.width, canvas.height);
        backBuffer.ctx.drawImage(canvas, 0, 0);
        currentLine.push([mouse.x, mouse.y]);
      } else
      if (mouse.buttonRaw === 4) {
        var lp = currentLine[currentLine.length - 1]; // get last point
        // dont record point if no movement

        if (mouse.x !== lp[0] || mouse.y !== lp[1]) {
          currentLine.push([mouse.x, mouse.y]);
          ctx.beginPath();
          ctx.moveTo(lp[0], lp[1]);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          liveSmooth = smoothLine(
            simplifyLineRDP(
              currentLine,
              lineSmooth.lengthMin
            ),
            lineSmooth.angle,
            lineSmooth.match
          );
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(backBuffer, 0, 0);
          ctx.strokeStyle = 'Blue';
          drawSmoothedLine(liveSmooth, ctx);
          ctx.strokeStyle = 'black';
        }
      } else
      if (mouse.buttonRaw === 0 && mouse.lastButtonRaw === 4) {
        ctx.textAlign = 'center';
        ctx.fillStyle = 'red';
        ctx.fillText('Smoothing...', canvas.width / 2, canvas.height / 5);
        smoothIt = true;
      } else
      if (smoothIt) {
        smoothIt = false;

        var newLine = smoothLine(
          simplifyLineRDP(
            currentLine,
            lineSmooth.lengthMin
          ),
          lineSmooth.angle,
          lineSmooth.match
        );

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backBuffer, 0, 0);
        drawSmoothedLine(newLine, ctx);
        drawing = false;
      }

      if (mouse.buttonRaw === 1 && mouse.lastButtonRaw === 0) {
        currentLine = [];
        drawing = true;

        backBuffer.ctx.clearRect(0, 0, canvas.width, canvas.height);
        backBuffer.ctx.drawImage(canvas, 0, 0);
        currentLine.push([mouse.x, mouse.y]);
      } else
      if (mouse.buttonRaw === 1) {
        var lp = currentLine[currentLine.length - 1]; // get last point
        // dont record point if no movement

        if (mouse.x !== lp[0] || mouse.y !== lp[1]) {
          currentLine.push([mouse.x, mouse.y]);
          ctx.beginPath();
          ctx.moveTo(lp[0], lp[1]);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      } else
      if (mouse.buttonRaw === 0 && mouse.lastButtonRaw === 1) {
        ctx.textAlign = 'center';
        ctx.fillStyle = 'red';
        ctx.fillText('Smoothing...', canvas.width / 2, canvas.height / 5);
        smoothIt = true;
      } else
      if (smoothIt) {
        smoothIt = false;

        var newLine = smoothLine(
          simplifyLineRDP(
            currentLine,
            lineSmooth.lengthMin
          ),
          lineSmooth.angle,
          lineSmooth.match
        );

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backBuffer, 0, 0);
        drawSmoothedLine(newLine, ctx);
        drawing = false;
      }
    }

    // middle button clear
    if (mouse.buttonRaw === 2) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    mouse.lastButtonRaw = mouse.buttonRaw;

    requestAnimationFrame(draw);
  }

  draw();
};
