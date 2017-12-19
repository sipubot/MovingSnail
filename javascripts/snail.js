var Snail = (function (Snail, undefined) {
  "use strict";
  // Converts from degrees to radians.
  Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
  };
  // Converts from radians to degrees.
  Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
  };
  Math.addDegree = function (deg1, deg2) {
    var a = deg1 + deg2;
    if (a < 0) {
      a = 360 + a;
    }
    if (a > 360) {
      a = a - 360;
    }
    return a;
  };
  Math.getMoveAngle = function (cx, cy, x, y, angle) {
    x = x - cx;
    y = y - cy;
    var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * x + sin * y,
      ny = cos * y - sin * x;
    var rad = Math.atan2(ny, nx);
    return rad;
  };
  //force edit
  Math.forceFoward = function (angle, pow) {
    pow = pow * 2 * 0.333;
    var x = Math.cos(Math.radians(angle)) * pow;
    var y = Math.sin(Math.radians(angle)) * pow;
    return {
      "x": x,
      "y": y
    };
  };
  Math.getRadian = function (A, B, C) {
    var AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
    var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
    var AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
    return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
  };
  Math.getRange = function (A, B) {
    return Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
  };

  function loadImages(imgGetList, imgSetList, callback) {
    var img = imgGetList;
    var loadcheck = 0;
    img.map((a, i) => {
      var newImg = new Image();
      newImg.onload = function () {
        imgSetList[a[0]] = newImg;
        loadcheck++;
        if (loadcheck === img.length) {
          return callback();
        }
      };
      newImg.src = a[1];
    });
  }

  function getMousePosion(event) {
    var dot, eventDoc, doc, body, pageX, pageY;
    event = event || window.event; // IE-ism
    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY +
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0);
    }
    var pos = {
      "x": event.pageX,
      "y": event.pageY
    };
    return pos;
  }
  var Carrot = {};
  Carrot.set = {
    "Canvas": [],
    "feedList": [{}, {}, {}]
  };

  Snail.set = {
    "Height": 0,
    "Width": 0,
    "Health": 50,
    "Canvas": null,
    "CanvasCom": null,
    "CanvasSize": 40,
    "Context": null,
    "ContextCom": null,
    "ratioMovingAngle": [0.25, 0.12, 0.08, 0.05, 0.05, 0.08, 0.12, 0.25],
    "ratioMovingDistance": [0.05, 0.1, 0.2, 0.4, 0.75, 0.85, 0.94, 1],
    "Angle": 0,
    "Position": {
      "x": 20,
      "y": 20
    },
    "firstMove": false,
    "onMove": false,
    "Sprite": null,
    "Images": {},
    "Imageslink": [
      ["Carrot", "images/carrot.png"],
      ["Snail0", "images/0.png"],
      ["Snail1", "images/1.png"],
      ["Snail2", "images/2.png"],
      ["Snail3", "images/3.png"]
    ]
  };
  var obj_S = Snail.set;
  var obj_C = Carrot.set;

  Carrot.remove = function (index) {
    //add health snail
    obj_S.Health += 20;
    obj_C.feedList[index].x = false;
    obj_C.feedList[index].y = false;
    obj_C.Canvas[index].style.top = -100 + "px";
    obj_C.Canvas[index].style.left = -100 + "px";
  };

  Carrot.add = function (index, pos) {
    obj_C.feedList[index].x = pos.x;
    obj_C.feedList[index].y = pos.y;
    obj_C.Canvas[index].style.top = (obj_C.feedList[index].y + 10) + "px";
    obj_C.Canvas[index].style.left = (obj_C.feedList[index].x + 10) + "px";
  };

  Carrot.setLocation = function () {
    document.addEventListener("click", function (e) {
      var fpos = getMousePosion(e);
      for (var i = 0; i < obj_C.feedList.length; i++) {
        if (obj_C.feedList[i].x === false) {
          Carrot.add(i, fpos);
          break;
        }
      }
    }, true);
  };

  Carrot.init = function () {
    obj_C.feedList.map(a => {
      a.x = false;
      a.y = false;
      return a;
    });
  };

  Snail.findFeed = function () {
    // if health 0 snail is dying 
    if (obj_S.Health <= 0) return false;

    var timer;
    var minindex = -1;
    var temp = 0;
    var waylist = [0, 0, 0];

    (function loop() {
      //if snail is full dont moving feed
      if (obj_S.onMove === true || obj_S.Health > 80) {
        timer = window.setTimeout(loop, 1000);
      } else {
        minindex = -1;
        temp = 9999999;
        obj_C.feedList.map((a, i) => {
          if (a.x !== false) {
            waylist[i] = Math.getRange(obj_S.Position, obj_C.feedList[i]);
          } else {
            waylist[i] = 10000000;
          }
        });
        waylist.map((a, i) => {
          if (a < temp) {
            temp = a;
            minindex = i;
          }
        });
        if (minindex !== -1) {
          var roots = getRoot(obj_S.Position, obj_C.feedList[minindex]);
          Shot(roots, minindex);
        }
        timer = window.setTimeout(loop, 450);
      }
    })();
  };

  Snail.firstMove = function () {
    document.onmousemove = function (e) {
      if (obj_S.firstMove === false) {
        Snail.Health();
        var fpos = getMousePosion(e);
        var roots = getRoot(obj_S.Position, fpos);
        Shot(roots);
        obj_S.firstMove = true;
      }
    };
  };

  Snail.Health = () => {
    var timer;
    (function loop() {
      if (0 === obj_S.Health) {
        obj_S.CanvasCom.style.top = obj_S.Position.y + "px";
        obj_S.CanvasCom.style.left = obj_S.Position.x + "px";
        obj_S.ContextCom.clearRect(0, 0, 80, 20);
        obj_S.ContextCom.font = '12px Comic Sans';
        obj_S.ContextCom.fillText('Bye......', 0, 10);
        timer = null;
        return false;
      }
      obj_S.CanvasCom.style.top = obj_S.Position.y + "px";
      obj_S.CanvasCom.style.left = obj_S.Position.x + "px";
      obj_S.ContextCom.clearRect(0, 0, 80, 20);
      if (30 > obj_S.Health) {
        obj_S.CanvasCom.style.top = obj_S.Position.y + "px";
        obj_S.CanvasCom.style.left = obj_S.Position.x + "px";
        obj_S.ContextCom.clearRect(0, 0, 80, 20);
        obj_S.ContextCom.font = '12px Comic Sans';
        obj_S.ContextCom.fillText('I\'m hungry ;;', 0, 10);
      }
      if (80 < obj_S.Health) {
        obj_S.CanvasCom.style.top = obj_S.Position.y + "px";
        obj_S.CanvasCom.style.left = obj_S.Position.x + "px";
        obj_S.ContextCom.clearRect(0, 0, 80, 20);
        obj_S.ContextCom.font = '12px Comic Sans';
        obj_S.ContextCom.fillText('I\'m full...', 0, 10);
      }
      if (obj_S.onMove === true) {
        obj_S.Health -= 4;
      } else {
        obj_S.Health -= 2;
      }
      obj_S.Health = obj_S.Health < 0 ? 0 : obj_S.Health;
      //on test
      timer = window.setTimeout(loop, 2000);
    })();
  };

  Snail.init = function () {
    var imglist = Array.apply(null, Array(4)).map((a, i) => obj_S.Images["Snail" + i]);
    obj_S.Height = 1024;
    obj_S.Width = 766;
    obj_S.Canvas = document.getElementById("snail");
    obj_S.CanvasCom = document.getElementById("snailComment");
    obj_S.Context = obj_S.Canvas.getContext("2d");
    obj_S.ContextCom = obj_S.CanvasCom.getContext("2d");
    obj_S.Context.translate(obj_S.CanvasSize * 0.5, obj_S.CanvasSize * 0.5);
    obj_S.Sprite = imglist.concat((imglist.slice(0)).reverse());
    for (var i = 0; i < 3; i++) {
      var temp = document.getElementById("carrot" + i);
      var tempCtx = temp.getContext("2d");
      obj_C.Canvas.push(temp);
      tempCtx.drawImage(obj_S.Images.Carrot, 0, 0, 20, 20);
    }
    Carrot.init();
    Carrot.setLocation();
    Snail.firstMove();
    Snail.findFeed();
  };

  function moveOneStep(a, b) {
    var moveAngle = Math.getMoveAngle(a.x, a.y, b.x, b.y, obj_S.Angle);
    var ratAn = obj_S.ratioMovingAngle.slice(0);
    var ratio = obj_S.ratioMovingDistance.slice(0);
    var spIdx = 0;
    var movex = b.x - a.x;
    var movey = b.y - a.y;
    var xarr = Array.apply(null, Array(8)).map((x, i) => ratio[i] * movex + obj_S.Position.x);
    var yarr = Array.apply(null, Array(8)).map((y, i) => ratio[i] * movey + obj_S.Position.y);
    ratAn = ratAn.map((a, i) => ratAn[i] * moveAngle);
    var timer;

    (function loop() {
      if (1 > xarr.length) return;
      //move canvas
      obj_S.Canvas.style.top = yarr[0] + "px";
      obj_S.Canvas.style.left = xarr[0] + "px";
      obj_S.Position.x = xarr[0];
      obj_S.Position.y = yarr[0];
      //rotatecanvas
      obj_S.Context.clearRect(obj_S.CanvasSize * -1, obj_S.CanvasSize * -1, obj_S.CanvasSize * 2, obj_S.CanvasSize * 2);
      obj_S.Context.rotate(ratAn[0]);
      obj_S.Angle = Math.addDegree(obj_S.Angle, Math.degrees(ratAn[0]));
      //change image
      obj_S.Context.drawImage(obj_S.Sprite[spIdx], -10, -10, 20, 20);
      xarr.shift();
      yarr.shift();
      ratAn.shift();
      spIdx++;
      timer = window.setTimeout(loop, 50);
    })();
  }

  function Shot(list, feedidx) {
    var timer;
    obj_S.onMove = true;
    (function loop() {
      if (1 > list.length) {
        if (feedidx !== undefined) {
          Carrot.remove(feedidx);
        }
        obj_S.onMove = false;
      } else {
        moveOneStep(list[0].p, list[0].Np);
        list.shift();
        timer = window.setTimeout(loop, 450);
      }
    })();
  }

  function getRoot(A, C) {
    var angle = Math.addDegree(Math.degrees(Math.getMoveAngle(A.x, A.y, C.x, C.y, obj_S.Angle) * 0.5), obj_S.Angle);
    var pow = Math.sqrt((C.x - A.x) * (C.x - A.x) + (C.y - A.y) * (C.y - A.y));
    var force = Math.forceFoward(angle, pow);
    var B = {
      "x": A.x + force.x,
      "y": A.y + force.y
    };
    var bez = new Bezier(A.x, A.y, B.x, B.y, C.x, C.y);
    var poslist = bez.getLUT(Math.round((bez.length() < 100 ? 100 : bez.length()) * 0.1));
    var rootlist = [];
    poslist.map((a, i) => {
      if (i < poslist.length - 1) {
        var root = {};
        root.p = poslist[i];
        root.Np = poslist[i + 1];
        rootlist.push(root);
      }
    });
    return rootlist;
  }

  Snail.start = function () {
    loadImages(obj_S.Imageslink, obj_S.Images, Snail.init);
  };
  return Snail;
})(window.Snail || {});
Snail.start();