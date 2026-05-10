<b>오늘 대화 주제</b> <code>2026-05-11</code>

<b>주제</b>: TCP 연결 실패 신호를 이용한 10분 장애 초기 분류
<b>도메인</b>: <code>cs-network-applied</code>
<b>선정 이유</b>: 전날은 용어 확인 중심이었고, 오늘은 학습자 주도 진단 프레임으로 전환이 필요하다.

<blockquote><b>시니어 기준</b>
에러 문자열 암기가 아니라 TCP 상태-레이어-관측 포인트를 연결해 우선순위 진단을 즉시 수행해야 한다.

<b>실무 연결</b>
배포 직후 timeout/refused/reset이 혼재할 때 원인 레이어를 빠르게 분류해 잘못된 에스컬레이션을 줄인다.</blockquote>

<b>오늘 질문</b>
<b>Q1.</b> 배포 직후 일부 AZ에서만 connection timeout이 급증한다. 첫 10분 가설 3개와 우선순위를 말해라.
<b>Q2.</b> connection refused와 connection reset by peer를 TCP 상태 전이 기준으로 구분하고 로그 혼동 원인을 설명해라.
<b>Q3.</b> readiness flapping 상황에서 threshold를 어떻게 조정할지, 장애 은닉 리스크까지 포함해 답하라.
<b>Q4.</b> SYN-SENT 비율 급증, ESTABLISHED 정체일 때 가능한 원인 레이어 분류와 다음 확인 순서를 제시하라.
<b>Q5.</b> timeout 값을 늘리는 대응이 유효한 경우와 장애를 악화시키는 경우를 비교하라.

<i>답해보면 바로 채점, 교정, 심화질문으로 이어갈게.</i>

<b>대화 기록 파일</b>
<code>study-system/conversations/2026-05-11.md</code>
