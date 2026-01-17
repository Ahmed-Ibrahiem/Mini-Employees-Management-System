// ========================== NAV MENU ==============================

import { createEmployeeObjects, toggle_menu } from "./Utilies.js";

// add event listener for nav_menu_btn to open and close nav_menu
export const nav_menu_btn = document.querySelector(".menu_btn");
export const nav_menu = document.querySelector(".menu");
nav_menu_btn.addEventListener("click", () => nav_menu.classList.toggle("open"));

// ============================= CREATE EMPLOYEES FROM LOCLAL STORAGE ==============================
const create_employees_objects = () => {
  const all_employees_data =
    JSON.parse(localStorage.getItem("actual_employees")) || [];
  createEmployeeObjects(all_employees_data);
};
create_employees_objects();

// ============================= ADJUST SUBMITION FOR ALL FORMS ==============================
document.getElementById("general_form").addEventListener("submit", (e) => {
  e.preventDefault();
});

// ============================= Handle Open And Close Gender Menu ==============================
const gender_menu = document.getElementById("gender_menu");

gender_menu.addEventListener("click", () =>
  toggle_menu(gender_menu.querySelector(".options"))
);
