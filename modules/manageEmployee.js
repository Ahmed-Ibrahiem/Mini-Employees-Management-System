import { close_menu, open_menu, toggle_menu } from "./Utilies.js";
import { getData } from "./Utilies.js";
import { createEmployeeObjects } from "./Utilies.js";
import {
  defualt_add_new_employee_btn,
  handleAddEmployeeBtnStatus,
} from "./handleAddEmployeeBtnStatus.js";
import { handleCheckBoxInTable } from "./Utilies.js";
import { updateLocalStorage } from "./Utilies.js";
import { deleteEmployee } from "./Utilies.js";
import {
  add_employee_btn,
  all_form,
  cancel_btn,
  create_new_employee_popup,
  filter_exit_btn,
  filter_menu,
  master_checkbox,
  nav_menu,
  nav_menu_btn,
  open_filter_btn,
  select_box,
} from "./definationElements.js";
import filter from "./filter.js";
// import { dafault_input, defualt_status } from "./validationFormsInput.js";

// ========================== MAIN LOGIC ==============================
async function processData() {
  // ===============================================================
  // Fetch date from json file if there are no data in localStorage
  let actual_employees;
  if (localStorage.getItem("localStorage.actual_employees")) {
    actual_employees = JSON.parse(localStorage.actual_employees);
  } else {
    actual_employees = await getData("employees_completed.json");
    updateLocalStorage(actual_employees);
  }

  // =================================================
  // Create All Employee Objects from person constractorl
  createEmployeeObjects(actual_employees);

  // ============================================
  // handle employee date
  const date = new Date().toLocaleDateString("en-CA");
  document.getElementById("end_date").value = date;

  // ========================================
  // render employees Info in the table
  filter();

  // ---------------- Master Checkbox Logic ----------------
  // create function to handle all event that will happen whin use click in master checkbox
  const handle_master_checkbox_event = () => {
    // Get all checkbox currently in the table
    let all_checkbox_btn = Array.from(
      document.querySelectorAll(".check_box_id"),
    ).map((td) => td.querySelector("input"));
    // Make all checkbox state similar to the master checkbox
    handleCheckBoxInTable(master_checkbox, all_checkbox_btn);
    // Set AddEmployeeBtn state based on master_checkbox state
    handleAddEmployeeBtnStatus(add_employee_btn, all_checkbox_btn);
  };
  // Add event listener for master_checbox
  master_checkbox.addEventListener("click", handle_master_checkbox_event);

  // ---------------- Add / Delete Employee Button ----------------
  add_employee_btn.addEventListener("click", () => {
    if (add_employee_btn.classList.contains("delete_status")) {
      // Get all checkbox
      const all_checkbox_btn = Array.from(
        document.querySelectorAll(".check_box_id input"),
      );
      // Get the all employees id thay are will deleted
      const all_checkbox_has_been_checked = all_checkbox_btn
        .filter((btn) => btn.checked == true)
        .map((btn) => Number.parseInt(btn.dataset.id));

      // delete Employee
      deleteEmployee(all_checkbox_has_been_checked);

      // return master_box to default status
      master_checkbox.checked = false;

      // Rerender the employees table
      filter();
      // Return add_new_employee_btn to defualt status
      defualt_add_new_employee_btn(
        add_employee_btn,
        "add_status",
        "delete_status",
      );
    } else if (add_employee_btn.classList.contains("add_status")) {
      open_menu(create_new_employee_popup);
    }
  });
}
processData();

// ========================== NAV MENU ==============================
// add event listener for nav_menu_btn to open and close nav_menu
nav_menu_btn.addEventListener("click", () => nav_menu.classList.toggle("open"));

// ========================== CREATE EMPLOYEE POPUP =================
// add event listener for cancel_btn to close and open create_new_employee_popup
cancel_btn.addEventListener("click", () => {
  close_menu(create_new_employee_popup);
  // all_forms_input.forEach((input) => defualt_status(input));
  // dafault_input();
});
create_new_employee_popup.addEventListener("click", (e) => {
  if (e.target.classList.contains("create_new_employee_popup")) {
    close_menu(create_new_employee_popup);
  }
});
// ========================== SELECT BOX =============================
// add event listener for select_box to open and close options menu
select_box.map((box) => {
  const icon = box.querySelector("i");
  const options = box.querySelector(".options");
  const all_span = box.querySelectorAll(".options span");
  const defualt_option = box.querySelector(".defualt_option");

  // close options menu and icon
  function close_options() {
    close_menu(options);
    icon.classList.remove("active");
  }
  // close and open options menu
  box.addEventListener("click", () => {
    toggle_menu(options);
    icon.classList.toggle("active");
  });

  // handle span event listener
  all_span.forEach((span) => {
    span.addEventListener("click", () => {
      // remove current_option class from all span
      all_span.forEach((span) => span.classList.remove("current_option"));
      // add current_option class to span that user select it
      span.classList.add("current_option");
      // update defualt_option value
      defualt_option.textContent = span.textContent;
    });
  });

  // close options menu if user click anything else it
  document.addEventListener("pointerdown", (e) => {
    if (!box.contains(e.target) && e.target !== options) {
      close_options();
    }
  });
});

// ========================== PREVENT FORM SUBMIT ===================
// hendle all forms in website to pervent submit date
all_form.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});

// ========================== FILTER MENU ===========================
// hendle open and close filter menu
filter_exit_btn.addEventListener("click", () => close_menu(filter_menu));
open_filter_btn.addEventListener("click", () => open_menu(filter_menu));

// ========================== SEARCH POPUP ===========================
export const search_btn = document.getElementById("search_btn");

// Show search popup when clicking on search button
search_btn.addEventListener("click", () => {
  search_popup.classList.add("show_search_popup");
  search_popup.classList.remove("hide_search_popup");
});
