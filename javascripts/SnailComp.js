var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(h,m,z){h!=Array.prototype&&h!=Object.prototype&&(h[m]=z.value)};$jscomp.getGlobal=function(h){return"undefined"!=typeof window&&window===h?h:"undefined"!=typeof global&&null!=global?global:h};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var h=0;return function(m){return $jscomp.SYMBOL_PREFIX+(m||"")+h++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var h=$jscomp.global.Symbol.iterator;h||(h=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[h]&&$jscomp.defineProperty(Array.prototype,h,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(h){var m=0;return $jscomp.iteratorPrototype(function(){return m<h.length?{done:!1,value:h[m++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(h){$jscomp.initSymbolIterator();h={next:h};h[$jscomp.global.Symbol.iterator]=function(){return this};return h};
var Bezier=function(h){function m(A){if(z[A])return z[A].exports;var w=z[A]={exports:{},id:A,loaded:!1};return h[A].call(w.exports,w,w.exports,m),w.loaded=!0,w.exports}var z={};return m.m=h,m.c=z,m.p="",m(0)}([function(h,m,z){h.exports=z(1)},function(h,m,z){$jscomp.initSymbol();$jscomp.initSymbol();$jscomp.initSymbolIterator();var A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(h){return typeof h}:function(h){$jscomp.initSymbol();$jscomp.initSymbol();return h&&"function"==typeof Symbol&&
h.constructor===Symbol?"symbol":typeof h};!function(){function w(a,b,d,c,f){"undefined"==typeof f&&(f=.5);var v=l.projectionratio(f,a),t=1-v;b={x:v*b.x+t*c.x,y:v*b.y+t*c.y};a=l.abcratio(f,a);return{A:{x:d.x+(d.x-b.x)/a,y:d.y+(d.y-b.y)/a},B:d,C:b}}var x=Math.abs,m=Math.min,q=Math.max,n=Math.cos,r=Math.sin,e=Math.acos,g=Math.sqrt,u=Math.PI,y={x:0,y:0,z:0},l=z(2),B=z(3),p=function(a){var b=a&&a.forEach?a:[].slice.call(arguments),d=!1;if("object"===A(b[0])){d=b.length;var c=[];b.forEach(function(a){["x",
"y","z"].forEach(function(b){"undefined"!=typeof a[b]&&c.push(a[b])})});b=c}var f=!1,k=b.length;if(d){if(4<d){if(1!==arguments.length)throw Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");f=!0}}else if(6!==k&&8!==k&&9!==k&&12!==k&&1!==arguments.length)throw Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");this._3d=d=!f&&(9===k||12===k)||a&&a[0]&&"undefined"!=typeof a[0].z;f=[];for(var t=0,e=d?3:2;k>t;t+=e){var g={x:b[t],y:b[t+1]};d&&(g.z=
b[t+2]);f.push(g)}this.order=f.length-1;this.points=f;b=["x","y"];d&&b.push("z");this.dims=b;this.dimlen=b.length;(function(a){var b=a.points;b=l.align(b,{p1:b[0],p2:b[a.order]});for(var d=0;d<b.length;d++)if(1E-4<x(b[d].y))return void(a._linear=!1);a._linear=!0})(this);this._t1=0;this._t2=1;this.update()};p.fromSVG=function(a){var b=a.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g).map(parseFloat);return/[cq]/.test(a)?(b=b.map(function(a,c){return 2>c?a:a+b[c%2]}),new p(b)):new p(b)};p.quadraticFromPoints=
function(a,b,d,c){if("undefined"==typeof c&&(c=.5),0===c)return new p(b,b,d);if(1===c)return new p(a,b,b);b=w(2,a,b,d,c);return new p(a,b.A,d)};p.cubicFromPoints=function(a,b,d,c,f){"undefined"==typeof c&&(c=.5);var v=w(3,a,b,d,c);"undefined"==typeof f&&(f=l.dist(b,v.C));var t=f*(1-c)/c,e=l.dist(a,d),g=(d.x-a.x)/e;e=(d.y-a.y)/e;v=v.A;return new p(a,{x:a.x+(v.x+(b.x-f*g-v.x)/(1-c)-a.x)/c,y:a.y+(v.y+(b.y-f*e-v.y)/(1-c)-a.y)/c},{x:d.x+(v.x+(b.x+t*g-v.x)/c-d.x)/(1-c),y:d.y+(v.y+(b.y+t*e-v.y)/c-d.y)/(1-
c)},d)};var c=function(){return l};p.getUtils=c;p.prototype={getUtils:c,valueOf:function(){return this.toString()},toString:function(){return l.pointsToString(this.points)},toSVG:function(a){if(this._3d)return!1;a=this.points;for(var b=["M",a[0].x,a[0].y,2===this.order?"Q":"C"],d=1,c=a.length;c>d;d++)b.push(a[d].x),b.push(a[d].y);return b.join(" ")},update:function(){this.dpoints=[];for(var a=this.points,b=a.length,d=b-1;1<b;b--,d--){for(var c,f=[],k=0;d>k;k++)c={x:d*(a[k+1].x-a[k].x),y:d*(a[k+1].y-
a[k].y)},this._3d&&(c.z=d*(a[k+1].z-a[k].z)),f.push(c);this.dpoints.push(f);a=f}this.computedirection()},computedirection:function(){var a=this.points;this.clockwise=0<l.angle(a[0],a[this.order],a[1])},length:function(){return l.length(this.derivative.bind(this))},_lut:[],getLUT:function(a){if(a=a||100,this._lut.length===a)return this._lut;this._lut=[];for(var b=0;a>=b;b++)this._lut.push(this.compute(b/a));return this._lut},on:function(a,b){b=b||5;for(var d,c=this.getLUT(),f=[],k=0,t=0;t<c.length;t++)d=
c[t],l.dist(d,a)<b&&(f.push(d),k+=t/c.length);return f.length?k/f.length:!1},project:function(a){var b=this.getLUT(),d=b.length-1,c=l.closest(b,a);b=c.mdist;var f=c.mpos;if(0===f||f===d)return d=f/d,a=this.compute(d),a.t=d,a.d=b,a;c=(f+1)/d;var k=.1/d;b+=1;for(f=d=(f-1)/d;c+k>d;d+=k){var t=this.compute(d),e=l.dist(a,t);b>e&&(b=e,f=d)}return t=this.compute(f),t.t=f,t.d=b,t},get:function(a){return this.compute(a)},point:function(a){return this.points[a]},compute:function(a){if(0===a)return this.points[0];
if(1===a)return this.points[this.order];var b=this.points,d=1-a;if(1===this.order)return g={x:d*b[0].x+a*b[1].x,y:d*b[0].y+a*b[1].y},this._3d&&(g.z=d*b[0].z+a*b[1].z),g;if(4>this.order){var c,f,k;g=d*d;var t=a*a,e=0;2===this.order?(b=[b[0],b[1],b[2],y],c=g,f=d*a*2,k=t):3===this.order&&(c=g*d,f=g*a*3,k=d*t*3,e=a*t);var g={x:c*b[0].x+f*b[1].x+k*b[2].x+e*b[3].x,y:c*b[0].y+f*b[1].y+k*b[2].y+e*b[3].y};return this._3d&&(g.z=c*b[0].z+f*b[1].z+k*b[2].z+e*b[3].z),g}for(b=JSON.parse(JSON.stringify(this.points));1<
b.length;){for(d=0;d<b.length-1;d++)b[d]={x:b[d].x+(b[d+1].x-b[d].x)*a,y:b[d].y+(b[d+1].y-b[d].y)*a},"undefined"!=typeof b[d].z&&(b[d]=b[d].z+(b[d+1].z-b[d].z)*a);b.splice(b.length-1,1)}return b[0]},raise:function(){var a,b=this.points,d=[b[0]],c=b.length;for(a=1;c>a;a++){var f=b[a],k=b[a-1];d[a]={x:(c-a)/c*f.x+a/c*k.x,y:(c-a)/c*f.y+a/c*k.y}}return d[c]=b[c-1],new p(d)},derivative:function(a){var b,d,c=1-a,f=0,k=this.dpoints[0];2===this.order&&(k=[k[0],k[1],y],b=c,d=a);3===this.order&&(b=c*c,d=c*
a*2,f=a*a);a={x:b*k[0].x+d*k[1].x+f*k[2].x,y:b*k[0].y+d*k[1].y+f*k[2].y};return this._3d&&(a.z=b*k[0].z+d*k[1].z+f*k[2].z),a},inflections:function(){return l.inflections(this.points)},normal:function(a){return this._3d?this.__normal3(a):this.__normal2(a)},__normal2:function(a){a=this.derivative(a);var b=g(a.x*a.x+a.y*a.y);return{x:-a.y/b,y:a.x/b}},__normal3:function(a){var b=this.derivative(a);a=this.derivative(a+.01);var d=g(b.x*b.x+b.y*b.y+b.z*b.z),c=g(a.x*a.x+a.y*a.y+a.z*a.z);b.x/=d;b.y/=d;b.z/=
d;a.x/=c;a.y/=c;a.z/=c;d=a.y*b.z-a.z*b.y;c=a.z*b.x-a.x*b.z;a=a.x*b.y-a.y*b.x;var f=g(d*d+c*c+a*a);d/=f;c/=f;a/=f;a=[d*d,d*c-a,d*a+c,d*c+a,c*c,c*a-d,d*a-c,c*a+d,a*a];return{x:a[0]*b.x+a[1]*b.y+a[2]*b.z,y:a[3]*b.x+a[4]*b.y+a[5]*b.z,z:a[6]*b.x+a[7]*b.y+a[8]*b.z}},hull:function(a){var b=this.points,d=[],c=0,f;d[c++]=b[0];d[c++]=b[1];d[c++]=b[2];for(3===this.order&&(d[c++]=b[3]);1<b.length;){var k=[],t=0;for(f=b.length-1;f>t;t++){var e=l.lerp(a,b[t],b[t+1]);d[c++]=e;k.push(e)}b=k}return d},split:function(a,
b){if(0===a&&b)return this.split(b).left;if(1===b)return this.split(a).right;var d=this.hull(a);d={left:new p(2===this.order?[d[0],d[3],d[5]]:[d[0],d[4],d[7],d[9]]),right:new p(2===this.order?[d[5],d[4],d[2]]:[d[9],d[8],d[6],d[3]]),span:d};if(d.left._t1=l.map(0,0,1,this._t1,this._t2),d.left._t2=l.map(a,0,1,this._t1,this._t2),d.right._t1=l.map(a,0,1,this._t1,this._t2),d.right._t2=l.map(1,0,1,this._t1,this._t2),!b)return d;b=l.map(b,a,1,0,1);return d.right.split(b).left},extrema:function(){var a,b,
d={},c=[];return this.dims.forEach(function(f){b=function(a){return a[f]};a=this.dpoints[0].map(b);d[f]=l.droots(a);3===this.order&&(a=this.dpoints[1].map(b),d[f]=d[f].concat(l.droots(a)));d[f]=d[f].filter(function(a){return 0<=a&&1>=a});c=c.concat(d[f].sort())}.bind(this)),c=c.sort().filter(function(a,b){return c.indexOf(a)===b}),d.values=c,d},bbox:function(){var a=this.extrema(),b={};return this.dims.forEach(function(d){b[d]=l.getminmax(this,d,a[d])}.bind(this)),b},overlaps:function(a){var b=this.bbox();
a=a.bbox();return l.bboxoverlap(b,a)},offset:function(a,b){if("undefined"!=typeof b){var d=this.get(a),c=this.normal(a),f={c:d,n:c,x:d.x+c.x*b,y:d.y+c.y*b};return this._3d&&(f.z=d.z+c.z*b),f}if(this._linear){var k=this.normal(0);d=this.points.map(function(b){var d={x:b.x+a*k.x,y:b.y+a*k.y};return b.z&&c.z&&(d.z=b.z+a*k.z),d});return[new p(d)]}return this.reduce().map(function(b){return b.scale(a)})},simple:function(){if(3===this.order){var a=l.angle(this.points[0],this.points[3],this.points[1]),b=
l.angle(this.points[0],this.points[3],this.points[2]);if(0<a&&0>b||0>a&&0<b)return!1}a=this.normal(0);b=this.normal(1);var d=a.x*b.x+a.y*b.y;this._3d&&(d+=a.z*b.z);a=x(e(d));return u/3>a},reduce:function(){var a,b=0,d=0,c=[],f=[],k=this.extrema().values;-1===k.indexOf(0)&&(k=[0].concat(k));-1===k.indexOf(1)&&k.push(1);b=k[0];for(a=1;a<k.length;a++){d=k[a];var e=this.split(b,d);e._t1=b;e._t2=d;c.push(e);b=d}return c.forEach(function(a){for(d=b=0;1>=d;)for(d=b+.01;1.01>=d;d+=.01)if(e=a.split(b,d),!e.simple()){if(d-=
.01,.01>x(b-d))return[];e=a.split(b,d);e._t1=l.map(b,0,1,a._t1,a._t2);e._t2=l.map(d,0,1,a._t1,a._t2);f.push(e);b=d;break}1>b&&(e=a.split(b,1),e._t1=l.map(b,0,1,a._t1,a._t2),e._t2=a._t2,f.push(e))}),f},scale:function(a){var b=this.order,d=!1;if("function"==typeof a&&(d=a),d&&2===b)return this.raise().scale(d);var c=this.clockwise,f=d?d(0):a,k=d?d(1):a,e=[this.offset(0,10),this.offset(1,10)],D=l.lli4(e[0],e[0].c,e[1],e[1].c);if(!D)throw Error("cannot scale this curve. Try reducing it first.");var n=
this.points,u=[];return[0,1].forEach(function(a){var d=u[a*b]=l.copy(n[a*b]);d.x+=(a?k:f)*e[a].n.x;d.y+=(a?k:f)*e[a].n.y}.bind(this)),d?([0,1].forEach(function(f){if(2!==this.order||!f){var e=n[f+1],k=e.x-D.x,v=e.y-D.y,t=d?d((f+1)/b):a;d&&!c&&(t=-t);var l=g(k*k+v*v);u[f+1]={x:e.x+k/l*t,y:e.y+v/l*t}}}.bind(this)),new p(u)):([0,1].forEach(function(a){if(2!==this.order||!a){var d=u[a*b],c=this.derivative(a);u[a+1]=l.lli4(d,{x:d.x+c.x,y:d.y+c.y},D,n[a+1])}}.bind(this)),new p(u))},outline:function(a,b,
d,c){function f(a,b,d,c,f){return function(e){var k=b-a;return l.map(e,0,1,a+c/d*k,a+(c+f)/d*k)}}b="undefined"==typeof b?a:b;var e,v=this.reduce(),g=v.length,p=[],u=[],n=0,h=this.length(),y="undefined"!=typeof d&&"undefined"!=typeof c;v.forEach(function(e){r=e.length();y?(p.push(e.scale(f(a,d,h,n,r))),u.push(e.scale(f(-b,-c,h,n,r)))):(p.push(e.scale(a)),u.push(e.scale(-b)));n+=r});u=u.map(function(a){return e=a.points,e[3]?a.points=[e[3],e[2],e[1],e[0]]:a.points=[e[2],e[1],e[0]],a}).reverse();v=p[g-
1].points[p[g-1].points.length-1];var x=u[0].points[0];g=l.makeline(u[g-1].points[u[g-1].points.length-1],p[0].points[0]);v=l.makeline(v,x);g=[g].concat(p).concat([v]).concat(u);var r=g.length;return new B(g)},outlineshapes:function(a,b,d){a=this.outline(a,b||a).curves;b=[];for(var c=1,f=a.length;f/2>c;c++){var e=l.makeshape(a[c],a[f-c],d);e.startcap.virtual=1<c;e.endcap.virtual=f/2-1>c;b.push(e)}return b},intersects:function(a,b){return a?a.p1&&a.p2?this.lineIntersects(a):(a instanceof p&&(a=a.reduce()),
this.curveintersects(this.reduce(),a,b)):this.selfintersects(b)},lineIntersects:function(a){var b=m(a.p1.x,a.p2.x),d=m(a.p1.y,a.p2.y),c=q(a.p1.x,a.p2.x),f=q(a.p1.y,a.p2.y),e=this;return l.roots(this.points,a).filter(function(a){a=e.get(a);return l.between(a.x,b,c)&&l.between(a.y,d,f)})},selfintersects:function(a){var b,d=this.reduce(),c=d.length-2,f=[];for(b=0;c>b;b++){var e=d.slice(b,b+1),g=d.slice(b+2);e=this.curveintersects(e,g,a);f=f.concat(e)}return f},curveintersects:function(a,b,d){var c=[];
a.forEach(function(a){b.forEach(function(b){a.overlaps(b)&&c.push({left:a,right:b})})});var f=[];return c.forEach(function(a){a=l.pairiteration(a.left,a.right,d);0<a.length&&(f=f.concat(a))}),f},arcs:function(a){return this._iterate(a||.5,[])},_error:function(a,b,d,c){var f=(c-d)/4;d=this.get(d+f);c=this.get(c-f);b=l.dist(a,b);d=l.dist(a,d);a=l.dist(a,c);return x(d-b)+x(a-b)},_iterate:function(a,b){var c=0;do{var e=0,f=1,k,g=this.get(c),u=!1,p=1,h=0;do{var y=u,x=q,w=(c+f)/2;h++;var q=this.get(w),
m=this.get(f);q=l.getccenter(g,q,m);q.interval={start:c,end:f};m=this._error(q,g,c,f);if(u=a>=m,k=y&&!u,k||(p=f),u){if(1<=f){if(q.interval.end=p=1,x=q,1<f)c={x:q.x+q.r*n(q.e),y:q.y+q.r*r(q.e)},q.e+=l.angle({x:q.x,y:q.y},c,this.get(1));break}f+=(f-c)/2}else f=w}while(!k&&100>e++);if(100<=e)break;x=x?x:q;b.push(x);c=p}while(1>f);return b}};h.exports=p}()},function(h,m,z){!function(){var m=Math.abs,w=Math.cos,x=Math.sin,C=Math.acos,q=Math.atan2,n=Math.sqrt,r=Math.pow,e=function(c){return 0>c?-r(-c,1/
3):r(c,1/3)},g=Math.PI,u=2*g,y=g/2,l=Number.MAX_SAFE_INTEGER,B=Number.MIN_SAFE_INTEGER,p={Tvalues:[-.06405689286260563,.06405689286260563,-.1911188674736163,.1911188674736163,-.3150426796961634,.3150426796961634,-.4337935076260451,.4337935076260451,-.5454214713888396,.5454214713888396,-.6480936519369755,.6480936519369755,-.7401241915785544,.7401241915785544,-.820001985973903,.820001985973903,-.8864155270044011,.8864155270044011,-.9382745520027328,.9382745520027328,-.9747285559713095,.9747285559713095,
-.9951872199970213,.9951872199970213],Cvalues:[.12793819534675216,.12793819534675216,.1258374563468283,.1258374563468283,.12167047292780339,.12167047292780339,.1155056680537256,.1155056680537256,.10744427011596563,.10744427011596563,.09761865210411388,.09761865210411388,.08619016153195327,.08619016153195327,.0733464814110803,.0733464814110803,.05929858491543678,.05929858491543678,.04427743881741981,.04427743881741981,.028531388628933663,.028531388628933663,.0123412297999872,.0123412297999872],arcfn:function(c,
a){var b=a(c),d=b.x*b.x+b.y*b.y;return"undefined"!=typeof b.z&&(d+=b.z*b.z),n(d)},between:function(c,a,b){return c>=a&&b>=c||p.approximately(c,a)||p.approximately(c,b)},approximately:function(c,a,b){return m(c-a)<=(b||1E-6)},length:function(c){var a,b=0,d=p.Tvalues.length;for(a=0;d>a;a++)b+=p.Cvalues[a]*p.arcfn(.5*p.Tvalues[a]+.5,c);return.5*b},map:function(c,a,b,d,e){return d+(c-a)/(b-a)*(e-d)},lerp:function(c,a,b){var d={x:a.x+c*(b.x-a.x),y:a.y+c*(b.y-a.y)};return a.z&&b.z&&(d.z=a.z+c*(b.z-a.z)),
d},pointToString:function(c){var a=c.x+"/"+c.y;return"undefined"!=typeof c.z&&(a+="/"+c.z),a},pointsToString:function(c){return"["+c.map(p.pointToString).join(", ")+"]"},copy:function(c){return JSON.parse(JSON.stringify(c))},angle:function(c,a,b){var d=a.x-c.x;a=a.y-c.y;var e=b.x-c.x;c=b.y-c.y;return q(d*c-a*e,d*e+a*c)},round:function(c,a){var b=""+c,d=b.indexOf(".");return parseFloat(b.substring(0,d+1+a))},dist:function(c,a){var b=c.x-a.x,d=c.y-a.y;return n(b*b+d*d)},closest:function(c,a){var b,
d,e=r(2,63);return c.forEach(function(c,k){d=p.dist(a,c);e>d&&(e=d,b=k)}),{mdist:e,mpos:b}},abcratio:function(c,a){if(2!==a&&3!==a)return!1;if("undefined"==typeof c)c=.5;else if(0===c||1===c)return c;var b=r(c,a)+r(1-c,a);return m((b-1)/b)},projectionratio:function(c,a){if(2!==a&&3!==a)return!1;if("undefined"==typeof c)c=.5;else if(0===c||1===c)return c;var b=r(1-c,a),d=r(c,a)+b;return b/d},lli8:function(c,a,b,d,e,f,k,g){var v=(c-b)*(f-g)-(a-d)*(e-k);return 0==v?!1:{x:((c*d-a*b)*(e-k)-(c-b)*(e*g-
f*k))/v,y:((c*d-a*b)*(f-g)-(a-d)*(e*g-f*k))/v}},lli4:function(c,a,b,d){return p.lli8(c.x,c.y,a.x,a.y,b.x,b.y,d.x,d.y)},lli:function(c,a){return p.lli4(c,c.c,a,a.c)},makeline:function(c,a){var b=z(1),d=c.x,e=c.y,f=a.x,k=a.y,g=(f-d)/3,u=(k-e)/3;return new b(d,e,d+g,e+u,d+2*g,e+2*u,f,k)},findbbox:function(c){var a=l,b=l,d=B,e=B;return c.forEach(function(c){c=c.bbox();a>c.x.min&&(a=c.x.min);b>c.y.min&&(b=c.y.min);d<c.x.max&&(d=c.x.max);e<c.y.max&&(e=c.y.max)}),{x:{min:a,mid:(a+d)/2,max:d,size:d-a},y:{min:b,
mid:(b+e)/2,max:e,size:e-b}}},shapeintersections:function(c,a,b,d,e){if(!p.bboxoverlap(a,d))return[];var f=[],k=[b.startcap,b.forward,b.back,b.endcap];return[c.startcap,c.forward,c.back,c.endcap].forEach(function(a){a.virtual||k.forEach(function(d){if(!d.virtual){var k=a.intersects(d,e);0<k.length&&(k.c1=a,k.c2=d,k.s1=c,k.s2=b,f.push(k))}})}),f},makeshape:function(c,a,b){var d=c.points.length,e=p.makeline(a.points[a.points.length-1],c.points[0]);d=p.makeline(c.points[d-1],a.points[0]);var f={startcap:e,
forward:c,back:a,endcap:d,bbox:p.findbbox([e,c,a,d])},k=p;return f.intersections=function(a){return k.shapeintersections(f,f.bbox,a,a.bbox,b)},f},getminmax:function(c,a,b){if(!b)return{min:0,max:0};var d=l,e=B;-1===b.indexOf(0)&&(b=[0].concat(b));-1===b.indexOf(1)&&b.push(1);for(var f=0,k=b.length;k>f;f++){var g=b[f];g=c.get(g);g[a]<d&&(d=g[a]);g[a]>e&&(e=g[a])}return{min:d,mid:(d+e)/2,max:e,size:e-d}},align:function(c,a){var b=a.p1.x,d=a.p1.y,e=-q(a.p2.y-d,a.p2.x-b);return c.map(function(a){return{x:(a.x-
b)*w(e)-(a.y-d)*x(e),y:(a.x-b)*x(e)+(a.y-d)*w(e)}})},roots:function(c,a){a=a||{p1:{x:0,y:0},p2:{x:1,y:0}};var b=c.length-1,d=p.align(c,a),g=function(a){return 0<=a&&1>=a};if(2===b){b=d[0].y;var f=d[1].y,k=d[2].y,l=b-2*f+k;return 0!==l?(k=-n(f*f-b*k),b=-b+f,[-(k+b)/l,-(-k+b)/l].filter(g)):f!==k&&0===l?[(2*f-k)/2*(f-k)].filter(g):[]}var h,x,q=d[0].y;f=d[1].y;b=d[2].y;l=-q+3*f-3*b+d[3].y;b=(3*q-6*f+3*b)/l;f=(-3*q+3*f)/l;d=(3*f-b*b)/3;var y=d/3;l=(2*b*b*b-9*b*f+q/l*27)/27;f=l/2;q=f*f+y*y*y;if(0>q){var r=
-d/3;r=n(r*r*r);var m=-l/(2*r);m=C(-1>m?-1:1<m?1:m);r=2*e(r);return k=r*w(m/3)-b/3,h=r*w((m+u)/3)-b/3,x=r*w((m+2*u)/3)-b/3,[k,h,x].filter(g)}if(0===q)return m=0>f?e(-f):-e(f),k=2*m-b/3,h=-m-b/3,[k,h].filter(g);k=n(q);return m=e(-f+k),r=e(f+k),[m-r-b/3].filter(g)},droots:function(c){if(3===c.length){var a=c[0],b=c[1],d=c[2];c=a-2*b+d;return 0!==c?(d=-n(b*b-a*d),a=-a+b,[-(d+a)/c,-(-d+a)/c]):b!==d&&0===c?[(2*b-d)/(2*(b-d))]:[]}if(2===c.length)return a=c[0],b=c[1],a!==b?[a/(a-b)]:[]},inflections:function(c){if(4>
c.length)return[];var a=p.align(c,{p1:c[0],p2:c.slice(-1)[0]});c=a[2].x*a[1].y;var b=a[3].x*a[1].y,d=a[1].x*a[2].y;a=a[3].x*a[2].y;a=18*(-3*c+2*b+3*d-a);b=18*(3*c-b-3*d);c=18*(d-c);if(p.approximately(a,0))return!p.approximately(b,0)&&(c=-c/b,0<=c&&1>=c)?[c]:[];c=Math.sqrt(b*b-4*a*c);a*=2;return p.approximately(a,0)?[]:[(c-b)/a,-(b+c)/a].filter(function(a){return 0<=a&&1>=a})},bboxoverlap:function(c,a){var b,d,e,f,g,l=["x","y"],u=l.length;for(b=0;u>b;b++)if(d=l[b],e=c[d].mid,f=a[d].mid,g=(c[d].size+
a[d].size)/2,m(e-f)>=g)return!1;return!0},expandbox:function(c,a){a.x.min<c.x.min&&(c.x.min=a.x.min);a.y.min<c.y.min&&(c.y.min=a.y.min);a.z&&a.z.min<c.z.min&&(c.z.min=a.z.min);a.x.max>c.x.max&&(c.x.max=a.x.max);a.y.max>c.y.max&&(c.y.max=a.y.max);a.z&&a.z.max>c.z.max&&(c.z.max=a.z.max);c.x.mid=(c.x.min+c.x.max)/2;c.y.mid=(c.y.min+c.y.max)/2;c.z&&(c.z.mid=(c.z.min+c.z.max)/2);c.x.size=c.x.max-c.x.min;c.y.size=c.y.max-c.y.min;c.z&&(c.z.size=c.z.max-c.z.min)},pairiteration:function(c,a,b){var d=c.bbox(),
e=a.bbox(),f=b||.5;if(d.x.size+d.y.size<f&&e.x.size+e.y.size<f)return[(1E5*(c._t1+c._t2)/2|0)/1E5+"/"+(1E5*(a._t1+a._t2)/2|0)/1E5];c=c.split(.5);a=a.split(.5);a=[{left:c.left,right:a.left},{left:c.left,right:a.right},{left:c.right,right:a.right},{left:c.right,right:a.left}];a=a.filter(function(a){return p.bboxoverlap(a.left.bbox(),a.right.bbox())});var g=[];return 0===a.length?g:(a.forEach(function(a){g=g.concat(p.pairiteration(a.left,a.right,f))}),g=g.filter(function(a,b){return g.indexOf(a)===b}))},
getccenter:function(c,a,b){var d,e=a.x-c.x,f=a.y-c.y,g=b.x-a.x,l=b.y-a.y,h=e*w(y)-f*x(y);e=e*x(y)+f*w(y);f=g*w(y)-l*x(y);g=g*x(y)+l*w(y);l=(c.x+a.x)/2;var n=(c.y+a.y)/2,r=(a.x+b.x)/2,m=(a.y+b.y)/2;h=p.lli8(l,n,l+h,n+e,r,m,r+f,m+g);e=p.dist(h,c);c=q(c.y-h.y,c.x-h.x);a=q(a.y-h.y,a.x-h.x);b=q(b.y-h.y,b.x-h.x);return b>c?((c>a||a>b)&&(c+=u),c>b&&(d=b,b=c,c=d)):a>b&&c>a?(d=b,b=c,c=d):b+=u,h.s=c,h.e=b,h.r=e,h}};h.exports=p}()},function(h,m,z){!function(){var m=z(2),w=function(h){this.curves=[];this._3d=
!1;h&&(this.curves=h,this._3d=this.curves[0]._3d)};w.prototype={valueOf:function(){return this.toString()},toString:function(){return"["+this.curves.map(function(h){return m.pointsToString(h.points)}).join(", ")+"]"},addCurve:function(h){this.curves.push(h);this._3d=this._3d||h._3d},length:function(){return this.curves.map(function(h){return h.length()}).reduce(function(h,m){return h+m})},curve:function(h){return this.curves[h]},bbox:function(){for(var h=this.curves,w=h[0].bbox(),q=1;q<h.length;q++)m.expandbox(w,
h[q].bbox());return w},offset:function(h){var m=[];return this.curves.forEach(function(q){m=m.concat(q.offset(h))}),new w(m)}};h.exports=w}()}]),Snail=function(h,m){function z(e,g,h){var u=0;e.map(function(l,n){var p=new Image;p.onload=function(){g[l[0]]=p;u++;if(u===e.length)return h()};p.src=l[1]})}function A(e){e=e||window.event;if(null==e.pageX&&null!=e.clientX){var g=e.target&&e.target.ownerDocument||document;var h=g.documentElement;g=g.body;e.pageX=e.clientX+(h&&h.scrollLeft||g&&g.scrollLeft||
0)-(h&&h.clientLeft||g&&g.clientLeft||0);e.pageY=e.clientY+(h&&h.scrollTop||g&&g.scrollTop||0)-(h&&h.clientTop||g&&g.clientTop||0)}return{x:e.pageX,y:e.pageY}}function w(e,g){var h=Math.getMoveAngle(e.x,e.y,g.x,g.y,n.Angle),m=n.ratioMovingAngle.slice(0),l=n.ratioMovingDistance.slice(0),q=0,p=g.x-e.x,c=g.y-e.y,a=Array.apply(null,Array(8)).map(function(a,b){return l[b]*p+n.Position.x}),b=Array.apply(null,Array(8)).map(function(a,b){return l[b]*c+n.Position.y});m=m.map(function(a,b){return m[b]*h});
(function v(){1>a.length||(n.Canvas.style.top=b[0]+"px",n.Canvas.style.left=a[0]+"px",n.Position.x=a[0],n.Position.y=b[0],n.Context.clearRect(-1*n.CanvasSize,-1*n.CanvasSize,2*n.CanvasSize,2*n.CanvasSize),n.Context.rotate(m[0]),n.Angle=Math.addDegree(n.Angle,Math.degrees(m[0])),n.Context.drawImage(n.Sprite[q],-10,-10,20,20),a.shift(),b.shift(),m.shift(),q++,window.setTimeout(v,50))})()}function x(e,g){n.onMove=!0;(function y(){1>e.length?(g!==m&&q.remove(g),n.onMove=!1):(w(e[0].p,e[0].Np),e.shift(),
window.setTimeout(y,450))})()}function C(e,g){var h=Math.addDegree(Math.degrees(.5*Math.getMoveAngle(e.x,e.y,g.x,g.y,n.Angle)),n.Angle);h=Math.forceFoward(h,Math.sqrt((g.x-e.x)*(g.x-e.x)+(g.y-e.y)*(g.y-e.y)));h=new Bezier(e.x,e.y,e.x+h.x,e.y+h.y,g.x,g.y);var m=h.getLUT(Math.round(.1*(100>h.length()?100:h.length()))),l=[];m.map(function(e,g){if(g<m.length-1){var c={};c.p=m[g];c.Np=m[g+1];l.push(c)}});return l}Math.radians=function(e){return e*Math.PI/180};Math.degrees=function(e){return 180*e/Math.PI};
Math.addDegree=function(e,g){var h=e+g;0>h&&(h=360+h);360<h&&(h-=360);return h};Math.getMoveAngle=function(e,g,h,m,l){h-=e;m-=g;g=Math.PI/180*l;e=Math.cos(g);g=Math.sin(g);return Math.atan2(e*m-g*h,e*h+g*m)};Math.forceFoward=function(e,g){g*=.666;var h=Math.cos(Math.radians(e))*g,m=Math.sin(Math.radians(e))*g;return{x:h,y:m}};Math.getRadian=function(e,g,h){var m=Math.sqrt(Math.pow(g.x-e.x,2)+Math.pow(g.y-e.y,2));g=Math.sqrt(Math.pow(g.x-h.x,2)+Math.pow(g.y-h.y,2));e=Math.sqrt(Math.pow(h.x-e.x,2)+
Math.pow(h.y-e.y,2));return Math.acos((g*g+m*m-e*e)/(2*g*m))};Math.getRange=function(e,g){return Math.sqrt(Math.pow(g.x-e.x,2)+Math.pow(g.y-e.y,2))};var q={set:{Canvas:[],feedList:[{},{},{}]}};h.set={Height:0,Width:0,Canvas:null,CanvasSize:40,Context:null,ratioMovingAngle:[.25,.12,.08,.05,.05,.08,.12,.25],ratioMovingDistance:[.05,.1,.2,.4,.75,.85,.94,1],Angle:0,Position:{x:20,y:20},firstMove:!1,onMove:!1,Sprite:null,Images:{},Imageslink:[["Carrot","images/carrot.png"],["Snail0","images/0.png"],["Snail1",
"images/1.png"],["Snail2","images/2.png"],["Snail3","images/3.png"]]};var n=h.set,r=q.set;q.remove=function(e){r.feedList[e].x=!1;r.feedList[e].y=!1;r.Canvas[e].style.top="-100px";r.Canvas[e].style.left="-100px"};q.add=function(e,g){r.feedList[e].x=g.x;r.feedList[e].y=g.y;r.Canvas[e].style.top=r.feedList[e].y+10+"px";r.Canvas[e].style.left=r.feedList[e].x+10+"px"};q.setLocation=function(){document.addEventListener("click",function(e){e=A(e);for(var g=0;g<r.feedList.length;g++)if(!1===r.feedList[g].x){q.add(g,
e);break}},!0)};q.init=function(){r.feedList.map(function(e){e.x=!1;e.y=!1;return e})};h.findFeed=function(){var e=-1,g=0,h=[0,0,0];(function l(){if(!0===n.onMove)window.setTimeout(l,1E3);else{e=-1;g=9999999;r.feedList.map(function(e,c){h[c]=!1!==e.x?Math.getRange(n.Position,r.feedList[c]):1E7});h.map(function(h,c){h<g&&(g=h,e=c)});if(-1!==e){var m=C(n.Position,r.feedList[e]);x(m,e)}window.setTimeout(l,450)}})()};h.firstMove=function(){document.onmousemove=function(e){!1===n.firstMove&&(e=A(e),e=
C(n.Position,e),x(e),n.firstMove=!0)}};h.init=function(){var e=Array.apply(null,Array(4)).map(function(e,g){return n.Images["Snail"+g]});n.Height=1024;n.Width=766;n.Canvas=document.getElementById("snail");n.Context=n.Canvas.getContext("2d");n.Context.translate(.5*n.CanvasSize,.5*n.CanvasSize);n.Sprite=e.concat(e.slice(0).reverse());for(e=0;3>e;e++){var g=document.getElementById("carrot"+e),m=g.getContext("2d");r.Canvas.push(g);m.drawImage(n.Images.Carrot,0,0,20,20)}q.init();q.setLocation();h.firstMove();
h.findFeed()};h.start=function(){z(n.Imageslink,n.Images,h.init)};return h}(window.Snail||{});Snail.start();