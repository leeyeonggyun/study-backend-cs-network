# 오늘의 복습

- 어제 메인으로 HTTP request lifecycle을 시작했고, 요청(method/path/header/body)과 응답(status/header/body) 구조를 봤다.
- 서버 내부에서 라우팅/핸들러를 거쳐 응답이 만들어진다는 흐름을 학습했다.
- 네트워크 관점에서 HTTP 메시지는 TCP 연결 위에서 전달된다는 점을 함께 연결했다.
- 장애를 볼 때 DNS/TCP/HTTP/애플리케이션 로직을 분리해서 원인 범위를 좁혀야 한다는 기준을 세웠다.

- 꼭 기억할 핵심
  - HTTP는 “의미(메서드, 상태코드, 메시지 포맷)”이고 TCP는 “전달(연결, 신뢰성)”이다.
  - HTTP status code가 보인다는 것은 보통 TCP 연결 자체는 성립했다는 신호다.

- 약점/혼동 포인트
  - HTTP와 TCP를 같은 레벨의 개념으로 섞어서 설명할 가능성.
  - 4xx/5xx 같은 애플리케이션 에러와 connect timeout/refused 같은 연결 에러를 구분하지 못할 가능성.

# 어제 틀린 문제 다시 보기

1) “HTTP와 TCP의 역할 차이”를 실무 장애 상황 기준으로 2문장으로 설명해보세요.  
2) 브라우저 네트워크 탭에서 404가 보일 때, 왜 이 상황을 TCP 연결 실패가 아니라 HTTP 라우팅 문제로 먼저 보는지 설명해보세요.

# 오늘의 신규 학습 주제

- 메인 주제: REST API와 Status Code 설계 (rest-status-codes)
- 이 주제를 고른 이유: 어제 배운 HTTP 요청/응답 구조를 실제 API 계약(Contract)으로 확장하는 가장 자연스러운 다음 단계이기 때문.
- 이전 학습과의 연결: 어제는 “요청/응답이 어떻게 흐르는가”를 봤고, 오늘은 “각 요청에 어떤 의미의 응답 코드를 줄 것인가”를 정한다.
- 오늘 배워야 할 핵심 개념:
  - 리소스 중심 URL과 메서드 의미(POST/GET/PATCH/DELETE)
  - 200/201/204/400/404/409/500 구분 기준
  - 일관된 JSON 에러 응답 포맷(code/message/details)
- 실무에서 왜 중요한지: 상태코드와 에러 포맷이 일관되면 프론트/모바일/백엔드가 디버깅 시간을 크게 줄이고, 재시도/알림/UX 처리 정책을 자동화할 수 있다.

- 서브 주제: JSON API 에러 응답 설계 입문 (error response shape)
- 이 주제를 고른 이유: status code를 정해도 에러 body 형식이 제각각이면 실무에서 바로 장애 분석이 어려워지기 때문.
- 이전 학습과의 연결: 어제의 HTTP body 개념 + 오늘의 status code를 묶어 “기계가 해석 가능한 실패 응답”으로 완성한다.
- 오늘 배워야 할 핵심 개념:
  - 에러 응답 최소 필드(code, message, details, requestId)
  - 클라이언트 노출 메시지와 내부 로그 메시지 분리
- 실무에서 왜 중요한지: 모바일/웹 클라이언트가 에러를 분기 처리할 수 있고, 서버 로그와 requestId로 장애 추적이 쉬워진다.

# 오늘의 학습 설명

메인 주제 설명: REST API와 Status Code 설계

REST에서 핵심은 “행위 중심”이 아니라 “리소스 중심”이다.  
예: /createUser 같은 동사형보다 /users 리소스에 POST를 보내는 방식이 표준적이다.

실무에서 자주 쓰는 응답 기준:
- GET 성공: 200
- POST 생성 성공: 201 (가능하면 Location 헤더로 생성 리소스 경로 제공)
- DELETE 성공(본문 없음): 204
- 요청 형식/검증 실패: 400
- 대상 없음: 404
- 상태 충돌(중복, 버전 충돌): 409
- 서버 내부 예외: 500

흔한 오해:
- “실패는 다 500”으로 보내는 것: 클라이언트가 수정 가능한 요청 오류(400 계열)와 서버 장애(500)를 구분 못한다.
- “DELETE 성공은 항상 200”이라고 고정하는 것: 응답 바디가 없다면 204가 더 명확하다.
- “404면 무조건 네트워크 문제”라고 보는 것: 404는 HTTP 레벨에서 서버가 준 의미 있는 응답이다.

실무 활용:
- 모바일 앱은 401/403/409/422 등에 따라 재로그인, 중복 처리, 사용자 안내를 다르게 수행한다.
- API Gateway, 모니터링, 알림 정책도 status code 기반으로 필터링/집계한다.
- 장애 시 “연결 실패”와 “비즈니스 실패”를 나눠 triage 속도를 높인다.

트레이드오프/주의점:
- 너무 세밀한 커스텀 코드 남발은 유지보수 비용 증가.
- 반대로 코드를 너무 단순화하면(예: 실패=500) 디버깅 비용 증가.
- 팀 내 “상태코드 매핑 표”를 문서화하지 않으면 서비스별 불일치가 빠르게 발생한다.

서브 주제 설명: JSON API 에러 응답 설계 입문

개념 요약:
에러 응답은 “사람이 읽는 문장”이 아니라 “클라이언트와 운영도구가 파싱할 수 있는 구조”여야 한다.  
권장 예:
{
  "code": "VALIDATION_ERROR",
  "message": "title은 필수입니다.",
  "details": [{"field":"title","reason":"required"}],
  "requestId": "req-1234"
}

실무 예시 1개:
모바일에서 POST /todos 호출 시 title 누락:
- status: 400
- body.code: VALIDATION_ERROR  
앱은 code로 입력폼 하이라이트 처리, 서버팀은 requestId로 로그를 역추적한다.

# 오늘의 퀴즈

1) (복습, 단답) HTTP 404가 응답으로 왔을 때 TCP 연결은 보통 어떤 상태였다고 보는가? 이유를 한 줄로 쓰세요.  
2) (복습, 설명) “HTTP와 TCP의 역할”을 장애 분석 흐름(어디서 먼저 확인할지) 기준으로 설명하세요.  
3) (신규, 설명) POST /users 성공 시 200 대신 201을 쓰는 이유와, 함께 고려할 헤더 1개를 설명하세요.  
4) (실무 시나리오) 클라이언트가 잘못된 JSON 필드로 요청했는데 서버가 500을 반환 중입니다. 어떤 status code로 바꿔야 하며, 에러 body에 최소 어떤 필드를 넣어야 운영/클라이언트 양쪽에 유리한지 설명하세요.

# OpenHands 실습 브리프

- 실습 제목: Todo API 상태코드/에러응답 정합성 교정 랩
- objective: 기존 Express API의 잘못된 status code와 에러 응답 포맷을 요구사항에 맞게 교정하고 테스트로 고정한다.
- difficulty: beginner-intermediate
- required language or stack: Node.js 20, Express, Jest, Supertest

- detailed requirements:
  - GET /todos: 성공 시 200 + 배열 반환
  - GET /todos/:id: 없으면 404 + JSON 에러(code/message/requestId)
  - POST /todos: title 누락 시 400 + VALIDATION_ERROR
  - POST /todos: 생성 성공 시 201 + 생성 객체 반환 (+ Location 헤더 권장)
  - DELETE /todos/:id: 성공 시 204(응답 바디 없음)
  - 모든 에러 응답은 공통 포맷(code, message, requestId, details optional)
  - 간단한 requestId 미들웨어를 추가해 응답과 로그에 동일 값 기록

- expected files:
  - src/app.js
  - src/routes/todos.js
  - src/middlewares/requestId.js
  - src/middlewares/errorHandler.js
  - src/utils/apiError.js
  - test/todos.spec.js
  - README.md

- intentionally embedded bug or failure case:
  - starter 코드에 의도적으로 다음 버그가 들어있다고 가정하고 수정할 것:
    1) POST /todos 성공 시 200 반환(정답은 201)
    2) title 누락 검증 실패를 throw로 처리해 500이 나감(정답은 400 + VALIDATION_ERROR)
    3) DELETE 성공 시 200 + body 반환(정답은 204 + empty body)

- test requirements:
  - 총 6개 이상 테스트
  - status code 검증 테스트 필수(201/400/404/204)
  - 에러 응답 필드(code/message/requestId) 존재 검증
  - “현재 실패하는 테스트가 먼저 존재”하도록 작성 후 구현 수정

- what I should learn through this practice:
  - status code를 비즈니스 의미에 맞게 매핑하는 방법
  - 클라이언트 친화적 에러 응답 포맷 설계
  - 테스트로 API 계약을 고정하는 방법

- completion checklist:
  - [ ] 각 엔드포인트 status code가 요구사항과 일치한다.
  - [ ] 에러 응답 포맷이 모든 실패 케이스에서 일관된다.
  - [ ] requestId가 응답/로그에 함께 남는다.
  - [ ] Jest/Supertest 테스트가 모두 통과한다.
  - [ ] README에 상태코드 규칙표를 정리했다.

# 오늘의 한 줄 가이드

오늘은 “요청이 성공/실패했다”가 아니라 “왜 그런 의미인지(status code + error body)”를 API 계약 관점에서 정리하면서 공부하세요.  
오늘 피해야 할 실수는 클라이언트 입력 오류까지 500으로 뭉개서 보내는 것입니다.

# 자동화 Handoff JSON

```json
{
  "schema_version": "1.0",
  "date": "2026-04-24",
  "review": {
    "summary_bullets": [
      "어제는 HTTP request lifecycle의 기본 구조(요청/응답 필드)를 학습했다.",
      "서버 내부에서 라우터와 핸들러를 거쳐 응답이 생성된다는 흐름을 확인했다.",
      "HTTP가 TCP 연결 위에서 전달된다는 점을 네트워크 관점으로 연결했다.",
      "장애를 DNS/TCP/HTTP/애플리케이션 단계로 분리해 보는 기준을 세웠다."
    ],
    "must_remember": [
      "HTTP는 메시지 의미와 형식, TCP는 연결과 신뢰 전송을 담당한다.",
      "HTTP status code를 받았다면 대개 TCP 연결은 성립한 상태다."
    ],
    "weak_points": [
      "HTTP와 TCP를 같은 층위로 혼동하는 경향",
      "HTTP 4xx/5xx와 네트워크 연결 실패를 구분하지 못하는 경향"
    ]
  },
  "retry_questions": [
    {
      "id": "retry-q1",
      "source": "2026-04-23 weak-point",
      "question": "실무 장애 분석 기준으로 HTTP와 TCP의 역할 차이를 2문장으로 설명하세요."
    },
    {
      "id": "retry-q2",
      "source": "2026-04-23 weak-point",
      "question": "브라우저에서 404가 보일 때 TCP 연결 실패보다 HTTP 라우팅 문제를 먼저 의심해야 하는 이유를 설명하세요."
    }
  ],
  "today_topics": {
    "main": {
      "title": "REST API와 Status Code 설계",
      "reason": "어제 학습한 HTTP 요청/응답 구조를 실제 API 계약으로 확장하는 가장 자연스러운 다음 단계이기 때문",
      "core_concepts": [
        "리소스 중심 URL과 메서드 의미",
        "200/201/204/400/404/409/500 구분",
        "일관된 JSON 에러 응답 포맷"
      ],
      "real_world_importance": "상태코드와 에러 포맷 일관성은 클라이언트 분기 처리, 운영 알림, 장애 분석 속도에 직접 영향한다."
    },
    "sub": {
      "title": "JSON API 에러 응답 설계 입문",
      "reason": "status code만 맞아도 에러 body 형식이 제각각이면 실무 디버깅과 클라이언트 처리 자동화가 어려워지기 때문",
      "core_concepts": [
        "code/message/details/requestId 필드 설계",
        "외부 노출 메시지와 내부 원인 분리"
      ],
      "real_world_importance": "requestId와 구조화된 에러는 운영 추적성과 클라이언트 사용자 경험을 동시에 개선한다."
    }
  },
  "learning_explanation": {
    "main": {
      "concept": "REST API는 리소스 중심으로 설계하고, 각 요청 결과를 의미에 맞는 status code로 표현해야 한다. GET 성공은 200, 생성 성공은 201, 본문 없는 삭제 성공은 204, 요청 오류는 400, 대상 없음은 404, 충돌은 409, 서버 장애는 500으로 구분한다.",
      "common_misunderstandings": [
        "모든 실패를 500으로 처리하는 것",
        "DELETE 성공을 항상 200으로 고정하는 것",
        "404를 네트워크 장애로 오해하는 것"
      ],
      "use_cases": [
        "모바일 앱의 에러 분기 처리(재로그인/재입력/중복 안내)",
        "모니터링 시스템에서 4xx와 5xx를 분리해 알림 민감도 조정",
        "API 소비 팀 간 계약 테스트 자동화"
      ],
      "tradeoffs_or_caveats": [
        "상태코드/에러코드 체계를 과도하게 세분화하면 유지보수 비용이 증가한다.",
        "반대로 지나치게 단순화하면 디버깅과 원인분석 비용이 증가한다.",
        "팀 공통 규칙 문서가 없으면 서비스별 불일치가 빠르게 생긴다."
      ]
    },
    "sub": {
      "concept": "JSON API 에러 응답은 사람이 읽는 문장만이 아니라 클라이언트와 운영도구가 파싱 가능한 구조여야 한다. 최소한 code, message, requestId를 포함하고 필요하면 details로 필드 단위 오류를 전달한다.",
      "practical_example": "POST /todos에서 title 누락 시 400 + {code: 'VALIDATION_ERROR', message: 'title은 필수입니다.', requestId: '...'}를 반환하면 앱은 입력폼 오류 표시를 자동화하고 서버팀은 requestId로 로그를 추적할 수 있다."
    }
  },
  "quiz": [
    {
      "id": "q1",
      "type": "review",
      "question": "HTTP 404 응답을 받았을 때 TCP 연결 상태를 어떻게 해석해야 하는가? 이유를 한 줄로 쓰세요.",
      "expected_answer": "보통 TCP 연결은 성립한 상태로 본다. HTTP status code 자체가 애플리케이션 계층 응답이기 때문이다."
    },
    {
      "id": "q2",
      "type": "review",
      "question": "장애 분석 흐름에서 HTTP와 TCP를 어떤 순서와 기준으로 나눠 확인할지 설명하세요.",
      "expected_answer": "먼저 연결 성립 여부(DNS/포트/connect timeout/refused)로 TCP 문제를 확인하고, 연결이 되면 status code/라우팅/요청 검증 등 HTTP·애플리케이션 문제를 본다."
    },
    {
      "id": "q3",
      "type": "new_learning",
      "question": "POST /users 성공 시 201을 권장하는 이유와 함께 고려할 헤더 1개를 설명하세요.",
      "expected_answer": "201은 새 리소스 생성 의미를 명확히 전달한다. Location 헤더로 생성된 리소스 URI를 제공하면 클라이언트가 후속 조회를 쉽게 수행한다."
    },
    {
      "id": "q4",
      "type": "practical_scenario",
      "question": "요청 JSON 필드가 잘못됐는데 서버가 500을 반환한다. 어떤 code로 바꾸고 에러 body에 어떤 필드를 넣어야 하는가?",
      "expected_answer": "요청 검증 실패이므로 400으로 바꾼다. body에는 최소 code, message, requestId(필요 시 details)를 포함해 클라이언트 처리와 운영 추적을 가능하게 한다."
    }
  ],
  "openhands_brief": {
    "title": "Todo API 상태코드/에러응답 정합성 교정 랩",
    "objective": "Express API의 status code와 에러 응답 포맷을 요구사항에 맞게 교정하고 테스트로 계약을 고정한다.",
    "difficulty": "beginner-intermediate",
    "stack": [
      "Node.js 20",
      "Express",
      "Jest",
      "Supertest"
    ],
    "requirements": [
      "GET /todos는 200과 배열을 반환한다.",
      "GET /todos/:id에서 대상이 없으면 404와 표준 에러 JSON을 반환한다.",
      "POST /todos에서 title 누락 시 400과 VALIDATION_ERROR를 반환한다.",
      "POST /todos 성공 시 201을 반환하고 생성 객체를 응답한다.",
      "DELETE /todos/:id 성공 시 204를 반환하고 응답 바디는 비운다.",
      "모든 에러 응답은 code/message/requestId를 포함하고 details는 선택적으로 제공한다.",
      "requestId 미들웨어를 추가해 응답과 로그에서 같은 값을 확인 가능하게 한다."
    ],
    "expected_files": [
      "src/app.js",
      "src/routes/todos.js",
      "src/middlewares/requestId.js",
      "src/middlewares/errorHandler.js",
      "src/utils/apiError.js",
      "test/todos.spec.js",
      "README.md"
    ],
    "intentional_bug": "starter 코드에 POST /todos 성공 시 200 반환, title 누락 시 500 반환, DELETE 성공 시 200+body 반환 버그가 심어져 있으며 이를 요구사항에 맞게 수정해야 한다.",
    "test_requirements": [
      "총 6개 이상 테스트를 작성한다.",
      "status code(201/400/404/204) 검증 테스트를 포함한다.",
      "에러 응답 필드(code/message/requestId) 존재를 검증한다.",
      "실패 테스트를 먼저 만들고 구현을 수정하는 순서를 지킨다."
    ],
    "learning_outcomes": [
      "REST status code를 비즈니스 의미와 연결해 설계하는 능력",
      "구조화된 에러 응답 포맷을 일관되게 적용하는 능력",
      "테스트로 API 계약을 고정하는 능력"
    ],
    "completion_checklist": [
      "엔드포인트별 status code가 요구사항과 일치한다.",
      "모든 실패 케이스에서 에러 응답 포맷이 일관된다.",
      "requestId가 응답과 로그에 함께 남는다.",
      "Jest/Supertest 테스트가 모두 통과한다.",
      "README에 상태코드 규칙표를 정리했다."
    ]
  },
  "daily_line_guide": {
    "approach": "오늘은 상태코드와 에러 바디를 API 계약으로 묶어, 클라이언트와 운영 관점에서 동시에 검증하면서 학습하세요.",
    "avoid": "입력 검증 실패나 리소스 없음 같은 예측 가능한 오류를 500으로 처리하지 마세요."
  },
  "daily_log_markdown": "# Daily Study Log - 2026-04-24\n\n## 1. 오늘 학습 개요\n\n- 메인 주제: REST API and status codes\n- 서브 주제: JSON API error response shape\n- 학습 시간:\n- 실습 여부:\n- 전체 난이도 체감:\n\n---\n\n## 2. 아침 복습 요약\n\n### 어제 배운 것 다시 정리\n\n- HTTP 요청/응답의 기본 구조(method/path/header/body, status/header/body)를 학습했다.\n- HTTP는 TCP 연결 위에서 전달된다는 관계를 확인했다.\n- 장애를 DNS/TCP/HTTP/애플리케이션 단계로 분리해 보는 기준을 세웠다.\n\n### 다시 봐야 할 포인트\n\n- HTTP와 TCP의 역할을 혼동하지 않기.\n- HTTP status code 에러와 연결 실패(connect timeout/refused)를 구분하기.\n\n---\n\n## 3. 오늘의 신규 학습\n\n### 메인 주제 정리\n\n#### 핵심 개념\n\n- 리소스 중심 API 설계와 메서드 의미\n- 200/201/204/400/404/409/500 기준\n- 상태코드와 에러 응답 포맷의 일관성\n\n#### 내가 이해한 내용\n\n-\n\n#### 아직 애매한 부분\n\n-\n\n#### 실무에서 왜 중요한가\n\n- 클라이언트 분기 처리, 장애 분석, 모니터링 자동화의 정확도가 올라간다.\n\n### 서브 주제 정리\n\n#### 핵심 개념\n\n- JSON 에러 응답 최소 필드(code, message, requestId, details)\n- 외부 응답 메시지와 내부 로그 정보 분리\n\n#### 내가 이해한 내용\n\n-\n\n#### 아직 애매한 부분\n\n-\n\n#### 실무에서 왜 중요한가\n\n- requestId 기반으로 장애 추적이 빨라지고, 클라이언트 UX 처리가 일관된다.\n\n---\n\n## 4. 오늘의 퀴즈\n\n### 문제\n\n1. 404 응답이 왔을 때 TCP 연결 상태를 어떻게 해석해야 하는가?\n2. HTTP와 TCP를 장애 분석 흐름 기준으로 설명하라.\n3. POST 생성 성공에서 201과 Location 헤더의 의미를 설명하라.\n4. 검증 실패 요청에서 500이 나오는 API를 어떻게 고칠지 status code와 error body 관점에서 설명하라.\n\n### 내 답변\n\n1.\n2.\n3.\n4.\n\n### 정답/피드백\n\n-\n\n### 틀리거나 애매했던 것\n\n-\n-\n\n---\n\n## 5. 실습 기록\n\n### 실습 제목\n\n- Todo API 상태코드/에러응답 정합성 교정 랩\n\n### 실습 목표\n\n- 잘못된 status code와 에러 응답 포맷을 테스트 기반으로 교정한다.\n\n### 실습 저장 경로 / 링크\n\n- `study-system/practice/2026-04-24-rest-status-codes`\n\n### 내가 구현한 것\n\n-\n-\n-\n\n### 중간에 막힌 부분\n\n-\n-\n\n### 원인 분석\n\n-\n\n### 최종적으로 배운 것\n\n-\n\n### 다시 하면 더 잘할 수 있는 점\n\n-\n\n---\n\n## 6. 오늘의 약점 정리\n\n- 오늘 특히 헷갈렸던 개념:\n- 용어는 알지만 설명이 불명확한 것:\n- 내일 다시 봐야 할 것:\n- 이번 주 안에 복습할 것:\n\n---\n\n## 7. 오늘의 한 줄 요약\n\n- 상태코드와 에러 응답 포맷을 API 계약으로 통일해 클라이언트/운영 양쪽의 디버깅 비용을 줄인다.\n\n---\n\n## 8. 저녁 회고\n\n### 오늘 배운 핵심을 3문장으로 설명\n\n1.\n2.\n3.\n\n### 오늘 가장 어려웠던 점\n\n-\n\n### 오늘 실습에서 가장 중요한 포인트\n\n-\n\n### 실제 서비스/실무에 연결하면\n\n-\n\n### 내일 아침 복습 큐\n\n-\n-\n\n---\n\n## 9. 메타 기록\n\n- 집중도:\n- 이해도:\n- 피로도:\n- 내일 학습 강도 조절 메모:\n- 기타:\n",
  "openhands_input": {
    "schema_version": "1.0",
    "date": "2026-04-24",
    "main_topic": {
      "title": "REST API와 Status Code 설계",
      "domain": "backend"
    },
    "sub_topic": {
      "title": "JSON API 에러 응답 설계 입문",
      "domain": "backend"
    },
    "hermes_explanation": {
      "main_summary": "REST API는 리소스 중심으로 설계하고 결과 의미에 맞는 status code(200/201/204/400/404/409/500)를 일관되게 반환해야 한다.",
      "sub_summary": "에러 응답은 code/message/requestId를 포함한 구조화된 JSON으로 정의해 클라이언트 분기 처리와 운영 추적을 가능하게 해야 한다."
    },
    "practice_brief": {
      "title": "Todo API 상태코드/에러응답 정합성 교정 랩",
      "objective": "Express API의 status code와 에러 응답 포맷을 요구사항에 맞게 교정하고 테스트로 계약을 고정한다.",
      "difficulty": "beginner-intermediate",
      "stack": [
        "Node.js 20",
        "Express",
        "Jest",
        "Supertest"
      ],
      "requirements": [
        "GET /todos는 200과 배열을 반환한다.",
        "GET /todos/:id에서 대상이 없으면 404와 표준 에러 JSON을 반환한다.",
        "POST /todos에서 title 누락 시 400과 VALIDATION_ERROR를 반환한다.",
        "POST /todos 성공 시 201을 반환하고 생성 객체를 응답한다.",
        "DELETE /todos/:id 성공 시 204를 반환하고 응답 바디는 비운다.",
        "모든 에러 응답은 code/message/requestId를 포함하고 details는 선택적으로 제공한다.",
        "requestId 미들웨어를 추가해 응답과 로그에서 같은 값을 확인 가능하게 한다."
      ],
      "expected_files": [
        "src/app.js",
        "src/routes/todos.js",
        "src/middlewares/requestId.js",
        "src/middlewares/errorHandler.js",
        "src/utils/apiError.js",
        "test/todos.spec.js",
        "README.md"
      ],
      "intentional_bug": "starter 코드에 POST /todos 성공 시 200 반환, title 누락 시 500 반환, DELETE 성공 시 200+body 반환 버그가 심어져 있으며 이를 요구사항에 맞게 수정해야 한다.",
      "test_requirements": [
        "총 6개 이상 테스트를 작성한다.",
        "status code(201/400/404/204) 검증 테스트를 포함한다.",
        "에러 응답 필드(code/message/requestId) 존재를 검증한다.",
        "실패 테스트를 먼저 만들고 구현을 수정하는 순서를 지킨다."
      ],
      "learning_outcomes": [
        "REST status code를 비즈니스 의미와 연결해 설계하는 능력",
        "구조화된 에러 응답 포맷을 일관되게 적용하는 능력",
        "테스트로 API 계약을 고정하는 능력"
      ],
      "completion_checklist": [
        "엔드포인트별 status code가 요구사항과 일치한다.",
        "모든 실패 케이스에서 에러 응답 포맷이 일관된다.",
        "requestId가 응답과 로그에 함께 남는다.",
        "Jest/Supertest 테스트가 모두 통과한다.",
        "README에 상태코드 규칙표를 정리했다."
      ]
    },
    "output_project_path": "study-system/practice/2026-04-24-rest-status-codes"
  }
}
```
