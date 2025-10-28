import{c as x,g as $,r,j as e,M as w,B as b}from"./index-CjwsK81d.js";import{T as M}from"./textarea-UwN5FLIK.js";import{S as E,d as R,e as I,f as C,g as _,T as P}from"./select-D0GgOLUD.js";import{P as T}from"./PageHeader-BWuydlnM.js";import"./index-BdQq_4o_.js";import"./index-cApR1vuv.js";import"./index-BBTXutMD.js";import"./index-HN2gzCzi.js";import"./index-CD6PjwVR.js";import"./check-W36esTi9.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]],N=x("bot",A);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],y=x("loader-circle",D);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],z=x("send",V);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],B=x("user",L);function Y(){const{agents:l}=$(),[n,m]=r.useState(""),[i,h]=r.useState([]),[d,p]=r.useState(""),[c,u]=r.useState(!1),f=r.useRef(null),g=r.useRef(null);r.useEffect(()=>{!n&&l.length>0&&m(l[0].id)},[l,n]),r.useEffect(()=>{f.current?.scrollIntoView({behavior:"smooth"})},[i]);const t=l.find(s=>s.id===n),v=s=>{const a=s.toLowerCase();if(a.includes("안녕")||a.includes("hello"))return`안녕하세요! 저는 ${t?.name} 에이전트입니다. 무엇을 도와드릴까요?`;if(a.includes("이름")||a.includes("name"))return`제 이름은 ${t?.name}입니다. ${t?.description||"다양한 작업을 도와드릴 수 있습니다."}`;if(a.includes("모델")||a.includes("model"))return`저는 ${t?.config.model} 모델을 사용하고 있으며, temperature는 ${t?.config.temperature||.7}로 설정되어 있습니다.`;if(a.includes("도움")||a.includes("help"))return`물론이죠! 저는 다음과 같은 작업을 도와드릴 수 있습니다:

1. 질문에 대한 답변 제공
2. 데이터 분석 지원
3. 코드 작성 및 리뷰
4. 문서 작성 지원

구체적으로 어떤 도움이 필요하신가요?`;const o=[`흥미로운 질문이네요! ${t?.config.ragEnabled?"RAG 시스템을 활용하여 ":""}관련 정보를 검색하고 있습니다...`,`알겠습니다. "${s}"에 대해 분석해보겠습니다.`,"좋은 질문입니다! 이 주제에 대해 더 자세히 설명드리겠습니다.","이해했습니다. 해당 요청을 처리하고 있습니다."];return`${o[Math.floor(Math.random()*o.length)]}

${t?.config.systemPrompt?"시스템 설정에 따라 ":""}이 응답은 mock 데이터입니다. 실제 환경에서는 ${t?.config.model} 모델이 실시간으로 응답을 생성합니다.

더 궁금한 점이 있으시면 언제든 질문해주세요!`},j=async()=>{if(!d.trim()||!n||c)return;const s={id:`msg-${Date.now()}`,role:"user",content:d.trim(),timestamp:new Date().toISOString()};h(a=>[...a,s]),p(""),u(!0),setTimeout(()=>{const a={id:`msg-${Date.now()}-ai`,role:"assistant",content:v(s.content),timestamp:new Date().toISOString(),agentId:n};h(o=>[...o,a]),u(!1),g.current?.focus()},1e3+Math.random()*1e3)},k=()=>{i.length>0&&confirm("대화 내역을 모두 삭제하시겠습니까?")&&h([])},S=s=>{s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),j())};return e.jsxs("div",{className:"flex flex-col h-screen",children:[e.jsxs("div",{className:"p-8 pb-4",children:[e.jsx(T,{title:"Playground",description:"에이전트를 선택하고 실시간으로 테스트해보세요",icon:e.jsx(w,{className:"w-8 h-8 text-purple-400"})}),e.jsxs("div",{className:"mt-6 flex items-center gap-4",children:[e.jsx("label",{className:"text-sm text-white/60 whitespace-nowrap",children:"에이전트 선택:"}),e.jsxs(E,{value:n,onValueChange:m,children:[e.jsx(R,{className:"w-full max-w-md bg-white/5 border-white/10 text-white",children:e.jsx(I,{placeholder:"에이전트를 선택하세요"})}),e.jsx(C,{className:"bg-slate-900 border-white/10",children:l.length===0?e.jsx("div",{className:"p-4 text-center text-white/60",children:"에이전트가 없습니다"}):l.map(s=>{const a=s.status==="active"?e.jsx("span",{className:"text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400",children:"활성"}):s.status==="inactive"?e.jsx("span",{className:"text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400",children:"비활성"}):e.jsx("span",{className:"text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400",children:"보관됨"});return e.jsx(_,{value:s.id,className:"text-white hover:bg-white/10 focus:bg-white/10 py-3 cursor-pointer",children:e.jsxs("div",{className:"flex items-center justify-between w-full gap-4",children:[e.jsx("span",{className:"font-medium",children:s.name}),a]})},s.id)})})]}),i.length>0&&e.jsxs(b,{variant:"outline",size:"sm",onClick:k,className:"ml-auto border-red-500/20 text-red-400 hover:bg-red-500/10",children:[e.jsx(P,{className:"w-4 h-4 mr-2"}),"대화 초기화"]})]})]}),e.jsx("div",{className:"flex-1 overflow-y-auto px-8 pb-4 space-y-4",children:i.length===0?e.jsxs("div",{className:"flex flex-col items-center justify-center h-full",children:[e.jsx("div",{className:"bg-purple-500/10 rounded-full p-8 mb-6",children:e.jsx(w,{className:"w-16 h-16 text-purple-400/50"})}),e.jsx("h3",{className:"text-xl text-white/60 mb-2",children:"대화를 시작하세요"}),e.jsx("p",{className:"text-white/40 text-center max-w-md",children:t?`${t.name} 에이전트와 대화를 시작해보세요`:"먼저 에이전트를 선택해주세요"})]}):e.jsxs(e.Fragment,{children:[i.map(s=>e.jsxs("div",{className:`flex gap-4 ${s.role==="user"?"justify-end":"justify-start"}`,children:[s.role==="assistant"&&e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center",children:e.jsx(N,{className:"w-4 h-4 text-purple-400"})})}),e.jsx("div",{className:`
                    max-w-2xl rounded-2xl px-4 py-3 whitespace-pre-wrap
                    ${s.role==="user"?"bg-purple-600 text-white":"bg-white/5 text-white/90 border border-white/10"}
                  `,children:s.content}),s.role==="user"&&e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center",children:e.jsx(B,{className:"w-4 h-4 text-blue-400"})})})]},s.id)),c&&e.jsxs("div",{className:"flex gap-4 justify-start",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center",children:e.jsx(N,{className:"w-4 h-4 text-purple-400"})})}),e.jsx("div",{className:"max-w-2xl rounded-2xl px-4 py-3 bg-white/5 border border-white/10",children:e.jsx(y,{className:"w-5 h-5 text-purple-400 animate-spin"})})]}),e.jsx("div",{ref:f})]})}),e.jsxs("div",{className:"p-8 pt-4 border-t border-white/10 bg-black/20 backdrop-blur-xl",children:[e.jsxs("div",{className:"flex gap-3 items-end",children:[e.jsx("div",{className:"flex-1",children:e.jsx(M,{ref:g,value:d,onChange:s=>p(s.target.value),onKeyDown:S,placeholder:t?"메시지를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)":"에이전트를 먼저 선택해주세요",disabled:!t||c,className:`
                min-h-[80px] max-h-[200px] resize-none
                bg-white/5 border-white/10 text-white
                placeholder:text-white/40
                focus:border-purple-500/50 focus:ring-purple-500/20
              `})}),e.jsx(b,{onClick:j,disabled:!d.trim()||!t||c,className:`
              h-[80px] px-6
              bg-purple-600 hover:bg-purple-700
              disabled:opacity-50 disabled:cursor-not-allowed
            `,children:c?e.jsx(y,{className:"w-5 h-5 animate-spin"}):e.jsxs(e.Fragment,{children:[e.jsx(z,{className:"w-5 h-5 mr-2"}),"전송"]})})]}),t&&e.jsxs("div",{className:"mt-3 text-xs text-white/40 flex items-center justify-between",children:[e.jsxs("span",{children:["현재 모델: ",t.config.model," | Temperature:"," ",t.config.temperature||.7,t.config.ragEnabled&&" | RAG 활성화"]}),e.jsx("span",{children:"Enter로 전송, Shift+Enter로 줄바꿈"})]})]})]})}export{Y as PlaygroundPage};
