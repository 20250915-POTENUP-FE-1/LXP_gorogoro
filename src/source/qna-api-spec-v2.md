__# QnA API 명세서

## 개요

레슨별 질문/답변 관리를 위한 API 명세서입니다.

**Base Path:** `/api/courses/{courseId}/lessons/{lessonId}/qna`

---

## API 목록

| Method | Endpoint                                                              | Description                                  | 권한                         | 상태    |
|--------|-----------------------------------------------------------------------|----------------------------------------------|----------------------------|-------|
| GET    | `/api/courses/{courseId}/lessons/{lessonId}/qna`                      | 레슨 단위 root 질문 목록 조회 (lastActivityAt 내림차순 정렬) | TBD                        | 구현 예정 |
| GET    | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/thread`  | 선택한 root 질문의 스레드 전체 조회 (createdAt 오름차순)      | TBD                        | 구현 예정 |
| POST   | `/api/courses/{courseId}/lessons/{lessonId}/qna`                      | 질문 생성                                        | 인증된 사용자                    | 구현 완료 |
| POST   | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/replies` | 답변 추가                                        | ADMIN, 해당 코스 강사, 해당 코스 수강생 | 구현 완료 |
| PATCH  | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}`         | 질문/답변 수정                                     | ADMIN, 작성자 본인              | 구현 완료 |
| DELETE | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}`         | 질문/답변 삭제                                     | ADMIN, 작성자 본인              | 구현 완료 |
| GET    | `/api/qna/instructors/unanswered`                                     | 강사 미답변 질문 조회                                 | INSTRUCTOR(로그인 된 사용자)      | 구현 완료 |

---__# QnA API 명세서

## 개요

레슨별 질문/답변 관리를 위한 API 명세서입니다.

**Base Path:** `/api/courses/{courseId}/lessons/{lessonId}/qna`

---

## API 목록

| Method | Endpoint                                                              | Description                                  | 권한                         | 상태    |
|--------|-----------------------------------------------------------------------|----------------------------------------------|----------------------------|-------|
| GET    | `/api/courses/{courseId}/lessons/{lessonId}/qna`                      | 레슨 단위 root 질문 목록 조회 (lastActivityAt 내림차순 정렬) | TBD                        | 구현 예정 |
| GET    | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/thread`  | 선택한 root 질문의 스레드 전체 조회 (createdAt 오름차순)      | TBD                        | 구현 예정 |
| POST   | `/api/courses/{courseId}/lessons/{lessonId}/qna`                      | 질문 생성                                        | 인증된 사용자                    | 구현 완료 |
| POST   | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/replies` | 답변 추가                                        | ADMIN, 해당 코스 강사, 해당 코스 수강생 | 구현 완료 |
| PATCH  | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}`         | 질문/답변 수정                                     | ADMIN, 작성자 본인              | 구현 완료 |
| DELETE | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}`         | 질문/답변 삭제                                     | ADMIN, 작성자 본인              | 구현 완료 |
| GET    | `/api/qna/instructors/unanswered`                                     | 강사 미답변 질문 조회                                 | INSTRUCTOR(로그인 된 사용자)      | 구현 완료 |

---

## 1. 레슨 단위 QnA 목록 조회

| 항목          | 내용                                               |
|-------------|--------------------------------------------------|
| Method      | `GET`                                            |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna` |
| Description | 해당 레슨에 달린 root 질문 목록 조회 (lastActivityAt 내림차순 정렬) |
| 권한          | TBD                                              |
| 상태          | 구현 예정                                            |

### Path Variables

| Name     | Type | Description |
|----------|------|-------------|
| courseId | Long | 코스 ID       |
| lessonId | Long | 레슨 ID       |

### Query Parameters

| Name  | Type    | Required | Default | Description                   |
|-------|---------|----------|---------|-------------------------------|
| limit | Integer | N        | 10      | 조회할 최대 개수 (기본 10, 최대 10개씩 전달) |
| page  | Integer | N        | 1       | 조회할 페이지 (limit 기준)            |

> 리스트는 한 번에 최대 10개만 내려주며, 10개를 초과하면 `page`를 증가시켜 다음 구간을 요청해야 합니다. page가 없으면 `1`로 간주합니다.

### Request Body

없음

### Response - Success

- `200 OK`

```json
{
  "questions": [
    {
      "questionId": 1,
      "courseId": 100,
      "lessonId": 50,
      "title": "강의 내용 중 질문이 있습니다",
      "authorId": 42,
      "authorNickname": "하하히오",
      "status": "ANSWERED",
      "replyCount": 3,
      "lastActivityAt": "2024-01-15T10:30:00Z"
    },
    {
      "questionId": 2,
      "courseId": 100,
      "lessonId": 50,
      "title": "실습 코드 관련 질문",
      "authorId": 43,
      "authorNickname": "러러",
      "status": "OPENED",
      "replyCount": 0,
      "lastActivityAt": "2024-01-15T09:15:00Z"
    }
  ]
}
```

| Field                      | Type    | Description                       |
|----------------------------|---------|-----------------------------------|
| questions                  | Array   | root 질문 목록 (lastActivityAt 내림차순)  |
| questions[].questionId     | Long    | 질문 ID                             |
| questions[].courseId       | Long    | 코스 ID                             |
| questions[].lessonId       | Long    | 레슨 ID                             |
| questions[].title          | String  | 질문 제목                             |
| questions[].authorId       | Long    | 작성자 ID                            |
| questions[].status         | String  | 질문 상태 (OPENED, ANSWERED, DELETED) |
| questions[].replyCount     | Integer | 답변 수                              |
| questions[].lastActivityAt | String  | 마지막 활동 시간 (ISO-8601)              |

### Response - Error

| Status | Code | Message                         |
|--------|------|---------------------------------|
| 400    | -    | courseId 또는 lessonId가 양수가 아닌 경우 |

---

## 2. QnA 스레드 상세 조회

| 항목          | 내용                                                                   |
|-------------|----------------------------------------------------------------------|
| Method      | `GET`                                                                |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/thread` |
| Description | 선택한 root 질문의 전체 스레드 조회 (createdAt 오름차순)                              |
| 권한          | TBD                                                                  |
| 상태          | 구현 예정                                                                |

> 해당 API는 선택한 root 질문과 답변을 한 번에 모두 반환하며 페이지네이션 없이 전체 흐름을 전달합니다.

### Path Variables

| Name       | Type | Description |
|------------|------|-------------|
| courseId   | Long | 코스 ID       |
| lessonId   | Long | 레슨 ID       |
| questionId | Long | root 질문 ID  |

### Request Body

없음

### Response - Success

- `200 OK`

```json
{
  "threadId": "550e8400-e29b-41d4-a716-446655440000",
  "courseId": 100,
  "lessonId": 50,
  "instructorId": 5,
  "status": "ANSWERED",
  "lastActivityAt": "2024-01-15T10:30:00Z",
  "questions": [
    {
      "questionId": 1,
      "isRoot": true,
      "title": "질문 제목",
      "content": "질문 내용",
      "authorId": 42,
      "authorNickname": "김초롱",
      "createdAt": "2024-01-14T09:00:00Z"
    },
    {
      "questionId": 10,
      "isRoot": false,
      "title": null,
      "content": "답변 내용",
      "authorId": 5,
      "authorNickname": "박뽀삐",
      "createdAt": "2024-01-14T14:00:00Z"
    }
  ]
}
```

| Field                  | Type    | Description                                                         |
|------------------------|---------|---------------------------------------------------------------------|
| threadId               | UUID    | 스레드 고유 ID (root 질문의 threadId)                                       |
| courseId               | Long    | 코스 ID                                                               |
| lessonId               | Long    | 레슨 ID                                                               |
| instructorId           | Long    | root 질문 작성한 강사 ID (클라이언트는 `authorId === instructorId` 비교로 강사 여부 판단) |
| status                 | String  | root 질문 상태 (OPENED, ANSWERED, DELETED)                              |
| lastActivityAt         | String  | 마지막 활동 시각 (ISO-8601)                                                |
| questions              | Array   | 스레드 내 root 질문 + 답변 목록 (`createdAt` 오름차순)                            |
| questions[].questionId | Long    | 질문/답변 ID                                                            |
| questions[].isRoot     | Boolean | root 질문 여부                                                          |
| questions[].title      | String  | 질문 제목 (답변은 null)                                                    |
| questions[].content    | String  | 질문/답변 내용                                                            |
| questions[].authorId   | Long    | 작성자 ID                                                              |
| questions[].createdAt  | String  | 생성 시각 (ISO-8601)                                                    |

### Response - Error

| Status | Code     | Message        |
|--------|----------|----------------|
| 404    | QNA-0008 | 질문을 찾을 수 없습니다. |

**설계 참고:** `SELECT * FROM question WHERE id = ? OR root_id = ? ORDER BY created_at ASC` (`idx_question_root_id` 활용)

---

## 3. 질문 생성

| 항목          | 내용                                               |
|-------------|--------------------------------------------------|
| Method      | `POST`                                           |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna` |
| Description | 레슨에 대한 질문 생성                                     |
| 권한          | 인증된 사용자                                          |

### Path Variables

| Name     | Type | Description |
|----------|------|-------------|
| courseId | Long | 코스 ID       |
| lessonId | Long | 레슨 ID       |

### Request Body

```json
{
  "title": "강의 내용 중 질문이 있습니다",
  "content": "3분 30초쯤에 나오는 개념이 이해가 안됩니다."
}
```

| Field   | Type   | Required | Description |
|---------|--------|----------|-------------|
| title   | String | Y        | 질문 제목       |
| content | String | Y        | 질문 내용       |

### Response - Success

- `201 Created` (Body 없음)

### Response - Error

| Status | Code     | Message             |
|--------|----------|---------------------|
| 400    | QNA-0001 | 질문 제목은 필수 입력 항목입니다. |
| 400    | QNA-0002 | 질문 내용은 필수 입력 항목입니다. |

---

## 4. 답변 추가

| 항목          | 내용                                                                    |
|-------------|-----------------------------------------------------------------------|
| Method      | `POST`                                                                |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/replies` |
| Description | 질문에 대한 답변 추가                                                          |
| 권한          | ADMIN, 해당 코스 강사, 해당 코스 수강생                                            |

### Path Variables

| Name       | Type | Description |
|------------|------|-------------|
| courseId   | Long | 코스 ID       |
| lessonId   | Long | 레슨 ID       |
| questionId | Long | 질문 ID       |

### Request Body

```json
{
  "content": "해당 부분은 이렇게 이해하시면 됩니다."
}
```

| Field   | Type   | Required | Description |
|---------|--------|----------|-------------|
| content | String | Y        | 답변 내용       |

### Response - Success

- `201 Created` (Body 없음)

### Response - Error

| Status | Code     | Message                      |
|--------|----------|------------------------------|
| 400    | QNA-0002 | 질문 내용은 필수 입력 항목입니다.          |
| 400    | QNA-0003 | 답변의 강의 정보가 원본 질문과 일치하지 않습니다. |
| 400    | QNA-0004 | 답변에는 답변을 작성할 수 없습니다.         |
| 403    | QNA-0007 | 질문에 답변할 권한이 없습니다.            |
| 404    | QNA-0008 | 질문을 찾을 수 없습니다.               |

---

## 5. 질문/답변 수정

| 항목          | 내용                                                            |
|-------------|---------------------------------------------------------------|
| Method      | `PATCH`                                                       |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}` |
| Description | 질문 또는 답변 내용 수정                                                |
| 권한          | ADMIN, 작성자 본인                                                 |

### Path Variables

| Name       | Type | Description |
|------------|------|-------------|
| courseId   | Long | 코스 ID       |
| lessonId   | Long | 레슨 ID       |
| questionId | Long | 질문/답변 ID    |

### Request Body

```json
{
  "title": "수정된 질문 제목",
  "content": "수정된 질문 내용"
}
```

| Field   | Type   | Required | Description       |
|---------|--------|----------|-------------------|
| title   | String | N        | 질문 제목 (답변인 경우 무시) |
| content | String | N        | 질문/답변 내용          |

### Response - Success

- `200 OK` (Body 없음)

### Response - Error

| Status | Code     | Message           |
|--------|----------|-------------------|
| 403    | QNA-0006 | 질문을 수정할 권한이 없습니다. |
| 404    | QNA-0008 | 질문을 찾을 수 없습니다.    |

---

## 6. 질문/답변 삭제

| 항목          | 내용                                                            |
|-------------|---------------------------------------------------------------|
| Method      | `DELETE`                                                      |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}` |
| Description | 질문 또는 답변 삭제 (루트 질문 삭제 시 하위 답변도 함께 삭제)                         |
| 권한          | ADMIN, 작성자 본인                                                 |

### Path Variables

| Name       | Type | Description |
|------------|------|-------------|
| courseId   | Long | 코스 ID       |
| lessonId   | Long | 레슨 ID       |
| questionId | Long | 질문/답변 ID    |

### Request Body

없음

### Response - Success

- `204 No Content` (Body 없음)

### Response - Error

| Status | Code     | Message           |
|--------|----------|-------------------|
| 403    | QNA-0006 | 질문을 수정할 권한이 없습니다. |
| 404    | QNA-0008 | 질문을 찾을 수 없습니다.    |

---

## 7. 강사의 미답변 질문 조회

| 항목          | 내용                                |
|-------------|-----------------------------------|
| Method      | `GET`                             |
| Endpoint    | `/api/qna/instructors/unanswered` |
| Description | 해당 강사에게 할당된 미답변 질문 목록 조회          |
| 권한          | INSTRUCTOR(로그인 된 사용자)             |

### Query Parameters

| Name  | Type    | Default | Description         |
|-------|---------|---------|---------------------|
| limit | Integer | 3       | 조회할 최대 개수 (max: 10) |

### Request Body

없음

### Response - Success

- `200 OK`

```json
{
  "questions": [
    {
      "questionId": 1,
      "courseId": 100,
      "lessonId": 50,
      "title": "강의 내용 중 질문이 있습니다",
      "authorId": 42,
      "lastActivityAt": "2024-01-15T10:30:00Z"
    },
    {
      "questionId": 2,
      "courseId": 100,
      "lessonId": 51,
      "title": "실습 코드 관련 질문",
      "authorId": 43,
      "lastActivityAt": "2024-01-15T09:15:00Z"
    }
  ]
}
```

| Field                      | Type   | Description          |
|----------------------------|--------|----------------------|
| questions                  | Array  | 미답변 질문 목록            |
| questions[].questionId     | Long   | 질문 ID                |
| questions[].courseId       | Long   | 코스 ID                |
| questions[].lessonId       | Long   | 레슨 ID                |
| questions[].title          | String | 질문 제목                |
| questions[].authorId       | Long   | 작성자 ID               |
| questions[].lastActivityAt | String | 마지막 활동 시간 (ISO-8601) |

### Response - Error

| Status | Code | Message               |
|--------|------|-----------------------|
| 400    | -    | limit 파라미터가 양수가 아닌 경우 |

> 조회 대상 강사는 로그인 된 사용자(토큰) 기준이며, 다른 강사의 미답변 목록은 조회할 수 없음


## 1. 레슨 단위 QnA 목록 조회

| 항목          | 내용                                               |
|-------------|--------------------------------------------------|
| Method      | `GET`                                            |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna` |
| Description | 해당 레슨에 달린 root 질문 목록 조회 (lastActivityAt 내림차순 정렬) |
| 권한          | TBD                                              |
| 상태          | 구현 예정                                            |

### Path Variables

| Name     | Type | Description |
|----------|------|-------------|
| courseId | Long | 코스 ID       |
| lessonId | Long | 레슨 ID       |

### Query Parameters

| Name  | Type    | Required | Default | Description                   |
|-------|---------|----------|---------|-------------------------------|
| limit | Integer | N        | 10      | 조회할 최대 개수 (기본 10, 최대 10개씩 전달) |
| page  | Integer | N        | 1       | 조회할 페이지 (limit 기준)            |

> 리스트는 한 번에 최대 10개만 내려주며, 10개를 초과하면 `page`를 증가시켜 다음 구간을 요청해야 합니다. page가 없으면 `1`로 간주합니다.

### Request Body

없음

### Response - Success

- `200 OK`

```json
{
  "questions": [
    {
      "questionId": 1,
      "courseId": 100,
      "lessonId": 50,
      "title": "강의 내용 중 질문이 있습니다",
      "authorId": 42,
      "status": "ANSWERED",
      "replyCount": 3,
      "lastActivityAt": "2024-01-15T10:30:00Z"
    },
    {
      "questionId": 2,
      "courseId": 100,
      "lessonId": 50,
      "title": "실습 코드 관련 질문",
      "authorId": 43,
      "status": "OPENED",
      "replyCount": 0,
      "lastActivityAt": "2024-01-15T09:15:00Z"
    }
  ]
}
```

| Field                      | Type    | Description                       |
|----------------------------|---------|-----------------------------------|
| questions                  | Array   | root 질문 목록 (lastActivityAt 내림차순)  |
| questions[].questionId     | Long    | 질문 ID                             |
| questions[].courseId       | Long    | 코스 ID                             |
| questions[].lessonId       | Long    | 레슨 ID                             |
| questions[].title          | String  | 질문 제목                             |
| questions[].authorId       | Long    | 작성자 ID                            |
| questions[].status         | String  | 질문 상태 (OPENED, ANSWERED, DELETED) |
| questions[].replyCount     | Integer | 답변 수                              |
| questions[].lastActivityAt | String  | 마지막 활동 시간 (ISO-8601)              |

### Response - Error

| Status | Code | Message                         |
|--------|------|---------------------------------|
| 400    | -    | courseId 또는 lessonId가 양수가 아닌 경우 |

---

## 2. QnA 스레드 상세 조회

| 항목          | 내용                                                                   |
|-------------|----------------------------------------------------------------------|
| Method      | `GET`                                                                |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/thread` |
| Description | 선택한 root 질문의 전체 스레드 조회 (createdAt 오름차순)                              |
| 권한          | TBD                                                                  |
| 상태          | 구현 예정                                                                |

> 해당 API는 선택한 root 질문과 답변을 한 번에 모두 반환하며 페이지네이션 없이 전체 흐름을 전달합니다.

### Path Variables

| Name       | Type | Description |
|------------|------|-------------|
| courseId   | Long | 코스 ID       |
| lessonId   | Long | 레슨 ID       |
| questionId | Long | root 질문 ID  |

### Request Body

없음

### Response - Success

- `200 OK`

```json
{
  "threadId": "550e8400-e29b-41d4-a716-446655440000",
  "courseId": 100,
  "lessonId": 50,
  "instructorId": 5,
  "status": "ANSWERED",
  "lastActivityAt": "2024-01-15T10:30:00Z",
  "questions": [
    {
      "questionId": 1,
      "isRoot": true,
      "title": "질문 제목",
      "content": "질문 내용",
      "authorId": 42,
      "createdAt": "2024-01-14T09:00:00Z"
    },
    {
      "questionId": 10,
      "isRoot": false,
      "title": null,
      "content": "답변 내용",
      "authorId": 5,
      "createdAt": "2024-01-14T14:00:00Z"
    }
  ]
}
```

| Field                  | Type    | Description                                                         |
|------------------------|---------|---------------------------------------------------------------------|
| threadId               | UUID    | 스레드 고유 ID (root 질문의 threadId)                                       |
| courseId               | Long    | 코스 ID                                                               |
| lessonId               | Long    | 레슨 ID                                                               |
| instructorId           | Long    | root 질문 작성한 강사 ID (클라이언트는 `authorId === instructorId` 비교로 강사 여부 판단) |
| status                 | String  | root 질문 상태 (OPENED, ANSWERED, DELETED)                              |
| lastActivityAt         | String  | 마지막 활동 시각 (ISO-8601)                                                |
| questions              | Array   | 스레드 내 root 질문 + 답변 목록 (`createdAt` 오름차순)                            |
| questions[].questionId | Long    | 질문/답변 ID                                                            |
| questions[].isRoot     | Boolean | root 질문 여부                                                          |
| questions[].title      | String  | 질문 제목 (답변은 null)                                                    |
| questions[].content    | String  | 질문/답변 내용                                                            |
| questions[].authorId   | Long    | 작성자 ID                                                              |
| questions[].createdAt  | String  | 생성 시각 (ISO-8601)                                                    |

### Response - Error

| Status | Code     | Message        |
|--------|----------|----------------|
| 404    | QNA-0008 | 질문을 찾을 수 없습니다. |

**설계 참고:** `SELECT * FROM question WHERE id = ? OR root_id = ? ORDER BY created_at ASC` (`idx_question_root_id` 활용)

---

## 3. 질문 생성

| 항목          | 내용                                               |
|-------------|--------------------------------------------------|
| Method      | `POST`                                           |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna` |
| Description | 레슨에 대한 질문 생성                                     |
| 권한          | 인증된 사용자                                          |

### Path Variables

| Name     | Type | Description |
|----------|------|-------------|
| courseId | Long | 코스 ID       |
| lessonId | Long | 레슨 ID       |

### Request Body

```json
{
  "title": "강의 내용 중 질문이 있습니다",
  "content": "3분 30초쯤에 나오는 개념이 이해가 안됩니다."
}
```

| Field   | Type   | Required | Description |
|---------|--------|----------|-------------|
| title   | String | Y        | 질문 제목       |
| content | String | Y        | 질문 내용       |

### Response - Success

- `201 Created` (Body 없음)

### Response - Error

| Status | Code     | Message             |
|--------|----------|---------------------|
| 400    | QNA-0001 | 질문 제목은 필수 입력 항목입니다. |
| 400    | QNA-0002 | 질문 내용은 필수 입력 항목입니다. |

---

## 4. 답변 추가

| 항목          | 내용                                                                    |
|-------------|-----------------------------------------------------------------------|
| Method      | `POST`                                                                |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/replies` |
| Description | 질문에 대한 답변 추가                                                          |
| 권한          | ADMIN, 해당 코스 강사, 해당 코스 수강생                                            |

### Path Variables

| Name       | Type | Description |
|------------|------|-------------|
| courseId   | Long | 코스 ID       |
| lessonId   | Long | 레슨 ID       |
| questionId | Long | 질문 ID       |

### Request Body

```json
{
  "content": "해당 부분은 이렇게 이해하시면 됩니다."
}
```

| Field   | Type   | Required | Description |
|---------|--------|----------|-------------|
| content | String | Y        | 답변 내용       |

### Response - Success

- `201 Created` (Body 없음)

### Response - Error

| Status | Code     | Message                      |
|--------|----------|------------------------------|
| 400    | QNA-0002 | 질문 내용은 필수 입력 항목입니다.          |
| 400    | QNA-0003 | 답변의 강의 정보가 원본 질문과 일치하지 않습니다. |
| 400    | QNA-0004 | 답변에는 답변을 작성할 수 없습니다.         |
| 403    | QNA-0007 | 질문에 답변할 권한이 없습니다.            |
| 404    | QNA-0008 | 질문을 찾을 수 없습니다.               |

---

## 5. 질문/답변 수정

| 항목          | 내용                                                            |
|-------------|---------------------------------------------------------------|
| Method      | `PATCH`                                                       |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}` |
| Description | 질문 또는 답변 내용 수정                                                |
| 권한          | ADMIN, 작성자 본인                                                 |

### Path Variables

| Name       | Type | Description |
|------------|------|-------------|
| courseId   | Long | 코스 ID       |
| lessonId   | Long | 레슨 ID       |
| questionId | Long | 질문/답변 ID    |

### Request Body

```json
{
  "title": "수정된 질문 제목",
  "content": "수정된 질문 내용"
}
```

| Field   | Type   | Required | Description       |
|---------|--------|----------|-------------------|
| title   | String | N        | 질문 제목 (답변인 경우 무시) |
| content | String | N        | 질문/답변 내용          |

### Response - Success

- `200 OK` (Body 없음)

### Response - Error

| Status | Code     | Message           |
|--------|----------|-------------------|
| 403    | QNA-0006 | 질문을 수정할 권한이 없습니다. |
| 404    | QNA-0008 | 질문을 찾을 수 없습니다.    |

---

## 6. 질문/답변 삭제

| 항목          | 내용                                                            |
|-------------|---------------------------------------------------------------|
| Method      | `DELETE`                                                      |
| Endpoint    | `/api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}` |
| Description | 질문 또는 답변 삭제 (루트 질문 삭제 시 하위 답변도 함께 삭제)                         |
| 권한          | ADMIN, 작성자 본인                                                 |

### Path Variables

| Name       | Type | Description |
|------------|------|-------------|
| courseId   | Long | 코스 ID       |
| lessonId   | Long | 레슨 ID       |
| questionId | Long | 질문/답변 ID    |

### Request Body

없음

### Response - Success

- `204 No Content` (Body 없음)

### Response - Error

| Status | Code     | Message           |
|--------|----------|-------------------|
| 403    | QNA-0006 | 질문을 수정할 권한이 없습니다. |
| 404    | QNA-0008 | 질문을 찾을 수 없습니다.    |

---

## 7. 강사의 미답변 질문 조회

| 항목          | 내용                                |
|-------------|-----------------------------------|
| Method      | `GET`                             |
| Endpoint    | `/api/qna/instructors/unanswered` |
| Description | 해당 강사에게 할당된 미답변 질문 목록 조회          |
| 권한          | INSTRUCTOR(로그인 된 사용자)             |

### Query Parameters

| Name  | Type    | Default | Description         |
|-------|---------|---------|---------------------|
| limit | Integer | 3       | 조회할 최대 개수 (max: 10) |

### Request Body

없음

### Response - Success

- `200 OK`

```json
{
  "questions": [
    {
      "questionId": 1,
      "courseId": 100,
      "lessonId": 50,
      "title": "강의 내용 중 질문이 있습니다",
      "authorId": 42,
      "lastActivityAt": "2024-01-15T10:30:00Z"
    },
    {
      "questionId": 2,
      "courseId": 100,
      "lessonId": 51,
      "title": "실습 코드 관련 질문",
      "authorId": 43,
      "lastActivityAt": "2024-01-15T09:15:00Z"
    }
  ]
}
```

| Field                      | Type   | Description          |
|----------------------------|--------|----------------------|
| questions                  | Array  | 미답변 질문 목록            |
| questions[].questionId     | Long   | 질문 ID                |
| questions[].courseId       | Long   | 코스 ID                |
| questions[].lessonId       | Long   | 레슨 ID                |
| questions[].title          | String | 질문 제목                |
| questions[].authorId       | Long   | 작성자 ID               |
| questions[].lastActivityAt | String | 마지막 활동 시간 (ISO-8601) |

### Response - Error

| Status | Code | Message               |
|--------|------|-----------------------|
| 400    | -    | limit 파라미터가 양수가 아닌 경우 |

> 조회 대상 강사는 로그인 된 사용자(토큰) 기준이며, 다른 강사의 미답변 목록은 조회할 수 없음
