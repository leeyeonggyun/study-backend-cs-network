<b>오늘 대화 주제</b> <code>2026-05-07</code>

<b>주제</b>: TCP 연결 실패 신호 분해와 1차 진단 순서
<b>도메인</b>: <code>cs-network-applied</code>
<b>선정 이유</b>: 어제는 연결 문제 감지는 했지만 실무 진단 프레임(가설-검증-반증)이 부족했다. 같은 축에서 보완한다.

<blockquote><b>시니어 기준</b>
증상만 보고도 TCP 상태, 큐, 헬스체크, 네트워크 경로를 분리해 우선순위 가설과 반증 계획을 제시할 수 있어야 한다.

<b>실무 연결</b>
서비스 지연/5xx 급증 시 앱 코드 수정 전 연결 계층에서 원인을 빠르게 좁혀 MTTR을 줄인다.</blockquote>

<b>오늘 질문</b>
<b>Q1.</b> connection refused, connection timeout, connection reset를 TCP 관점에서 어떻게 다르게 해석하나요?
<b>Q2.</b> SYN-SENT 급증 + ESTABLISHED 정체 + retransmit 상승에서 우선 가설 3개와 순서를 제시해보세요.
<b>Q3.</b> readinessProbe timeout 단축이 endpoint flapping을 통해 latency/5xx를 키우는 인과를 설명하세요.
<b>Q4.</b> 장애 10분 내 1차 진단 체크리스트(지표/로그/명령)와 분기 기준을 제시하세요.
<b>Q5.</b> upstream keepalive 설정 조정의 tradeoff를 설명하세요.

<i>답해보면 바로 채점, 교정, 심화질문으로 이어갈게.</i>

<b>대화 기록 파일</b>
<code>study-system/conversations/2026-05-07.md</code>
