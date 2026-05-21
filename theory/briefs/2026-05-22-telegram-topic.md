<b>오늘 대화 주제</b> <code>2026-05-22</code>

<b>주제</b>: TCP 실패 신호로 10분 내 장애 원인 레이어 분류하기 (Remediation)
<b>도메인</b>: <code>cs-network-applied</code>
<b>선정 이유</b>: 전날 실답변 근거가 없어 진도 전진보다 증거 수집이 우선이며, 누적 재점검 큐도 동일 축(TCP 실패 신호 진단)에 집중되어 있음

<blockquote><b>시니어 기준</b>
신호를 상태 전이/패킷/지표로 엄밀히 구분하고, 가설 우선순위와 반증 조건으로 빠르게 원인을 축소하며, 완화와 원인 분석의 tradeoff를 명확히 제시

<b>실무 연결</b>
AZ 편향 connect timeout, 배포 후 reset by peer 급증, read timeout 증가와 재시도 증폭 같은 실제 장애에서 초기 10분 대응 정확도를 높임</blockquote>

<b>오늘 질문</b>
<b>Q1.</b> connection refused, connection reset, connect timeout, read timeout을 TCP 상태/패킷 신호/애플리케이션 표면 에러로 각각 분리해 설명해봐.
<b>Q2.</b> 특정 AZ에서만 SYN-SENT와 connect timeout이 급증했다. 가설 3개의 우선순위와 각 반증 조건을 제시해봐.
<b>Q3.</b> connect timeout과 read timeout이 동시에 늘 때 원인 레이어를 단계별로 분리 진단해봐.
<b>Q4.</b> keepalive 튜닝 이후 reset by peer가 증가했다. 가능한 인과 체인 2개와 검증 절차를 설명해봐.
<b>Q5.</b> 0~10분 장애 초기 대응 런북을 격리→완화→원인축소로 설계하고 각 단계 종료 조건을 제시해봐.

<i>답해보면 바로 채점, 교정, 심화질문으로 이어갈게.</i>

<b>대화 기록 파일</b>
<code>study-system/conversations/2026-05-22.md</code>
