import{P as e,r as D,j as r}from"./index-Dot2ZeBG.js";import{D as j,a as w,b as y}from"./Dropdown-Dlqk5Azs.js";const o=e.oneOf(["start","end"]),T=e.oneOfType([o,e.shape({sm:o}),e.shape({md:o}),e.shape({lg:o}),e.shape({xl:o}),e.shape({xxl:o}),e.object]),v={id:e.string,href:e.string,onClick:e.func,title:e.node.isRequired,disabled:e.bool,align:T,menuRole:e.string,renderMenuOnMount:e.bool,rootCloseEvent:e.string,menuVariant:e.oneOf(["dark"]),flip:e.bool,bsPrefix:e.string,variant:e.string,size:e.string},n=D.forwardRef(({title:s,children:i,bsPrefix:t,rootCloseEvent:a,variant:p,size:l,menuRole:d,renderMenuOnMount:f,disabled:c,href:g,id:x,menuVariant:h,flip:u,...m},b)=>r.jsxs(j,{ref:b,...m,children:[r.jsx(w,{id:x,href:g,size:l,variant:p,disabled:c,childBsPrefix:t,children:s}),r.jsx(y,{role:d,renderOnMount:f,rootCloseEvent:a,variant:h,flip:u,children:i})]}));n.displayName="DropdownButton";n.propTypes=v;export{n as D};
