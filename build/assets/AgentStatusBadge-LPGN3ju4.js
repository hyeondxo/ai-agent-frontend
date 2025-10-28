import{c as s,j as r}from"./index-BJrElpCF.js";import{B as l}from"./badge-CMHcWwH1.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],o=s("circle",t),n={active:{label:"활성",className:"bg-green-500/20 text-green-400 border-green-500/30"},inactive:{label:"비활성",className:"bg-red-500/20 text-red-400 border-red-500/30"},archived:{label:"보관됨",className:"bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}};function d({status:a,showDot:c=!0}){const e=n[a];return r.jsxs(l,{className:e.className,children:[c&&r.jsx(o,{className:"w-2 h-2 mr-1 fill-current"}),e.label]})}export{d as A};
