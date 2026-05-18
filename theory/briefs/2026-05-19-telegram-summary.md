<b>전날 이해도 평가</b> <code>2026-05-18</code>

<b>주제</b>: TCP 연결 실패 신호(refused/reset/timeout/FIN) 구분과 초기 진단 프레임
<b>평가 상태</b>: <code>평가 완료</code>
<b>점수</b>: <code>36</code>
<b>판정</b>: 90점 미만 보완 필요

<b>좋은 부분</b>
<blockquote>• FIN=정상 종료, timeout=무응답이라는 큰 방향은 맞췄다.
• 모르는 범위를 숨기지 않고 드러냈다.</blockquote>

<b>부족한 부분</b>
<blockquote>• refused와 reset의 경계를 패킷/상태 전이 기준으로 분리하지 못했다.
• 요청 문제 vs 응답 문제를 단계별로 분해하지 못했다.
• Q2~Q5(가설 우선순위, 지표, 반증 조건, 10분 런북, keepalive tradeoff) 답변 근거가 없다.</blockquote>

<b>90점 기준</b>
• refused/reset/timeout/FIN을 TCP 상태, 패킷 신호, 에러 표면으로 경계 분리.
• 증상별 가설 3개(우선순위 포함)와 관측 지표/반증 조건 제시.
• 10분 초기 대응을 격리→완화→원인축소 순서와 분기 기준으로 제시.
