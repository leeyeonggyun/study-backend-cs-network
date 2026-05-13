<b>오늘 대화 주제</b> <code>2026-05-14</code>

<b>주제</b>: TCP 연결 실패 신호로 10분 내 장애 원인 레이어 분류하기 (보완 모드)
<b>도메인</b>: <code>cs-network-applied</code>
<b>선정 이유</b>: 전날 평가가 insufficient_evidence로 보류되었고, 누적 약점이 TCP 실패 신호 해석과 진단 프레임에 집중되어 있기 때문이다.

<blockquote><b>시니어 기준</b>
신호를 정의 암기가 아니라 상태 전이/관측 지표/반증 조건으로 설명하고, 가설 우선순위와 tradeoff를 근거로 제시해야 한다.

<b>실무 연결</b>
장애 초기에 앱/호스트/네트워크 원인 레이어를 10분 내 분류하고 완화 조치를 선택할 때 사용된다.</blockquote>

<b>오늘 질문</b>
<b>Q1.</b> connection timeout의 패킷 레벨 의미를 refused/reset과 비교해 설명하라.
<b>Q2.</b> 특정 AZ에서만 connect timeout 급증 시 가설 3개를 우선순위와 함께 제시하고, 가설별 첫 검증 지표와 반증 조건을 말하라.
<b>Q3.</b> refused 증가 시 프로세스 down 외 자주 놓치는 원인 2개와 구분 방법을 설명하라.
<b>Q4.</b> RST 급증 시 발신 주체(클라이언트/서버/중간장비) 식별 방법과 주체별 대응 차이를 설명하라.
<b>Q5.</b> connect timeout을 낮추고 retry를 늘리는 정책이 장애를 악화시키는 조건과 tradeoff를 설명하라.

<i>답해보면 바로 채점, 교정, 심화질문으로 이어갈게.</i>

<b>대화 기록 파일</b>
<code>study-system/conversations/2026-05-14.md</code>
