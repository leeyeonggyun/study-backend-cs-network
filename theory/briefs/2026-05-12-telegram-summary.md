<b>전날 이해도 평가</b> <code>2026-05-11</code>

<b>주제</b>: 멀티 AZ 장애 상황에서 TCP 연결 실패 신호(refused/timeout/reset/FIN) 기반 초기 진단
<b>평가 상태</b>: <code>평가 완료</code>
<b>점수</b>: <code>52</code>
<b>판정</b>: 90점 미만 보완 필요

<b>좋은 부분</b>
<blockquote>• timeout 증가를 TCP 연결 관점으로 보려는 시도가 있었다.
• refused와 reset을 구분하려는 방향성은 있었다.
• 모르는 항목(Q4, Q5)을 숨기지 않고 드러냈다.</blockquote>

<b>부족한 부분</b>
<blockquote>• timeout의 핵심인 무응답(drop/blackhole) 경로를 우선 가설로 분리하지 못했다.
• refused/reset/timeout/FIN의 상태 전이 및 신호 경계가 혼합되었다.
• threshold 답변에 대상/근거/tradeoff가 없었다.</blockquote>

<b>90점 기준</b>
• refused/timeout/reset/FIN을 TCP 상태·패킷 신호·오류코드로 정확히 분해
• 증상별 가설 3개(우선순위 포함)와 각 가설의 관측 지표/반증 조건 제시
• 10분 초기 대응 런북(격리→완화→원인축소)을 순서와 분기 기준으로 설명
