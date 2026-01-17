import { current_filter_option, search_input } from "./Main.js";
import { render_employee_table } from "./Render_employee_table.js";
import { not_exist_elements } from "./Search_employees.js";

/* ===================== Filter Employees By Status ===================== */
export const filter_employee = (employee_list) => {
  const current_option = current_filter_option.textContent.toLowerCase().trim();
  const filter_list = [];
  not_exist_elements.classList.remove("active");

  employee_list.forEach((emp) => {
    if (
      current_option === "all" ||
      emp.status.toLowerCase() === current_option
    ) {
      filter_list.push(emp);
    }
  });

  // check if not result is exist then show ui message
  if (filter_list.length <= 0) {
    not_exist_elements.classList.add("active");
  }

  search_input.value = "";
  render_employee_table(filter_list);
};
