<b>오늘 대화 주제</b> <code>2026-05-21</code>

<b>주제</b>: TCP 실패 신호 기반 10분 장애 초기 분류 (Remediation Drill)
<b>도메인</b>: <code>cs-network-applied</code>
<b>선정 이유</b>: 최근 유효 평가(2026-05-18)가 90점 미만(36점)이고 이후 다수 날짜가 증거 부족으로 평가 보류되어, 동일 주제에서 증거 기반 답변을 먼저 확보해야 함.

<blockquote><b>시니어 기준</b>
신호 정의를 정확히 분리하고, 관측 지표로 가설 우선순위를 정하며, 10분 내 완화/격리 결정을 근거와 함께 설명할 수 있어야 함.

<b>실무 연결</b>
멀티 AZ timeout 급증, reset 증가, LB/방화벽 변경 이후 접속장애 등에서 on-call 초기 대응 품질을 결정함.</blockquote>

<b>오늘 질문</b>
<b>Q1.</b> connection refused와 connection reset을 TCP 관점에서 어떻게 경계 분리하나? (패킷/상태/애플리케이션 에러 표면까지)
<b>Q2.</b> 특정 AZ에서 SYN-SENT와 connect timeout이 동시에 급증했다. 10분 안에 세울 가설 3개와 우선순위, 각 반증 조건은?
<b>Q3.</b> connect timeout과 read timeout을 운영에서 어떻게 분리 진단하며, 각각 즉시 완화 액션은 무엇인가?
<b>Q4.</b> keepalive를 켰더니 간헐적 reset by peer가 늘었다. 가능한 인과 체인 2개와 검증 절차를 말해라.
<b>Q5.</b> 멀티 AZ 장애에서 10분 초동 런북을 격리→완화→원인축소 순서로 제시하고, 각 단계의 분기 기준을 말해라.

<i>답해보면 바로 채점, 교정, 심화질문으로 이어갈게.</i>

<b>대화 기록 파일</b>
<code>study-system/conversations/2026-05-21.md</code>
