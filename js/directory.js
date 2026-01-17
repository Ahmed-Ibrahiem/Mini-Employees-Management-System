import { render_employees_card } from "../modules/render_employee_card.js";
import { getData, updateLocalStorage } from "../modules/Utilies.js";
import { createEmployeeObjects } from "../modules/Utilies.js";
import { Person } from "./main.js";

// start Programming
let threre_no_data = false;
async function processData() {
  // Fetch date from json file if there are no data in localStorage
  let actual_employees;
  if (localStorage.getItem("actual_employees")) {
    actual_employees = JSON.parse(localStorage.actual_employees);
  } else {
    actual_employees = await getData("employees_completed.json");
    updateLocalStorage(actual_employees);
  }
  if (actual_employees.length == 0) threre_no_data = true;

  if (threre_no_data) {
    document
      .querySelector(".app_content .content .no_employees")
      .classList.add("active");
  }
  // Create AlEmployee Objects from person constractorl
  createEmployeeObjects(actual_employees);

  // render employees card in browser
  render_employees_card(Person.all_employees);
}
processData();

// Open and close menu
document.querySelector(".menu_btn").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("open");
});

// Scroll to top button
const scroll_top_btn = document.querySelector(".scroll_top");
scroll_top_btn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY >= 300) {
    scroll_top_btn.classList.add("show");
  } else {
    scroll_top_btn.classList.remove("show");
  }
});
