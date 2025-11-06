import "./CourseItem.css";

const courseItems = [
  {
    category: "웹 개발",
    title: "실전! 웹사이트 만들기 A to Z",
    price: "₩55,000",
    instructor: "김코딩",
    imageAlt: "Web development course thumbnail",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRtty_Ce1vnFmkB0YEAEds9OIuIE3MwGeIFyxYeM_JodNlUn0lx_dXQWDpVhK3JvjzO1rkm5t1SwzmFHzZzsIEQFmODvlQdnBtTEnKxN-JZuKzi2q6hN0fo7ibSM9b7abR3THyrqA3115wzcYrRX1oao2HIo4S0ZXiUhRI0Ewfe0agsywLbZLCMe6F1dtQVAx5GvOSnChPSmqKAwefzAwjcBBUjxpWYKd8kZ3GKRwB6dG3T8axlB3LwcDZYZ-3seAlmT4CXO2ec5U",
  },
  {
    category: "코딩 기초",
    title: "파이썬으로 시작하는 프로그래밍",
    price: "₩49,000",
    instructor: "박해커",
    imageAlt: "Python programming course thumbnail",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzbAlkxrtW8XgHhFDu1oeXpOdysm_owYEcJSibMnH-VkyybNG7D5om4mN06_gY1RSENiA1o5rPMbINYzU4o2q0OiKJ1L_mTZTRzbWyyOe1NTOxdKX_nUC_xOV08q2m92PRIlZGHRxvpaskdTGCi_wMSVsa4Xnw6kvsyLuF0biWc7R0UN3h3OHjntme8oz0hBQHbbjxV0kLNDkwUTOB3d7sko_ap8iAmJXfG3NONw0m1Qh7MQ69P76EQAALV_M8M2L0ob07a5Fe9Qc",
  },
  {
    category: "데이터 분석",
    title: "데이터 분석 마스터 클래스",
    price: "₩72,000",
    instructor: "이나리",
    imageAlt: "Data analysis course thumbnail",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUmuLYMOSBb68wva3HuLsnX6MhqnfO3BYTASPaa1N0wDfldqpqklc99EnIrS-2yZg2NsDS8NEwNr6-rAA8_v7inqoSEWA9AE4KnxrSiY64ulvlsiSHsA5i_5ed1KWu5MY8KECKTew32COiBKqzmWo9C89t-cSKRpasGXVliuL5iDKjZOUvWQbahkn2fizK26gZzErIiRIU7NKWMtLsDlSsaKZSHzuRX7EY20c2yp7vylFFZRMrooK5LUUKeg6r2xb8fi5CcwLSXLg",
  },
  {
    category: "생성형 AI",
    title: "ChatGPT 활용법 끝내기",
    price: "₩60,000",
    instructor: "최지피티",
    imageAlt: "Generative AI course thumbnail",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC26C3ID2BsEIp0PxV0qBysWEcgFcU6v39_wF6KZbfbGHqyocY6LlfB-hcbIrh-j_6fm6tTa8DYvE6naaFe9ReWxZ1OXQCu-B6TdQcu2-DVxU8hUJsKZoMCPQHMsT8OCjbZuTR5EFRICIFkdt-arrTJYeIkiYFiBm3ZqgAv2Z14Wvnpqb6XU_1RVIeelIgBu50BCgt6uWKHD6qOg0XDEmzGLLBuP9y01vn70hml-24n5h9In3bcQyltkg-f_rY4YYZYwjSbqxo-yio",
  },
  {
    category: "코딩 기초",
    title: "왕초보를 위한 HTML & CSS",
    price: "무료",
    instructor: "이고잉",
    imageAlt: "HTML and CSS course thumbnail",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvWsulcHcfRwtEp0V1rDgdI5EljdUsjA5Cf_0Oqg3js2em_Mw3MwmaFaSCLZq8dbqLHfztPcF4qWUgNT5q-QfQLtESj829NPmdAdWkB8PVW6_Gg5s1wKm9F2tfK7cGDAm8ijnU_biiPMcLBuJwCe9tnRVaDF7JbldTREegCPA6ONCgvyOUWUrxuVZ2EI8LGqhgnti_57Y0e6cvzUgl8qKsY3HIeTBa_e8Drl2rHiix3aWfA2-6zxRht50qWuSy9RZI-wfH9ZrYJxw",
  },
  {
    category: "웹 개발",
    title: "자바스크립트 핵심 개념",
    price: "₩50,000",
    instructor: "김코딩",
    imageAlt: "JavaScript fundamentals course thumbnail",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYhqzbsY-lbk2REjUrcX7blMLbyKwbecq_hKk0zRAg5pQIQr54eTFCy6jM9JW8fQFhsnZAu-7MaxRTIxdtyYM6klFmpC0EZS5jfj8iiEdiMVUQ8rTIgEnu0h4gfUES5aOyOWPIxwenvIzayPsgUREljbdNH1BZHuEs295OV97EB4aUjud5QQHv_DBdxkGgyjUsre9mjxsARJRzkpia5qQGNY7CSBkvC8sWGjvKiZD-tVq1uL4oTPUhlMK0QyZPfHey7VmyeoVCfV4",
  },
  {
    category: "데이터 분석",
    title: "SQL로 데이터 갖고 놀기",
    price: "₩45,000",
    instructor: "이나리",
    imageAlt: "SQL course thumbnail",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRdzOvAirg0eY-YvjTRLTIIAN5lLKh0-q9Ai23eiwrdsyd-5Qj0ClqN5EBycauLs70Vgv48XBYYXiACpwKz2d1MWGtDigrmOZAn09ha33jnYldR4RhbpWp4Vqz4mzSpgKNRzh0-Ts--yGK5K8vJJr_kONj_2uFWMg0tTJksIVZuhsU8hPm8MeaPd9ukoJY4Wmk_2ZjBrDUxYOYL4nQUvOCEAFz2eSxQl8K5S2K184CrRFGxKW1lOsWDuO-cI6LgGqTwoaKiVosQig",
  },
  {
    category: "코딩 기초",
    title: "코딩의 정석: 심화편",
    price: "₩88,000",
    instructor: "박해커",
    imageAlt: "Advanced programming course thumbnail",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCN4OXBSMxb_Fb0VOFicVDAe4tAlqfSIHJD9ctjbuW4wuCmYAotaXAEnUR_uST32yGj6oFHgn_xnrnHOej3AhlcMOWCK51r5NojlqksJVIyJitdF8Du_MdKdnFU1-fZ0YvJ1ZrtODwIkaGZin94_F01eiHkCNTQX7GUPQAVMR-RAKq2C5GYLBWEjIjxEDBIqMH6hYASpGoJUQfoLcw8EN8tILdmE5i61Q9cVVVH0oq9IZtbQ3BswfpiKQOmCj3iNd09p4Hkesvazv4",
  },
];

function CourseItem() {
  return (
    <>
      {courseItems.map((course) => (
        <article className="course-item" key={course.title}>
          <div className="course-item__image-wrapper">
            <img
              className="course-item__image"
              src={course.imageSrc}
              alt={course.imageAlt}
            />
          </div>
          <div className="course-item__body">
            <p className="course-item__category">{course.category}</p>
            <h3 className="course-item__title">{course.title}</h3>
            <p className="course-item__price">{course.price}</p>
            <p className="course-item__instructor">{course.instructor}</p>
          </div>
        </article>
      ))}
    </>
  );
}

export default CourseItem;
