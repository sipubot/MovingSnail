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

  Snail.set = {
    "Height": 0,
    "Width": 0,
    "Canvas": null,
    "CarrotCanvas": [],
    "CVsize": 40,
    "Context": null,
    "Images": {},
    "Imageslink": [
      ["Carrot", "images/carrot.png"],
      ["Snail0", "images/0.png"],
      ["Snail1", "images/1.png"],
      ["Snail2", "images/2.png"],
      ["Snail3", "images/3.png"]
    ],
    "Sprite": null,
    "Angle": 0,
    "RangeLimit": 100,
    "Position": {
      "x": 20,
      "y": 20
    },
    "TempMouseP": null,
    "firstMove": false,
    "onMove": false,
    "feedList": [{}, {}, {}],
    "onTimer": null
  };
  Snail.init = function () {
    Snail.set.Height = 1024;
    Snail.set.Width = 766;
    Snail.set.Canvas = document.getElementById("snail");
    Snail.set.Context = Snail.set.Canvas.getContext("2d");
    Snail.set.Context.translate(Snail.set.CVsize * 0.5, Snail.set.CVsize * 0.5);
    Snail.set.feedList.map(a => {
      a.x = false;
      a.y = false;
      return a;
    });
    var imglist = Array.apply(null, {
      length: 4
    }).map((a, i) => Snail.set.Images["Snail" + i]);
    Snail.set.Sprite = imglist.concat((imglist.slice(0)).reverse());
    for (var i = 0; i < 3; i++) {
      var temp = document.getElementById("carrot" + i); 
      Snail.set.CarrotCanvas.push(temp);
      var tempCtx = temp.getContext("2d");
      tempCtx.drawImage(Snail.set.Images.Carrot, 0, 0, 20, 20);
    }
  };

  function loadImages(imgGetList, imgSetList, func) {
    var img = imgGetList;
    var loadcheck = 0;
    img.map((a, i) => {
      var newImg = new Image();
      newImg.onload = function () {
        imgSetList[a[0]] = newImg;
        loadcheck++;
        if (loadcheck === img.length) {
          return func();
        }
      };
      newImg.src = a[1];
    });
  }

  function moveOneStep(a, b) {
    var moveAngle = Math.getMoveAngle(a.x, a.y, b.x, b.y, Snail.set.Angle);
    var ratAn = [0.25, 0.12, 0.08, 0.05, 0.05, 0.08, 0.12, 0.25];
    var ratio = [0.05, 0.1, 0.2, 0.4, 0.75, 0.85, 0.94, 1];
    var spIdx = 0;
    var movex = b.x - a.x;
    var movey = b.y - a.y;

    var xarr = Array.apply(null, {
      length: 8
    }).map((x, i) => ratio[i] * movex + Snail.set.Position.x);
    var yarr = Array.apply(null, {
      length: 8
    }).map((y, i) => ratio[i] * movey + Snail.set.Position.y);
    ratAn = ratAn.map((a, i) => ratAn[i] * moveAngle);

    var timer;
    (function loop() {
      if (1 > xarr.length) return;
      timer = window.setTimeout(function () {
        //move canvas
        Snail.set.Canvas.style.top = yarr[0] + "px";
        Snail.set.Canvas.style.left = xarr[0] + "px";
        Snail.set.Position.x = xarr[0];
        Snail.set.Position.y = yarr[0];
        //rotatecanvas
        Snail.set.Context.clearRect(Snail.set.CVsize * -1, Snail.set.CVsize * -1, Snail.set.CVsize * 2, Snail.set.CVsize * 2);
        Snail.set.Context.rotate(ratAn[0]);
        Snail.set.Angle = Math.addDegree(Snail.set.Angle, Math.degrees(ratAn[0]));
        //change image
        Snail.set.Context.drawImage(Snail.set.Sprite[spIdx], -10, -10, 20, 20);
        xarr.shift();
        yarr.shift();
        ratAn.shift();
        spIdx++;
        loop();
      }, 50);
    })();
  }

  function Shot(list, feedidx) {
    Snail.set.onMove = true;
    var timer;
    (function loop() {
      if (1 > list.length) {
        timer = window.setTimeout(function () {
          if (feedidx !== undefined) {
            renderfeed(feedidx, false);
          }
          Snail.set.onMove = false;
        }, 650);
      } else {
        timer = window.setTimeout(function () {
          moveOneStep(list[0].p, list[0].Np, list[0].angle);
          list.shift();
          loop();
        }, 450);
      }
    })();
  }

  function getRoot(A, C) {
    //ac get harf degree
    var angle = Math.getMoveAngle(A.x, A.y, C.x, C.y, Snail.set.Angle) * 0.5;
    angle = Math.addDegree(Math.degrees(angle), Snail.set.Angle);
    //get pow
    var pow = Math.sqrt((C.x - A.x) * (C.x - A.x) + (C.y - A.y) * (C.y - A.y));
    //get force
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

  function handleMouseMove(event) {
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

  function firstMove() {
    document.onmousemove = function (e) {
      if (Snail.set.firstMove === false) {
        var fpos = handleMouseMove(e);
        var roots = getRoot(Snail.set.Position, fpos);
        Shot(roots);
        Snail.set.firstMove = true;
      }
    };
  }

  function putFeed() {
    document.addEventListener("click", function (e) {
      var fpos = handleMouseMove(e);
      for (var i = 0; i < Snail.set.feedList.length; i++) {
        if (Snail.set.feedList[i].x === false) {
          renderfeed(i, true, fpos);
          break;
        }
      }
    }, true);
    //피드주기 방식을 가장 가까이 있는곳 부터 접근 (길이) 피드 리스트는 길이 제한으로 미리 정해 둘것
  }

  function renderfeed(index, work, pos) {
    if (work) {
      Snail.set.feedList[index].x = pos.x;
      Snail.set.feedList[index].y = pos.y;
      Snail.set.CarrotCanvas[index].style.top = (Snail.set.feedList[index].y + 10) + "px";
      Snail.set.CarrotCanvas[index].style.left = (Snail.set.feedList[index].x + 10) + "px";
    } else {
      Snail.set.feedList[index].x = false;
      Snail.set.feedList[index].y = false;
      Snail.set.CarrotCanvas[index].style.top = -100 + "px";
      Snail.set.CarrotCanvas[index].style.left = -100 + "px";
    }
  }

  function findFeed() {
    var timer, waylist = [0, 0, 0],
      minindex = -1,
      temp = 0;
    (function loop() {
      if (Snail.set.onMove === true) {
        timer = window.setTimeout(function () {
          loop();
        }, 1000);
      } else {
        minindex = -1;
        temp = 9999999;
        Snail.set.feedList.map((a, i) => {
          if (a.x !== false) {
            waylist[i] = Math.getRange(Snail.set.Position, Snail.set.feedList[i]);
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
          var roots = getRoot(Snail.set.Position, Snail.set.feedList[minindex]);
          Shot(roots, minindex);
        }
        timer = window.setTimeout(function () {
          loop();
        }, 450);
      }
    })();
  }

  Snail.start = function () {
    //이미지 테스트
    loadImages(Snail.set.Imageslink, Snail.set.Images, function () {
      Snail.init();
      firstMove();
      putFeed();
      findFeed();
    });
  };
  return Snail;
})(window.Snail || {});
Snail.start();