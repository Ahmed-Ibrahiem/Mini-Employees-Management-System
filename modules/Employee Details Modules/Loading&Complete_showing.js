const loading_element = document.querySelector(".loading");
const complete_element = document.querySelector(".complete");

export const start_loading = () => {
  setTimeout(() => {
    loading_element.classList.remove("active");
  }, 2000);
  loading_element.classList.add("active");
};

export const start_complete = () => {
  setTimeout(() => {
    complete_element.classList.remove("active");
  }, 500);
  complete_element.classList.add("active");
};
