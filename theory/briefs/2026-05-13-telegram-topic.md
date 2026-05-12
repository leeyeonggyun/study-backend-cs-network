<b>오늘 대화 주제</b> <code>2026-05-13</code>

<b>주제</b>: TCP 연결 실패 신호로 10분 내 장애 원인 레이어 분류하기 (Remediation)
<b>도메인</b>: <code>cs-network-applied</code>
<b>선정 이유</b>: 최근 평가 흐름에서 TCP 실패 신호 해석 정확도와 진단 프레임 약점이 반복되어, 오늘은 분류 정확도와 반증 가능한 진단 절차를 강제한다.

<blockquote><b>시니어 기준</b>
신호를 상태 전이/패킷 레벨로 분해하고 증상별 가설 우선순위, 반증 조건, 완화 tradeoff를 즉시 제시해야 한다.

<b>실무 연결</b>
장애 초기 10분에 경로 무응답, 리스너 부재, 과부하 reset을 빠르게 분리해 MTTR을 줄이고 재시도 증폭을 방지한다.</blockquote>

<b>오늘 질문</b>
<b>Q1.</b> timeout만 급증하고 refused는 거의 없을 때, 첫 10분 분류를 어떻게 할 것인가?
<b>Q2.</b> connection refused와 timeout을 TCP 관점에서 패킷/상태 전이 기준으로 구분해 설명하라.
<b>Q3.</b> reset 증가 시 과부하, 중간 장비, 애플리케이션 종료를 어떻게 분리 진단할 것인가?
<b>Q4.</b> timeout 증가 상황에서 timeout 확대와 retry 강화의 위험 조건과 보호장치를 설명하라.
<b>Q5.</b> 멀티 AZ에서 한 AZ만 실패율이 높을 때 네트워크 경로 문제와 앱 문제를 어떻게 가를 것인가?

<i>답해보면 바로 채점, 교정, 심화질문으로 이어갈게.</i>

<b>대화 기록 파일</b>
<code>study-system/conversations/2026-05-13.md</code>
