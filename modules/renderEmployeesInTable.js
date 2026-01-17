import handle_date from "./Utilies.js";
import { handleAddEmployeeBtnStatus } from "./handleAddEmployeeBtnStatus.js";

// const master_checkbox = document.querySelector(".master_checkbox");
const add_employee_btn = document.querySelector(".new_employee");

export const renderEmployeeInTable = (arr, document_container) => {
  let threre_no_data = false;
  if (arr.length == 0) threre_no_data = true;
  if (threre_no_data) {
    document
      .querySelector(".app_content .content .no_employees")
      .classList.add("active");
  } else {
    document
      .querySelector(".app_content .content .no_employees")
      .classList.remove("active");
  }
  document_container.innerHTML = ``;
  arr.map((data) => {
    const tr = document.createElement("tr");
    tr.dataset.id = data.id;

    // Add event listener to transport to employee details
    tr.addEventListener("click", (e) => {
      if (e.target.type !== "checkbox") {
        window.location.assign("EmployeeDetails.html");
        localStorage.employee_details = JSON.stringify(data);
      }
    });

    // checkbox part
    const ch_td = document.createElement("td");
    ch_td.classList.add("check_box_id");
    const ch_in = document.createElement("input");
    ch_in.type = "checkbox";
    ch_in.dataset.id = data.id;
    ch_td.appendChild(ch_in);

    // part of emp id
    const emp_id = document.createElement("td");
    emp_id.classList.add("emp_id");
    emp_id.textContent = data.id;

    // part of emp status
    const emp_status = document.createElement("td");
    const emp_status_div = document.createElement("div");
    emp_status_div.classList.add("status");
    emp_status_div.textContent = data.status;
    emp_status.appendChild(emp_status_div);

    // part of emp type
    const emp_type = document.createElement("td");
    const emp_type_div = document.createElement("div");
    emp_type_div.classList.add("type");
    emp_type_div.textContent = data.type;
    emp_type.appendChild(emp_type_div);

    // part of emp team Leader
    const team_leader = document.createElement("td");
    const team_leader_div = document.createElement("div");
    team_leader_div.textContent = data.team_leader.name;
    team_leader.appendChild(team_leader_div);

    // part of emp role
    const emp_role = document.createElement("td");
    const emp_role_div = document.createElement("div");
    emp_role_div.textContent = data.role;
    emp_role.appendChild(emp_role_div);

    // part of emp productive
    const productive = document.createElement("td");
    const productive_div = document.createElement("div");
    const productive_prograss = document.createElement("div");
    const productive_span = document.createElement("span");
    const productive_p = document.createElement("p");
    productive_p.textContent = `${data.productive}%`;
    productive.classList.add("productive");
    productive_prograss.classList.add("productive_prograss");
    productive_span.classList.add("productive_prograss_span");
    productive_span.style.width = `${data.productive}%`;
    productive_prograss.appendChild(productive_span);
    productive_div.appendChild(productive_prograss);
    productive_div.appendChild(productive_p);
    productive.appendChild(productive_div);

    // part of emp joining date
    const emp_joining_date = document.createElement("td");
    const emp_joining_date_div = document.createElement("div");
    emp_joining_date_div.textContent = handle_date(data.joining_date);
    emp_joining_date.appendChild(emp_joining_date_div);

    // part of emp salary
    const emp_salary = document.createElement("td");
    const emp_salary_div = document.createElement("div");
    emp_salary_div.textContent = `${data.salary} $`;
    emp_salary.appendChild(emp_salary_div);

    // part of emp type of work
    const emp_work_type = document.createElement("td");
    const emp_work_type_div = document.createElement("div");
    emp_work_type_div.textContent = data.work_type;
    emp_work_type.appendChild(emp_work_type_div);

    tr.appendChild(ch_td);
    tr.appendChild(emp_id);
    tr.appendChild(emp_status);
    tr.appendChild(emp_type);
    tr.appendChild(team_leader);
    tr.appendChild(emp_role);
    tr.appendChild(productive);
    tr.appendChild(emp_joining_date);
    tr.appendChild(emp_salary);
    tr.appendChild(emp_work_type);

    document_container.appendChild(tr);
  });
  // Rerender Get the all_checkbox_btn to rerender event listner
  const all_checkbox_btn = Array.from(
    document.querySelectorAll(".check_box_id input")
  );

  all_checkbox_btn.map((btn) =>
    btn.addEventListener("click", () => {
      handleAddEmployeeBtnStatus(add_employee_btn, all_checkbox_btn);
    })
  );
};
