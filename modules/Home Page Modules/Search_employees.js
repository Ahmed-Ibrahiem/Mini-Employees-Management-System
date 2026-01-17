import { Person } from "../../js/main.js";
import { render_employee_table } from "./Render_employee_table.js";

/* ===================== Search Employees ===================== */
export const not_exist_elements = document.querySelector(
  ".table_container .not_exist"
);
export const search_employees = (text) => {
  const current_option = current_filter_option.textContent.toLowerCase().trim();
  const final_employees = [];
  const search_word = text.toLowerCase();
  not_exist_elements.classList.remove("active");

  Person.all_employees.forEach((emp) => {
    const emp_name = emp.getFullName().toLowerCase();

    // filter the result data depend on employees status
    if (
      current_option === "all" ||
      emp.status.toLowerCase() === current_option
    ) {
      // Search by full name or numeric ID
      if (isNaN(search_word) && emp_name.includes(search_word)) {
        final_employees.push(emp);
      } else if (+emp.id === +search_word) {
        final_employees.push(emp);
      } else if (search_word == "") {
        final_employees.push(emp);
      }
    }
  });

  // check if not result is exist then show ui message
  if (final_employees.length <= 0) {
    not_exist_elements.classList.add("active");
  }

  render_employee_table(final_employees);
};
