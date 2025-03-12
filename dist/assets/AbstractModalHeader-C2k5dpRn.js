import{A as Ee,r as a,K as m,j as d,z as ve,o as Te,B as K,M as be,p as Ce,C as xe}from"./index-Dot2ZeBG.js";import{u as X,a as ye,c as H}from"./useWindow-axTqXNZI.js";import{u as Re}from"./usePrevious-B8d-sa7g.js";import{u as g}from"./useEventCallback-Dem8hc05.js";import{u as Me,r as G,h as we}from"./hasClass-CRmQpxAj.js";import{d as Oe,q as u}from"./DataKey-COGXBUcQ.js";function O(n){n===void 0&&(n=Ee());try{var e=n.activeElement;return!e||!e.nodeName?null:e}catch{return n.body}}function ke(n){const e=a.useRef(n);return e.current=n,e}function Ae(n){const e=ke(n);a.useEffect(()=>()=>e.current(),[])}function Be(n=document){const e=n.defaultView;return Math.abs(e.innerWidth-n.documentElement.clientWidth)}const V=Oe("modal-open");class B{constructor({ownerDocument:e,handleContainerOverflow:t=!0,isRTL:o=!1}={}){this.handleContainerOverflow=t,this.isRTL=o,this.modals=[],this.ownerDocument=e}getScrollbarWidth(){return Be(this.ownerDocument)}getElement(){return(this.ownerDocument||document).body}setModalAttributes(e){}removeModalAttributes(e){}setContainerStyle(e){const t={overflow:"hidden"},o=this.isRTL?"paddingLeft":"paddingRight",r=this.getElement();e.style={overflow:r.style.overflow,[o]:r.style[o]},e.scrollBarWidth&&(t[o]=`${parseInt(m(r,o)||"0",10)+e.scrollBarWidth}px`),r.setAttribute(V,""),m(r,t)}reset(){[...this.modals].forEach(e=>this.remove(e))}removeContainerStyle(e){const t=this.getElement();t.removeAttribute(V),Object.assign(t.style,e.style)}add(e){let t=this.modals.indexOf(e);return t!==-1||(t=this.modals.length,this.modals.push(e),this.setModalAttributes(e),t!==0)||(this.state={scrollBarWidth:this.getScrollbarWidth(),style:{}},this.handleContainerOverflow&&this.setContainerStyle(this.state)),t}remove(e){const t=this.modals.indexOf(e);t!==-1&&(this.modals.splice(t,1),!this.modals.length&&this.handleContainerOverflow&&this.removeContainerStyle(this.state),this.removeModalAttributes(e))}isTopModal(e){return!!this.modals.length&&this.modals[this.modals.length-1]===e}}const Ne=["show","role","className","style","children","backdrop","keyboard","onBackdropClick","onEscapeKeyDown","transition","runTransition","backdropTransition","runBackdropTransition","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","renderDialog","renderBackdrop","manager","container","onShow","onHide","onExit","onExited","onExiting","onEnter","onEntering","onEntered"];function Le(n,e){if(n==null)return{};var t={};for(var o in n)if({}.hasOwnProperty.call(n,o)){if(e.indexOf(o)>=0)continue;t[o]=n[o]}return t}let k;function je(n){return k||(k=new B({ownerDocument:n==null?void 0:n.document})),k}function De(n){const e=X(),t=n||je(e),o=a.useRef({dialog:null,backdrop:null});return Object.assign(o.current,{add:()=>t.add(o.current),remove:()=>t.remove(o.current),isTopModal:()=>t.isTopModal(o.current),setDialogRef:a.useCallback(r=>{o.current.dialog=r},[]),setBackdropRef:a.useCallback(r=>{o.current.backdrop=r},[])})}const Y=a.forwardRef((n,e)=>{let{show:t=!1,role:o="dialog",className:r,style:i,children:T,backdrop:h=!0,keyboard:b=!0,onBackdropClick:N,onEscapeKeyDown:L,transition:q,runTransition:$,backdropTransition:z,runBackdropTransition:J,autoFocus:Q=!0,enforceFocus:Z=!0,restoreFocus:ee=!0,restoreFocusOptions:te,renderDialog:j,renderBackdrop:ne=s=>d.jsx("div",Object.assign({},s)),manager:oe,container:re,onShow:D,onHide:S=()=>{},onExit:se,onExited:W,onExiting:ae,onEnter:ie,onEntering:le,onEntered:de}=n,ce=Le(n,Ne);const c=X(),p=Me(re),l=De(oe),ue=ye(),fe=Re(t),[C,F]=a.useState(!t),E=a.useRef(null);a.useImperativeHandle(e,()=>l,[l]),ve&&!fe&&t&&(E.current=O(c==null?void 0:c.document)),t&&C&&F(!1);const I=g(()=>{if(l.add(),R.current=K(document,"keydown",me),y.current=K(document,"focus",()=>setTimeout(he),!0),D&&D(),Q){var s,_;const w=O((s=(_=l.dialog)==null?void 0:_.ownerDocument)!=null?s:c==null?void 0:c.document);l.dialog&&w&&!H(l.dialog,w)&&(E.current=w,l.dialog.focus())}}),x=g(()=>{if(l.remove(),R.current==null||R.current(),y.current==null||y.current(),ee){var s;(s=E.current)==null||s.focus==null||s.focus(te),E.current=null}});a.useEffect(()=>{!t||!p||I()},[t,p,I]),a.useEffect(()=>{C&&x()},[C,x]),Ae(()=>{x()});const he=g(()=>{if(!Z||!ue()||!l.isTopModal())return;const s=O(c==null?void 0:c.document);l.dialog&&s&&!H(l.dialog,s)&&l.dialog.focus()}),ge=g(s=>{s.target===s.currentTarget&&(N==null||N(s),h===!0&&S())}),me=g(s=>{b&&be(s)&&l.isTopModal()&&(L==null||L(s),s.defaultPrevented||S())}),y=a.useRef(),R=a.useRef(),pe=(...s)=>{F(!0),W==null||W(...s)};if(!p)return null;const P=Object.assign({role:o,ref:l.setDialogRef,"aria-modal":o==="dialog"?!0:void 0},ce,{style:i,className:r,tabIndex:-1});let M=j?j(P):d.jsx("div",Object.assign({},P,{children:a.cloneElement(T,{role:"document"})}));M=G(q,$,{unmountOnExit:!0,mountOnEnter:!0,appear:!0,in:!!t,onExit:se,onExiting:ae,onExited:pe,onEnter:ie,onEntering:le,onEntered:de,children:M});let v=null;return h&&(v=ne({ref:l.setBackdropRef,onClick:ge}),v=G(z,J,{in:!!t,appear:!0,mountOnEnter:!0,unmountOnExit:!0,children:v})),d.jsx(d.Fragment,{children:Te.createPortal(d.jsxs(d.Fragment,{children:[v,M]}),p)})});Y.displayName="Modal";const Ue=Object.assign(Y,{Manager:B});function Se(n,e){n.classList?n.classList.add(e):we(n,e)||(typeof n.className=="string"?n.className=n.className+" "+e:n.setAttribute("class",(n.className&&n.className.baseVal||"")+" "+e))}function U(n,e){return n.replace(new RegExp("(^|\\s)"+e+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function We(n,e){n.classList?n.classList.remove(e):typeof n.className=="string"?n.className=U(n.className,e):n.setAttribute("class",U(n.className&&n.className.baseVal||"",e))}const f={FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top",NAVBAR_TOGGLER:".navbar-toggler"};class Fe extends B{adjustAndStore(e,t,o){const r=t.style[e];t.dataset[e]=r,m(t,{[e]:`${parseFloat(m(t,e))+o}px`})}restore(e,t){const o=t.dataset[e];o!==void 0&&(delete t.dataset[e],m(t,{[e]:o}))}setContainerStyle(e){super.setContainerStyle(e);const t=this.getElement();if(Se(t,"modal-open"),!e.scrollBarWidth)return;const o=this.isRTL?"paddingLeft":"paddingRight",r=this.isRTL?"marginLeft":"marginRight";u(t,f.FIXED_CONTENT).forEach(i=>this.adjustAndStore(o,i,e.scrollBarWidth)),u(t,f.STICKY_CONTENT).forEach(i=>this.adjustAndStore(r,i,-e.scrollBarWidth)),u(t,f.NAVBAR_TOGGLER).forEach(i=>this.adjustAndStore(r,i,e.scrollBarWidth))}removeContainerStyle(e){super.removeContainerStyle(e);const t=this.getElement();We(t,"modal-open");const o=this.isRTL?"paddingLeft":"paddingRight",r=this.isRTL?"marginLeft":"marginRight";u(t,f.FIXED_CONTENT).forEach(i=>this.restore(o,i)),u(t,f.STICKY_CONTENT).forEach(i=>this.restore(r,i)),u(t,f.NAVBAR_TOGGLER).forEach(i=>this.restore(r,i))}}let A;function Xe(n){return A||(A=new Fe(n)),A}const Ie=a.createContext({onHide(){}}),Ye=a.forwardRef(({closeLabel:n="Close",closeVariant:e,closeButton:t=!1,onHide:o,children:r,...i},T)=>{const h=a.useContext(Ie),b=Ce(()=>{h==null||h.onHide(),o==null||o()});return d.jsxs("div",{ref:T,...i,children:[r,t&&d.jsx(xe,{"aria-label":n,variant:e,onClick:b})]})});export{Ye as A,Ue as B,Ie as M,Fe as a,Xe as g};
