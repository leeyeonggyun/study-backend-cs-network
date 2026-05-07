<b>오늘 대화 주제</b> <code>2026-05-08</code>

<b>주제</b>: TCP 연결 생명주기 기반 장애 진단 (보완 모드: 상태 전이 + 원인 레이어 매핑)
<b>도메인</b>: <code>network</code>
<b>선정 이유</b>: 전날 채점 근거가 없고 직전 유효 평가가 48점이므로 동일 주제 보완이 우선이다.

<blockquote><b>시니어 기준</b>
증상에서 TCP 상태/원인 레이어/관측 지표/반증 조건을 즉시 구조화하고 대응 tradeoff까지 설명해야 한다.

<b>실무 연결</b>
배포 후 timeout/reset 급증, SYN-SENT 증가, 부분 구간 장애에서 MTTR 단축에 직접 연결된다.</blockquote>

<b>오늘 질문</b>
<b>Q1.</b> connection refused, connect timeout, connection reset을 TCP 단계와 원인 레이어로 분리해 설명하세요.
<b>Q2.</b> SYN-SENT 급증+p99 급등 상황에서 10분 내 가설 3개와 우선순위를 제시하세요.
<b>Q3.</b> readiness timeout 단축 이후 flapping과 5xx 증가의 인과 사슬과 차단 지점을 설명하세요.
<b>Q4.</b> keepalive를 공격적으로 줄일 때의 이득/리스크를 LB·NAT 환경까지 포함해 설명하세요.
<b>Q5.</b> 원인 레이어를 1개로 좁히기 위한 10분 체크리스트와 분기 기준을 제시하세요.

<i>답해보면 바로 채점, 교정, 심화질문으로 이어갈게.</i>

<b>대화 기록 파일</b>
<code>study-system/conversations/2026-05-08.md</code>
