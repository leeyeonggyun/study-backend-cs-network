<b>오늘 대화 주제</b> <code>2026-05-15</code>

<b>주제</b>: TCP 연결 실패 신호로 10분 내 장애 원인 레이어 분류하기 (재보완)
<b>도메인</b>: <code>cs-network-applied</code>
<b>선정 이유</b>: 최근 연속 약점이 동일하고 전날은 증거 부족으로 평가가 보류되어, Phase 2 핵심 관문 주제를 재검증해야 한다.

<blockquote><b>시니어 기준</b>
에러 문자열 암기가 아니라 패킷/상태/지표를 연결해 가설 우선순위와 반증 조건을 제시하고, 10분 내 분기 결정을 내려야 한다.

<b>실무 연결</b>
배포 직후 timeout 급증, 특정 AZ reset 증가, 간헐 refused 상황에서 초기 분류 정확도가 MTTR과 장애 확산을 결정한다.</blockquote>

<b>오늘 질문</b>
<b>Q1.</b> connection refused 발생 시 TCP 관점의 패킷/상태 사건을 설명하고 timeout/reset과 경계를 비교하라.
<b>Q2.</b> connect timeout 급증 시 10분 내 가설 3개 우선순위, 각 가설의 확인 지표와 반증 조건을 제시하라.
<b>Q3.</b> connection reset 증가 시 누가 언제 RST를 보냈는지 기준으로 원인 후보를 구조화하라.
<b>Q4.</b> 동시에 timeout과 refused가 증가할 때 단일 원인 vs 다중 원인 판단 프레임과 반증 순서를 제시하라.
<b>Q5.</b> timeout 증가 시 timeout/retry를 키우는 조치의 tradeoff와 실패모드, 안전장치를 설명하라.

<i>답해보면 바로 채점, 교정, 심화질문으로 이어갈게.</i>

<b>대화 기록 파일</b>
<code>study-system/conversations/2026-05-15.md</code>
