import{r as c,j as d}from"./index-Dot2ZeBG.js";import{u as v}from"./useEventCallback-Dem8hc05.js";import{m as C,S as b,N as I}from"./NavContext-BQKjAEcU.js";import{B as N}from"./Button-BBg956Hz.js";import{d as p}from"./DataKey-COGXBUcQ.js";const O=c.createContext(null),j=["as","active","eventKey"];function E(t,r){if(t==null)return{};var n={};for(var o in t)if({}.hasOwnProperty.call(t,o)){if(r.indexOf(o)>=0)continue;n[o]=t[o]}return n}function g({key:t,onClick:r,active:n,id:o,role:f,disabled:s}){const l=c.useContext(b),a=c.useContext(I),m=c.useContext(O);let i=n;const e={role:f};if(a){!f&&a.role==="tablist"&&(e.role="tab");const u=a.getControllerId(t??null),x=a.getControlledId(t??null);e[p("event-key")]=t,e.id=u||o,i=n==null&&t!=null?a.activeKey===t:n,(i||!(m!=null&&m.unmountOnExit)&&!(m!=null&&m.mountOnEnter))&&(e["aria-controls"]=x)}return e.role==="tab"&&(e["aria-selected"]=i,i||(e.tabIndex=-1),s&&(e.tabIndex=-1,e["aria-disabled"]=!0)),e.onClick=v(u=>{s||(r==null||r(u),t!=null&&l&&!u.isPropagationStopped()&&l(t,u))}),[e,{isActive:i}]}const K=c.forwardRef((t,r)=>{let{as:n=N,active:o,eventKey:f}=t,s=E(t,j);const[l,a]=g(Object.assign({key:C(f,s.href),active:o},s));return l[p("active")]=a.isActive,d.jsx(n,Object.assign({},s,l,{ref:r}))});K.displayName="NavItem";export{K as N,O as T,g as u};
