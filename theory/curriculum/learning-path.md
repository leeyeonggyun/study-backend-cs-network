# Backend, CS, Network Learning Path

목표: 백엔드와 CS/네트워크를 초보자 기준에서 시작해, 매일 작은 실습과 복습을 누적하며 실무형 이해로 올린다.

## 운영 원칙

- 하루 학습량은 메인 주제 1개, 서브 주제 1개, 퀴즈 4개, 실습 1개로 제한한다.
- 매일 아침은 어제 로그 복습으로 시작한다.
- 새 주제는 최근 7일 동안의 오답, 막힌 실습, 이미 다룬 주제를 참고해서 고른다.
- 학습은 튜토리얼식으로 진행한다. 서로 무관한 주제를 랜덤하게 고르지 않는다.
- 다음 주제는 가능한 한 어제의 주제와 연결되어야 한다.
- 선행 개념이 약하면 다음 단계로 넘어가지 않고 같은 레벨의 다른 실습으로 반복한다.
- 상위 레벨 주제는 필요한 하위 레벨 개념을 이미 설명하고 실습했을 때만 메인 주제로 선택한다.
- 매일 브리프에는 "오늘 주제가 이전 학습과 어떻게 연결되는지"를 반드시 적는다.
- 개념 설명은 외우기보다 "언제 문제가 되고, 어떻게 관찰하고, 어떻게 고치는가"에 맞춘다.
- 난이도는 정답률과 회고를 기준으로 올린다. 오답이 많으면 같은 레벨의 다른 예제로 반복한다.

## 진행 방식

1. 개념 이해: 오늘 주제를 어제 배운 개념 위에 올린다.
2. 작은 구현: OpenHands 실습은 오늘 메인 주제 하나만 검증하게 만든다.
3. 관찰: 로그, 테스트, 요청/응답, 실패 케이스 중 하나를 직접 확인한다.
4. 회고: 저녁에 헷갈린 용어와 실패 원인을 기록한다.
5. 연결: 다음날 Hermes가 그 기록을 읽고 다음 주제의 난이도와 방향을 조정한다.

## 주제 연결 규칙

- HTTP 요청/응답을 모르면 REST, 인증, 캐시, timeout으로 넘어가지 않는다.
- TCP 연결과 포트를 모르면 keep-alive, timeout, connection pool로 넘어가지 않는다.
- status code와 에러 응답을 모르면 retry/idempotency로 넘어가지 않는다.
- 로그와 테스트를 모르면 장애 대응, observability, 성능 실험으로 넘어가지 않는다.
- DB CRUD를 모르면 transaction, index, slow query로 넘어가지 않는다.
- Redis TTL은 HTTP session, cache, expiration 개념을 연결해서 다룬다.
- retry는 timeout과 idempotency를 같이 이해한 뒤 다룬다.

## 난이도 레벨

### Level 0: 기초 감각 만들기

- 클라이언트/서버
- HTTP 요청과 응답
- URL, method, status code, header, body
- JSON과 API
- 프로세스와 포트
- TCP 연결의 의미
- DNS가 하는 일

### Level 1: 백엔드 기본기

- REST API 설계
- 라우팅과 컨트롤러
- 요청 검증
- 에러 처리
- 환경 변수
- 로그
- 간단한 테스트
- DB CRUD
- 트랜잭션 입문

### Level 2: 네트워크와 운영 기본

- TCP 3-way handshake
- keep-alive, timeout, heartbeat
- HTTP/1.1 연결 재사용
- 프록시와 로드밸런서
- CORS
- TLS 기초
- Redis cache와 TTL
- connection pool

### Level 3: 성능과 장애 대응

- latency와 throughput
- timeout budget
- retry와 idempotency
- rate limit
- cache invalidation
- queue와 backpressure
- DB index
- slow query
- observability: log, metric, trace

### Level 4: 설계와 실무 패턴

- 인증/인가
- session과 JWT
- distributed lock
- consistency
- outbox pattern
- event-driven architecture
- circuit breaker
- graceful shutdown
- capacity planning

## 추천 시작 순서

1. HTTP 요청 처리 흐름
2. TCP 연결과 포트
3. REST API와 status code
4. JSON API 에러 응답 설계
5. 서버 로그 읽기
6. timeout의 의미
7. Redis TTL
8. DB transaction
9. connection pool
10. retry와 idempotency
