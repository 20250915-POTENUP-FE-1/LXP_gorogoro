import { apiClient } from "./apiClient.js";

const COURSES_RESOURCE_PATH = "courses";

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

// 네임스페이스를 통해 courseAPI라는 이름 아래에 관련된 함수들 그룹화하기!
const courseAPI = {
  getCourses: (apiParams) => {
    return apiClient.get(`/${COURSES_RESOURCE_PATH}`, apiParams);
  },
  // 특정 강좌 조회
  getCourseById: (courseId) =>
    apiClient.get(`/${COURSES_RESOURCE_PATH}/${courseId}`),
  // 강좌 추가
  addCourse: (formData) => {
    const newCourse = {
      ...formData,
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return apiClient.post(`/${COURSES_RESOURCE_PATH}`, newCourse);
  },
  // 강좌 하드, 소프트 삭제
  deleteCourseSafely,
  // 강좌 업데이트
  updateCourse: (courseId, formData) => {
    // 구조 분해를 통해 id 필드를 제외한 나머지 formData
    const { id, ...rest } = formData;
    const editedCourse = {
      ...rest,
      updatedAt: new Date().toISOString(),
    };
    // PUT /courses/{courseId}
    return apiClient.put(`/${COURSES_RESOURCE_PATH}/${courseId}`, editedCourse);
  },
};

export default courseAPI;
