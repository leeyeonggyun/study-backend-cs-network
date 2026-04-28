# 오늘의 복습

- 어제는 HTTP를 “클라이언트가 요청을 보내고 서버가 응답을 돌려주는 약속”으로 정리했다.
- DNS/포트 단계 문제와 HTTP 처리 문제를 분리해서 봐야 한다는 점을 배웠다.
- 한 요청을 보냄 -> 도착 -> 처리 -> 응답 4단계로 나눠 점검하는 루틴을 잡았다.
- 실무 관점에서 “응답 코드가 안 보임”은 API 로직 실패가 아니라 연결/도착 단계 문제일 수 있음을 확인했다.

- 꼭 기억할 핵심:
  - 연결 실패(네트워크/포트)와 HTTP 실패(서버가 응답했지만 내용/코드가 문제)를 섞지 말 것
  - listen 상태와 “정상 응답 가능 상태”는 다를 수 있음

- 약점/혼동 가능 지점 2개:
  - 프로세스가 살아 있음 = 요청 처리 가능 으로 단정하는 실수
  - 포트가 열려 있음 = 올바른 HTTP 응답 보장 으로 오해하는 실수

# 어제 틀린 문제 다시 보기

1) 서버 프로세스가 실행 중이고 포트도 listen 상태인데, 클라이언트가 응답을 못 받는 상황이 생길 수 있는 이유를 2가지 쓰세요.  
2) “응답 코드가 전혀 안 보이는 상황”과 “404 응답을 받은 상황”의 차이를 점검 단계 관점에서 설명하세요.

# 오늘의 신규 학습 주제

- 메인 주제: URL, Method, Header, Body 기초
- 이 주제를 고른 이유: 어제 HTTP 요청/응답의 큰 흐름을 배웠으니, 오늘은 요청 메시지 내부를 분해해서 읽는 능력이 필요하다.
- 이전 학습과의 연결: DNS/포트로 “어디로 연결할지”를 배웠고, 어제 HTTP 흐름을 배웠다. 오늘은 HTTP 요청 안에서 “무엇을 요청했는지”를 정확히 해석한다.
- 오늘 배워야 할 핵심 개념:
  - URL(서버 자원 위치를 나타내는 주소)
  - Method(요청의 의도: 조회/생성 등)
  - Header(부가 정보: 형식, 인증, 클라이언트 정보)
  - Body(실제 전달 데이터)
  - Path와 Query의 역할 차이
- 실무에서 왜 중요한지: 장애 분석, API 문서 해석, 서버 로그 판독, 테스트 작성의 기본 단위가 이 4요소다.

- 서브 주제: 기본 Status Code(200, 400, 404) 읽기
- 이 주제를 고른 이유: 요청을 보낸 뒤 결과를 해석하려면 최소한의 응답 코드 의미를 알아야 한다.
- 이전 학습과의 연결: 어제 “응답이 왔는지”를 봤다면, 오늘은 “응답이 어떤 결과인지”를 숫자로 해석한다.
- 오늘 배워야 할 핵심 개념:
  - 200: 요청 처리 성공
  - 400: 잘못된 요청 형식/값
  - 404: 요청한 경로를 서버가 모름
- 실무에서 왜 중요한지: 코드 한 줄 보기 전에, 응답 코드만으로 원인 범위를 빠르게 좁힐 수 있다.

# 오늘의 학습 설명

메인 주제 설명:
- 먼저 용어부터 정확히 잡는다.
  - URL: 서버의 어떤 자원에 접근할지 적는 주소
  - Method: 그 자원에 대해 어떤 행동을 할지 나타내는 요청 동사
  - Header: 요청에 붙는 메타데이터(데이터 형식, 토큰, 클라이언트 정보 등)
  - Body: 서버로 실제 전달하는 본문 데이터
- 흔한 오해:
  - “URL만 맞으면 된다” -> Method가 다르면 완전히 다른 요청이다.
  - “Body는 항상 있다” -> GET은 보통 Body 없이 Query로 조건 전달한다.
  - “Header는 선택” -> Content-Type 누락 시 서버가 Body를 해석 못해 400이 날 수 있다.
- 실무 사용 예:
  - 모바일 앱 API 오류 재현 시, 같은 URL이어도 Method/Header가 다르면 재현 실패
  - 로그에서 path/query를 분리해 보면 잘못된 필터 조건 전달 여부를 바로 확인 가능
  - QA가 보낸 실패 케이스에서 Body JSON 구조 확인으로 요청 문제인지 서버 버그인지 분리 가능
- 트레이드오프/주의점:
  - Query에 민감정보를 넣으면 URL 로그에 남아 보안상 불리하다.
  - Header를 과도하게 늘리면 디버깅 복잡도가 올라간다.
  - Body 스키마를 느슨하게 받으면 초기엔 편하지만, 운영 중 예외 케이스가 급증한다.

서브 주제 설명:
- Status Code는 “서버 처리 결과를 숫자로 알려주는 신호”다.
- 실무 예시:
  - /users/123 요청에서 404면 “서버가 죽음”이 아니라 “경로/자원 부재” 가능성을 먼저 본다.
  - 같은 요청에서 400이면 서버 내부 에러보다 “요청 형식(헤더/바디/파라미터) 문제”를 우선 점검한다.

# 오늘의 퀴즈

1) (복습, 단답) “응답 코드가 전혀 안 보인다”는 상황은 점검 4단계 중 주로 어느 단계 이전에서 막혔다는 신호인가요?  
2) (복습, 설명) listen 상태와 실제 요청 처리 가능 상태가 왜 다를 수 있는지 설명하세요.  
3) (신규, 단답+예시) URL의 path와 query 차이를 설명하고, 각각이 보이는 예시 URL 1개를 쓰세요.  
4) (실무 시나리오, 설명) POST /users 호출이 400을 반환했다. URL, Method, Header, Body 관점에서 확인할 항목을 우선순위대로 3가지 쓰세요.

# OpenHands 실습 브리프

- practice title: HTTP 요청 분해기 만들기 (URL/Method/Header/Body)
- objective: 들어온 HTTP 요청을 요소별로 분해해 JSON으로 반환하고, 잘못된 요청에 400을 반환하는 기본 규칙을 구현한다.
- difficulty: beginner
- required language or stack: Python 3.11, Flask, pytest
- detailed requirements:
  1) GET /health -> 200, {"status":"ok"}
  2) GET /inspect?name=lee&age=20 -> method/path/query/header 일부를 JSON으로 반환
  3) POST /inspect 에 JSON Body 전달 시, body를 파싱해 응답 JSON에 포함
  4) Content-Type이 application/json이 아닌데 Body가 있으면 400 반환
  5) 잘못된 JSON 문법이면 400 반환
  6) 응답 JSON 필수 필드: method, path, query, content_type, body, note
  7) note 필드에는 “요청 해석 성공” 또는 “요청 형식 오류” 메시지 포함
- expected files:
  - app.py
  - request_parser.py
  - tests/test_health.py
  - tests/test_inspect_get.py
  - tests/test_inspect_post.py
  - tests/test_bad_request.py
  - README.md
- at least one intentionally embedded bug or failure case:
  - starter 코드에 의도적으로 `request.args`를 POST body 위치에 넣어 body가 비어 보이게 만든다. 학습자는 테스트 실패를 통해 `request.get_json()`으로 수정해야 한다.
- test requirements:
  - pytest로 최소 6개 테스트
  - 성공 케이스(200)와 실패 케이스(400) 모두 포함
  - 실패 메시지가 원인 구분에 도움이 되는지 assert
- what I should learn through this practice:
  - 요청을 URL/Method/Header/Body로 분해하는 습관
  - 400이 “서버 다운”이 아니라 “요청 형식 문제”일 수 있음을 체감
  - 테스트로 요청 해석 규칙을 고정하는 방법
- completion checklist:
  - /health, /inspect 동작 확인
  - GET/POST 차이 응답에 반영
  - Content-Type/JSON 오류 시 400 동작
  - 의도된 버그 수정 후 테스트 전부 통과
  - README에 실행법과 테스트법 기록

# 오늘의 한 줄 가이드

- 오늘은 “요청 한 건”을 URL, Method, Header, Body 네 칸으로 반드시 나눠서 읽으세요.  
- “에러가 나면 서버가 고장”이라고 바로 결론내리는 실수를 오늘 반드시 피하세요.

# 자동화 Handoff JSON

```json
{
  "schema_version": "1.0",
  "date": "2026-04-28",
  "review": {
    "summary_bullets": [
      "HTTP는 클라이언트 요청과 서버 응답의 약속이라는 점을 학습했다.",
      "연결 실패와 HTTP 처리 실패를 분리해서 진단해야 함을 학습했다.",
      "요청을 보냄-도착-처리-응답 4단계로 점검하는 루틴을 배웠다.",
      "DNS/포트 문제와 애플리케이션 처리 문제를 분리하는 시각을 갖췄다."
    ],
    "must_remember": [
      "응답 코드가 없으면 HTTP 이전 단계(연결/도착) 문제를 먼저 의심한다.",
      "listen 상태와 정상 응답 가능 상태는 동일하지 않다."
    ],
    "weak_points": [
      "프로세스 실행 상태와 실제 요청 처리 가능 상태를 같은 것으로 보는 경향",
      "포트 오픈 상태와 올바른 HTTP 응답 가능 상태를 같은 것으로 보는 경향"
    ]
  },
  "retry_questions": [
    {
      "id": "retry-q1",
      "source": "2026-04-27 weak point",
      "question": "서버 프로세스가 실행 중이고 포트도 listen 상태인데 응답을 못 받는 상황이 가능한 이유를 2가지 설명하세요."
    },
    {
      "id": "retry-q2",
      "source": "2026-04-27 weak point",
      "question": "응답 코드가 전혀 없는 경우와 404를 받은 경우를 점검 단계 관점에서 비교해 설명하세요."
    }
  ],
  "today_topics": {
    "main": {
      "title": "URL, Method, Header, Body 기초",
      "reason": "HTTP 요청/응답의 큰 흐름을 배운 다음, 요청 메시지 내부를 분해해 읽는 능력을 붙여야 실습과 디버깅이 가능해지기 때문",
      "core_concepts": [
        "URL",
        "Method",
        "Header",
        "Body",
        "Path와 Query 차이"
      ],
      "real_world_importance": "API 호출 실패 원인 분리, 로그 판독, 테스트 작성의 기본 단위가 요청 구성요소 해석이기 때문"
    },
    "sub": {
      "title": "기본 Status Code(200, 400, 404) 읽기",
      "reason": "요청 결과를 빠르게 해석하려면 최소 응답 코드 의미를 알아야 하기 때문",
      "core_concepts": [
        "200 성공",
        "400 잘못된 요청",
        "404 경로/자원 없음"
      ],
      "real_world_importance": "코드 분석 전 단계에서 장애 범위를 줄이고 커뮤니케이션 비용을 낮출 수 있기 때문"
    }
  },
  "learning_explanation": {
    "main": {
      "concept": "URL은 자원 위치, Method는 요청 의도, Header는 메타정보, Body는 실제 데이터다. 같은 URL이라도 Method/Header/Body가 다르면 다른 요청으로 처리된다.",
      "common_misunderstandings": [
        "URL만 맞으면 같은 요청이라고 생각하는 오해",
        "GET에도 항상 Body가 있다고 생각하는 오해",
        "Header 누락이 처리 결과에 영향이 없다고 생각하는 오해"
      ],
      "use_cases": [
        "모바일/웹 클라이언트 간 API 호출 불일치 원인 분석",
        "로그에서 path-query 분리로 잘못된 필터 전달 확인",
        "재현 요청에서 Content-Type 누락 여부로 400 원인 분리"
      ],
      "tradeoffs_or_caveats": [
        "Query에 민감정보를 넣으면 로그 노출 위험이 커진다.",
        "Header가 과도하면 디버깅 복잡도가 증가한다.",
        "Body 검증을 느슨하게 하면 운영 중 오류 패턴이 늘어난다."
      ]
    },
    "sub": {
      "concept": "Status Code는 서버 처리 결과를 숫자로 표현한 신호다. 200은 성공, 400은 요청 문제, 404는 경로/자원 미존재를 의미한다.",
      "practical_example": "POST /users 호출이 400이면 서버 다운으로 단정하지 말고 Content-Type과 JSON 형식, 필수 필드 누락부터 확인한다."
    }
  },
  "quiz": [
    {
      "id": "quiz-1",
      "type": "review",
      "question": "응답 코드가 전혀 보이지 않을 때는 점검 루틴의 어느 단계 이전 문제를 먼저 의심해야 하나요?",
      "expected_answer": "HTTP 응답 단계 이전(연결/도착 단계) 문제를 먼저 의심해야 한다."
    },
    {
      "id": "quiz-2",
      "type": "review",
      "question": "listen 상태와 실제 요청 처리 가능 상태가 왜 다를 수 있는지 설명하세요.",
      "expected_answer": "포트가 열려 있어도 앱 내부 로직 오류, 워커 다운, 핸들러 미등록 등으로 실제 응답 처리가 실패할 수 있기 때문이다."
    },
    {
      "id": "quiz-3",
      "type": "new_learning",
      "question": "URL의 path와 query 차이를 설명하고 예시 URL을 1개 쓰세요.",
      "expected_answer": "path는 어떤 자원을 요청하는지, query는 추가 조건을 전달한다. 예: /users?role=admin"
    },
    {
      "id": "quiz-4",
      "type": "practical_scenario",
      "question": "POST /users가 400일 때 URL, Method, Header, Body 관점에서 우선 확인할 3가지를 쓰세요.",
      "expected_answer": "1) URL/path가 맞는지 2) Method가 POST인지 3) Content-Type과 Body(JSON 문법/필수 필드)가 올바른지 확인한다."
    }
  ],
  "openhands_brief": {
    "title": "HTTP 요청 분해기 만들기 (URL/Method/Header/Body)",
    "objective": "HTTP 요청을 구성요소로 분해해 반환하고 잘못된 요청 형식을 400으로 처리하는 기본기를 체득한다.",
    "difficulty": "beginner",
    "stack": [
      "Python 3.11",
      "Flask",
      "pytest"
    ],
    "requirements": [
      "GET /health는 200과 {\"status\":\"ok\"}를 반환한다.",
      "GET /inspect는 method/path/query/content_type/body/note를 JSON으로 반환한다.",
      "POST /inspect는 JSON Body를 파싱해 body 필드에 반영한다.",
      "Content-Type이 application/json이 아닌데 Body가 있으면 400을 반환한다.",
      "JSON 파싱 실패 시 400을 반환한다.",
      "오류 응답에도 원인 구분 가능한 메시지를 포함한다."
    ],
    "expected_files": [
      "app.py",
      "request_parser.py",
      "tests/test_health.py",
      "tests/test_inspect_get.py",
      "tests/test_inspect_post.py",
      "tests/test_bad_request.py",
      "README.md"
    ],
    "intentional_bug": "starter 코드에서 POST body를 request.args로 읽도록 넣어둔다. 테스트 실패를 통해 request.get_json()으로 수정하게 만든다.",
    "test_requirements": [
      "pytest 최소 6개 테스트를 작성한다.",
      "정상(200)과 실패(400) 케이스를 모두 검증한다.",
      "실패 응답 메시지가 원인 분리에 유용한지 assert한다."
    ],
    "learning_outcomes": [
      "요청을 URL/Method/Header/Body로 분해해서 사고하는 습관",
      "400의 의미를 요청 형식 오류로 해석하는 능력",
      "요청 해석 규칙을 테스트로 고정하는 방법"
    ],
    "completion_checklist": [
      "/health와 /inspect가 요구사항대로 동작한다.",
      "GET/POST 차이가 응답 필드에 반영된다.",
      "Content-Type/JSON 오류에서 400이 일관되게 반환된다.",
      "의도된 버그를 수정하고 테스트 전체를 통과했다.",
      "README에 실행/테스트 방법을 기록했다."
    ]
  },
  "daily_line_guide": {
    "approach": "요청 한 건을 URL, Method, Header, Body 네 칸으로 분해해서 읽는 습관으로 학습하세요.",
    "avoid": "에러를 보자마자 서버 고장으로 단정하지 말고 요청 형식 오류 가능성을 먼저 배제하세요."
  },
  "daily_log_markdown": "# Daily Study Log - 2026-04-28\n\n## 1. 오늘 학습 개요\n\n- 메인 주제: URL, Method, Header, Body 기초\n- 서브 주제: 기본 Status Code(200, 400, 404) 읽기\n- 학습 시간:\n- 실습 여부:\n- 전체 난이도 체감:\n\n---\n\n## 2. 아침 복습 요약\n\n### 어제 배운 것 다시 정리\n\n- HTTP는 요청/응답 형식의 약속이다.\n- 연결 실패와 HTTP 처리 실패를 분리해야 한다.\n- 요청 점검은 보냄 -> 도착 -> 처리 -> 응답 순서로 본다.\n\n### 다시 봐야 할 포인트\n\n- listen 상태와 실제 응답 가능 상태를 혼동하지 않기\n- 포트 오픈과 요청 처리 가능을 동일시하지 않기\n\n---\n\n## 3. 오늘의 신규 학습\n\n### 메인 주제 정리\n\n#### 핵심 개념\n\n- URL: 자원 위치\n- Method: 요청 의도\n- Header: 메타 정보\n- Body: 실제 데이터\n- Path vs Query 차이\n\n#### 내가 이해한 내용\n\n-\n\n#### 아직 애매한 부분\n\n-\n\n#### 실무에서 왜 중요한가\n\n- API 디버깅/로그 판독/테스트 작성의 기본 단위다.\n\n### 서브 주제 정리\n\n#### 핵심 개념\n\n- 200: 성공\n- 400: 요청 형식 오류\n- 404: 경로/자원 없음\n\n#### 내가 이해한 내용\n\n-\n\n#### 아직 애매한 부분\n\n-\n\n#### 실무에서 왜 중요한가\n\n- 응답 코드만으로 장애 범위를 빠르게 줄일 수 있다.\n\n---\n\n## 4. 오늘의 퀴즈\n\n### 문제\n\n1. 응답 코드가 전혀 보이지 않을 때는 어느 단계 이전 문제를 먼저 의심해야 하나요?\n2. listen 상태와 실제 요청 처리 가능 상태가 왜 다를 수 있는지 설명하세요.\n3. URL의 path와 query 차이를 설명하고 예시 URL을 1개 쓰세요.\n4. POST /users가 400일 때 URL/Method/Header/Body 관점에서 확인할 3가지를 쓰세요.\n\n### 내 답변\n\n1.\n2.\n3.\n4.\n\n### 정답/피드백\n\n1.\n2.\n3.\n4.\n\n### 틀리거나 애매했던 것\n\n-\n-\n\n---\n\n## 5. 실습 기록\n\n### 실습 제목\n\n- HTTP 요청 분해기 만들기 (URL/Method/Header/Body)\n\n### 실습 목표\n\n- 요청 구성요소 분해와 400 처리 기준을 구현하고 테스트로 검증한다.\n\n### 실습 저장 경로 / 링크\n\n- `study-system/practice/2026-04-28-url-method-header-body-basics`\n\n### 내가 구현한 것\n\n-\n-\n-\n\n### 중간에 막힌 부분\n\n-\n-\n\n### 원인 분석\n\n-\n\n### 최종적으로 배운 것\n\n-\n\n### 다시 하면 더 잘할 수 있는 점\n\n-\n\n---\n\n## 6. 오늘의 약점 정리\n\n- 오늘 특히 헷갈렸던 개념:\n- 용어는 알지만 설명이 불명확한 것:\n- 내일 다시 봐야 할 것:\n- 이번 주 안에 복습할 것:\n\n---\n\n## 7. 오늘의 한 줄 요약\n\n- HTTP 요청을 URL/Method/Header/Body로 분해하면 실무 디버깅 속도가 빨라진다.\n\n---\n\n## 8. 저녁 회고\n\n### 오늘 배운 핵심을 3문장으로 설명\n\n1.\n2.\n3.\n\n### 오늘 가장 어려웠던 점\n\n-\n\n### 오늘 실습에서 가장 중요한 포인트\n\n-\n\n### 실제 서비스/실무에 연결하면\n\n-\n\n### 내일 아침 복습 큐\n\n-\n-\n\n---\n\n## 9. 메타 기록\n\n- 집중도:\n- 이해도:\n- 피로도:\n- 내일 학습 강도 조절 메모:\n- 기타:\n",
  "openhands_input": {
    "schema_version": "1.0",
    "date": "2026-04-28",
    "main_topic": {
      "title": "URL, Method, Header, Body 기초",
      "domain": "backend"
    },
    "sub_topic": {
      "title": "기본 Status Code(200, 400, 404) 읽기",
      "domain": "backend"
    },
    "hermes_explanation": {
      "main_summary": "같은 URL이라도 Method/Header/Body가 다르면 다른 요청이다. 요청 실패 원인은 이 네 요소를 분해하면 더 빨리 찾을 수 있다.",
      "sub_summary": "200/400/404는 각각 성공, 요청 형식 오류, 경로/자원 부재를 의미하며 초기 장애 분류에 매우 유용하다."
    },
    "practice_brief": {
      "title": "HTTP 요청 분해기 만들기 (URL/Method/Header/Body)",
      "objective": "HTTP 요청을 구성요소로 분해해 반환하고 잘못된 요청 형식을 400으로 처리하는 기본기를 체득한다.",
      "difficulty": "beginner",
      "stack": [
        "Python 3.11",
        "Flask",
        "pytest"
      ],
      "requirements": [
        "GET /health는 200과 {\"status\":\"ok\"}를 반환한다.",
        "GET /inspect는 method/path/query/content_type/body/note를 JSON으로 반환한다.",
        "POST /inspect는 JSON Body를 파싱해 body 필드에 반영한다.",
        "Content-Type이 application/json이 아닌데 Body가 있으면 400을 반환한다.",
        "JSON 파싱 실패 시 400을 반환한다.",
        "오류 응답에도 원인 구분 가능한 메시지를 포함한다."
      ],
      "expected_files": [
        "app.py",
        "request_parser.py",
        "tests/test_health.py",
        "tests/test_inspect_get.py",
        "tests/test_inspect_post.py",
        "tests/test_bad_request.py",
        "README.md"
      ],
      "intentional_bug": "starter 코드에서 POST body를 request.args로 읽도록 넣어둔다. 테스트 실패를 통해 request.get_json()으로 수정하게 만든다.",
      "test_requirements": [
        "pytest 최소 6개 테스트를 작성한다.",
        "정상(200)과 실패(400) 케이스를 모두 검증한다.",
        "실패 응답 메시지가 원인 분리에 유용한지 assert한다."
      ],
      "learning_outcomes": [
        "요청을 URL/Method/Header/Body로 분해해서 사고하는 습관",
        "400의 의미를 요청 형식 오류로 해석하는 능력",
        "요청 해석 규칙을 테스트로 고정하는 방법"
      ],
      "completion_checklist": [
        "/health와 /inspect가 요구사항대로 동작한다.",
        "GET/POST 차이가 응답 필드에 반영된다.",
        "Content-Type/JSON 오류에서 400이 일관되게 반환된다.",
        "의도된 버그를 수정하고 테스트 전체를 통과했다.",
        "README에 실행/테스트 방법을 기록했다."
      ]
    },
    "output_project_path": "study-system/practice/2026-04-28-url-method-header-body-basics"
  }
}
```
