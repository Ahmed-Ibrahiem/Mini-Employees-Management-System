// Import Person class (Employee model)
import { Person } from "../../js/main.js";

// Import shared utility helper functions
import {
  close_menu,
  createEmployeeObjects,
  getData,
  toggle_menu,
  updateLocalStorage,
} from "../Utilies.js";

// Import employee filtering logic
import { filter_employee } from "./Filter_employee.js";

// Import table body reference and render function
import { employee_table_body } from "./Render_employee_table.js";

// Import search functionality
import { search_employees } from "./Search_employees.js";

// ===================== Sidebar Elements =====================
// Sidebar container element
const sidebar = document.querySelector(".sidebar");

// Button that toggles the sidebar visibility
const sidebar_menu_btn = document.querySelector(".menu_btn");

// ===================== Custom Select Dropdowns =====================
// All custom select dropdown components
const all_select_options = document.querySelectorAll(".select");

// ===================== Table & Controls =====================
// Master checkbox used to select/deselect all employees
const master_checkbox = document.querySelector(
  ".home-content-area .employee_status .table .table_head input",
);

// Element that displays the currently selected filter option
export const current_filter_option = document.getElementById(
  "current_filter_option",
);

// All filter option elements
const filter_options = Array.from(
  document.querySelectorAll(".status-filter .options span"),
);

/* =====================================================
   Handle Employees Data (LocalStorage / JSON)
===================================================== */
// Fetch, prepare, and render employee data
async function processData() {
  let actual_employees;

  // Check if employee data exists in localStorage
  if (localStorage.getItem("actual_employees")) {
    actual_employees = JSON.parse(localStorage.actual_employees);
  } else {
    // Fetch employee data from JSON file if not found
    actual_employees = await getData("employees_completed.json");
    updateLocalStorage(actual_employees);
  }

  // Convert plain objects into Person instances
  createEmployeeObjects(actual_employees);

  // Apply the currently selected filter and render table
  filter_employee(Person.all_employees);
}

/* ========================== NAV MENU ============================== */
// Toggle sidebar open / close on menu button click
sidebar_menu_btn.addEventListener("click", () =>
  sidebar.classList.toggle("close_sidebar"),
);

/* ====================== DROP-DOWN LISTS =========================== */
// Handle opening and closing of custom dropdown menus
all_select_options.forEach((select_btn) => {
  const options_menu = select_btn.querySelector(".options");

  // Toggle dropdown menu on click
  select_btn.addEventListener("click", () => toggle_menu(options_menu));
});

// Close any open dropdown when clicking outside
document.addEventListener("click", (e) => {
  all_select_options.forEach((select_btn) => {
    const options_menu = select_btn.querySelector(".options");
    if (!select_btn.contains(e.target)) close_menu(options_menu);
  });
});

/* ===================== Master Checkbox Handler ===================== */
// Handle select/deselect all visible and active employees
const handle_all_checkbox_btn = () => {
  const all_active_checkbox = [];

  // Collect checkboxes from rows that are not disabled
  employee_table_body.querySelectorAll(".table_row").forEach((row) => {
    if (!row.classList.contains("disabled")) {
      all_active_checkbox.push(row.querySelector("input"));
    }
  });

  // Apply master checkbox state to all collected checkboxes
  all_active_checkbox.forEach((input) => {
    input.checked = master_checkbox.checked;
  });
};

// Listen for changes on master checkbox
master_checkbox.addEventListener("change", handle_all_checkbox_btn);

// Attach click handlers to each filter option
filter_options.forEach((option) =>
  option.addEventListener("click", () => {
    current_filter_option.textContent = option.textContent;
    filter_employee(Person.all_employees);
  }),
);

// ===================== Search Elements =====================
// Search input field
export const search_input = document.getElementById("search_employee");

// Search button
const search_btn = document.getElementById("search_btn");

// Execute employee search on button click
search_btn.addEventListener("click", () =>
  search_employees(search_input.value),
);

// ===================== Initialize Application =====================
// Start application by loading and processing employee data
processData();
