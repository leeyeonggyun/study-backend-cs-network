# 이해도 평가 리포트 - 2026-05-11

- 평가일: 2026-05-12
- 주제: 멀티 AZ 장애 상황에서 TCP 연결 실패 신호(refused/timeout/reset/FIN) 기반 초기 진단
- 상태: evaluated
- 점수: 52
- 판정: 90점 미만 보완 필요

## 좋은 부분
- timeout 증가를 TCP 연결 관점으로 보려는 시도가 있었다.
- refused와 reset을 구분하려는 방향성은 있었다.
- 모르는 항목(Q4, Q5)을 숨기지 않고 드러냈다.

## 부족한 부분
- timeout의 핵심인 무응답(drop/blackhole) 경로를 우선 가설로 분리하지 못했다.
- refused/reset/timeout/FIN의 상태 전이 및 신호 경계가 혼합되었다.
- threshold 답변에 대상/근거/tradeoff가 없었다.
- 가설 우선순위, 반증 조건, 10분 대응 순서가 부족했다.
- Q4/Q5 미답으로 실무 대응 역량 근거가 부족했다.

## 90점 기준
- refused/timeout/reset/FIN을 TCP 상태·패킷 신호·오류코드로 정확히 분해
- 증상별 가설 3개(우선순위 포함)와 각 가설의 관측 지표/반증 조건 제시
- 10분 초기 대응 런북(격리→완화→원인축소)을 순서와 분기 기준으로 설명
- threshold/retry/timeout 조정의 tradeoff와 실패 모드를 근거 기반으로 설명
