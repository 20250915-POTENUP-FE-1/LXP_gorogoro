# Review API 명세서

## 개요

코스 리뷰 관리를 위한 API 명세서입니다.

**Base Path:** `/api/courses/{courseId}/reviews`

---

## API 목록

| Method | Endpoint                                     | Description | 권한           | 상태         |
|--------|----------------------------------------------|-------------|--------------|------------|
| GET    | `/api/courses/{courseId}/reviews`            | 리뷰 목록 조회    | 누구나(비로그인 포함) | 요청 시 구현 예정 |
| GET    | `/api/courses/{courseId}/reviews/{reviewId}` | 리뷰 상세 조회    | TBD          | 요청 시 구현 예정 | 
| POST   | `/api/courses/{courseId}/reviews`            | 리뷰 생성       | 해당 코스 수강생    | 구현 완료      |
| PUT    | `/api/courses/{courseId}/reviews/{reviewId}` | 리뷰 수정       | 작성자 본인       | 구현 완료      |
| DELETE | `/api/courses/{courseId}/reviews/{reviewId}` | 리뷰 삭제       | 작성자 본인       | 구현 완료      |

> **Note:** READ API(상세 조회)는 요청 시 구현하여 제공해드립니다. 필요한 조회 조건(정렬, 필터링, 페이징 등)을 말씀해주세요.

---

## 1. 리뷰 목록 조회

| 항목          | 내용                                |
|-------------|-----------------------------------|
| Method      | `GET`                             |
| Endpoint    | `/api/courses/{courseId}/reviews` |
| Description | 코스에 대한 리뷰 목록 조회                   |
| 권한          | 누구나(비로그인 포함)                      |

### 정렬

- `updatedAt DESC`, `id DESC` (최신 순 정렬)

### Path Variables

| Name     | Type | Description |
|----------|------|-------------|
| courseId | Long | 코스 ID       |

### Response - Success

- `200 OK`

### Response Body

#### Response Schema

| Field                  | Type             | Required | Description                     |
|------------------------|------------------|----------|---------------------------------|
| reviews                | Array            | Y        | 리뷰 목록                           |
| reviews[].reviewId     | Long             | Y        | 리뷰 ID                           |
| reviews[].courseId     | Long             | Y        | 코스 ID                           |
| reviews[].userId       | Long             | Y        | 리뷰 작성자 ID                       |
| reviews[].userNickname | String           | Y        | 리뷰 작성자 닉네임 (매핑 실패 시 `"알 수 없음"`) |
| reviews[].title        | String           | Y        | 리뷰 제목                           |
| reviews[].comment      | String           | Y        | 리뷰 내용                           |
| reviews[].rating       | Integer          | Y        | 평점 (0-5)                        |
| reviews[].updatedAt    | String(ISO-8601) | Y        | 수정 시각                           |

#### Example

```json
{
  "reviews": [
    {
      "reviewId": 101,
      "courseId": 1,
      "userId": 123,
      "userNickname": "Ricky",
      "title": "유익한 강의였습니다",
      "comment": "설명이 자세하고 이해하기 쉬웠습니다.",
      "rating": 5,
      "updatedAt": "2026-01-13T13:25:00Z"
    }
  ]
}
```

### Response - Error

| Status | Code     | Message               |
|--------|----------|-----------------------|
| 400    | WEB-0001 | 요청 필드 검증에 실패했습니다.     |
| 400    | WEB-0005 | 필수 경로 변수가 누락되었습니다.    |
| 500    | WEB-0010 | 데이터 처리 중 오류가 발생했습니다.  |
| 500    | WEB-0011 | 알 수 없는 서버 오류가 발생했습니다. |

> Note: `userNickname`은 유저 서비스 배치 조회 결과를 매핑하여 반환합니다. 조회 실패 시에도 에러로 처리하지 않고 `"알 수 없음"`으로 반환합니다.

## 2. 리뷰 생성

| 항목          | 내용                                |
|-------------|-----------------------------------|
| Method      | `POST`                            |
| Endpoint    | `/api/courses/{courseId}/reviews` |
| Description | 코스에 대한 리뷰 생성                      |
| 권한          | 해당 코스 수강생                         |

### Path Variables

| Name     | Type | Description |
|----------|------|-------------|
| courseId | Long | 코스 ID       |

### Request Body

```json
{
  "title": "유익한 강의였습니다",
  "comment": "설명이 자세하고 이해하기 쉬웠습니다.",
  "rating": 5
}
```

| Field   | Type    | Required | Description |
|---------|---------|----------|-------------|
| title   | String  | Y        | 리뷰 제목       |
| comment | String  | Y        | 리뷰 내용       |
| rating  | Integer | Y        | 평점 (0-5)    |

### Response - Success

- `201 Created` (Body 없음)

### Response - Error

| Status | Code     | Message                    |
|--------|----------|----------------------------|
| 400    | REV-0001 | 평점은 0점에서 5점 사이여야 합니다.      |
| 400    | REV-0003 | 후기 제목은 필수 입력 항목입니다.        |
| 400    | REV-0004 | 후기 내용은 필수 입력 항목입니다.        |
| 400    | REV-0005 | 평점은 필수 입력 항목입니다.           |
| 403    | REV-0008 | 수강 중인 강의에만 후기를 작성할 수 있습니다. |
| 409    | REV-0010 | 이미 해당 강의에 후기를 작성하셨습니다.     |

---

## 3. 리뷰 수정

| 항목          | 내용                                           |
|-------------|----------------------------------------------|
| Method      | `PUT`                                        |
| Endpoint    | `/api/courses/{courseId}/reviews/{reviewId}` |
| Description | 리뷰 내용 수정                                     |
| 권한          | 작성자 본인                                       |

### Path Variables

| Name     | Type | Description |
|----------|------|-------------|
| courseId | Long | 코스 ID       |
| reviewId | Long | 리뷰 ID       |

### Request Body

```json
{
  "title": "수정된 제목",
  "comment": "수정된 내용",
  "rating": 4
}
```

| Field   | Type    | Required | Description |
|---------|---------|----------|-------------|
| title   | String  | N        | 리뷰 제목       |
| comment | String  | N        | 리뷰 내용       |
| rating  | Integer | N        | 평점 (0-5)    |

### Response - Success

- `200 OK` (Body 없음)

### Response - Error

| Status | Code     | Message                   |
|--------|----------|---------------------------|
| 400    | REV-0001 | 평점은 0점에서 5점 사이여야 합니다.     |
| 400    | REV-0006 | 후기의 강의 정보가 요청과 일치하지 않습니다. |
| 403    | REV-0007 | 후기를 수정할 권한이 없습니다.         |
| 404    | REV-0009 | 후기를 찾을 수 없습니다.            |

---

## 4. 리뷰 삭제

| 항목          | 내용                                           |
|-------------|----------------------------------------------|
| Method      | `DELETE`                                     |
| Endpoint    | `/api/courses/{courseId}/reviews/{reviewId}` |
| Description | 리뷰 삭제                                        |
| 권한          | 작성자 본인                                       |

### Path Variables

| Name     | Type | Description |
|----------|------|-------------|
| courseId | Long | 코스 ID       |
| reviewId | Long | 리뷰 ID       |

### Request Body

없음

### Response - Success

- `204 No Content` (Body 없음)

### Response - Error

| Status | Code     | Message                   |
|--------|----------|---------------------------|
| 400    | REV-0006 | 후기의 강의 정보가 요청과 일치하지 않습니다. |
| 403    | REV-0007 | 후기를 수정할 권한이 없습니다.         |
| 404    | REV-0009 | 후기를 찾을 수 없습니다.            |
