import { Person } from "../../js/main.js";
import { get_all_checkbox_checked } from "./Selection_employees.js";

/* ===================== Render Employee Table ===================== */
export const employee_table_body = document.getElementById("employee_table");

export const render_employee_table = (employees_data) => {
  // Clear existing rows
  employee_table_body.innerHTML = ``;

  // Generate table rows dynamically
  employees_data.forEach((emp) => {
    const employee_row = `
      <div data-id=${emp.id} class="table_row">
        <div class="employee_id">
          <input type="checkbox" data-id="${emp.id}" />
          <span>${emp.id}</span>
        </div>
        <div class="name" data-id=${emp.id}>
          <span>${emp.getFullName()}</span>
        </div>
        <div class="job_role">
          <span>${emp.role}</span>
        </div>
        <div class="status">
          <span>${emp.status}</span>
        </div>
        <div class="TL">
          <span>${emp.team_leader.name}</span>
        </div>
        <div class="view">
          <button class="details_btn" data-id=${emp.id}>
            <i class="fa-solid fa-eye color-gray"></i>
          </button>
        </div>
      </div>
    `;

    employee_table_body.innerHTML += employee_row;
  });

  get_all_checkbox_checked();

  const all_employees_details_btn = document.querySelectorAll(
    ".table_container .table .details_btn"
  );

  all_employees_details_btn.forEach((btn) => {
    btn.addEventListener("click", () =>
      handle_employee_details_btn(btn.dataset.id)
    );
  });
};

const handle_employee_details_btn = (id) => {
  Person.all_employees.forEach((data) => {
    if (data.id == id) {
      localStorage.employee_details = JSON.stringify(data);
      location.assign("EmployeeDetails.html");
    }
  });
};
