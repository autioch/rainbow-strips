<!doctype html>
<html lang="en">
<head>

  <style>
      body{ background-color: ivory; }
      canvas{border:1px solid red;}
  </style>

  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>

  <script>

  $(function() {

      var canvas=document.getElementById("canvas");
      var ctx=canvas.getContext("2d");

      // set starting values
      var fps = 60;
      var percent=0
      var direction=1;

      // start the animation
      animate();

      function animate() {

          // set the animation position (0-100)
          percent+=direction;
          if(percent<0){ percent=0; direction=1; };
          if(percent>100){ percent=100; direction=-1; };

          draw(percent);

          // request another frame
          setTimeout(function() {
              requestAnimationFrame(animate);
          }, 1000 / fps);
      }


      // draw the current frame based on sliderValue
      function draw(sliderValue){

          // redraw path
          ctx.clearRect(0,0,canvas.width,canvas.height);
          ctx.lineWidth = 5;

          ctx.beginPath();
          ctx.moveTo(100, 20);
          ctx.lineTo(200, 160);
          ctx.strokeStyle = 'red';
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(200, 160);
          ctx.quadraticCurveTo(230, 200, 250, 120);
          ctx.strokeStyle = 'green';
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(250,120);
          ctx.bezierCurveTo(290, -40, 300, 200, 400, 150);
          ctx.strokeStyle = 'blue';
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(400, 150);
          ctx.lineTo(500, 90);
          ctx.strokeStyle = 'gold';
          ctx.stroke();

          // draw the tracking rectangle
          var xy;

          if(sliderValue<25){
              var percent=sliderValue/24;
              xy=getLineXYatPercent({x:100,y:20},{x:200,y:160},percent);
          }
          else if(sliderValue<50){
              var percent=(sliderValue-25)/24
              xy=getQuadraticBezierXYatPercent({x:200,y:160},{x:230,y:200},{x:250,y:120},percent);
          }
          else if(sliderValue<75){
              var percent=(sliderValue-50)/24
              xy=getCubicBezierXYatPercent({x:250,y:120},{x:290,y:-40},{x:300,y:200},{x:400,y:150},percent);
          }
          else {
              var percent=(sliderValue-75)/25
              xy=getLineXYatPercent({x:400,y:150},{x:500,y:90},percent);
          }
          drawRect(xy,"red");

      }


      // draw tracking rect at xy
      function drawRect(point,color){
          ctx.fillStyle="cyan";
          ctx.strokeStyle="gray";
          ctx.lineWidth=3;
          ctx.beginPath();
          ctx.rect(point.x-13,point.y-8,25,15);
          ctx.fill();
          ctx.stroke();
      }

      // draw tracking dot at xy
      function drawDot(point,color){
          ctx.fillStyle=color;
          ctx.strokeStyle="black";
          ctx.lineWidth=3;
          ctx.beginPath();
          ctx.arc(point.x,point.y,8,0,Math.PI*2,false);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
      }

      // line: percent is 0-1
      function getLineXYatPercent(startPt,endPt,percent) {
          var dx = endPt.x-startPt.x;
          var dy = endPt.y-startPt.y;
          var X = startPt.x + dx*percent;
          var Y = startPt.y + dy*percent;
          return( {x:X,y:Y} );
      }

      // quadratic bezier: percent is 0-1
      function getQuadraticBezierXYatPercent(startPt,controlPt,endPt,percent) {
          var x = Math.pow(1-percent,2) * startPt.x + 2 * (1-percent) * percent * controlPt.x + Math.pow(percent,2) * endPt.x;
          var y = Math.pow(1-percent,2) * startPt.y + 2 * (1-percent) * percent * controlPt.y + Math.pow(percent,2) * endPt.y;
          return( {x:x,y:y} );
      }

      // cubic bezier percent is 0-1
      function getCubicBezierXYatPercent(startPt,controlPt1,controlPt2,endPt,percent){
          var x=CubicN(percent,startPt.x,controlPt1.x,controlPt2.x,endPt.x);
          var y=CubicN(percent,startPt.y,controlPt1.y,controlPt2.y,endPt.y);
          return({x:x,y:y});
      }

      // cubic helper formula at percent distance
      function CubicN(pct, a,b,c,d) {
          var t2 = pct * pct;
          var t3 = t2 * pct;
          return a + (-a * 3 + pct * (3 * a - a * pct)) * pct
          + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct
          + (c * 3 - c * 3 * pct) * t2
          + d * t3;
      }


  });   // end $(function(){});

  </script>
</head>
<body>
    <canvas id="canvas" width=600 height=300></canvas>
</body>
</html>
