const APPEND_EVENT = 'mousemove';
const FINISH_EVENTS = ['mouseout', 'mouseleave', 'mouseup'];
const DEFAULT_COLOR = '#0f0';
const DEFAULT_WIDTH = 1;
const getPosition = (ev) => [ev.offsetX, ev.offsetY];

export default function createGetPath(ctx, options = {}) {
  const { color = DEFAULT_COLOR, width = DEFAULT_WIDTH } = options;
  let linePoints = [];
  let currentPos;
  let previousPos;
  let currentResolve;

  ctx.strokeStyle = color;
  ctx.lineWidth = width;

  function startLine(ev) {
    previousPos = getPosition(ev);
    linePoints = [previousPos];
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
    detachEvents();
    currentResolve(linePoints);
  }

  function attachEvents() {
    window.addEventListener(APPEND_EVENT, appendLine);
    FINISH_EVENTS.forEach((finishEvent) => window.addEventListener(finishEvent, finishLine));
  }

  function detachEvents() {
    window.removeEventListener(APPEND_EVENT, appendLine);
    FINISH_EVENTS.forEach((finishEvent) => window.removeEventListener(finishEvent, finishLine));
  }

  return function getPath(startEv) {
    return new Promise((resolve) => {
      currentResolve = resolve;
      startLine(startEv);
      attachEvents();
    });
  };
}
