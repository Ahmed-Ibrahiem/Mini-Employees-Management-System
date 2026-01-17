// Import Person class and required elements
import { Person } from "../js/main.js";
import {
  filter_menu,
  open_filter_btn,
  status_filter_menu,
  status_filter_options,
  tbody,
  type_filter_menu,
  type_filter_options,
} from "./definationElements.js";
import { close_menu, toggle_menu } from "./Utilies.js";
import { update_total_entries } from "./pagination.js";
import { renderEmployeeInTable } from "./renderEmployeesInTable.js";

const apply_filter_btn = document.getElementById("apply_filter");

// Main filter function
function filter() {
  let filter_employee = [];

  // Get employee id filter range
  let employee_id = {
    start: Number.parseInt(document.getElementById("id_start").value),
    end: Number.parseInt(document.getElementById("id_end").value),
  };

  // Get selected work type (both / WFO / WFH)
  let employee_work_type = Array.from(
    document.querySelectorAll(".employee_work_type input")
  ).find((input) => input.checked == true).value;

  // Get all selected departments
  let employee_department = Array.from(
    document.querySelectorAll(".employee_department .section input")
  )
    .filter((input) => input.checked == true)
    .map((input) => input.value);

  // Get joining date range
  let employee_joining_date = {
    start: new Date(document.getElementById("start_date").value),
    end: new Date(document.getElementById("end_date").value),
  };

  // Get current selected status from menu (All, Active, Inactive)
  let employee_status = status_filter_menu.querySelector(
    ".current_option > span"
  ).textContent;

  // Get current selected type from menu (All, Fresher, Experience)
  let employee_type = type_filter_menu.querySelector(
    ".current_option > span"
  ).textContent;

  // Loop through all employees and apply filters
  Person.all_employees.map((emp) => {
    const emp_date = new Date(emp.joining_date);
    let is_valid = false;
    // Filter by ID range, Department, and Joining Date
    if (
      emp.id >= employee_id.start &&
      emp.id <= employee_id.end &&
      employee_department.includes(emp.category) &&
      emp_date >= employee_joining_date.start &&
      emp_date <= employee_joining_date.end
    ) {
      // Filter by status
      if (employee_status === "All") {
        is_valid = true;
      } else if (emp.status === employee_status) {
        is_valid = true;
      }
      if (is_valid === false) return;

      // Filter by work type
      if (employee_work_type == "both") {
        is_valid = true;
      } else if (emp.work_type == employee_work_type) {
        is_valid = true;
      } else is_valid = false;

      if (is_valid === false) return;

      // Filter by type (Fresher/Experience)
      if (employee_type === "All") {
        is_valid = true;
      } else if (emp.type === employee_type) {
        is_valid = true;
      } else is_valid = false;

      // If all filters passed → push employee to results
      if (is_valid) filter_employee.push(emp);
    }
  });

  // Save filtered employees in localStorage
  localStorage.filter_employee = JSON.stringify(filter_employee);

  // Update total entries in the UI
  update_total_entries();
  return filter_employee;
}

// Re-render table when user clicks "Apply Filter" button
apply_filter_btn.addEventListener("click", () => {
  filter();
  close_menu(filter_menu);
});

// Toggle status filter menu
status_filter_menu.addEventListener("click", (e) => {
  toggle_menu(status_filter_menu.querySelector(".options"));
});

// Toggle type filter menu
type_filter_menu.addEventListener("click", (e) => {
  toggle_menu(type_filter_menu.querySelector(".options"));
});

// Update status filter when user clicks an option
status_filter_options.forEach((option) => {
  option.addEventListener("click", () => {
    status_filter_menu.querySelector(".current_option > span").textContent =
      option.textContent;
    filter();
  });
});

// Update type filter when user clicks an option
type_filter_options.forEach((option) => {
  option.addEventListener("click", () => {
    type_filter_menu.querySelector(".current_option > span").textContent =
      option.textContent;
    renderEmployeeInTable(filter(), tbody);
  });
});

// Close menus when user clicks outside
document.addEventListener("click", (e) => {
  if (!filter_menu.contains(e.target) && !open_filter_btn.contains(e.target))
    close_menu(filter_menu);

  if (!status_filter_menu.contains(e.target))
    close_menu(status_filter_menu.querySelector(".options"));

  if (!type_filter_menu.contains(e.target))
    close_menu(type_filter_menu.querySelector(".options"));
});

export default filter;
