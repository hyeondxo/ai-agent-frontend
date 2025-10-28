import{c as s,j as a}from"./index-BiVufAjZ.js";import{B as t}from"./badge-Pr9JjNBk.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],o=s("circle",n),l={active:{label:"활성",className:"bg-green-500/20 text-green-400 border-green-500/30"},inactive:{label:"비활성",className:"bg-gray-500/20 text-gray-400 border-gray-500/30"},archived:{label:"보관됨",className:"bg-orange-500/20 text-orange-400 border-orange-500/30"}};function m({status:r,showDot:c=!0}){const e=l[r];return a.jsxs(t,{className:e.className,children:[c&&a.jsx(o,{className:"w-2 h-2 mr-1 fill-current"}),e.label]})}export{m as A};
