import{a7 as S,r as c,j as n,L as A}from"./index-CQD1z6Fx.js";import{I as m}from"./IconifyIcon-Tan7SX-s.js";import{g as E,f as H,a as y}from"./index-DDJ3Z1rG.js";import{c as o}from"./clsx-B-dksMZM.js";import{C as F}from"./Collapse-DKVdKip0.js";import"./LogoBox-Bmq5kXqD.js";import"./logo-B4Xq2_A3.js";import"./logo-sm-DL7Q1oV4.js";import"./logo-dark-B4Xq2_A3.js";import"./SimplebarReactClient-75Xn8H-F.js";import"./isObjectLike-CVNU6iPK.js";import"./toNumber-BUV3ifGt.js";import"./createChainedFunction-Vh3cVaa6.js";const C=({item:s,className:t,linkClassName:r,subMenuClassName:f,activeMenuItems:l,toggleMenu:x})=>{const[u,a]=c.useState(l.includes(s.key)),[d,g]=c.useState(!1);c.useEffect(()=>{a(l.includes(s.key))},[l,s]);const b=e=>{e.preventDefault();const i=!u;return a(i),x&&x(s,i),!1},j=c.useCallback(e=>l!=null&&l.includes(e.key)?"active":"",[l]);return n.jsxs("li",{className:t,onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),children:[n.jsxs("div",{onClick:b,"data-bs-toggle":"collapse","aria-expanded":u,role:"button",className:o(r,{"hover-scale":d}),children:[s.icon&&n.jsx(m,{icon:s.icon,className:"menu-icon"}),n.jsx("span",{className:"ms-2 menu-text",children:s.label}),s.badge?n.jsx("span",{className:`badge badge-pill text-end bg-${s.badge.variant}`,children:s.badge.text}):n.jsx("span",{className:"menu-arrow transition-transform",children:n.jsx(m,{icon:"ri:arrow-drop-right-line",width:24,height:24,className:o("arrow-icon",{"rotate-90":u})})})]}),n.jsx(F,{in:u,children:n.jsx("div",{className:"transition-all duration-300",children:n.jsx("ul",{className:o(f,"pl-2"),children:(s.children||[]).map((e,i)=>n.jsx(c.Fragment,{children:e.children?n.jsx(C,{item:e,linkClassName:o("side-nav-link",j(e)),activeMenuItems:l,className:o("side-nav-item",l!=null&&l.includes(e.key)?"menuitem-active":""),subMenuClassName:"side-nav-second-level",toggleMenu:x}):n.jsx(L,{item:e,className:o("side-nav-item",l!=null&&l.includes(e.key)?"menuitem-active":""),linkClassName:o("side-nav-link",j(e))})},e.key+i))})})})]})},L=({item:s,className:t,linkClassName:r})=>{const[f,l]=c.useState(!1);return n.jsx("li",{className:t,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),children:n.jsx(R,{item:s,className:o(r,{"hover-scale":f})})})},R=({item:s,className:t})=>n.jsxs(A,{to:s.url??"",target:s.target,className:o(t,"transition-all duration-200",{disabled:s.isDisabled}),children:[s.icon&&n.jsx(m,{icon:s.icon,className:"menu-icon"}),n.jsx("span",{className:"ms-2 child-label menu-text",children:s.label}),s.badge&&n.jsx("span",{className:`badge float-end bg-${s.badge.variant}`,children:s.badge.text})]}),V=({menuItems:s})=>{const{pathname:t}=S(),[r,f]=c.useState([]),l=(a,d)=>{d&&f([a.key,...y(s,a)])},x=c.useCallback(a=>r!=null&&r.includes(a.key)?"active":"",[r]),u=c.useCallback(()=>{const a=t==null?void 0:t.replaceAll("",""),d=E(s,a);if(d){const g=H(s,d.key);g&&f([g.key,...y(s,g)]),setTimeout(()=>{const e=document.querySelector(`#leftside-menu-container .simplebar-content a[href="${a}"]`);if(e){const i=document.querySelector("#leftside-menu-container .simplebar-content-wrapper");if(i){const p=e.offsetTop-window.innerHeight*.4;j(i,p,600)}}},400);const b=(e,i,p,k)=>(e/=k/2,e<1?p/2*e*e+i:(e--,-p/2*(e*(e-2)-1)+i)),j=(e,i,p)=>{const k=e.scrollTop,T=i-k,N=20;let h=0;const v=function(){h+=N;const w=b(h,k,T,p);e.scrollTop=w,h<p&&setTimeout(v,N)};v()}}},[t,s]);return c.useEffect(()=>{s&&s.length>0&&u()},[u,s]),n.jsx("ul",{className:"side-nav",children:(s||[]).map((a,d)=>n.jsx(c.Fragment,{children:a.isTitle?n.jsx("li",{className:"side-nav-title",children:a.label}):n.jsx(n.Fragment,{children:a.children?n.jsx(C,{item:a,toggleMenu:l,className:o("side-nav-item",r!=null&&r.includes(a.key)?"menuitem-active":""),linkClassName:o("side-nav-link",x(a)),subMenuClassName:"side-nav-second-level",activeMenuItems:r}):n.jsx(L,{item:a,linkClassName:o("side-nav-link",x(a)),className:o("side-nav-item",r!=null&&r.includes(a.key)?"menuitem-active":"")})})},a.key+d))})};export{V as default};
