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

/***/ "./src/draw/drawAndSmooth.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _simplifyLineRDP = __webpack_require__(\"./src/draw/simplifyLineRDP.js\");\n\nvar _simplifyLineRDP2 = _interopRequireDefault(_simplifyLineRDP);\n\nvar _smoothLine = __webpack_require__(\"./src/draw/smoothLine.js\");\n\nvar _smoothLine2 = _interopRequireDefault(_smoothLine);\n\nvar _getPosition = __webpack_require__(\"./src/draw/getPosition.js\");\n\nvar _getPosition2 = _interopRequireDefault(_getPosition);\n\nvar _drawSmoothedLine = __webpack_require__(\"./src/draw/drawSmoothedLine.js\");\n\nvar _drawSmoothedLine2 = _interopRequireDefault(_drawSmoothedLine);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* eslint-disable no-mixed-operators */\n/* eslint-disable max-statements */\n/* eslint-disable no-shadow */\n\nfunction createCanvas(w, h) {\n  var image = document.createElement('canvas');\n\n  image.width = w;\n  image.height = h;\n  image.ctx = image.getContext('2d');\n\n  return image;\n}\n\nexports.default = function (canvas, ctx) {\n  var currentLine = void 0;\n  var pos = void 0;\n  var backBuffer = createCanvas(canvas.width, canvas.height);\n\n  var lineSmooth = {\n    lengthMin: 19.9, // 0 - 20 ?\n    angle: 0.1 // 0 - 1 ?\n  };\n\n  function startLine(ev) {\n    currentLine = [];\n    pos = (0, _getPosition2.default)(ev);\n\n    backBuffer.ctx.clearRect(0, 0, canvas.width, canvas.height);\n    backBuffer.ctx.drawImage(canvas, 0, 0);\n    currentLine.push([pos.x, pos.y]);\n  }\n\n  function appendLine(ev) {\n    var lp = currentLine[currentLine.length - 1]; // get last point\n\n    pos = (0, _getPosition2.default)(ev);\n\n    if (pos.x !== lp[0] || pos.y !== lp[1]) {\n      currentLine.push([pos.x, pos.y]);\n      ctx.beginPath();\n      ctx.moveTo(lp[0], lp[1]);\n      ctx.lineTo(pos.x, pos.y);\n      ctx.stroke();\n\n      return true;\n    }\n\n    return false;\n  }\n\n  function performSmooth() {\n    var newLine = (0, _smoothLine2.default)((0, _simplifyLineRDP2.default)(currentLine, lineSmooth.lengthMin), lineSmooth.angle, lineSmooth.match);\n\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    ctx.drawImage(backBuffer, 0, 0);\n    (0, _drawSmoothedLine2.default)(newLine, ctx);\n  }\n\n  canvas.addEventListener('mousedown', function (ev) {\n    startLine(ev);\n    window.addEventListener('mousemove', appendLine);\n  });\n\n  window.addEventListener('mouseup', function () {\n    window.removeEventListener('mousemove', appendLine);\n    performSmooth();\n  });\n};\n\n//# sourceURL=webpack:///./src/draw/drawAndSmooth.js?");

/***/ }),

/***/ "./src/draw/drawSmoothedLine.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = drawSmoothedLine;\nfunction drawSmoothedLine(line, ctx) {\n  var i = void 0;\n  var p = void 0;\n  var p1 = void 0;\n\n  ctx.beginPath();\n  ctx.moveTo(line[0][0], line[0][1]);\n  for (i = 0; i < line.length - 1; i++) {\n    p = line[i];\n    p1 = line[i + 1];\n    if (p.length === 2) {\n      // linear\n      ctx.lineTo(p[0], p[1]);\n    } else if (p.length === 4) {\n      // bezier 2nd order\n      ctx.quadraticCurveTo(p[2], p[3], p1[0], p1[1]);\n    } else {\n      // bezier 3rd order\n      ctx.bezierCurveTo(p[2], p[3], p[4], p[5], p1[0], p1[1]);\n    }\n  }\n  if (p.length === 2) {\n    ctx.lineTo(p1[0], p1[1]);\n  }\n  ctx.stroke();\n}\n\n//# sourceURL=webpack:///./src/draw/drawSmoothedLine.js?");

/***/ }),

/***/ "./src/draw/getPosition.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = getPosition;\nfunction getPosition(ev) {\n  return {\n    x: ev.offsetX,\n    y: ev.offsetY\n  };\n}\n\n//# sourceURL=webpack:///./src/draw/getPosition.js?");

/***/ }),

/***/ "./src/draw/simpleDraw.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getPosition = __webpack_require__(\"./src/draw/getPosition.js\");\n\nvar _getPosition2 = _interopRequireDefault(_getPosition);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (canvas, ctx) {\n  var oldPos = null;\n\n  function addPixel(ev) {\n    var newPos = (0, _getPosition2.default)(ev);\n\n    ctx.beginPath();\n    ctx.moveTo(oldPos.x, oldPos.y);\n    ctx.lineTo(newPos.x, newPos.y);\n    ctx.closePath();\n    ctx.stroke();\n\n    oldPos = newPos;\n  }\n\n  canvas.addEventListener('mousedown', function (ev) {\n    oldPos = (0, _getPosition2.default)(ev);\n    window.addEventListener('mousemove', addPixel);\n  });\n\n  window.addEventListener('mouseup', function () {\n    oldPos = null;\n    window.removeEventListener('mousemove', addPixel);\n  });\n};\n\n//# sourceURL=webpack:///./src/draw/simpleDraw.js?");

/***/ }),

/***/ "./src/draw/simplifyLineRDP.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = simplifyLineRDP;\n/* eslint-disable max-statements */\n/* eslint-disable no-shadow */\n/* eslint-disable no-var */\n/* eslint-disable func-style */\n/* eslint-disable func-names */\n/* eslint-disable one-var */\n/* eslint-disable sort-vars */\n/* eslint-disable no-mixed-operators */\n/* eslint-disable no-redeclare */\n/* eslint-disable vars-on-top */\n/* eslint-disable no-inner-declarations */\n/* eslint-disable prefer-destructuring */\n/* eslint-disable no-use-before-define */\n\n// Line simplification based on\n// the Ramer–Douglas–Peucker algorithm\n// referance https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm\n// points are and array of arrays consisting of [[x,y],[x,y],...,[x,y]]\n// length is in pixels and is the square of the actual distance.\n// returns array of points of the same form as the input argument points.\nfunction simplifyLineRDP(points, length) {\n  var simplify = function simplify(start, end) {\n    // recursize simplifies points from start to end\n    var maxDist, index, i, xx, yy, dx, dy, ddx, ddy, p1, p2, p, t, dist, dist1;\n\n    p1 = points[start];\n    p2 = points[end];\n    xx = p1[0];\n    yy = p1[1];\n    ddx = p2[0] - xx;\n    ddy = p2[1] - yy;\n    dist1 = ddx * ddx + ddy * ddy;\n    maxDist = length;\n    for (var i = start + 1; i < end; i++) {\n      p = points[i];\n      if (ddx !== 0 || ddy !== 0) {\n        t = ((p[0] - xx) * ddx + (p[1] - yy) * ddy) / dist1;\n        if (t > 1) {\n          dx = p[0] - p2[0];\n          dy = p[1] - p2[1];\n        } else if (t > 0) {\n          dx = p[0] - (xx + ddx * t);\n          dy = p[1] - (yy + ddy * t);\n        } else {\n          dx = p[0] - xx;\n          dy = p[1] - yy;\n        }\n      } else {\n        dx = p[0] - xx;\n        dy = p[1] - yy;\n      }\n      dist = dx * dx + dy * dy;\n      if (dist > maxDist) {\n        index = i;\n        maxDist = dist;\n      }\n    }\n\n    if (maxDist > length) {\n      // continue simplification while maxDist > length\n      if (index - start > 1) {\n        simplify(start, index);\n      }\n      newLine.push(points[index]);\n      if (end - index > 1) {\n        simplify(index, end);\n      }\n    }\n  };\n  var end = points.length - 1;\n  var newLine = [points[0]];\n\n  simplify(0, end);\n  newLine.push(points[end]);\n\n  return newLine;\n}\n\n//# sourceURL=webpack:///./src/draw/simplifyLineRDP.js?");

/***/ }),

/***/ "./src/draw/smoothLine.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = smoothLine;\n/* eslint-disable max-lines */\n/* eslint-disable max-len */\n/* eslint-disable max-depth */\n/* eslint-disable max-statements */\n/* eslint-disable complexity */\n/* eslint-disable no-undefined */\n/* eslint-disable no-bitwise */\n/* eslint-disable no-shadow */\n/* eslint-disable no-var */\n/* eslint-disable func-style */\n/* eslint-disable func-names */\n/* eslint-disable one-var */\n/* eslint-disable sort-vars */\n/* eslint-disable no-mixed-operators */\n/* eslint-disable block-scoped-var */\n/* eslint-disable no-redeclare */\n/* eslint-disable vars-on-top */\n/* eslint-disable no-inner-declarations */\n/* eslint-disable no-undef */\n/* eslint-disable prefer-destructuring */\n/* eslint-disable no-unused-vars */\n/* eslint-disable no-negated-condition */\n/* eslint-disable no-use-before-define */\n\n// This is my own smoothing method\n// It creates a set of bezier control points either 2nd order or third order\n// bezier curves.\n// points: list of points\n// cornerThres: when to smooth corners and represents the angle between to lines.\n//     When the angle is smaller than the cornerThres then smooth.\n// match: if true then the control points will be balanced.\n// Function will make a copy of the points\n\nfunction smoothLine(points, cornerThres, match) {\n  // adds bezier control points at points if lines have angle less than thres\n  var p1, p2, p3, dist1, dist2, x, y, endP, len, angle, i, newPoints, aLen, closed, bal, cont1, nx1, nx2, ny1, ny2, np;\n\n  function dot(x, y, xx, yy) {\n    // get do product\n    // dist1,dist2,nx1,nx2,ny1,ny2 are the length and  normals and used outside function\n    // normalise both vectors\n    dist1 = Math.sqrt(x * x + y * y); // get length\n    if (dist1 > 0) {\n      // normalise\n      nx1 = x / dist1;\n      ny1 = y / dist1;\n    } else {\n      nx1 = 1; // need to have something so this will do as good as anything\n      ny1 = 0;\n    }\n    dist2 = Math.sqrt(xx * xx + yy * yy);\n    if (dist2 > 0) {\n      nx2 = xx / dist2;\n      ny2 = yy / dist2;\n    } else {\n      nx2 = 1;\n      ny2 = 0;\n    }\n\n    return Math.acos(nx1 * nx2 + ny1 * ny2); // dot product\n  }\n  newPoints = []; // array for new points\n  aLen = points.length;\n  if (aLen <= 2) {\n    // nothing to if line too short\n    for (i = 0; i < aLen; i++) {\n      // ensure that the points are copied\n      newPoints.push([points[i][0], points[i][1]]);\n    }\n\n    return newPoints;\n  }\n  p1 = points[0];\n  endP = points[aLen - 1];\n  i = 0; // start from second poitn if line not closed\n  closed = false;\n  len = Math.hypot(p1[0] - endP[0], p1[1] - endP[1]);\n  if (len < Math.SQRT2) {\n    // end points are the same. Join them in coordinate space\n    endP = p1;\n    i = 0; // start from first point if line closed\n    p1 = points[aLen - 2];\n    closed = true;\n  }\n  newPoints.push([points[i][0], points[i][1]]);\n  for (; i < aLen - 1; i++) {\n    p2 = points[i];\n    p3 = points[i + 1];\n    angle = Math.abs(dot(p2[0] - p1[0], p2[1] - p1[1], p3[0] - p2[0], p3[1] - p2[1]));\n    if (dist1 !== 0) {\n      // dist1 and dist2 come from dot function\n      if (angle < cornerThres * 3.14) {\n        // bend it if angle between lines is small\n        if (match) {\n          dist1 = Math.min(dist1, dist2);\n          dist2 = dist1;\n        }\n\n        // use the two normalized vectors along the lines to create the tangent vector\n        x = (nx1 + nx2) / 2;\n        y = (ny1 + ny2) / 2;\n        len = Math.sqrt(x * x + y * y); // normalise the tangent\n        if (len === 0) {\n          newPoints.push([p2[0], p2[1]]);\n        } else {\n          x /= len;\n          y /= len;\n          if (newPoints.length > 0) {\n            var np = newPoints[newPoints.length - 1];\n\n            np.push(p2[0] - x * dist1 * 0.25);\n            np.push(p2[1] - y * dist1 * 0.25);\n          }\n          newPoints.push([// create the new point with the new bezier control points.\n          p2[0], p2[1], p2[0] + x * dist2 * 0.25, p2[1] + y * dist2 * 0.25]);\n        }\n      } else {\n        newPoints.push([p2[0], p2[1]]);\n      }\n    }\n    p1 = p2;\n  }\n  if (closed) {\n    // if closed then copy first point to last.\n    p1 = [];\n    for (i = 0; i < newPoints[0].length; i++) {\n      p1.push(newPoints[0][i]);\n    }\n    newPoints.push(p1);\n  } else {\n    newPoints.push([points[points.length - 1][0], points[points.length - 1][1]]);\n  }\n\n  return newPoints;\n}\n\n//# sourceURL=webpack:///./src/draw/smoothLine.js?");

/***/ }),

/***/ "./src/draw/takenFromWeb.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _simplifyLineRDP = __webpack_require__(\"./src/draw/simplifyLineRDP.js\");\n\nvar _simplifyLineRDP2 = _interopRequireDefault(_simplifyLineRDP);\n\nvar _smoothLine = __webpack_require__(\"./src/draw/smoothLine.js\");\n\nvar _smoothLine2 = _interopRequireDefault(_smoothLine);\n\nvar _drawSmoothedLine = __webpack_require__(\"./src/draw/drawSmoothedLine.js\");\n\nvar _drawSmoothedLine2 = _interopRequireDefault(_drawSmoothedLine);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (canvas, ctx) {\n  // mouse stuff\n  var mouse = {\n    x: 0,\n    y: 0,\n    buttonLastRaw: 0, // user modified value\n    buttonRaw: 0,\n    buttons: [1, 2, 4, 6, 5, 3] // masks for setting and clearing button raw bits;\n  };\n\n  function mouseMove(ev) {\n    mouse.x = ev.offsetX;\n    mouse.y = ev.offsetY;\n    if (mouse.x === undefined) {\n      mouse.x = ev.clientX;\n      mouse.y = ev.clientY;\n    }\n    if (ev.type === 'mousedown') {\n      mouse.buttonRaw |= mouse.buttons[ev.which - 1];\n    } else if (ev.type === 'mouseup') {\n      mouse.buttonRaw &= mouse.buttons[ev.which + 2];\n    } else if (ev.type === 'mouseout') {\n      mouse.buttonRaw = 0;\n      mouse.over = false;\n    } else if (ev.type === 'mouseover') {\n      mouse.over = true;\n    }\n    ev.preventDefault();\n  }\n  canvas.addEventListener('mousemove', mouseMove);\n  canvas.addEventListener('mousedown', mouseMove);\n  canvas.addEventListener('mouseup', mouseMove);\n  canvas.addEventListener('mouseout', mouseMove);\n  canvas.addEventListener('mouseover', mouseMove);\n  canvas.addEventListener('contextmenu', function (e) {\n    e.preventDefault();\n  }, false);\n\n  // creates a drawable image\n  var createImage = function createImage(w, h) {\n    var image = document.createElement('canvas');\n\n    image.width = w;\n    image.height = h;\n    image.ctx = image.getContext('2d');\n\n    return image;\n  };\n\n  // smoothing settings\n  var liveSmooth = void 0;\n  var lineSmooth = {};\n\n  lineSmooth.lengthMin = 19.99; // square of the pixel length\n  lineSmooth.angle = 0.99; // angle threshold\n  lineSmooth.match = false; // not working.\n  // back buffer to save the canvas allowing the new line to be erased\n  var backBuffer = createImage(canvas.width, canvas.height);\n  var currentLine = [];\n\n  mouse.lastButtonRaw = 0; // add mouse last incase not there\n  ctx.lineWidth = 3;\n  ctx.lineJoin = 'round';\n  ctx.lineCap = 'round';\n  ctx.strokeStyle = 'black';\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  var drawing = false; // if drawing\n  var input = false; // if menu input\n  var smoothIt = false; // flag to allow feedback that smoothing is happening as it takes some time.\n\n  function draw() {\n    // if not drawing test for menu interaction and draw the menus\n    if (!drawing) {\n      if (mouse.x < 203 && mouse.y < 24) {\n        if (mouse.y < 13) {\n          if (mouse.buttonRaw === 1) {\n            ctx.clearRect(3, 3, 200, 10);\n            lineSmooth.angle = (mouse.x - 3) / 200;\n            input = true;\n          }\n        } else if (mouse.buttonRaw === 1) {\n          ctx.clearRect(3, 14, 200, 10);\n          lineSmooth.lengthMin = (mouse.x - 3) / 10;\n          input = true;\n        }\n\n        canvas.style.cursor = 'pointer';\n      } else {\n        canvas.style.cursor = 'crosshair';\n      }\n      if (mouse.buttonRaw === 0 && input) {\n        input = false;\n        mouse.lastButtonRaw = 0;\n      }\n      ctx.lineWidth = 0.5;\n      ctx.fillStyle = 'red';\n      ctx.clearRect(3, 3, 200, 10);\n      ctx.clearRect(3, 14, 200, 10);\n      ctx.fillRect(3, 3, lineSmooth.angle * 200, 10);\n      ctx.fillRect(3, 14, lineSmooth.lengthMin * 10, 10);\n\n      ctx.textAlign = 'left';\n      ctx.textBaseline = 'top';\n      ctx.fillStyle = '#000';\n      ctx.strokeRect(3, 3, 200, 10);\n      ctx.fillText('Smooth ' + (lineSmooth.angle * (180 / Math.PI)).toFixed(0) + 'deg', 5, 2);\n      ctx.strokeRect(3, 14, 200, 10);\n      ctx.fillText('Detail ' + lineSmooth.lengthMin.toFixed(0) + 'pixels', 5, 13);\n    } else {\n      canvas.style.cursor = 'crosshair';\n    }\n    if (!input) {\n      ctx.lineWidth = 3;\n      if (mouse.buttonRaw === 4 && mouse.lastButtonRaw === 0) {\n        currentLine = [];\n        drawing = true;\n\n        backBuffer.ctx.clearRect(0, 0, canvas.width, canvas.height);\n        backBuffer.ctx.drawImage(canvas, 0, 0);\n        currentLine.push([mouse.x, mouse.y]);\n      } else if (mouse.buttonRaw === 4) {\n        var lp = currentLine[currentLine.length - 1]; // get last point\n        // dont record point if no movement\n\n        if (mouse.x !== lp[0] || mouse.y !== lp[1]) {\n          currentLine.push([mouse.x, mouse.y]);\n          ctx.beginPath();\n          ctx.moveTo(lp[0], lp[1]);\n          ctx.lineTo(mouse.x, mouse.y);\n          ctx.stroke();\n          liveSmooth = (0, _smoothLine2.default)((0, _simplifyLineRDP2.default)(currentLine, lineSmooth.lengthMin), lineSmooth.angle, lineSmooth.match);\n          ctx.clearRect(0, 0, canvas.width, canvas.height);\n          ctx.drawImage(backBuffer, 0, 0);\n          ctx.strokeStyle = 'Blue';\n          (0, _drawSmoothedLine2.default)(liveSmooth, ctx);\n          ctx.strokeStyle = 'black';\n        }\n      } else if (mouse.buttonRaw === 0 && mouse.lastButtonRaw === 4) {\n        ctx.textAlign = 'center';\n        ctx.fillStyle = 'red';\n        ctx.fillText('Smoothing...', canvas.width / 2, canvas.height / 5);\n        smoothIt = true;\n      } else if (smoothIt) {\n        smoothIt = false;\n\n        var newLine = (0, _smoothLine2.default)((0, _simplifyLineRDP2.default)(currentLine, lineSmooth.lengthMin), lineSmooth.angle, lineSmooth.match);\n\n        ctx.clearRect(0, 0, canvas.width, canvas.height);\n        ctx.drawImage(backBuffer, 0, 0);\n        (0, _drawSmoothedLine2.default)(newLine, ctx);\n        drawing = false;\n      }\n\n      if (mouse.buttonRaw === 1 && mouse.lastButtonRaw === 0) {\n        currentLine = [];\n        drawing = true;\n\n        backBuffer.ctx.clearRect(0, 0, canvas.width, canvas.height);\n        backBuffer.ctx.drawImage(canvas, 0, 0);\n        currentLine.push([mouse.x, mouse.y]);\n      } else if (mouse.buttonRaw === 1) {\n        var lp = currentLine[currentLine.length - 1]; // get last point\n        // dont record point if no movement\n\n        if (mouse.x !== lp[0] || mouse.y !== lp[1]) {\n          currentLine.push([mouse.x, mouse.y]);\n          ctx.beginPath();\n          ctx.moveTo(lp[0], lp[1]);\n          ctx.lineTo(mouse.x, mouse.y);\n          ctx.stroke();\n        }\n      } else if (mouse.buttonRaw === 0 && mouse.lastButtonRaw === 1) {\n        ctx.textAlign = 'center';\n        ctx.fillStyle = 'red';\n        ctx.fillText('Smoothing...', canvas.width / 2, canvas.height / 5);\n        smoothIt = true;\n      } else if (smoothIt) {\n        smoothIt = false;\n\n        var newLine = (0, _smoothLine2.default)((0, _simplifyLineRDP2.default)(currentLine, lineSmooth.lengthMin), lineSmooth.angle, lineSmooth.match);\n\n        ctx.clearRect(0, 0, canvas.width, canvas.height);\n        ctx.drawImage(backBuffer, 0, 0);\n        (0, _drawSmoothedLine2.default)(newLine, ctx);\n        drawing = false;\n      }\n    }\n\n    // middle button clear\n    if (mouse.buttonRaw === 2) {\n      ctx.clearRect(0, 0, canvas.width, canvas.height);\n    }\n    mouse.lastButtonRaw = mouse.buttonRaw;\n\n    requestAnimationFrame(draw);\n  }\n\n  draw();\n}; /* eslint-disable max-lines */\n/* eslint-disable max-len */\n/* eslint-disable max-depth */\n/* eslint-disable max-statements */\n/* eslint-disable complexity */\n/* eslint-disable no-undefined */\n/* eslint-disable no-bitwise */\n/* eslint-disable no-shadow */\n/* eslint-disable no-var */\n/* eslint-disable func-style */\n/* eslint-disable func-names */\n/* eslint-disable one-var */\n/* eslint-disable sort-vars */\n/* eslint-disable no-mixed-operators */\n/* eslint-disable block-scoped-var */\n/* eslint-disable no-redeclare */\n/* eslint-disable vars-on-top */\n/* eslint-disable no-inner-declarations */\n/* eslint-disable no-undef */\n/* eslint-disable prefer-destructuring */\n/* eslint-disable no-unused-vars */\n/* eslint-disable no-negated-condition */\n/* eslint-disable no-use-before-define */\n\n//# sourceURL=webpack:///./src/draw/takenFromWeb.js?");

/***/ }),

/***/ "./src/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(\"./src/styles.scss\");\n\nvar _simpleDraw = __webpack_require__(\"./src/draw/simpleDraw.js\");\n\nvar _simpleDraw2 = _interopRequireDefault(_simpleDraw);\n\nvar _drawAndSmooth = __webpack_require__(\"./src/draw/drawAndSmooth.js\");\n\nvar _drawAndSmooth2 = _interopRequireDefault(_drawAndSmooth);\n\nvar _takenFromWeb = __webpack_require__(\"./src/draw/takenFromWeb.js\");\n\nvar _takenFromWeb2 = _interopRequireDefault(_takenFromWeb);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar canvas = document.querySelector('#app-canvas');\nvar ctx = canvas.getContext('2d');\n\nvar width = void 0;\nvar height = void 0;\nvar ratio = void 0;\n\nfunction resizeCanvas() {\n  width = window.innerWidth;\n  height = window.innerHeight;\n  ratio = window.devicePixelRatio;\n\n  canvas.width = width * ratio;\n  canvas.height = height * ratio;\n  canvas.setAttribute('width', width);\n  canvas.setAttribute('height', height);\n\n  canvas.fillStyle = '#0f0';\n  ctx.fillRect(0, 0, width, height);\n  ctx.fillStyle = '#0f0';\n  ctx.strokeStyle = '#0f0';\n  ctx.lineWidth = 2;\n  ctx.lineJoin = 'round';\n  ctx.lineCap = 'round';\n}\n\nresizeCanvas();\n\n// simpleDraw(canvas, ctx);\n// drawAndSmooth(canvas, ctx);\n(0, _takenFromWeb2.default)(canvas, ctx);\n\nwindow.addEventListener('resize', resizeCanvas);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/styles.scss":
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles.scss?");

/***/ })

/******/ });