/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "//" + location.hostname + ":35729/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./src/tools/index.js\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"./src/styles.scss\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nconst canvasManager = Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"createCanvasManager\"])('body');\r\nconst get = () => canvasManager.add().ctx;\r\n\r\nconst getPath = Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"createGetPath\"])(get(), {\r\n  width: 3\r\n});\r\n\r\nconst markPointsOriginal = Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"createMarkPoints\"])(get(), {\r\n  radius: 5\r\n});\r\n\r\nconst markPointsSimplified = Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"createMarkPoints\"])(get(), {\r\n  color: '#f00',\r\n  stroke: false,\r\n  radius: 3\r\n});\r\n\r\nconst smoothDraw = Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"createSmoothDraw\"])(get(), {\r\n  color: '#00f',\r\n  width: 2\r\n});\r\n\r\nconst SIMPLIFY_MIN_LENGTH = 10;\r\nconst SMOOTH_MIN_LENGTH = 19.9;\r\nconst SMOOTH_ANGLE = 0.99;\r\n\r\nwindow.addEventListener('mousedown', async function app(ev) {\r\n  const points = await getPath(ev);\r\n\r\n  markPointsOriginal(points);\r\n\r\n  const simplified = Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"simplifyLineRDP\"])(points, SIMPLIFY_MIN_LENGTH);\r\n\r\n  markPointsSimplified(simplified);\r\n\r\n  const smoothed = Object(_tools__WEBPACK_IMPORTED_MODULE_0__[\"performSmooth\"])(simplified, SMOOTH_MIN_LENGTH, SMOOTH_ANGLE);\r\n\r\n  smoothDraw(smoothed);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/styles.scss":
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles.scss?");

/***/ }),

/***/ "./src/tools/createCanvasManager.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createCanvasManager; });\nfunction getEl(id) {\r\n  let element;\r\n\r\n  if (typeof id === 'string') {\r\n    element = document.querySelector(id);\r\n  } else if (typeof id === HTMLElement) {\r\n    element = id;\r\n  }\r\n  if (!element) {\r\n    throw Error(`Could not find container ${id}`);\r\n  }\r\n\r\n  return element;\r\n}\r\n\r\nfunction getCanvases(initialCanvases = []) {\r\n  if (Array.isArray(initialCanvases)) {\r\n    return initialCanvases.map((id) => getEl(id));\r\n  }\r\n  if (typeof initialCanvases === 'string') {\r\n    return Array.from(document.querySelectorAll(initialCanvases));\r\n  }\r\n  throw Error(`Could not identify initialCanvases ${initialCanvases}`);\r\n}\r\n\r\nfunction createCanvasManager(container, initialCanvases) {\r\n  const canvases = getCanvases(initialCanvases);\r\n  const el = getEl(container);\r\n  let width;\r\n  let height;\r\n  let ratio;\r\n\r\n  window.addEventListener('resize', resize);\r\n  resize();\r\n\r\n  return {\r\n    add,\r\n    get,\r\n    remove\r\n  };\r\n\r\n  function updateDimensions() {\r\n    const rect = el.getBoundingClientRect();\r\n\r\n    width = rect.width; // eslint-disable-line prefer-destructuring\r\n    height = rect.height; // eslint-disable-line prefer-destructuring\r\n    ratio = window.devicePixelRatio;\r\n  }\r\n\r\n  function resizeCanvas(canvas) {\r\n    canvas.width = width * ratio;\r\n    canvas.height = height * ratio;\r\n    canvas.setAttribute('width', width);\r\n    canvas.setAttribute('height', height);\r\n  }\r\n\r\n  function resize() {\r\n    updateDimensions();\r\n    canvases.forEach(resizeCanvas);\r\n  }\r\n\r\n  function add(append = true) {\r\n    const canvas = document.createElement('canvas');\r\n\r\n    resizeCanvas(canvas);\r\n\r\n    if (append) {\r\n      canvases.push(canvas);\r\n      el.appendChild(canvas);\r\n    } else {\r\n      canvases.unshift(canvas);\r\n      el.prependChild(canvas);\r\n    }\r\n\r\n    return {\r\n      canvas,\r\n      ctx: canvas.getContext('2d')\r\n    };\r\n  }\r\n\r\n  function get(id) {\r\n    let canvas;\r\n    let index;\r\n\r\n    if (id instanceof HTMLCanvasElement) {\r\n      canvas = id;\r\n      index = canvases.indexOf(canvas);\r\n    } else if (typeof id === 'string') {\r\n      canvas = canvases.find((c) => c.id === id);\r\n      index = canvases.indexOf(canvas);\r\n    } else if (Number.isInteger(id)) {\r\n      canvas = canvases[id];\r\n      index = id;\r\n    }\r\n\r\n    if (!canvas || !Number.isInteger(index)) {\r\n      throw Error(`Canvas manager does not have canvas ${id}`);\r\n    }\r\n\r\n    return {\r\n      canvas,\r\n      index\r\n    };\r\n  }\r\n\r\n  function remove(id) {\r\n    const { canvas, index } = get(id);\r\n\r\n    el.removeChild(canvas);\r\n    canvases.splice(index, 1);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/tools/createCanvasManager.js?");

/***/ }),

/***/ "./src/tools/createDrawPixels.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createDrawPixels; });\nfunction createDrawPixels(ctx, options = {}) {\r\n  return function drawPixels(points) {\r\n    points.forEach((point) => {\r\n      ctx.beginPath();\r\n      ctx.fillStyle = point.color;\r\n      ctx.fillRect(point.x, point.y, 1, 1);\r\n    });\r\n  };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/tools/createDrawPixels.js?");

/***/ }),

/***/ "./src/tools/createGetPath.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createGetPath; });\nconst APPEND_EVENT = 'mousemove';\r\nconst FINISH_EVENTS = ['mouseout', 'mouseleave', 'mouseup'];\r\nconst DEFAULT_COLOR = '#0f0';\r\nconst DEFAULT_WIDTH = 1;\r\nconst getPosition = (ev) => [ev.offsetX, ev.offsetY];\r\n\r\nfunction createGetPath(ctx, options = {}) {\r\n  const { color = DEFAULT_COLOR, width = DEFAULT_WIDTH } = options;\r\n  let linePoints = [];\r\n  let currentPos;\r\n  let previousPos;\r\n  let currentResolve;\r\n\r\n  ctx.strokeStyle = color;\r\n  ctx.lineWidth = width;\r\n\r\n  function startLine(ev) {\r\n    previousPos = getPosition(ev);\r\n    linePoints = [previousPos];\r\n  }\r\n\r\n  function appendLine(ev) {\r\n    currentPos = getPosition(ev);\r\n    linePoints.push(currentPos);\r\n    ctx.beginPath();\r\n    ctx.moveTo(...previousPos);\r\n    ctx.lineTo(...currentPos);\r\n    ctx.stroke();\r\n    previousPos = currentPos;\r\n  }\r\n\r\n  function finishLine() {\r\n    detachEvents();\r\n    currentResolve(linePoints);\r\n  }\r\n\r\n  function attachEvents() {\r\n    window.addEventListener(APPEND_EVENT, appendLine);\r\n    FINISH_EVENTS.forEach((finishEvent) => window.addEventListener(finishEvent, finishLine));\r\n  }\r\n\r\n  function detachEvents() {\r\n    window.removeEventListener(APPEND_EVENT, appendLine);\r\n    FINISH_EVENTS.forEach((finishEvent) => window.removeEventListener(finishEvent, finishLine));\r\n  }\r\n\r\n  return function getPath(startEv) {\r\n    return new Promise((resolve) => {\r\n      currentResolve = resolve;\r\n      startLine(startEv);\r\n      attachEvents();\r\n    });\r\n  };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/tools/createGetPath.js?");

/***/ }),

/***/ "./src/tools/createMarkPoints.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createMarkPoints; });\nconst DEFAULT_COLOR = '#ff0';\r\nconst DEFAULT_RADIUS = 3;\r\n\r\nfunction createMarkPoints(ctx, options = {}) {\r\n  const { color = DEFAULT_COLOR, radius = DEFAULT_RADIUS, stroke = true } = options;\r\n\r\n  const prop = stroke ? 'stroke' : 'fill';\r\n\r\n  ctx[`${prop}Style`] = color;\r\n\r\n  return function markPoints(points) {\r\n    points.forEach((point) => {\r\n      ctx.beginPath();\r\n      ctx.arc(...point, radius, 0, 2 * Math.PI);\r\n      ctx[prop]();\r\n    });\r\n  };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/tools/createMarkPoints.js?");

/***/ }),

/***/ "./src/tools/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createGetPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./src/tools/createGetPath.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createGetPath\", function() { return _createGetPath__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _createCanvasManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"./src/tools/createCanvasManager.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createCanvasManager\", function() { return _createCanvasManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _createMarkPoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(\"./src/tools/createMarkPoints.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createMarkPoints\", function() { return _createMarkPoints__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _simplifyLineRDP__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(\"./src/tools/simplifyLineRDP.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"simplifyLineRDP\", function() { return _simplifyLineRDP__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _smooth_createSmoothDraw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(\"./src/tools/smooth/createSmoothDraw.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createSmoothDraw\", function() { return _smooth_createSmoothDraw__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _smooth_performSmooth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(\"./src/tools/smooth/performSmooth.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"performSmooth\", function() { return _smooth_performSmooth__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _createDrawPixels__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(\"./src/tools/createDrawPixels.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createDrawPixels\", function() { return _createDrawPixels__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  createGetPath: _createGetPath__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\r\n  createCanvasManager: _createCanvasManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n  createMarkPoints: _createMarkPoints__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\r\n  simplifyLineRDP: _simplifyLineRDP__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\r\n  performSmooth: _smooth_performSmooth__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\r\n  createSmoothDraw: _smooth_createSmoothDraw__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\r\n  createDrawPixels: _createDrawPixels__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\r\n});\r\n\n\n//# sourceURL=webpack:///./src/tools/index.js?");

/***/ }),

/***/ "./src/tools/simplifyLineRDP.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return simplifyLineRDP; });\n/* eslint-disable no-mixed-operators */\r\n\r\nfunction getXY(p, start, end) {\r\n  const [startX, startY] = start;\r\n  const [endX, endY] = end;\r\n  const [pX, pY] = p;\r\n  const ddx = endX - startX;\r\n  const ddy = endY - startY;\r\n\r\n  if (ddx !== 0 || ddy !== 0) {\r\n    const dist = ddx * ddx + ddy * ddy;\r\n    const t = ((pX - startX) * ddx + (pY - startY) * ddy) / dist;\r\n\r\n    if (t > 1) {\r\n      return [pX - endX, pY - endY];\r\n    } else if (t > 0) {\r\n      return [pX - (startX + ddx * t), pY - (startY + ddy * t)];\r\n    }\r\n\r\n    return [pX - startX, pY - startY];\r\n  }\r\n\r\n  return [pX - startX, pY - startY];\r\n}\r\n\r\n// Line simplification based on\r\n// the Ramer–Douglas–Peucker algorithm\r\n// referance https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm\r\n// points are and array of arrays consisting of [[x,y],[x,y],...,[x,y]]\r\n// minLength is in pixels and is the square of the actual distance.\r\n// returns array of points of the same form as the input argument points.\r\nfunction simplifyLineRDP(points, minLength) {\r\n  const newLine = [points[0]];\r\n\r\n  function simplify(start, end) { // recursize simplifies points from start to end\r\n    const p1 = points[start];\r\n    const p2 = points[end];\r\n    let maxDist = minLength;\r\n    let index = start + 1;\r\n\r\n    for (let i = start + 1; i < end; i++) {\r\n      const p = points[i];\r\n      const [dx, dy] = getXY(p, p1, p2);\r\n      const dist = dx * dx + dy * dy;\r\n\r\n      if (dist > maxDist) {\r\n        index = i;\r\n        maxDist = dist;\r\n      }\r\n    }\r\n\r\n    if (maxDist > minLength) { // continue simplification while maxDist > minLength\r\n      if (index - start > 1) {\r\n        simplify(start, index);\r\n      }\r\n      newLine.push(points[index]);\r\n      if (end - index > 1) {\r\n        simplify(index, end);\r\n      }\r\n    }\r\n  }\r\n\r\n  simplify(0, points.length - 1);\r\n\r\n  newLine.push(points[points.length - 1]);\r\n\r\n  return newLine;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/tools/simplifyLineRDP.js?");

/***/ }),

/***/ "./src/tools/smooth/createSmoothDraw.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return drawSmooth; });\nconst DEFAULT_COLOR = '#00f';\r\nconst DEFAULT_WIDTH = 1;\r\n\r\nfunction drawSmooth(ctx, options = {}) {\r\n  const { color = DEFAULT_COLOR, width = DEFAULT_WIDTH } = options;\r\n\r\n  ctx.strokeStyle = color;\r\n  ctx.lineWidth = width;\r\n\r\n  return function draw(line) {\r\n    let i;\r\n    let p;\r\n    let p1;\r\n\r\n    ctx.beginPath();\r\n    ctx.moveTo(...line[0]);\r\n\r\n    for (i = 0; i < line.length - 1; i++) {\r\n      p = line[i];\r\n      p1 = line[i + 1];\r\n\r\n      if (p.length === 2) { // linear\r\n        ctx.lineTo(...p);\r\n      } else if (p.length === 4) { // bezier 2nd order\r\n        ctx.quadraticCurveTo(p[2], p[3], p1[0], p1[1]);\r\n      } else { // bezier 3rd order\r\n        ctx.bezierCurveTo(p[2], p[3], p[4], p[5], p1[0], p1[1]);\r\n      }\r\n      ctx.stroke();\r\n    }\r\n\r\n    if (p.length === 2) {\r\n      ctx.lineTo(...p1);\r\n    }\r\n    ctx.stroke();\r\n  };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/tools/smooth/createSmoothDraw.js?");

/***/ }),

/***/ "./src/tools/smooth/performSmooth.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return performSmooth; });\n/* eslint-disable max-depth */\r\n/* eslint-disable max-statements */\r\n/* eslint-disable no-mixed-operators */\r\n\r\n// It creates a set of bezier control points either 2nd order or third order\r\n// bezier curves.\r\n// points: list of points\r\n// cornerThres: when to smooth corners and represents the angle between to lines.\r\n//     When the angle is smaller than the cornerThres then smooth.\r\n// match: if true then the control points will be balanced.\r\n// Function will make a copy of the points\r\n\r\n// adds bezier control points at points if lines have angle less than thres\r\nfunction performSmooth(points, cornerThres, match) {\r\n  const newPoints = []; // array for new points\r\n  const aLen = points.length;\r\n  let i;\r\n\r\n  if (aLen <= 2) { // nothing to if line too short\r\n    for (i = 0; i < aLen; i++) { // ensure that the points are copied\r\n      newPoints.push([...points[i]]);\r\n    }\r\n\r\n    return newPoints;\r\n  }\r\n\r\n  const endP = points[aLen - 1];\r\n  let [p1] = points;\r\n\r\n  i = 0; // start from second poitn if line not isClosed\r\n  let isClosed = false;\r\n\r\n  // end points are the same. Join them in coordinate space\r\n  if (Math.hypot(p1[0] - endP[0], p1[1] - endP[1]) < Math.SQRT2) {\r\n    i = 0; // start from first point if line isClosed\r\n    p1 = points[aLen - 2];\r\n    isClosed = true;\r\n  }\r\n\r\n  newPoints.push([...points[i]]);\r\n\r\n  for (; i < aLen - 1; i++) {\r\n    const p2 = points[i];\r\n    const p3 = points[i + 1];\r\n    const cx = p2[0] - p1[0];\r\n    const cy = p2[1] - p1[1];\r\n    const xx = p3[0] - p2[0];\r\n    const yy = p3[1] - p2[1];\r\n    let dist1 = Math.sqrt(cx * cx + cy * cy); // get length\r\n    const nx1 = dist1 > 0 ? cx / dist1 : 1;\r\n    const ny1 = dist1 > 0 ? cy / dist1 : 0;\r\n    let dist2 = Math.sqrt(xx * xx + yy * yy);\r\n    const nx2 = dist2 > 0 ? xx / dist2 : 1;\r\n    const ny2 = dist2 > 0 ? yy / dist2 : 0;\r\n    const angle = Math.abs(Math.acos(nx1 * nx2 + ny1 * ny2));\r\n\r\n    if (dist1 !== 0) { // dist1 and dist2 come from dot function\r\n      if (angle < cornerThres * 3.14) { // bend it if angle between lines is small\r\n        if (match) {\r\n          dist2 = dist1;\r\n          dist1 = Math.min(dist1, dist2);\r\n        }\r\n\r\n        // use the two normalized vectors along the lines to create the tangent vector\r\n        let x = (nx1 + nx2) / 2;\r\n        let y = (ny1 + ny2) / 2;\r\n        const len2 = Math.sqrt(x * x + y * y); // normalise the tangent\r\n\r\n        if (len2 === 0) {\r\n          newPoints.push([...p2]);\r\n        } else {\r\n          x /= len2;\r\n          y /= len2;\r\n          if (newPoints.length > 0) {\r\n            const np = newPoints[newPoints.length - 1];\r\n\r\n            np.push(p2[0] - x * dist1 * 0.25);\r\n            np.push(p2[1] - y * dist1 * 0.25);\r\n          }\r\n          newPoints.push([p2[0], p2[1], p2[0] + x * dist2 * 0.25, p2[1] + y * dist2 * 0.25]);\r\n        }\r\n      } else {\r\n        newPoints.push([...p2]);\r\n      }\r\n    }\r\n    p1 = p2;\r\n  }\r\n\r\n  if (isClosed) { // if isClosed then copy first point to last.\r\n    p1 = [];\r\n    for (i = 0; i < newPoints[0].length; i++) {\r\n      p1.push(newPoints[0][i]);\r\n    }\r\n    newPoints.push(p1);\r\n  } else {\r\n    newPoints.push([...points[points.length - 1]]);\r\n  }\r\n\r\n  return newPoints;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/tools/smooth/performSmooth.js?");

/***/ })

/******/ });