//получаем tables
export const getTableFirst = () =>
  JSON.parse(localStorage.getItem("tableFirst")) || [];
export const getTableSecond = () =>
  JSON.parse(localStorage.getItem("tableSecond")) || [];
export const getTableThird = () =>
  JSON.parse(localStorage.getItem("tableThird")) || [];
//задаем tables
export const setTableFirst = (todos) =>
  localStorage.setItem("tableFirst", JSON.stringify(todos));
export const setTableSecond = (todos) =>
  localStorage.setItem("tableSecond", JSON.stringify(todos));
export const setTableThird = (todos) =>
  localStorage.setItem("tableThird", JSON.stringify(todos));
