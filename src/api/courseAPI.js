import { apiClient } from "./apiClient.js";

const COURSES_RESOURCE_PATH = "courses";

// const courseAPI = {
//   // 필터링 강좌 목록 조회
//   // 특정 강좌 조회
//   getCourseById: async (courseId) => {
//     const response = await fetch(
//       `${BASE_URL}/${COURSES_RESOURCE_PATH}/${courseId}`
//     );
//     const data = await response.json();
//     console.log(data);
//     return data;
//   },
//   // 강좌 추가하기
//   addCourse: async (courseData) => {
//     const response = await fetch(`${BASE_URL}/${COURSES_RESOURCE_PATH}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(courseData),
//     });
//     const data = await response.json();
//     console.log(data);
//     return data;
//   },
//   // 강좌 삭제하기 (하드.소프트 구분)
// };

// courseAPI.getCourseById("course-1");
// courseAPI.addCourse({
//   title: "course-3-제목",
//   instructorId: "user-3",
//   price: 30000,
// });

//필터링 강의 조회 getFilteredCourses()
const getFilteredCourses = async (filters) => {
  const { category, searchTerm, sort } = filters;
  const params = new URLSearchParams();

  // status가 "published"인 강좌만 필터링
  params.append("status", "published");

  // category 카테고리 필터링
  if (category && category !== "all") {
    params.append("category", category);
  }

  // searchTerm 검색어 필터링 (json-server의 q를 사용)
  if (searchTerm) {
    params.append("q", searchTerm);
  }

  // sort 정렬 옵션
  if (sort === "latest") {
    params.append("_sort", "createdAt");
    params.append("_order", "desc");
  } else if (sort === "priceAsc") {
    params.append("_sort", "price");
    params.append("_order", "asc");
  } else if (sort === "priceDesc") {
    params.append("_sort", "price");
    params.append("_order", "desc");
  }

  // GET /courses?status=published&category=...&q=...&_sort=...&_order=...
  return apiClient.get(`/courses?${params.toString()}`);
};

//강의 상세 조회 getCourseById()
const getCourseById = async (courseId) => {
  // GET /courses/{courseId}
  return apiClient.get(`/courses/${courseId}`);
};

//강의 등록 createCourse()
const createCourse = async (formData) => {
  const newCourse = {
    ...formData,
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  // POST /courses
  return apiClient.post("/courses", newCourse);
};

const deleteCourseSafely = async (courseId) => {
  try {
    // 1. 수강 신청(enrollments) 확인
    const enrollments = await apiClient.get(
      `/enrollments?courseId=${courseId}`
    );

    // 2. 장바구니(carts) 확인
    const carts = await apiClient.get(`/carts?courseId=${courseId}`);

    // 3. 수강 신청 내역이나 장바구니 내역이 하나라도 있으면 소프트 삭제
    if (enrollments.length > 0 || carts.length > 0) {
      console.log("소프트 삭제 진행");
      // PATCH /courses/{courseId}
      await apiClient.patch(`/courses/${courseId}`, {
        status: "archived",
      });
      return "강좌를 결제하거나, 장바구니에 담은 사용자가 있어 보관 처리되었습니다.";
    } else {
      // 4. 아무도 구매하거나 장바구니에 담지 않았으면 하드 삭제
      console.log("하드 삭제 진행");
      // DELETE /courses/{courseId}
      await apiClient.delete(`/courses/${courseId}`);
      return "강좌가 완전히 삭제되었습니다!";
    }
  } catch (error) {
    console.error("강좌 삭제 중 오류가 발생했습니다.", error);
    throw error;
  }
};

const updateCourse = async (courseId, formData) => {
  // 구조 분해를 통해 id 필드를 제외한 나머지 formData
  const { id, ...rest } = formData;
  const editedCourse = {
    ...rest,
    updatedAt: new Date().toISOString(),
  };
  // PUT /courses/{courseId}
  return apiClient.put(`/courses/${courseId}`, editedCourse);
};
