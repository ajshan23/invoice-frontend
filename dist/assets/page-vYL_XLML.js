import{r as te,E as ne,j as m}from"./index-Dot2ZeBG.js";import{C as J}from"./ComponentContainerCard-70UKjkgc.js";import{R as re,C as X}from"./Row-DGVe-lpy.js";import{P as ie}from"./PageTitle-BPNfL1F3.js";import"./clsx-B-dksMZM.js";import"./Card-CE-bOKUQ.js";import"./CardHeaderContext-B89mYLHu.js";import"./divWithClassName-BNJOBz37.js";var V={exports:{}};(function(ee,oe){(function(T,a){ee.exports=a(te)})(ne,function(q){return function(T){var a={};function i(u){if(a[u])return a[u].exports;var l=a[u]={i:u,l:!1,exports:{}};return T[u].call(l.exports,l,l.exports,i),l.l=!0,l.exports}return i.m=T,i.c=a,i.d=function(u,l,f){i.o(u,l)||Object.defineProperty(u,l,{configurable:!1,enumerable:!0,get:f})},i.n=function(u){var l=u&&u.__esModule?function(){return u.default}:function(){return u};return i.d(l,"a",l),l},i.o=function(u,l){return Object.prototype.hasOwnProperty.call(u,l)},i.p="/",i(i.s=11)}([function(T,a,i){(function(u){if(u.env.NODE_ENV!=="production"){var l=typeof Symbol=="function"&&Symbol.for&&Symbol.for("react.element")||60103,f=function(c){return typeof c=="object"&&c!==null&&c.$$typeof===l},p=!0;T.exports=i(14)(f,p)}else T.exports=i(16)()}).call(a,i(2))},function(T,a){T.exports=q},function(T,a){var i=T.exports={},u,l;function f(){throw new Error("setTimeout has not been defined")}function p(){throw new Error("clearTimeout has not been defined")}(function(){try{typeof setTimeout=="function"?u=setTimeout:u=f}catch{u=f}try{typeof clearTimeout=="function"?l=clearTimeout:l=p}catch{l=p}})();function c(t){if(u===setTimeout)return setTimeout(t,0);if((u===f||!u)&&setTimeout)return u=setTimeout,setTimeout(t,0);try{return u(t,0)}catch{try{return u.call(null,t,0)}catch{return u.call(this,t,0)}}}function v(t){if(l===clearTimeout)return clearTimeout(t);if((l===p||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(t);try{return l(t)}catch{try{return l.call(null,t)}catch{return l.call(this,t)}}}var y=[],S=!1,O,g=-1;function r(){!S||!O||(S=!1,O.length?y=O.concat(y):g=-1,y.length&&e())}function e(){if(!S){var t=c(r);S=!0;for(var o=y.length;o;){for(O=y,y=[];++g<o;)O&&O[g].run();g=-1,o=y.length}O=null,S=!1,v(t)}}i.nextTick=function(t){var o=new Array(arguments.length-1);if(arguments.length>1)for(var h=1;h<arguments.length;h++)o[h-1]=arguments[h];y.push(new d(t,o)),y.length===1&&!S&&c(e)};function d(t,o){this.fun=t,this.array=o}d.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={};function n(){}i.on=n,i.addListener=n,i.once=n,i.off=n,i.removeListener=n,i.removeAllListeners=n,i.emit=n,i.prependListener=n,i.prependOnceListener=n,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(u){return u.reduce(function(l,f){return l+f})/u.length}},function(T,a,i){function u(f){return function(){return f}}var l=function(){};l.thatReturns=u,l.thatReturnsFalse=u(!1),l.thatReturnsTrue=u(!0),l.thatReturnsNull=u(null),l.thatReturnsThis=function(){return this},l.thatReturnsArgument=function(f){return f},T.exports=l},function(T,a,i){(function(u){var l=function(c){};u.env.NODE_ENV!=="production"&&(l=function(c){if(c===void 0)throw new Error("invariant requires an error message argument")});function f(p,c,v,y,S,O,g,r){if(l(c),!p){var e;if(c===void 0)e=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var d=[v,y,S,O,g,r],n=0;e=new Error(c.replace(/%s/g,function(){return d[n++]})),e.name="Invariant Violation"}throw e.framesToPop=1,e}}T.exports=f}).call(a,i(2))},function(T,a,i){var u="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";T.exports=u},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(u){return Math.min.apply(Math,u)}},function(T,a,i){(function(u){var l=i(4),f=l;if(u.env.NODE_ENV!=="production"){var p=function(v){for(var y=arguments.length,S=Array(y>1?y-1:0),O=1;O<y;O++)S[O-1]=arguments[O];var g=0,r="Warning: "+v.replace(/%s/g,function(){return S[g++]});typeof console<"u"&&console.error(r);try{throw new Error(r)}catch{}};f=function(v,y){if(y===void 0)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(y.indexOf("Failed Composite propType: ")!==0&&!v){for(var S=arguments.length,O=Array(S>2?S-2:0),g=2;g<S;g++)O[g-2]=arguments[g];p.apply(void 0,[y].concat(O))}}}T.exports=f}).call(a,i(2))},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(u){return Math.max.apply(Math,u)}},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0});var u=i(3),l=f(u);function f(p){return p&&p.__esModule?p:{default:p}}a.default=function(p){var c=(0,l.default)(p),v=p.map(function(S){return Math.pow(S-c,2)}),y=(0,l.default)(v);return Math.sqrt(y)}},function(T,a,i){T.exports=i(12)},function(T,a,i){T.exports=i(13)},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0}),a.SparklinesText=a.SparklinesNormalBand=a.SparklinesReferenceLine=a.SparklinesSpots=a.SparklinesBars=a.SparklinesCurve=a.SparklinesLine=a.Sparklines=void 0;var u=function(){function D(w,W){for(var _=0;_<W.length;_++){var U=W[_];U.enumerable=U.enumerable||!1,U.configurable=!0,"value"in U&&(U.writable=!0),Object.defineProperty(w,U.key,U)}}return function(w,W,_){return W&&D(w.prototype,W),_&&D(w,_),w}}(),l=i(0),f=j(l),p=i(1),c=j(p),v=i(17),y=j(v),S=i(18),O=j(S),g=i(19),r=j(g),e=i(20),d=j(e),n=i(21),t=j(n),o=i(22),h=j(o),x=i(27),k=j(x),L=i(28),$=j(L);function j(D){return D&&D.__esModule?D:{default:D}}function H(D,w){if(!(D instanceof w))throw new TypeError("Cannot call a class as a function")}function Y(D,w){if(!D)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return w&&(typeof w=="object"||typeof w=="function")?w:D}function Q(D,w){if(typeof w!="function"&&w!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof w);D.prototype=Object.create(w&&w.prototype,{constructor:{value:D,enumerable:!1,writable:!0,configurable:!0}}),w&&(Object.setPrototypeOf?Object.setPrototypeOf(D,w):D.__proto__=w)}var G=function(D){Q(w,D);function w(W){return H(this,w),Y(this,(w.__proto__||Object.getPrototypeOf(w)).call(this,W))}return u(w,[{key:"render",value:function(){var _=this.props,U=_.data,Z=_.limit,s=_.width,b=_.height,A=_.svgWidth,R=_.svgHeight,E=_.preserveAspectRatio,N=_.margin,B=_.style,P=_.max,M=_.min;if(U.length===0)return null;var I=(0,$.default)({data:U,limit:Z,width:s,height:b,margin:N,max:P,min:M}),F={style:B,viewBox:"0 0 "+s+" "+b,preserveAspectRatio:E};return A>0&&(F.width=A),R>0&&(F.height=R),c.default.createElement("svg",F,c.default.Children.map(this.props.children,function(K){return c.default.cloneElement(K,{data:U,points:I,width:s,height:b,margin:N})}))}}]),w}(p.PureComponent);G.propTypes={data:f.default.array,limit:f.default.number,width:f.default.number,height:f.default.number,svgWidth:f.default.number,svgHeight:f.default.number,preserveAspectRatio:f.default.string,margin:f.default.number,style:f.default.object,min:f.default.number,max:f.default.number,onMouseMove:f.default.func},G.defaultProps={data:[],width:240,height:60,preserveAspectRatio:"none",margin:2},a.Sparklines=G,a.SparklinesLine=O.default,a.SparklinesCurve=r.default,a.SparklinesBars=d.default,a.SparklinesSpots=t.default,a.SparklinesReferenceLine=h.default,a.SparklinesNormalBand=k.default,a.SparklinesText=y.default},function(T,a,i){(function(u){var l=i(4),f=i(5),p=i(8),c=i(6),v=i(15);T.exports=function(y,S){var O=typeof Symbol=="function"&&Symbol.iterator,g="@@iterator";function r(s){var b=s&&(O&&s[O]||s[g]);if(typeof b=="function")return b}var e="<<anonymous>>",d={array:h("array"),bool:h("boolean"),func:h("function"),number:h("number"),object:h("object"),string:h("string"),symbol:h("symbol"),any:x(),arrayOf:k,element:L(),instanceOf:$,node:Q(),objectOf:H,oneOf:j,oneOfType:Y,shape:G};function n(s,b){return s===b?s!==0||1/s===1/b:s!==s&&b!==b}function t(s){this.message=s,this.stack=""}t.prototype=Error.prototype;function o(s){if(u.env.NODE_ENV!=="production")var b={},A=0;function R(N,B,P,M,I,F,K){if(M=M||e,F=F||P,K!==c){if(S)f(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if(u.env.NODE_ENV!=="production"&&typeof console<"u"){var C=M+":"+P;!b[C]&&A<3&&(p(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",F,M),b[C]=!0,A++)}}return B[P]==null?N?B[P]===null?new t("The "+I+" `"+F+"` is marked as required "+("in `"+M+"`, but its value is `null`.")):new t("The "+I+" `"+F+"` is marked as required in "+("`"+M+"`, but its value is `undefined`.")):null:s(B,P,M,I,F)}var E=R.bind(null,!1);return E.isRequired=R.bind(null,!0),E}function h(s){function b(A,R,E,N,B,P){var M=A[R],I=W(M);if(I!==s){var F=_(M);return new t("Invalid "+N+" `"+B+"` of type "+("`"+F+"` supplied to `"+E+"`, expected ")+("`"+s+"`."))}return null}return o(b)}function x(){return o(l.thatReturnsNull)}function k(s){function b(A,R,E,N,B){if(typeof s!="function")return new t("Property `"+B+"` of component `"+E+"` has invalid PropType notation inside arrayOf.");var P=A[R];if(!Array.isArray(P)){var M=W(P);return new t("Invalid "+N+" `"+B+"` of type "+("`"+M+"` supplied to `"+E+"`, expected an array."))}for(var I=0;I<P.length;I++){var F=s(P,I,E,N,B+"["+I+"]",c);if(F instanceof Error)return F}return null}return o(b)}function L(){function s(b,A,R,E,N){var B=b[A];if(!y(B)){var P=W(B);return new t("Invalid "+E+" `"+N+"` of type "+("`"+P+"` supplied to `"+R+"`, expected a single ReactElement."))}return null}return o(s)}function $(s){function b(A,R,E,N,B){if(!(A[R]instanceof s)){var P=s.name||e,M=Z(A[R]);return new t("Invalid "+N+" `"+B+"` of type "+("`"+M+"` supplied to `"+E+"`, expected ")+("instance of `"+P+"`."))}return null}return o(b)}function j(s){if(!Array.isArray(s))return u.env.NODE_ENV!=="production"&&p(!1,"Invalid argument supplied to oneOf, expected an instance of array."),l.thatReturnsNull;function b(A,R,E,N,B){for(var P=A[R],M=0;M<s.length;M++)if(n(P,s[M]))return null;var I=JSON.stringify(s);return new t("Invalid "+N+" `"+B+"` of value `"+P+"` "+("supplied to `"+E+"`, expected one of "+I+"."))}return o(b)}function H(s){function b(A,R,E,N,B){if(typeof s!="function")return new t("Property `"+B+"` of component `"+E+"` has invalid PropType notation inside objectOf.");var P=A[R],M=W(P);if(M!=="object")return new t("Invalid "+N+" `"+B+"` of type "+("`"+M+"` supplied to `"+E+"`, expected an object."));for(var I in P)if(P.hasOwnProperty(I)){var F=s(P,I,E,N,B+"."+I,c);if(F instanceof Error)return F}return null}return o(b)}function Y(s){if(!Array.isArray(s))return u.env.NODE_ENV!=="production"&&p(!1,"Invalid argument supplied to oneOfType, expected an instance of array."),l.thatReturnsNull;for(var b=0;b<s.length;b++){var A=s[b];if(typeof A!="function")return p(!1,"Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.",U(A),b),l.thatReturnsNull}function R(E,N,B,P,M){for(var I=0;I<s.length;I++){var F=s[I];if(F(E,N,B,P,M,c)==null)return null}return new t("Invalid "+P+" `"+M+"` supplied to "+("`"+B+"`."))}return o(R)}function Q(){function s(b,A,R,E,N){return D(b[A])?null:new t("Invalid "+E+" `"+N+"` supplied to "+("`"+R+"`, expected a ReactNode."))}return o(s)}function G(s){function b(A,R,E,N,B){var P=A[R],M=W(P);if(M!=="object")return new t("Invalid "+N+" `"+B+"` of type `"+M+"` "+("supplied to `"+E+"`, expected `object`."));for(var I in s){var F=s[I];if(F){var K=F(P,I,E,N,B+"."+I,c);if(K)return K}}return null}return o(b)}function D(s){switch(typeof s){case"number":case"string":case"undefined":return!0;case"boolean":return!s;case"object":if(Array.isArray(s))return s.every(D);if(s===null||y(s))return!0;var b=r(s);if(b){var A=b.call(s),R;if(b!==s.entries){for(;!(R=A.next()).done;)if(!D(R.value))return!1}else for(;!(R=A.next()).done;){var E=R.value;if(E&&!D(E[1]))return!1}}else return!1;return!0;default:return!1}}function w(s,b){return s==="symbol"||b["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&b instanceof Symbol}function W(s){var b=typeof s;return Array.isArray(s)?"array":s instanceof RegExp?"object":w(b,s)?"symbol":b}function _(s){if(typeof s>"u"||s===null)return""+s;var b=W(s);if(b==="object"){if(s instanceof Date)return"date";if(s instanceof RegExp)return"regexp"}return b}function U(s){var b=_(s);switch(b){case"array":case"object":return"an "+b;case"boolean":case"date":case"regexp":return"a "+b;default:return b}}function Z(s){return!s.constructor||!s.constructor.name?e:s.constructor.name}return d.checkPropTypes=v,d.PropTypes=d,d}}).call(a,i(2))},function(T,a,i){(function(u){if(u.env.NODE_ENV!=="production")var l=i(5),f=i(8),p=i(6),c={};function v(y,S,O,g,r){if(u.env.NODE_ENV!=="production"){for(var e in y)if(y.hasOwnProperty(e)){var d;try{l(typeof y[e]=="function","%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",g||"React class",O,e),d=y[e](S,e,g,O,null,p)}catch(t){d=t}if(f(!d||d instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",g||"React class",O,e,typeof d),d instanceof Error&&!(d.message in c)){c[d.message]=!0;var n=r?r():"";f(!1,"Failed %s type: %s%s",O,d.message,n??"")}}}}T.exports=v}).call(a,i(2))},function(T,a,i){var u=i(4),l=i(5),f=i(6);T.exports=function(){function p(y,S,O,g,r,e){e!==f&&l(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}p.isRequired=p;function c(){return p}var v={array:p,bool:p,func:p,number:p,object:p,string:p,symbol:p,any:p,arrayOf:c,element:p,instanceOf:c,node:p,objectOf:c,oneOf:c,oneOfType:c,shape:c};return v.checkPropTypes=u,v.PropTypes=v,v}},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0});var u=function(){function r(e,d){for(var n=0;n<d.length;n++){var t=d[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(e,d,n){return d&&r(e.prototype,d),n&&r(e,n),e}}(),l=i(0),f=v(l),p=i(1),c=v(p);function v(r){return r&&r.__esModule?r:{default:r}}function y(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function S(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r}function O(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)}var g=function(r){O(e,r);function e(){return y(this,e),S(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return u(e,[{key:"render",value:function(){var n=this.props,t=n.point,o=n.text,h=n.fontSize,x=n.fontFamily,k=t.x,L=t.y;return c.default.createElement("g",null,c.default.createElement("text",{x:k,y:L,fontFamily:x||"Verdana",fontSize:h||10},o))}}]),e}(c.default.Component);g.propTypes={text:f.default.string,point:f.default.object,fontSize:f.default.number,fontFamily:f.default.string},g.defaultProps={text:"",point:{x:0,y:0}},a.default=g},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0});var u=function(){function r(e,d){for(var n=0;n<d.length;n++){var t=d[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(e,d,n){return d&&r(e.prototype,d),n&&r(e,n),e}}(),l=i(0),f=v(l),p=i(1),c=v(p);function v(r){return r&&r.__esModule?r:{default:r}}function y(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function S(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r}function O(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)}var g=function(r){O(e,r);function e(){return y(this,e),S(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return u(e,[{key:"render",value:function(){var n=this.props,t=n.data,o=n.points;n.width;var h=n.height,x=n.margin,k=n.color,L=n.style,$=n.onMouseMove,j=o.map(function(w){return[w.x,w.y]}).reduce(function(w,W){return w.concat(W)}),H=[o[o.length-1].x,h-x,x,h-x,x,o[0].y],Y=j.concat(H),Q={stroke:k||L.stroke||"slategray",strokeWidth:L.strokeWidth||"1",strokeLinejoin:L.strokeLinejoin||"round",strokeLinecap:L.strokeLinecap||"round",fill:"none"},G={stroke:L.stroke||"none",strokeWidth:"0",fillOpacity:L.fillOpacity||".1",fill:L.fill||k||"slategray",pointerEvents:"auto"},D=o.map(function(w,W){return c.default.createElement("circle",{key:W,cx:w.x,cy:w.y,r:2,style:G,onMouseEnter:function(U){return $("enter",t[W],w)},onClick:function(U){return $("click",t[W],w)}})});return c.default.createElement("g",null,D,c.default.createElement("polyline",{points:Y.join(" "),style:G}),c.default.createElement("polyline",{points:j.join(" "),style:Q}))}}]),e}(c.default.Component);g.propTypes={color:f.default.string,style:f.default.object},g.defaultProps={style:{},onMouseMove:function(){}},a.default=g},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0});var u=function(){function r(e,d){for(var n=0;n<d.length;n++){var t=d[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(e,d,n){return d&&r(e.prototype,d),n&&r(e,n),e}}(),l=i(0),f=v(l),p=i(1),c=v(p);function v(r){return r&&r.__esModule?r:{default:r}}function y(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function S(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r}function O(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)}var g=function(r){O(e,r);function e(){return y(this,e),S(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return u(e,[{key:"render",value:function(){var n=this.props,t=n.points;n.width;var o=n.height,h=n.margin,x=n.color,k=n.style,L=n.divisor,$=L===void 0?.25:L,j=void 0,H=function(_){var U=void 0;if(!j)U=[_.x,_.y];else{var Z=(_.x-j.x)*$;U=["C",j.x+Z,j.y,_.x-Z,_.y,_.x,_.y]}return j=_,U},Y=t.map(function(W){return H(W)}).reduce(function(W,_){return W.concat(_)}),Q=["L"+t[t.length-1].x,o-h,h,o-h,h,t[0].y],G=Y.concat(Q),D={stroke:x||k.stroke||"slategray",strokeWidth:k.strokeWidth||"1",strokeLinejoin:k.strokeLinejoin||"round",strokeLinecap:k.strokeLinecap||"round",fill:"none"},w={stroke:k.stroke||"none",strokeWidth:"0",fillOpacity:k.fillOpacity||".1",fill:k.fill||x||"slategray"};return c.default.createElement("g",null,c.default.createElement("path",{d:"M"+G.join(" "),style:w}),c.default.createElement("path",{d:"M"+Y.join(" "),style:D}))}}]),e}(c.default.Component);g.propTypes={color:f.default.string,style:f.default.object},g.defaultProps={style:{}},a.default=g},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0});var u=function(){function r(e,d){for(var n=0;n<d.length;n++){var t=d[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(e,d,n){return d&&r(e.prototype,d),n&&r(e,n),e}}(),l=i(0),f=v(l),p=i(1),c=v(p);function v(r){return r&&r.__esModule?r:{default:r}}function y(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function S(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r}function O(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)}var g=function(r){O(e,r);function e(){return y(this,e),S(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return u(e,[{key:"render",value:function(){var n=this,t=this.props,o=t.points,h=t.height,x=t.style,k=t.barWidth,L=t.margin,$=t.onMouseMove,j=1*(x&&x.strokeWidth||0),H=L?2*L:0,Y=k||(o&&o.length>=2?Math.max(0,o[1].x-o[0].x-j-H):0);return c.default.createElement("g",{transform:"scale(1,-1)"},o.map(function(Q,G){return c.default.createElement("rect",{key:G,x:Q.x-(Y+j)/2,y:-h,width:Y,height:Math.max(0,h-Q.y),style:x,onMouseMove:$&&$.bind(n,Q)})}))}}]),e}(c.default.Component);g.propTypes={points:f.default.arrayOf(f.default.object),height:f.default.number,style:f.default.object,barWidth:f.default.number,margin:f.default.number,onMouseMove:f.default.func},g.defaultProps={style:{fill:"slategray"}},a.default=g},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0});var u=function(){function r(e,d){for(var n=0;n<d.length;n++){var t=d[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(e,d,n){return d&&r(e.prototype,d),n&&r(e,n),e}}(),l=i(0),f=v(l),p=i(1),c=v(p);function v(r){return r&&r.__esModule?r:{default:r}}function y(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function S(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r}function O(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)}var g=function(r){O(e,r);function e(){return y(this,e),S(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return u(e,[{key:"lastDirection",value:function(n){return Math.sign=Math.sign||function(t){return t>0?1:-1},n.length<2?0:Math.sign(n[n.length-2].y-n[n.length-1].y)}},{key:"render",value:function(){var n=this.props,t=n.points;n.width,n.height;var o=n.size,h=n.style,x=n.spotColors,k=c.default.createElement("circle",{cx:t[0].x,cy:t[0].y,r:o,style:h}),L=c.default.createElement("circle",{cx:t[t.length-1].x,cy:t[t.length-1].y,r:o,style:h||{fill:x[this.lastDirection(t)]}});return c.default.createElement("g",null,h&&k,L)}}]),e}(c.default.Component);g.propTypes={size:f.default.number,style:f.default.object,spotColors:f.default.object},g.defaultProps={size:2,spotColors:{"-1":"red",0:"black",1:"green"}},a.default=g},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0});var u=function(){function n(t,o){for(var h=0;h<o.length;h++){var x=o[h];x.enumerable=x.enumerable||!1,x.configurable=!0,"value"in x&&(x.writable=!0),Object.defineProperty(t,x.key,x)}}return function(t,o,h){return o&&n(t.prototype,o),h&&n(t,h),t}}(),l=i(0),f=O(l),p=i(1),c=O(p),v=i(23),y=S(v);function S(n){if(n&&n.__esModule)return n;var t={};if(n!=null)for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t.default=n,t}function O(n){return n&&n.__esModule?n:{default:n}}function g(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function r(n,t){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t&&(typeof t=="object"||typeof t=="function")?t:n}function e(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof t);n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(n,t):n.__proto__=t)}var d=function(n){e(t,n);function t(){return g(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,[{key:"render",value:function(){var h=this.props,x=h.points,k=h.margin,L=h.type,$=h.style,j=h.value,H=x.map(function(Q){return Q.y}),Y=L=="custom"?j:y[L](H);return c.default.createElement("line",{x1:x[0].x,y1:Y+k,x2:x[x.length-1].x,y2:Y+k,style:$})}}]),t}(c.default.Component);d.propTypes={type:f.default.oneOf(["max","min","mean","avg","median","custom"]),value:f.default.number,style:f.default.object},d.defaultProps={type:"mean",style:{stroke:"red",strokeOpacity:.75,strokeDasharray:"2, 2"}},a.default=d},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0}),a.variance=a.stdev=a.median=a.midRange=a.avg=a.mean=a.max=a.min=void 0;var u=i(7),l=d(u),f=i(3),p=d(f),c=i(24),v=d(c),y=i(25),S=d(y),O=i(10),g=d(O),r=i(26),e=d(r);function d(n){return n&&n.__esModule?n:{default:n}}a.min=l.default,a.max=l.default,a.mean=p.default,a.avg=p.default,a.midRange=v.default,a.median=S.default,a.stdev=g.default,a.variance=e.default},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0});var u=i(7),l=c(u),f=i(9),p=c(f);function c(v){return v&&v.__esModule?v:{default:v}}a.default=function(v){return(0,p.default)(v)-(0,l.default)(v)/2}},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(u){return u.sort(function(l,f){return l-f})[Math.floor(u.length/2)]}},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0});var u=i(3),l=f(u);function f(p){return p&&p.__esModule?p:{default:p}}a.default=function(p){var c=(0,l.default)(p),v=p.map(function(y){return Math.pow(y-c,2)});return(0,l.default)(v)}},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0});var u=function(){function t(o,h){for(var x=0;x<h.length;x++){var k=h[x];k.enumerable=k.enumerable||!1,k.configurable=!0,"value"in k&&(k.writable=!0),Object.defineProperty(o,k.key,k)}}return function(o,h,x){return h&&t(o.prototype,h),x&&t(o,x),o}}(),l=i(0),f=g(l),p=i(1),c=g(p),v=i(3),y=g(v),S=i(10),O=g(S);function g(t){return t&&t.__esModule?t:{default:t}}function r(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}function e(t,o){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return o&&(typeof o=="object"||typeof o=="function")?o:t}function d(t,o){if(typeof o!="function"&&o!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof o);t.prototype=Object.create(o&&o.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),o&&(Object.setPrototypeOf?Object.setPrototypeOf(t,o):t.__proto__=o)}var n=function(t){d(o,t);function o(){return r(this,o),e(this,(o.__proto__||Object.getPrototypeOf(o)).apply(this,arguments))}return u(o,[{key:"render",value:function(){var x=this.props,k=x.points,L=x.margin,$=x.style,j=k.map(function(Q){return Q.y}),H=(0,y.default)(j),Y=(0,O.default)(j);return c.default.createElement("rect",{x:k[0].x,y:H-Y+L,width:k[k.length-1].x-k[0].x,height:O.default*2,style:$})}}]),o}(c.default.Component);n.propTypes={style:f.default.object},n.defaultProps={style:{fill:"red",fillOpacity:.1}},a.default=n},function(T,a,i){Object.defineProperty(a,"__esModule",{value:!0});var u=i(7),l=c(u),f=i(9),p=c(f);function c(v){return v&&v.__esModule?v:{default:v}}a.default=function(v){var y=v.data,S=v.limit,O=v.width,g=O===void 0?1:O,r=v.height,e=r===void 0?1:r,d=v.margin,n=d===void 0?0:d,t=v.max,o=t===void 0?(0,p.default)(y):t,h=v.min,x=h===void 0?(0,l.default)(y):h,k=y.length;S&&S<k&&(y=y.slice(k-S));var L=(e-n*2)/(o-x||2),$=(g-n*2)/((S||k)-(k>1?1:0));return y.map(function(j,H){return{x:H*$+n,y:(o===x?1:o-j)*L+n}})}}])})})(V);var z=V.exports;const ae=()=>m.jsxs(re,{children:[m.jsx(X,{md:6,lg:4,children:m.jsx(J,{title:"Line Charts",children:m.jsx("div",{className:"mt-4",children:m.jsx(z.Sparklines,{data:[0,23,43,35,44,45,56,37,40],height:50,width:160,limit:7,margin:5,children:m.jsx(z.SparklinesLine,{color:"#007aff"})})})})}),m.jsx(X,{md:6,lg:4,children:m.jsx(J,{title:"Bar Chart",children:m.jsx("div",{className:"mt-4",children:m.jsx(z.Sparklines,{data:[3,6,7,8,6,4,7,10,12,7,4,9,12,13,11,12],height:50,width:160,children:m.jsx(z.SparklinesBars,{style:{fill:"#007aff"}})})})})}),m.jsx(X,{md:6,lg:4,children:m.jsx(J,{title:"LineSpots Chart",children:m.jsx("div",{className:"mt-4",children:m.jsxs(z.Sparklines,{height:50,width:160,data:[25,23,26,24,25,32,30,24,19],children:[m.jsx(z.SparklinesLine,{color:"#007aff"}),m.jsx(z.SparklinesSpots,{style:{fill:"#007aff"}})]})})})}),m.jsx(X,{md:6,lg:4,children:m.jsx(J,{title:"Custom Chart",children:m.jsx("div",{className:"mt-4",children:m.jsxs(z.Sparklines,{height:50,width:160,data:[25,23,26,24,25,32,30,24,19],children:[m.jsx(z.SparklinesBars,{style:{stroke:"white",fill:"#007aff",fillOpacity:".25"}}),m.jsx(z.SparklinesLine,{style:{stroke:"#007aff",fill:"none"}})]})})})}),m.jsx(X,{md:6,lg:4,children:m.jsx(J,{title:"Reference Line Chart",children:m.jsx("div",{className:"mt-4",children:m.jsxs(z.Sparklines,{height:50,width:160,data:[87,50,80,20,88,56,60,30,70,9,110,11,91,93,100],children:[m.jsx(z.SparklinesLine,{color:"#007aff"}),m.jsx(z.SparklinesReferenceLine,{type:"median"})]})})})}),m.jsx(X,{md:6,lg:4,children:m.jsx(J,{title:"Reference bar Chart",children:m.jsx("div",{className:"text-center mt-4",children:m.jsxs(z.Sparklines,{height:50,width:160,data:[87,50,80,20,88,56,60,30,70,9,110,11,91,93,100],children:[m.jsx(z.SparklinesBars,{style:{fill:"#007aff",fillOpacity:".5"}}),m.jsx(z.SparklinesReferenceLine,{type:"avg"})]})})})}),m.jsx(X,{md:6,lg:4,children:m.jsx(J,{title:"Real world Chart",children:m.jsx("div",{className:"text-center mt-4",children:m.jsx(z.Sparklines,{height:100,width:290,data:[25,23,26,24,25,32,30,24,19,35,14,38,20,31],children:m.jsx(z.SparklinesLine,{style:{strokeWidth:3,stroke:"#007aff",fill:"none"}})})})})}),m.jsx(X,{md:6,lg:4,children:m.jsx(J,{title:"Real world With Background Chart",children:m.jsx("div",{className:"text-center mt-4",style:{minHeight:164},children:m.jsx(z.Sparklines,{height:100,width:290,data:[5,10,5,20,8,15,5,10,5,20,8,15],children:m.jsx(z.SparklinesLine,{style:{stroke:"rgb(52, 140, 212)",fill:"#007aff",fillOpacity:"1"}})})})})}),m.jsx(X,{md:6,lg:4,children:m.jsx(J,{title:"Box Plot Chart",children:m.jsx("div",{className:"text-center mt-4",style:{minHeight:164},children:m.jsx(z.Sparklines,{height:100,width:290,data:[5,10,5,20,8,15,5,10,5,20,8,15],style:{background:"rgb(35, 62, 73)"},margin:10,children:m.jsx(z.SparklinesLine,{style:{stroke:"none",fill:"#007aff",fillOpacity:".5"}})})})})})]}),ye=()=>m.jsxs(m.Fragment,{children:[m.jsx(ie,{title:"Sparkline"}),m.jsx(ae,{})]});export{ye as default};
