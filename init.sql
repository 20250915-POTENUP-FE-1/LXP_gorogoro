CREATE
DATABASE IF NOT EXISTS course_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE course_db;

CREATE TABLE IF NOT EXISTS category
(
    id
    BIGINT
    NOT
    NULL
    AUTO_INCREMENT,
    name
    VARCHAR
(
    255
) NOT NULL,
    parent_id BIGINT NULL,
    PRIMARY KEY
(
    id
),
    CONSTRAINT fk_category_parent
    FOREIGN KEY
(
    parent_id
) REFERENCES category
(
    id
)
    ON DELETE SET NULL
    ON UPDATE CASCADE
    ) ENGINE=InnoDB;

-- seed (상위 -> 하위 순서)
-- 중복 실행 방지용 upsert (개발환경에서 안전)
INSERT INTO category (id, name, parent_id)
VALUES (1, '개발·프로그래밍', NULL),
       (2, '데이터사이언스', NULL),
       (3, '디자인·아트', NULL),
       (4, 'AI 기술', NULL),
       (5, '게임 개발', NULL),

       (6, '알고리즘', 1),
       (7, '프론트엔드', 1),
       (8, '백엔드', 1),
       (9, '데이터베이스', 1),
       (10, '데브옵스', 1),

       (11, '데이터 분석', 2),
       (12, '데이터 엔지니어링', 2),

       (13, 'UI/UX', 3),
       (14, '그래픽 디자인', 3),
       (15, '3D·모션', 3),
       (16, '웹툰', 3),

       (17, '생성형 AI', 4),
       (18, '자연어 처리', 4),

       (19, '프로그래밍', 5),
       (20, '아트·그래픽', 5) ON DUPLICATE KEY
UPDATE
    name =
VALUES (name), parent_id =
VALUES (parent_id);
