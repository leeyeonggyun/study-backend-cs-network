<b>오늘 대화 주제</b> <code>2026-05-19</code>

<b>주제</b>: TCP 실패 신호 기반 10분 장애 초기 분류 (Remediation)
<b>도메인</b>: <code>cs-network-applied</code>
<b>선정 이유</b>: 전날 평가가 90 미만이며 약점이 신호 경계·인과·진단 순서에 집중되어 있어 동일 주제 보완이 필요하다.

<blockquote><b>시니어 기준</b>
관측 신호에서 가설 우선순위, 반증, 완화 tradeoff까지 일관된 진단 프레임을 제시해야 한다.

<b>실무 연결</b>
멀티 AZ timeout/reset 장애에서 10분 내 blast radius를 줄이고 잘못된 조치를 피하는 데 직접 사용된다.</blockquote>

<b>오늘 질문</b>
<b>Q1.</b> 같은 연결 실패라도 refused/reset/timeout/FIN을 패킷 흐름 기준으로 어떻게 구분하는가? 각 신호별 대표 원인 1개와 흔한 오진 1개를 말해라.
<b>Q2.</b> 특정 AZ에서 SYN-SENT와 connect timeout이 함께 증가할 때 가설 3개를 우선순위와 함께 제시하고 각 가설의 반증 지표를 말해라.
<b>Q3.</b> read timeout 급증인데 connect timeout은 정상일 때, 네트워크 경로 문제와 서버 처리 지연 가설을 어떻게 분리 진단하는가?
<b>Q4.</b> keepalive 적용 후 첫 요청 실패·재시도 성공 패턴이 발생했다. 가능한 인과 체인과 확인 순서를 설명해라.
<b>Q5.</b> 문제 AZ 격리, timeout 조정, retry 제한 중 어떤 완화책을 먼저 쓸지와 각 조치의 tradeoff/실패 모드를 비교해라.

<i>답해보면 바로 채점, 교정, 심화질문으로 이어갈게.</i>

<b>대화 기록 파일</b>
<code>study-system/conversations/2026-05-19.md</code>
