<b>오늘 대화 주제</b> <code>2026-05-12</code>

<b>주제</b>: TCP 연결 실패 신호를 이용한 10분 장애 초기 분류 (보완 모드)
<b>도메인</b>: <code>cs-network-applied</code>
<b>선정 이유</b>: 전날 신호 구분 정확도와 가설-반증 진단 프레임이 부족해 선행 보완이 필요하다.

<blockquote><b>시니어 기준</b>
신호를 정확히 분해하고 10분 내 가설 우선순위/반증/완화조치를 제시해 MTTR과 blast radius를 동시에 관리할 수 있어야 한다.

<b>실무 연결</b>
온콜 상황에서 AZ별 timeout 급증 시 트래픽 격리, 재시도 폭증 방지, 의존성 점검 순서를 즉시 실행한다.</blockquote>

<b>오늘 질문</b>
<b>Q1.</b> AZ-B에서만 connect timeout이 5배 증가하고 refused/reset은 거의 없다. 첫 10분 가설 3개를 우선순위대로 말하고, 각 가설 반증 조건을 제시하라.
<b>Q2.</b> connection refused, connection reset, timeout, FIN 종료를 패킷/상태 전이/앱 관찰 증상 기준으로 구분하라.
<b>Q3.</b> LB health check threshold를 2→5로 올릴 때 생기는 tradeoff를 flapping/탐지지연 관점에서 설명하라.
<b>Q4.</b> 장애 중 retry 정책을 조정할 때 retry 횟수, 백오프, jitter, timeout budget을 어떻게 바꿀지와 실패 모드를 설명하라.
<b>Q5.</b> 멀티 AZ 구성인데 전체 서비스가 느려졌다. 구조적 원인 3가지와 각 원인별 blast radius 축소 조치를 제시하라.

<i>답해보면 바로 채점, 교정, 심화질문으로 이어갈게.</i>

<b>대화 기록 파일</b>
<code>study-system/conversations/2026-05-12.md</code>
