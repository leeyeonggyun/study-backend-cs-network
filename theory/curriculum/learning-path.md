# CS / Network Learning Path

목표: CS와 네트워크를 실무 장애 진단, 성능 분석, 시스템 설계 판단에 쓸 수 있을 만큼 깊게 이해한다.

백엔드 기능 구현 자체는 주요 범위에서 제외한다. HTTP, API, 데이터베이스, 서비스 코드는 CS/network 개념을 설명하는 예시로만 사용한다.

## 핵심 원칙

- 하루에 주제 하나만 깊게 다룬다.
- 설명보다 질문과 답변으로 이해도를 측정한다.
- 90점 이상은 빅테크 시니어 개발자 수준의 개념 정확도, 원인 추론, 실무 적용력을 뜻한다.
- 막힌 주제는 다음날 보완 리스트를 만들고 1주 뒤 다시 질문한다.
- 단순 암기보다 “왜 그렇게 동작하는가”, “장애 상황에서 무엇을 볼 것인가”를 우선한다.

## 진행 방식

1. 전날 대화 기록을 읽는다.
2. 전날 주제 이해도를 엄격하게 채점한다.
3. 90점 미만이면 보완할 개념과 과제를 따로 보낸다.
4. 오늘의 CS/network 주제와 질문을 정한다.
5. 하루 동안 질문-답변 형식으로 대화한다.
6. 대화 기록을 `study-system/conversations/YYYY-MM-DD.md`에 남긴다.
7. 1주 뒤 같은 주제를 다시 질문한다.

## 단계별 커리큘럼

### Phase 0: 실행 모델

- 프로그램, 프로세스, 스레드
- 주소 공간과 실행 컨텍스트
- 스택과 힙
- blocking과 waiting의 차이

### Phase 1: 네트워크 기본 경계

- IP, 포트, 소켓
- listen과 connect
- DNS 조회와 캐시
- TCP 연결 생명주기

### Phase 2: 실무 진단 기초

- connection refused, timeout, reset 구분
- connect timeout과 read timeout
- latency와 throughput
- queueing과 saturation

### Phase 3: 운영과 설계 판단

- retry, backoff, idempotency
- backpressure와 load shedding
- concurrency와 race condition
- 병목 분석과 capacity reasoning
