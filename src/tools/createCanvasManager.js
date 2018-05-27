function getEl(id) {
  let element;

  if (typeof id === 'string') {
    element = document.querySelector(id);
  } else if (typeof id === HTMLElement) {
    element = id;
  }
  if (!element) {
    throw Error(`Could not find container ${id}`);
  }

  return element;
}

function getCanvases(initialCanvases = []) {
  if (Array.isArray(initialCanvases)) {
    return initialCanvases.map((id) => getEl(id));
  }
  if (typeof initialCanvases === 'string') {
    return Array.from(document.querySelectorAll(initialCanvases));
  }
  throw Error(`Could not identify initialCanvases ${initialCanvases}`);
}

export default function createCanvasManager(container, initialCanvases) {
  const canvases = getCanvases(initialCanvases);
  const el = getEl(container);
  let width;
  let height;
  let ratio;

  window.addEventListener('resize', resize);
  resize();

  return {
    add,
    get,
    remove
  };

  function updateDimensions() {
    const rect = el.getBoundingClientRect();

    width = rect.width; // eslint-disable-line prefer-destructuring
    height = rect.height; // eslint-disable-line prefer-destructuring
    ratio = window.devicePixelRatio;
  }

  function resizeCanvas(canvas) {
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
  }

  function resize() {
    updateDimensions();
    canvases.forEach(resizeCanvas);
  }

  function add(append = true) {
    const canvas = document.createElement('canvas');

    resizeCanvas(canvas);

    if (append) {
      canvases.push(canvas);
      el.appendChild(canvas);
    } else {
      canvases.unshift(canvas);
      el.prependChild(canvas);
    }

    return {
      canvas,
      ctx: canvas.getContext('2d')
    };
  }

  function get(id) {
    let canvas;
    let index;

    if (id instanceof HTMLCanvasElement) {
      canvas = id;
      index = canvases.indexOf(canvas);
    } else if (typeof id === 'string') {
      canvas = canvases.find((c) => c.id === id);
      index = canvases.indexOf(canvas);
    } else if (Number.isInteger(id)) {
      canvas = canvases[id];
      index = id;
    }

    if (!canvas || !Number.isInteger(index)) {
      throw Error(`Canvas manager does not have canvas ${id}`);
    }

    return {
      canvas,
      index
    };
  }

  function remove(id) {
    const { canvas, index } = get(id);

    el.removeChild(canvas);
    canvases.splice(index, 1);
  }
}
