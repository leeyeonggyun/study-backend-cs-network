<b>오늘 대화 주제</b> <code>2026-05-20</code>

<b>주제</b>: TCP 실패 신호로 10분 내 장애 원인 레이어 분류하기 (Remediation)
<b>도메인</b>: <code>cs-network-applied</code>
<b>선정 이유</b>: 어제 대화 원문 부재로 평가가 보류되어, 진도 진행보다 채점 가능한 근거 답변 확보가 우선이다.

<blockquote><b>시니어 기준</b>
신호 경계를 상태 전이/패킷/관측 지표로 연결해 설명하고, 가설 우선순위·반증 조건·tradeoff를 운영 의사결정 수준으로 제시해야 한다.

<b>실무 연결</b>
on-call 초기 10분 분류 정확도, 잘못된 재시도 정책 방지, MTTR 단축에 직접 연결된다.</blockquote>

<b>오늘 질문</b>
<b>Q1.</b> 일부는 connection refused, 일부는 connect timeout일 때 원인 레이어를 어떻게 분리하겠는가?
<b>Q2.</b> connect timeout 급증 시 10분 런북을 격리→완화→원인축소 순서로 설명하라.
<b>Q3.</b> connection reset 증가를 애플리케이션/네트워크 장비/리소스 압박으로 구분하는 방법은?
<b>Q4.</b> timeout 단축 + retry 증가가 장애를 악화시키는 증폭 경로를 설명하라.
<b>Q5.</b> keepalive, idle timeout, read timeout 경계를 운영 관점에서 정의하고 오설정 실패 모드를 제시하라.

<i>답해보면 바로 채점, 교정, 심화질문으로 이어갈게.</i>

<b>대화 기록 파일</b>
<code>study-system/conversations/2026-05-20.md</code>
