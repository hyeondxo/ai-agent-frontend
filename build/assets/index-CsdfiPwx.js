import{c as d,r as u}from"./index-BiVufAjZ.js";import{u as h}from"./index-C71Wkfa4.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],S=d("chevron-down",b);function p(r){const[e,o]=u.useState(void 0);return h(()=>{if(r){o({width:r.offsetWidth,height:r.offsetHeight});const c=new ResizeObserver(t=>{if(!Array.isArray(t)||!t.length)return;const f=t[0];let s,i;if("borderBoxSize"in f){const n=f.borderBoxSize,a=Array.isArray(n)?n[0]:n;s=a.inlineSize,i=a.blockSize}else s=r.offsetWidth,i=r.offsetHeight;o({width:s,height:i})});return c.observe(r,{box:"border-box"}),()=>c.unobserve(r)}else o(void 0)},[r]),e}function y(r){const e=u.useRef({value:r,previous:r});return u.useMemo(()=>(e.current.value!==r&&(e.current.previous=e.current.value,e.current.value=r),e.current.previous),[r])}export{S as C,y as a,p as u};
