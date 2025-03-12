import{l as j,r as d,j as J}from"./index-Dot2ZeBG.js";import{_ as K,i as Y}from"./isObjectLike-CXG3q4vH.js";import{t as ee}from"./toNumber-CxEn4wrH.js";var te=K,ie=function(){return te.Date.now()},re=ie,se=Y,L=re,H=ee,le="Expected a function",oe=Math.max,ne=Math.min;function ae(r,t,i){var e,s,l,n,o,u,c=0,p=!1,a=!1,v=!0;if(typeof r!="function")throw new TypeError(le);t=H(t)||0,se(i)&&(p=!!i.leading,a="maxWait"in i,l=a?oe(H(i.maxWait)||0,t):l,v="trailing"in i?!!i.trailing:v);function h(f){var y=e,E=s;return e=s=void 0,c=f,n=r.apply(E,y),n}function N(f){return c=f,o=setTimeout(b,t),p?h(f):n}function S(f){var y=f-u,E=f-c,V=t-y;return a?ne(V,l-E):V}function x(f){var y=f-u,E=f-c;return u===void 0||y>=t||y<0||a&&E>=l}function b(){var f=L();if(x(f))return O(f);o=setTimeout(b,S(f))}function O(f){return o=void 0,v&&e?h(f):(e=s=void 0,n)}function C(){o!==void 0&&clearTimeout(o),c=0,e=u=s=o=void 0}function R(){return o===void 0?n:O(L())}function M(){var f=L(),y=x(f);if(e=arguments,s=this,u=f,y){if(o===void 0)return N(u);if(a)return clearTimeout(o),o=setTimeout(b,t),h(u)}return o===void 0&&(o=setTimeout(b,t)),n}return M.cancel=C,M.flush=R,M}var F=ae;const T=j(F);var ce=F,he=Y,ue="Expected a function";function fe(r,t,i){var e=!0,s=!0;if(typeof r!="function")throw new TypeError(ue);return he(i)&&(e="leading"in i?!!i.leading:e,s="trailing"in i?!!i.trailing:s),ce(r,t,{leading:e,maxWait:t,trailing:s})}var de=fe;const ve=j(de);var z=function(){return z=Object.assign||function(t){for(var i,e=1,s=arguments.length;e<s;e++){i=arguments[e];for(var l in i)Object.prototype.hasOwnProperty.call(i,l)&&(t[l]=i[l])}return t},z.apply(this,arguments)};function I(r){return!r||!r.ownerDocument||!r.ownerDocument.defaultView?window:r.ownerDocument.defaultView}function q(r){return!r||!r.ownerDocument?document:r.ownerDocument}var $=function(r){var t={},i=Array.prototype.reduce.call(r,function(e,s){var l=s.name.match(/data-simplebar-(.+)/);if(l){var n=l[1].replace(/\W+(.)/g,function(o,u){return u.toUpperCase()});switch(s.value){case"true":e[n]=!0;break;case"false":e[n]=!1;break;case void 0:e[n]=!0;break;default:e[n]=s.value}}return e},t);return i};function U(r,t){var i;r&&(i=r.classList).add.apply(i,t.split(" "))}function Q(r,t){r&&t.split(" ").forEach(function(i){r.classList.remove(i)})}function Z(r){return".".concat(r.split(" ").join("."))}var P=!!(typeof window<"u"&&window.document&&window.document.createElement),pe=Object.freeze({__proto__:null,addClasses:U,canUseDOM:P,classNamesToQuery:Z,getElementDocument:q,getElementWindow:I,getOptions:$,removeClasses:Q}),A=null,B=null;P&&window.addEventListener("resize",function(){B!==window.devicePixelRatio&&(B=window.devicePixelRatio,A=null)});function X(){if(A===null){if(typeof document>"u")return A=0,A;var r=document.body,t=document.createElement("div");t.classList.add("simplebar-hide-scrollbar"),r.appendChild(t);var i=t.getBoundingClientRect().right;r.removeChild(t),A=i}return A}var w=I,D=q,me=$,W=U,k=Q,m=Z,_=function(){function r(t,i){i===void 0&&(i={});var e=this;if(this.removePreventClickId=null,this.minScrollbarWidth=20,this.stopScrollDelay=175,this.isScrolling=!1,this.isMouseEntering=!1,this.isDragging=!1,this.scrollXTicking=!1,this.scrollYTicking=!1,this.wrapperEl=null,this.contentWrapperEl=null,this.contentEl=null,this.offsetEl=null,this.maskEl=null,this.placeholderEl=null,this.heightAutoObserverWrapperEl=null,this.heightAutoObserverEl=null,this.rtlHelpers=null,this.scrollbarWidth=0,this.resizeObserver=null,this.mutationObserver=null,this.elStyles=null,this.isRtl=null,this.mouseX=0,this.mouseY=0,this.onMouseMove=function(){},this.onWindowResize=function(){},this.onStopScrolling=function(){},this.onMouseEntered=function(){},this.onScroll=function(){var s=w(e.el);e.scrollXTicking||(s.requestAnimationFrame(e.scrollX),e.scrollXTicking=!0),e.scrollYTicking||(s.requestAnimationFrame(e.scrollY),e.scrollYTicking=!0),e.isScrolling||(e.isScrolling=!0,W(e.el,e.classNames.scrolling)),e.showScrollbar("x"),e.showScrollbar("y"),e.onStopScrolling()},this.scrollX=function(){e.axis.x.isOverflowing&&e.positionScrollbar("x"),e.scrollXTicking=!1},this.scrollY=function(){e.axis.y.isOverflowing&&e.positionScrollbar("y"),e.scrollYTicking=!1},this._onStopScrolling=function(){k(e.el,e.classNames.scrolling),e.options.autoHide&&(e.hideScrollbar("x"),e.hideScrollbar("y")),e.isScrolling=!1},this.onMouseEnter=function(){e.isMouseEntering||(W(e.el,e.classNames.mouseEntered),e.showScrollbar("x"),e.showScrollbar("y"),e.isMouseEntering=!0),e.onMouseEntered()},this._onMouseEntered=function(){k(e.el,e.classNames.mouseEntered),e.options.autoHide&&(e.hideScrollbar("x"),e.hideScrollbar("y")),e.isMouseEntering=!1},this._onMouseMove=function(s){e.mouseX=s.clientX,e.mouseY=s.clientY,(e.axis.x.isOverflowing||e.axis.x.forceVisible)&&e.onMouseMoveForAxis("x"),(e.axis.y.isOverflowing||e.axis.y.forceVisible)&&e.onMouseMoveForAxis("y")},this.onMouseLeave=function(){e.onMouseMove.cancel(),(e.axis.x.isOverflowing||e.axis.x.forceVisible)&&e.onMouseLeaveForAxis("x"),(e.axis.y.isOverflowing||e.axis.y.forceVisible)&&e.onMouseLeaveForAxis("y"),e.mouseX=-1,e.mouseY=-1},this._onWindowResize=function(){e.scrollbarWidth=e.getScrollbarWidth(),e.hideNativeScrollbar()},this.onPointerEvent=function(s){if(!(!e.axis.x.track.el||!e.axis.y.track.el||!e.axis.x.scrollbar.el||!e.axis.y.scrollbar.el)){var l,n;e.axis.x.track.rect=e.axis.x.track.el.getBoundingClientRect(),e.axis.y.track.rect=e.axis.y.track.el.getBoundingClientRect(),(e.axis.x.isOverflowing||e.axis.x.forceVisible)&&(l=e.isWithinBounds(e.axis.x.track.rect)),(e.axis.y.isOverflowing||e.axis.y.forceVisible)&&(n=e.isWithinBounds(e.axis.y.track.rect)),(l||n)&&(s.stopPropagation(),s.type==="pointerdown"&&s.pointerType!=="touch"&&(l&&(e.axis.x.scrollbar.rect=e.axis.x.scrollbar.el.getBoundingClientRect(),e.isWithinBounds(e.axis.x.scrollbar.rect)?e.onDragStart(s,"x"):e.onTrackClick(s,"x")),n&&(e.axis.y.scrollbar.rect=e.axis.y.scrollbar.el.getBoundingClientRect(),e.isWithinBounds(e.axis.y.scrollbar.rect)?e.onDragStart(s,"y"):e.onTrackClick(s,"y"))))}},this.drag=function(s){var l,n,o,u,c,p,a,v,h,N,S;if(!(!e.draggedAxis||!e.contentWrapperEl)){var x,b=e.axis[e.draggedAxis].track,O=(n=(l=b.rect)===null||l===void 0?void 0:l[e.axis[e.draggedAxis].sizeAttr])!==null&&n!==void 0?n:0,C=e.axis[e.draggedAxis].scrollbar,R=(u=(o=e.contentWrapperEl)===null||o===void 0?void 0:o[e.axis[e.draggedAxis].scrollSizeAttr])!==null&&u!==void 0?u:0,M=parseInt((p=(c=e.elStyles)===null||c===void 0?void 0:c[e.axis[e.draggedAxis].sizeAttr])!==null&&p!==void 0?p:"0px",10);s.preventDefault(),s.stopPropagation(),e.draggedAxis==="y"?x=s.pageY:x=s.pageX;var f=x-((v=(a=b.rect)===null||a===void 0?void 0:a[e.axis[e.draggedAxis].offsetAttr])!==null&&v!==void 0?v:0)-e.axis[e.draggedAxis].dragOffset;f=e.draggedAxis==="x"&&e.isRtl?((N=(h=b.rect)===null||h===void 0?void 0:h[e.axis[e.draggedAxis].sizeAttr])!==null&&N!==void 0?N:0)-C.size-f:f;var y=f/(O-C.size),E=y*(R-M);e.draggedAxis==="x"&&e.isRtl&&(E=!((S=r.getRtlHelpers())===null||S===void 0)&&S.isScrollingToNegative?-E:E),e.contentWrapperEl[e.axis[e.draggedAxis].scrollOffsetAttr]=E}},this.onEndDrag=function(s){e.isDragging=!1;var l=D(e.el),n=w(e.el);s.preventDefault(),s.stopPropagation(),k(e.el,e.classNames.dragging),e.onStopScrolling(),l.removeEventListener("mousemove",e.drag,!0),l.removeEventListener("mouseup",e.onEndDrag,!0),e.removePreventClickId=n.setTimeout(function(){l.removeEventListener("click",e.preventClick,!0),l.removeEventListener("dblclick",e.preventClick,!0),e.removePreventClickId=null})},this.preventClick=function(s){s.preventDefault(),s.stopPropagation()},this.el=t,this.options=z(z({},r.defaultOptions),i),this.classNames=z(z({},r.defaultOptions.classNames),i.classNames),this.axis={x:{scrollOffsetAttr:"scrollLeft",sizeAttr:"width",scrollSizeAttr:"scrollWidth",offsetSizeAttr:"offsetWidth",offsetAttr:"left",overflowAttr:"overflowX",dragOffset:0,isOverflowing:!0,forceVisible:!1,track:{size:null,el:null,rect:null,isVisible:!1},scrollbar:{size:null,el:null,rect:null,isVisible:!1}},y:{scrollOffsetAttr:"scrollTop",sizeAttr:"height",scrollSizeAttr:"scrollHeight",offsetSizeAttr:"offsetHeight",offsetAttr:"top",overflowAttr:"overflowY",dragOffset:0,isOverflowing:!0,forceVisible:!1,track:{size:null,el:null,rect:null,isVisible:!1},scrollbar:{size:null,el:null,rect:null,isVisible:!1}}},typeof this.el!="object"||!this.el.nodeName)throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));this.onMouseMove=ve(this._onMouseMove,64),this.onWindowResize=T(this._onWindowResize,64,{leading:!0}),this.onStopScrolling=T(this._onStopScrolling,this.stopScrollDelay),this.onMouseEntered=T(this._onMouseEntered,this.stopScrollDelay),this.init()}return r.getRtlHelpers=function(){if(r.rtlHelpers)return r.rtlHelpers;var t=document.createElement("div");t.innerHTML='<div class="simplebar-dummy-scrollbar-size"><div></div></div>';var i=t.firstElementChild,e=i==null?void 0:i.firstElementChild;if(!e)return null;document.body.appendChild(i),i.scrollLeft=0;var s=r.getOffset(i),l=r.getOffset(e);i.scrollLeft=-999;var n=r.getOffset(e);return document.body.removeChild(i),r.rtlHelpers={isScrollOriginAtZero:s.left!==l.left,isScrollingToNegative:l.left!==n.left},r.rtlHelpers},r.prototype.getScrollbarWidth=function(){try{return this.contentWrapperEl&&getComputedStyle(this.contentWrapperEl,"::-webkit-scrollbar").display==="none"||"scrollbarWidth"in document.documentElement.style||"-ms-overflow-style"in document.documentElement.style?0:X()}catch{return X()}},r.getOffset=function(t){var i=t.getBoundingClientRect(),e=D(t),s=w(t);return{top:i.top+(s.pageYOffset||e.documentElement.scrollTop),left:i.left+(s.pageXOffset||e.documentElement.scrollLeft)}},r.prototype.init=function(){P&&(this.initDOM(),this.rtlHelpers=r.getRtlHelpers(),this.scrollbarWidth=this.getScrollbarWidth(),this.recalculate(),this.initListeners())},r.prototype.initDOM=function(){var t,i;this.wrapperEl=this.el.querySelector(m(this.classNames.wrapper)),this.contentWrapperEl=this.options.scrollableNode||this.el.querySelector(m(this.classNames.contentWrapper)),this.contentEl=this.options.contentNode||this.el.querySelector(m(this.classNames.contentEl)),this.offsetEl=this.el.querySelector(m(this.classNames.offset)),this.maskEl=this.el.querySelector(m(this.classNames.mask)),this.placeholderEl=this.findChild(this.wrapperEl,m(this.classNames.placeholder)),this.heightAutoObserverWrapperEl=this.el.querySelector(m(this.classNames.heightAutoObserverWrapperEl)),this.heightAutoObserverEl=this.el.querySelector(m(this.classNames.heightAutoObserverEl)),this.axis.x.track.el=this.findChild(this.el,"".concat(m(this.classNames.track)).concat(m(this.classNames.horizontal))),this.axis.y.track.el=this.findChild(this.el,"".concat(m(this.classNames.track)).concat(m(this.classNames.vertical))),this.axis.x.scrollbar.el=((t=this.axis.x.track.el)===null||t===void 0?void 0:t.querySelector(m(this.classNames.scrollbar)))||null,this.axis.y.scrollbar.el=((i=this.axis.y.track.el)===null||i===void 0?void 0:i.querySelector(m(this.classNames.scrollbar)))||null,this.options.autoHide||(W(this.axis.x.scrollbar.el,this.classNames.visible),W(this.axis.y.scrollbar.el,this.classNames.visible))},r.prototype.initListeners=function(){var t=this,i,e=w(this.el);if(this.el.addEventListener("mouseenter",this.onMouseEnter),this.el.addEventListener("pointerdown",this.onPointerEvent,!0),this.el.addEventListener("mousemove",this.onMouseMove),this.el.addEventListener("mouseleave",this.onMouseLeave),(i=this.contentWrapperEl)===null||i===void 0||i.addEventListener("scroll",this.onScroll),e.addEventListener("resize",this.onWindowResize),!!this.contentEl){if(window.ResizeObserver){var s=!1,l=e.ResizeObserver||ResizeObserver;this.resizeObserver=new l(function(){s&&e.requestAnimationFrame(function(){t.recalculate()})}),this.resizeObserver.observe(this.el),this.resizeObserver.observe(this.contentEl),e.requestAnimationFrame(function(){s=!0})}this.mutationObserver=new e.MutationObserver(function(){e.requestAnimationFrame(function(){t.recalculate()})}),this.mutationObserver.observe(this.contentEl,{childList:!0,subtree:!0,characterData:!0})}},r.prototype.recalculate=function(){if(!(!this.heightAutoObserverEl||!this.contentEl||!this.contentWrapperEl||!this.wrapperEl||!this.placeholderEl)){var t=w(this.el);this.elStyles=t.getComputedStyle(this.el),this.isRtl=this.elStyles.direction==="rtl";var i=this.contentEl.offsetWidth,e=this.heightAutoObserverEl.offsetHeight<=1,s=this.heightAutoObserverEl.offsetWidth<=1||i>0,l=this.contentWrapperEl.offsetWidth,n=this.elStyles.overflowX,o=this.elStyles.overflowY;this.contentEl.style.padding="".concat(this.elStyles.paddingTop," ").concat(this.elStyles.paddingRight," ").concat(this.elStyles.paddingBottom," ").concat(this.elStyles.paddingLeft),this.wrapperEl.style.margin="-".concat(this.elStyles.paddingTop," -").concat(this.elStyles.paddingRight," -").concat(this.elStyles.paddingBottom," -").concat(this.elStyles.paddingLeft);var u=this.contentEl.scrollHeight,c=this.contentEl.scrollWidth;this.contentWrapperEl.style.height=e?"auto":"100%",this.placeholderEl.style.width=s?"".concat(i||c,"px"):"auto",this.placeholderEl.style.height="".concat(u,"px");var p=this.contentWrapperEl.offsetHeight;this.axis.x.isOverflowing=i!==0&&c>i,this.axis.y.isOverflowing=u>p,this.axis.x.isOverflowing=n==="hidden"?!1:this.axis.x.isOverflowing,this.axis.y.isOverflowing=o==="hidden"?!1:this.axis.y.isOverflowing,this.axis.x.forceVisible=this.options.forceVisible==="x"||this.options.forceVisible===!0,this.axis.y.forceVisible=this.options.forceVisible==="y"||this.options.forceVisible===!0,this.hideNativeScrollbar();var a=this.axis.x.isOverflowing?this.scrollbarWidth:0,v=this.axis.y.isOverflowing?this.scrollbarWidth:0;this.axis.x.isOverflowing=this.axis.x.isOverflowing&&c>l-v,this.axis.y.isOverflowing=this.axis.y.isOverflowing&&u>p-a,this.axis.x.scrollbar.size=this.getScrollbarSize("x"),this.axis.y.scrollbar.size=this.getScrollbarSize("y"),this.axis.x.scrollbar.el&&(this.axis.x.scrollbar.el.style.width="".concat(this.axis.x.scrollbar.size,"px")),this.axis.y.scrollbar.el&&(this.axis.y.scrollbar.el.style.height="".concat(this.axis.y.scrollbar.size,"px")),this.positionScrollbar("x"),this.positionScrollbar("y"),this.toggleTrackVisibility("x"),this.toggleTrackVisibility("y")}},r.prototype.getScrollbarSize=function(t){var i,e;if(t===void 0&&(t="y"),!this.axis[t].isOverflowing||!this.contentEl)return 0;var s=this.contentEl[this.axis[t].scrollSizeAttr],l=(e=(i=this.axis[t].track.el)===null||i===void 0?void 0:i[this.axis[t].offsetSizeAttr])!==null&&e!==void 0?e:0,n=l/s,o;return o=Math.max(~~(n*l),this.options.scrollbarMinSize),this.options.scrollbarMaxSize&&(o=Math.min(o,this.options.scrollbarMaxSize)),o},r.prototype.positionScrollbar=function(t){var i,e,s;t===void 0&&(t="y");var l=this.axis[t].scrollbar;if(!(!this.axis[t].isOverflowing||!this.contentWrapperEl||!l.el||!this.elStyles)){var n=this.contentWrapperEl[this.axis[t].scrollSizeAttr],o=((i=this.axis[t].track.el)===null||i===void 0?void 0:i[this.axis[t].offsetSizeAttr])||0,u=parseInt(this.elStyles[this.axis[t].sizeAttr],10),c=this.contentWrapperEl[this.axis[t].scrollOffsetAttr];c=t==="x"&&this.isRtl&&(!((e=r.getRtlHelpers())===null||e===void 0)&&e.isScrollOriginAtZero)?-c:c,t==="x"&&this.isRtl&&(c=!((s=r.getRtlHelpers())===null||s===void 0)&&s.isScrollingToNegative?c:-c);var p=c/(n-u),a=~~((o-l.size)*p);a=t==="x"&&this.isRtl?-a+(o-l.size):a,l.el.style.transform=t==="x"?"translate3d(".concat(a,"px, 0, 0)"):"translate3d(0, ".concat(a,"px, 0)")}},r.prototype.toggleTrackVisibility=function(t){t===void 0&&(t="y");var i=this.axis[t].track.el,e=this.axis[t].scrollbar.el;!i||!e||!this.contentWrapperEl||(this.axis[t].isOverflowing||this.axis[t].forceVisible?(i.style.visibility="visible",this.contentWrapperEl.style[this.axis[t].overflowAttr]="scroll",this.el.classList.add("".concat(this.classNames.scrollable,"-").concat(t))):(i.style.visibility="hidden",this.contentWrapperEl.style[this.axis[t].overflowAttr]="hidden",this.el.classList.remove("".concat(this.classNames.scrollable,"-").concat(t))),this.axis[t].isOverflowing?e.style.display="block":e.style.display="none")},r.prototype.showScrollbar=function(t){t===void 0&&(t="y"),this.axis[t].isOverflowing&&!this.axis[t].scrollbar.isVisible&&(W(this.axis[t].scrollbar.el,this.classNames.visible),this.axis[t].scrollbar.isVisible=!0)},r.prototype.hideScrollbar=function(t){t===void 0&&(t="y"),!this.isDragging&&this.axis[t].isOverflowing&&this.axis[t].scrollbar.isVisible&&(k(this.axis[t].scrollbar.el,this.classNames.visible),this.axis[t].scrollbar.isVisible=!1)},r.prototype.hideNativeScrollbar=function(){this.offsetEl&&(this.offsetEl.style[this.isRtl?"left":"right"]=this.axis.y.isOverflowing||this.axis.y.forceVisible?"-".concat(this.scrollbarWidth,"px"):"0px",this.offsetEl.style.bottom=this.axis.x.isOverflowing||this.axis.x.forceVisible?"-".concat(this.scrollbarWidth,"px"):"0px")},r.prototype.onMouseMoveForAxis=function(t){t===void 0&&(t="y");var i=this.axis[t];!i.track.el||!i.scrollbar.el||(i.track.rect=i.track.el.getBoundingClientRect(),i.scrollbar.rect=i.scrollbar.el.getBoundingClientRect(),this.isWithinBounds(i.track.rect)?(this.showScrollbar(t),W(i.track.el,this.classNames.hover),this.isWithinBounds(i.scrollbar.rect)?W(i.scrollbar.el,this.classNames.hover):k(i.scrollbar.el,this.classNames.hover)):(k(i.track.el,this.classNames.hover),this.options.autoHide&&this.hideScrollbar(t)))},r.prototype.onMouseLeaveForAxis=function(t){t===void 0&&(t="y"),k(this.axis[t].track.el,this.classNames.hover),k(this.axis[t].scrollbar.el,this.classNames.hover),this.options.autoHide&&this.hideScrollbar(t)},r.prototype.onDragStart=function(t,i){var e;i===void 0&&(i="y"),this.isDragging=!0;var s=D(this.el),l=w(this.el),n=this.axis[i].scrollbar,o=i==="y"?t.pageY:t.pageX;this.axis[i].dragOffset=o-(((e=n.rect)===null||e===void 0?void 0:e[this.axis[i].offsetAttr])||0),this.draggedAxis=i,W(this.el,this.classNames.dragging),s.addEventListener("mousemove",this.drag,!0),s.addEventListener("mouseup",this.onEndDrag,!0),this.removePreventClickId===null?(s.addEventListener("click",this.preventClick,!0),s.addEventListener("dblclick",this.preventClick,!0)):(l.clearTimeout(this.removePreventClickId),this.removePreventClickId=null)},r.prototype.onTrackClick=function(t,i){var e=this,s,l,n,o;i===void 0&&(i="y");var u=this.axis[i];if(!(!this.options.clickOnTrack||!u.scrollbar.el||!this.contentWrapperEl)){t.preventDefault();var c=w(this.el);this.axis[i].scrollbar.rect=u.scrollbar.el.getBoundingClientRect();var p=this.axis[i].scrollbar,a=(l=(s=p.rect)===null||s===void 0?void 0:s[this.axis[i].offsetAttr])!==null&&l!==void 0?l:0,v=parseInt((o=(n=this.elStyles)===null||n===void 0?void 0:n[this.axis[i].sizeAttr])!==null&&o!==void 0?o:"0px",10),h=this.contentWrapperEl[this.axis[i].scrollOffsetAttr],N=i==="y"?this.mouseY-a:this.mouseX-a,S=N<0?-1:1,x=S===-1?h-v:h+v,b=40,O=function(){e.contentWrapperEl&&(S===-1?h>x&&(h-=b,e.contentWrapperEl[e.axis[i].scrollOffsetAttr]=h,c.requestAnimationFrame(O)):h<x&&(h+=b,e.contentWrapperEl[e.axis[i].scrollOffsetAttr]=h,c.requestAnimationFrame(O)))};O()}},r.prototype.getContentElement=function(){return this.contentEl},r.prototype.getScrollElement=function(){return this.contentWrapperEl},r.prototype.removeListeners=function(){var t=w(this.el);this.el.removeEventListener("mouseenter",this.onMouseEnter),this.el.removeEventListener("pointerdown",this.onPointerEvent,!0),this.el.removeEventListener("mousemove",this.onMouseMove),this.el.removeEventListener("mouseleave",this.onMouseLeave),this.contentWrapperEl&&this.contentWrapperEl.removeEventListener("scroll",this.onScroll),t.removeEventListener("resize",this.onWindowResize),this.mutationObserver&&this.mutationObserver.disconnect(),this.resizeObserver&&this.resizeObserver.disconnect(),this.onMouseMove.cancel(),this.onWindowResize.cancel(),this.onStopScrolling.cancel(),this.onMouseEntered.cancel()},r.prototype.unMount=function(){this.removeListeners()},r.prototype.isWithinBounds=function(t){return this.mouseX>=t.left&&this.mouseX<=t.left+t.width&&this.mouseY>=t.top&&this.mouseY<=t.top+t.height},r.prototype.findChild=function(t,i){var e=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector;return Array.prototype.filter.call(t.children,function(s){return e.call(s,i)})[0]},r.rtlHelpers=null,r.defaultOptions={forceVisible:!1,clickOnTrack:!0,scrollbarMinSize:25,scrollbarMaxSize:0,ariaLabel:"scrollable content",tabIndex:0,classNames:{contentEl:"simplebar-content",contentWrapper:"simplebar-content-wrapper",offset:"simplebar-offset",mask:"simplebar-mask",wrapper:"simplebar-wrapper",placeholder:"simplebar-placeholder",scrollbar:"simplebar-scrollbar",track:"simplebar-track",heightAutoObserverWrapperEl:"simplebar-height-auto-observer-wrapper",heightAutoObserverEl:"simplebar-height-auto-observer",visible:"simplebar-visible",horizontal:"simplebar-horizontal",vertical:"simplebar-vertical",hover:"simplebar-hover",dragging:"simplebar-dragging",scrolling:"simplebar-scrolling",scrollable:"simplebar-scrollable",mouseEntered:"simplebar-mouse-entered"},scrollableNode:null,contentNode:null,autoHide:!0},r.getOptions=me,r.helpers=pe,r}(),g=function(){return g=Object.assign||function(t){for(var i,e=1,s=arguments.length;e<s;e++){i=arguments[e];for(var l in i)Object.prototype.hasOwnProperty.call(i,l)&&(t[l]=i[l])}return t},g.apply(this,arguments)};function ge(r,t){var i={};for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&t.indexOf(e)<0&&(i[e]=r[e]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,e=Object.getOwnPropertySymbols(r);s<e.length;s++)t.indexOf(e[s])<0&&Object.prototype.propertyIsEnumerable.call(r,e[s])&&(i[e[s]]=r[e[s]]);return i}var G=d.forwardRef(function(r,t){var i=r.children,e=r.scrollableNodeProps,s=e===void 0?{}:e,l=ge(r,["children","scrollableNodeProps"]),n=d.useRef(),o=d.useRef(),u=d.useRef(),c={},p={};Object.keys(l).forEach(function(h){Object.prototype.hasOwnProperty.call(_.defaultOptions,h)?c[h]=l[h]:p[h]=l[h]});var a=g(g({},_.defaultOptions.classNames),c.classNames),v=g(g({},s),{className:"".concat(a.contentWrapper).concat(s.className?" ".concat(s.className):""),tabIndex:c.tabIndex||_.defaultOptions.tabIndex,role:"region","aria-label":c.ariaLabel||_.defaultOptions.ariaLabel});return d.useEffect(function(){var h;return o.current=v.ref?v.ref.current:o.current,n.current&&(h=new _(n.current,g(g(g({},c),o.current&&{scrollableNode:o.current}),u.current&&{contentNode:u.current})),typeof t=="function"?t(h):t&&(t.current=h)),function(){h==null||h.unMount(),h=null,typeof t=="function"&&t(null)}},[]),d.createElement("div",g({"data-simplebar":"init",ref:n},p),d.createElement("div",{className:a.wrapper},d.createElement("div",{className:a.heightAutoObserverWrapperEl},d.createElement("div",{className:a.heightAutoObserverEl})),d.createElement("div",{className:a.mask},d.createElement("div",{className:a.offset},typeof i=="function"?i({scrollableNodeRef:o,scrollableNodeProps:g(g({},v),{ref:o}),contentNodeRef:u,contentNodeProps:{className:a.contentEl,ref:u}}):d.createElement("div",g({},v),d.createElement("div",{className:a.contentEl},i)))),d.createElement("div",{className:a.placeholder})),d.createElement("div",{className:"".concat(a.track," simplebar-horizontal")},d.createElement("div",{className:a.scrollbar})),d.createElement("div",{className:"".concat(a.track," simplebar-vertical")},d.createElement("div",{className:a.scrollbar})))});G.displayName="SimpleBar";const xe=({children:r,...t})=>J.jsx(G,{...t,children:r});export{xe as S};
