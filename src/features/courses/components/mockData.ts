export const MOCK_COURSE = {
  title: "ES6의 정석",
  progress: 25,
  chapters: [
    {
      id: "ch1",
      title: "#0 INTRODUCTION",
      lectures: [
        { id: "l1", title: "#0.1 Read this First", duration: "00:00", completed: true },
        { id: "l2", title: "#0.2 Introduction", duration: "01:53", completed: false, current: true },
        { id: "l3", title: "#0.3 ES6, ES7, ES8, ES99?", duration: "01:18", completed: false },
      ],
    },
    {
      id: "ch2",
      title: "#1 VARIABLES",
      lectures: [
        { id: "l4", title: "#1.0 Let and Const", duration: "04:40", completed: false },
        { id: "l5", title: "#1.1 Dead Zone", duration: "03:15", completed: false },
        { id: "l6", title: "#1.2 Block Scope", duration: "04:42", completed: false },
        { id: "l7", title: "#1.3 The future of 'var'", duration: "02:06", completed: false },
      ],
    },
  ],
};
