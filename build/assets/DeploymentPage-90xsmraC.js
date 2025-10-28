import{c as d,r as c,j as e,p as D,B as a,Z as I,S as w}from"./index-BJrElpCF.js";import{B as K,C as s}from"./badge-CMHcWwH1.js";import{I as N}from"./input-BMckND4i.js";import{T as P,a as L,b as n,d as o}from"./tabs-6ohPYEQN.js";import{A as u}from"./activity-CkozYkkq.js";import{G as f,F as v}from"./globe-DOHVv1qQ.js";import{C as t}from"./circle-check-B5qknsOU.js";import{C as l}from"./copy-F9sjUyF0.js";import{U as R}from"./users-D1gMTHLf.js";import{C as E}from"./clock-D-Hf3QvG.js";import"./index-Xk2JkZhh.js";import"./index-DghoeayG.js";import"./index-iyBuF4A6.js";import"./index-EbipE7Tk.js";import"./index-CwTUOb8G.js";import"./index-B2GqQOFm.js";import"./index-OvCRrSqL.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]],z=d("code",F);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],q=d("external-link",M);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],U=d("key",B),O={status:"deployed",uptime:99.9,avgResponseTime:1.8,totalRequests:12543},G={apiKey:"sk_live_abc123xyz789...",apiEndpoint:"https://api.aiagentlab.com/v1/chat"},H=[{id:"api",name:"REST API",icon:"Code"},{id:"widget",name:"웹 위젯",icon:"Globe"},{id:"sdk",name:"모바일 SDK",icon:"Smartphone"}],W={curl:`curl -X POST https://api.aiagentlab.com/v1/chat \\
  -H "Authorization: Bearer sk_live_abc123xyz789..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "안녕하세요, 도움이 필요합니다",
    "conversation_id": "conv_1234567890",
    "stream": false
  }'`,webWidget:`<!-- AI Agent Lab 웹 위젯 -->
<script src="https://cdn.aiagentlab.com/widget.js"><\/script>
<script>
  AIAgentLab.init({
    apiKey: 'sk_live_abc123xyz789...',
    agentId: 'agent_prod_ai_assistant_v2',
    theme: 'dark',
    position: 'bottom-right',
    primaryColor: '#8b5cf6',
    welcomeMessage: '안녕하세요! 무엇을 도와드릴까요?',
    placeholder: '메시지를 입력하세요...',
    language: 'ko',

    // 고급 설정
    allowFileUpload: true,
    maxFileSize: 10485760, // 10MB
    showTimestamp: true,
    enableNotifications: true,

    // 커스텀 스타일
    style: {
      width: '400px',
      height: '600px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
    },

    // 이벤트 핸들러
    onOpen: function() {
      console.log('위젯이 열렸습니다');
    },
    onClose: function() {
      console.log('위젯이 닫혔습니다');
    },
    onMessage: function(message) {
      console.log('새 메시지:', message);
    }
  });
<\/script>`,pythonSDK:`# AI Agent Lab Python SDK 설치
# pip install aiagentlab

from aiagentlab import AIAgentLab, AgentConfig

# SDK 초기화
client = AIAgentLab(
    api_key="sk_live_abc123xyz789...",
    base_url="https://api.aiagentlab.com/v1"
)

# 에이전트 설정
config = AgentConfig(
    agent_id="agent_prod_ai_assistant_v2",
    temperature=0.7,
    max_tokens=2048,
    stream=False,
    language="ko"
)

# 대화 시작
response = client.chat.create(
    config=config,
    messages=[
        {"role": "system", "content": "당신은 도움이 되는 AI 어시스턴트입니다."},
        {"role": "user", "content": "안녕하세요, 도움이 필요합니다."}
    ],
    conversation_id="conv_1234567890"  # 선택사항
)

print(response.message)
print(f"토큰 사용량: {response.usage.total_tokens}")

# 스트리밍 모드
for chunk in client.chat.stream(
    config=config,
    messages=[{"role": "user", "content": "긴 답변을 생성해주세요"}]
):
    print(chunk.delta, end="", flush=True)

# 파일 업로드 및 분석
with open("document.pdf", "rb") as file:
    response = client.chat.create(
        config=config,
        messages=[
            {"role": "user", "content": "이 문서를 요약해주세요"}
        ],
        files=[file]
    )

# 대화 기록 조회
history = client.conversations.get("conv_1234567890")
print(f"총 메시지 수: {len(history.messages)}")

# 에이전트 배포 및 모니터링
deployment = client.deployments.create(
    agent_id="agent_prod_ai_assistant_v2",
    environment="production",
    config={
        "auto_scaling": True,
        "max_concurrent_requests": 100,
        "rate_limit": "1000/hour"
    }
)

print(f"배포 ID: {deployment.id}")
print(f"상태: {deployment.status}")`},V={activeUsers:324,todayRequests:1847,avgResponseTime:1.8,successRate:99.2},Z={theme:"dark",position:"bottom-right",primaryColor:"#8b5cf6",welcomeMessage:"안녕하세요!"},$=[{title:"인증 및 보안",url:"/docs/auth"},{title:"요청/응답 형식",url:"/docs/api-reference"},{title:"에러 처리",url:"/docs/errors"},{title:"Rate Limits",url:"/docs/rate-limits"}];function X(){return{deploymentConfig:O,apiConfig:G,integrationPlatforms:H,codeExamples:W,deploymentMetrics:V,widgetConfig:Z,apiDocs:$}}function pe(){const[y,m]=c.useState(!1),[k,x]=c.useState(!1),[C,h]=c.useState(!1),{apiConfig:_,codeExamples:A}=X(),{apiKey:p,apiEndpoint:g}=_,{webWidget:b,curl:S,pythonSDK:j}=A,i=(T,r)=>{navigator.clipboard.writeText(T),r==="api"?(m(!0),setTimeout(()=>m(!1),2e3)):r==="embed"?(x(!0),setTimeout(()=>x(!1),2e3)):r==="python"&&(h(!0),setTimeout(()=>h(!1),2e3))};return e.jsxs("div",{className:"p-8 space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl text-white mb-2",children:"배포 및 통합"}),e.jsx("p",{className:"text-white/60",children:"AI 에이전트를 실제 서비스에 통합하세요"})]}),e.jsxs(K,{className:"bg-green-500/20 text-green-400 border-green-500/30",children:[e.jsx(u,{className:"w-3 h-3 mr-1"}),"배포 준비 완료"]})]}),e.jsx(s,{className:"bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 backdrop-blur-xl border-green-500/30 p-6",children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl",children:e.jsx(D,{className:"w-8 h-8 text-white"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-white text-xl mb-2",children:"배포 상태"}),e.jsx("p",{className:"text-white/80 mb-4",children:"에이전트가 성공적으로 배포되었습니다!"}),e.jsxs("div",{className:"grid grid-cols-3 gap-6",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-white/60 mb-1",children:"가동률"}),e.jsx("p",{className:"text-white text-lg",children:"99.9%"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-white/60 mb-1",children:"평균 응답 시간"}),e.jsx("p",{className:"text-white text-lg",children:"1.8초"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-white/60 mb-1",children:"총 요청 수"}),e.jsx("p",{className:"text-white text-lg",children:"12,543"})]})]})]})]}),e.jsxs(a,{className:"bg-white/10 hover:bg-white/20 text-white border border-white/20",children:[e.jsx(q,{className:"w-4 h-4 mr-2"}),"대시보드 보기"]})]})}),e.jsxs(P,{defaultValue:"api",className:"w-full",children:[e.jsxs(L,{className:"bg-white/5 border border-white/10 p-1",children:[e.jsxs(n,{value:"api",className:"data-[state=active]:bg-purple-500/20",children:[e.jsx(z,{className:"w-4 h-4 mr-2"}),"REST API"]}),e.jsxs(n,{value:"widget",className:"data-[state=active]:bg-purple-500/20",children:[e.jsx(f,{className:"w-4 h-4 mr-2"}),"웹 위젯"]}),e.jsxs(n,{value:"python",className:"data-[state=active]:bg-purple-500/20",children:[e.jsx(v,{className:"w-4 h-4 mr-2"}),"Python SDK"]})]}),e.jsxs(o,{value:"api",className:"space-y-6 mt-6",children:[e.jsxs(s,{className:"bg-white/5 backdrop-blur-xl border-white/10 p-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(U,{className:"w-5 h-5 text-purple-400"}),e.jsx("h3",{className:"text-white",children:"API 키"})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(N,{value:p,readOnly:!0,className:"flex-1 bg-black/30 border-white/10 text-white font-mono"}),e.jsx(a,{onClick:()=>i(p,"api"),className:"bg-white/10 hover:bg-white/20",children:y?e.jsxs(e.Fragment,{children:[e.jsx(t,{className:"w-4 h-4 mr-2"}),"복사됨"]}):e.jsxs(e.Fragment,{children:[e.jsx(l,{className:"w-4 h-4 mr-2"}),"복사"]})})]}),e.jsx("p",{className:"text-xs text-white/60 mt-2",children:"⚠️ API 키를 안전하게 보관하세요."})]}),e.jsxs(s,{className:"bg-white/5 backdrop-blur-xl border-white/10 p-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(I,{className:"w-5 h-5 text-blue-400"}),e.jsx("h3",{className:"text-white",children:"엔드포인트"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"text-sm text-white/60 mb-2 block",children:"Base URL"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(N,{value:g,readOnly:!0,className:"flex-1 bg-black/30 border-white/10 text-white font-mono text-sm"}),e.jsx(a,{onClick:()=>i(g,"api"),variant:"outline",className:"border-white/10 !text-white hover:!text-white",children:e.jsx(l,{className:"w-4 h-4"})})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-sm text-white/60 mb-2 block",children:"cURL 예제"}),e.jsx("pre",{className:"bg-black/30 border border-white/10 rounded-lg p-4 text-xs text-white/80 overflow-x-auto font-mono",children:S})]})]})]})]}),e.jsxs(o,{value:"widget",className:"space-y-6 mt-6",children:[e.jsxs(s,{className:"bg-white/5 backdrop-blur-xl border-white/10 p-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(f,{className:"w-5 h-5 text-green-400"}),e.jsx("h3",{className:"text-white",children:"임베드 코드"})]}),e.jsxs("div",{className:"relative",children:[e.jsx("pre",{className:"bg-black/30 border border-white/10 rounded-lg p-4 text-xs text-white/80 overflow-x-auto font-mono max-h-96",children:b}),e.jsx(a,{onClick:()=>i(b,"embed"),size:"sm",className:"absolute top-2 right-2 bg-white/10 hover:bg-white/20",children:k?e.jsxs(e.Fragment,{children:[e.jsx(t,{className:"w-3 h-3 mr-1"}),"복사됨"]}):e.jsxs(e.Fragment,{children:[e.jsx(l,{className:"w-3 h-3 mr-1"}),"복사"]})})]}),e.jsx("p",{className:"text-xs text-white/60 mt-3",children:"위 코드를 웹사이트의 </body> 태그 직전에 붙여넣으세요."})]}),e.jsxs(s,{className:"bg-white/5 backdrop-blur-xl border-white/10 p-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(w,{className:"w-5 h-5 text-purple-400"}),e.jsx("h3",{className:"text-white",children:"위젯 커스터마이징"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-sm text-white/80",children:"테마"}),e.jsxs("select",{className:"w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white",children:[e.jsx("option",{children:"Dark"}),e.jsx("option",{children:"Light"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-sm text-white/80",children:"위치"}),e.jsxs("select",{className:"w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white",children:[e.jsx("option",{children:"우측 하단"}),e.jsx("option",{children:"좌측 하단"})]})]})]})]})]}),e.jsxs(o,{value:"python",className:"space-y-6 mt-6",children:[e.jsxs(s,{className:"bg-white/5 backdrop-blur-xl border-white/10 p-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(v,{className:"w-5 h-5 text-blue-400"}),e.jsx("h3",{className:"text-white",children:"Python SDK 코드 예제"})]}),e.jsxs("div",{className:"relative",children:[e.jsx("pre",{className:"bg-black/30 border border-white/10 rounded-lg p-4 text-xs text-white/80 overflow-x-auto font-mono max-h-96",children:j}),e.jsx(a,{onClick:()=>i(j,"python"),size:"sm",className:"absolute top-2 right-2 bg-white/10 hover:bg-white/20",children:C?e.jsxs(e.Fragment,{children:[e.jsx(t,{className:"w-3 h-3 mr-1"}),"복사됨"]}):e.jsxs(e.Fragment,{children:[e.jsx(l,{className:"w-3 h-3 mr-1"}),"복사"]})})]}),e.jsxs("p",{className:"text-xs text-white/60 mt-3",children:["먼저 ",e.jsx("code",{className:"bg-black/30 px-2 py-1 rounded",children:"pip install aiagentlab"})," 명령으로 SDK를 설치하세요."]})]}),e.jsxs(s,{className:"bg-white/5 backdrop-blur-xl border-white/10 p-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(w,{className:"w-5 h-5 text-purple-400"}),e.jsx("h3",{className:"text-white",children:"Python SDK 기능"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-start gap-3 p-3 bg-white/5 rounded-lg",children:[e.jsx(t,{className:"w-5 h-5 text-green-400 mt-0.5"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white text-sm font-medium",children:"대화 관리"}),e.jsx("p",{className:"text-white/60 text-xs",children:"일반 모드와 스트리밍 모드 지원"})]})]}),e.jsxs("div",{className:"flex items-start gap-3 p-3 bg-white/5 rounded-lg",children:[e.jsx(t,{className:"w-5 h-5 text-green-400 mt-0.5"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white text-sm font-medium",children:"파일 업로드"}),e.jsx("p",{className:"text-white/60 text-xs",children:"PDF, 이미지 등 다양한 포맷 지원"})]})]}),e.jsxs("div",{className:"flex items-start gap-3 p-3 bg-white/5 rounded-lg",children:[e.jsx(t,{className:"w-5 h-5 text-green-400 mt-0.5"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white text-sm font-medium",children:"배포 및 모니터링"}),e.jsx("p",{className:"text-white/60 text-xs",children:"에이전트 배포 상태 확인 및 관리"})]})]}),e.jsxs("div",{className:"flex items-start gap-3 p-3 bg-white/5 rounded-lg",children:[e.jsx(t,{className:"w-5 h-5 text-green-400 mt-0.5"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white text-sm font-medium",children:"대화 기록"}),e.jsx("p",{className:"text-white/60 text-xs",children:"과거 대화 내역 조회 및 분석"})]})]})]})]})]})]}),e.jsxs(s,{className:"bg-white/5 backdrop-blur-xl border-white/10 p-6",children:[e.jsx("h3",{className:"text-white mb-4",children:"사용량 통계 (실시간)"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsxs("div",{className:"p-4 bg-white/5 rounded-lg border border-white/10",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(R,{className:"w-4 h-4 text-purple-400"}),e.jsx("span",{className:"text-sm text-white/60",children:"활성 사용자"})]}),e.jsx("p",{className:"text-2xl text-white",children:"324"})]}),e.jsxs("div",{className:"p-4 bg-white/5 rounded-lg border border-white/10",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(u,{className:"w-4 h-4 text-blue-400"}),e.jsx("span",{className:"text-sm text-white/60",children:"오늘 요청 수"})]}),e.jsx("p",{className:"text-2xl text-white",children:"1,847"})]}),e.jsxs("div",{className:"p-4 bg-white/5 rounded-lg border border-white/10",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(E,{className:"w-4 h-4 text-green-400"}),e.jsx("span",{className:"text-sm text-white/60",children:"평균 응답시간"})]}),e.jsx("p",{className:"text-2xl text-white",children:"1.8s"})]}),e.jsxs("div",{className:"p-4 bg-white/5 rounded-lg border border-white/10",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(t,{className:"w-4 h-4 text-emerald-400"}),e.jsx("span",{className:"text-sm text-white/60",children:"성공률"})]}),e.jsx("p",{className:"text-2xl text-white",children:"99.2%"})]})]})]})]})}export{pe as DeploymentPage};
