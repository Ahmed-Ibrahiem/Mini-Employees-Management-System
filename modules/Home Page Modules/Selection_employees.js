import { Person } from "../../js/main.js";
import { deleteEmployee } from "../Utilies.js";
import { filter_employee } from "./Filter_employee.js";

const trash_btn = document.querySelector(".delete_employee");

let checkbox_selected = [];

export const get_all_checkbox_checked = () => {
  const all_checkbox_employee = [
    ...document.querySelectorAll(
      ".employee_status .table_container .table .table_body input",
    ),
  ];

  all_checkbox_employee.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      checkbox_selected = [];
      all_checkbox_employee.forEach((checkbox) => {
        if (checkbox.checked) checkbox_selected.push(checkbox);
      });
      show_trash_btn(checkbox_selected);
    });
  });
};

export const show_trash_btn = (checked_input) => {
  if (checked_input.length > 0) {
    trash_btn.classList.add("active");
  } else {
    trash_btn.classList.remove("active");
  }
};

trash_btn.addEventListener("click", () => {
  const all_emps_id = checkbox_selected.map((emp) =>
    Number.parseInt(emp.dataset.id),
  );
  deleteEmployee(all_emps_id);
  filter_employee(Person.all_employees);
  show_trash_btn(checkbox_selected);
});
