// import { Person } from "../js/main.js";
// import createNewEmployee from "./createNewEmployee.js";
// import {
//   all_form_nav_btn,
//   all_forms_input,
//   all_per_info_inputs,
//   all_pro_info_inputs,
//   birthday_input,
//   city,
//   contact_number_input,
//   create_new_employee_popup,
//   email_address_input,
//   f_name,
//   generate_id_btn,
//   id_input,
//   joining_date,
//   l_name,
//   next_btn,
//   productive,
//   salary,
//   state,
//   zip_code_input,
// } from "./definationElements.js";
// import { close_menu } from "./Utilies.js";

import { Person } from "../../js/main.js";
import { show_toast_message } from "../Employee Details Modules/Toast_message.js";
import { default_prof_form } from "./Professional_form_validation.js";

// // =============================================================================
// // create function to handle class and textcontent depend on mode
// function btn_mode(mode) {
//   if (mode === "save") {
//     next_btn.dataset.type = "save";
//     next_btn.classList.add("save");
//     next_btn.textContent = "Save";
//   } else if (mode == "next") {
//     next_btn.dataset.type = "next";
//     next_btn.classList.add("next");
//     next_btn.textContent = "Next";
//   }
// }

// // =============================================================================
// // main function to adjust next btn status (not_valid , next , save)
// function adjust_next_btn_status() {
//   const all_per_info_empty = all_per_info_inputs.filter(
//     (input) => input.value == "" || input.classList.contains("is_not_valid")
//   );

//   const all_pro_info_empty = all_pro_info_inputs.filter(
//     (input) => input.value == "" || input.classList.contains("is_not_valid")
//   );

//   if (all_per_info_empty.length == 0 && all_pro_info_empty.length == 0) {
//     btn_mode("save");
//   } else if (all_per_info_empty.length == 0) {
//     btn_mode("next");
//   } else {
//     next_btn.dataset.type = "not_valid";
//     next_btn.classList.remove("next");
//   }

//   return { all_per_info_empty, all_pro_info_empty };
// }

// // =============================================================================
// // Create function to return all input to default status
// export const defualt_status = (input) => {
//   input.classList.remove("is_valid");
//   input.classList.remove("is_not_valid");
// };
// // =============================================================================
// // Create function to return all input to default values
// export const dafault_input = () => {
//   all_per_info_inputs.forEach((input) => (input.value = ""));
//   all_pro_info_inputs.forEach((input) => (input.value = ""));
//   all_forms_input.forEach((input) => defualt_status(input));
//   next_btn.dataset.type = "not_valid";
//   next_btn.classList.remove("next");
//   next_btn.textContent = "Next";
// };

// // =============================================================================
// // create function to set validation result on input UI
// const set_validation_result_on_input = (isValid, input) => {
//   if (isValid) input.classList.add("is_valid");
//   else input.classList.add("is_not_valid");
// };

// // =============================================================================
// // validaiton of contact number input
// function valid_of_contact_number(e) {
//   defualt_status(e.target);
//   const { isValid, message } = Person.checkTheValidPhone(
//     contact_number_input.value
//   );
//   set_validation_result_on_input(isValid, e.target);
// }

// // =============================================================================
// // validaiton of contact productive input
// function valid_of_productive_valid(e) {
//   defualt_status(e.target);
//   const { isValid, message } = Person.checkvalidProductive(productive.value);
//   set_validation_result_on_input(isValid, e.target);
// }

// // =============================================================================
// // // validaiton of contact Email address input
// const valid_of_email_address = (e) => {
//   defualt_status(e.target);
//   const { isValid, message } = Person.checkValidEmail(e.target.value);
//   set_validation_result_on_input(isValid, e.target);
// };

// // =============================================================================
// // validaiton of contact zip code input
// const valid_of_zip_code = (e) => {
//   // pervent user from input more then 5 numbers
//   defualt_status(e.target);
//   if (e.target.value.length > 5) {
//     e.target.value = e.target.value.slice(0, 5);
//   }
//   const { isValid, message } = Person.checkValidZipCode(e.target.value);
//   set_validation_result_on_input(isValid, e.target);
// };

// // =============================================================================
// // validaiton of contact zip code input
// const valid_of_id = (e) => {
//   // pervent user from input more then 5 numbers
//   defualt_status(e.target);
//   if (e.target.value !== "" && e.target.value !== "0") {
//     const { isValid, message } = Person.checkValidId(
//       Number.parseInt(e.target.value)
//     );
//     set_validation_result_on_input(isValid, e.target);
//   } else {
//     e.target.classList.add("is_not_valid");
//   }
// };

// // =============================================================================
// // Validation of first name, last name, date, address, birthday, city and state
// const validaiton_empty = (e) => {
//   if (e.target.value == "") {
//     e.target.classList.add("is_not_valid");
//     e.target.classList.remove("is_valid");
//   } else {
//     e.target.classList.remove("is_not_valid");
//     e.target.classList.add("is_valid");
//   }
// };

// // =============================================================================
// // add event listener to next btn
// next_btn.addEventListener("click", () => {
//   if (next_btn.dataset.type == "not_valid") {
//     const { all_per_info_empty } = adjust_next_btn_status();
//     all_per_info_empty.map((input) => input.classList.add("is_not_valid"));
//   } else if (next_btn.dataset.type == "save") {
//     // create new employe and update the employee table and localStorage data
//     createNewEmployee();
//     // close create_new_employee_popup menu
//     close_menu(create_new_employee_popup);
//     // return all input in create_new_employee_popup to default state
//     dafault_input();
//     // return all_form_nav_btn to default state
//     all_form_nav_btn.map((btn) => {
//       if (btn.classList.contains("per_info")) {
//         btn.classList.add("active");
//       } else btn.classList.remove("active");
//     });
//     document.querySelector(".new_emp_form").style.transform = `translateX(0)`;
//   }
// });

// // =============================================================================
// contact_number_input.addEventListener("input", valid_of_contact_number);
// email_address_input.addEventListener("input", valid_of_email_address);
// zip_code_input.addEventListener("input", valid_of_zip_code);
// id_input.addEventListener("input", validaiton_empty);
// id_input.addEventListener("change", validaiton_empty);
// id_input.addEventListener("input", valid_of_id);
// id_input.addEventListener("change", valid_of_id);
// f_name.addEventListener("input", validaiton_empty);
// l_name.addEventListener("input", validaiton_empty);
// salary.addEventListener("input", validaiton_empty);
// birthday_input.addEventListener("input", validaiton_empty);
// city.addEventListener("input", validaiton_empty);
// state.addEventListener("input", validaiton_empty);
// productive.addEventListener("input", valid_of_productive_valid);
// joining_date.addEventListener("input", validaiton_empty);

// all_forms_input.map((input) =>
//   input.addEventListener("input", adjust_next_btn_status)
// );

// generate_id_btn.addEventListener("click", () => {
//   id_input.classList.add("is_valid");
//   id_input.classList.remove("is_not_valid");
//   adjust_next_btn_status();
// });

// ========================== DOM ELEMENTS ==========================
// Select all input fields in personal info section
const main_form = document.querySelector(".new_emp_form");

const all_personal_fields = [...document.querySelectorAll(".per_info input")];
// Select default options (like dropdown defaults)
const all_personal_selected = document.querySelectorAll(
  ".per_info .defualt_option"
);
const save_data_btn = document.getElementById("save_data_btn");
// Action buttons
const next_form_btn = document.getElementById("next_form_btn");
const cancel_btn = document.getElementById("cancel");

// Object to store new employee data
let new_emp_data = {};

// ========================== UI HELPERS ==========================

// Highlight empty fields and show message for the user
const highlight_empty_fields = (array) => {
  array.forEach((ele) => ele.classList.add("empty"));
  const all_message_ele = array.map((ele) =>
    document.querySelector(`#${ele.id} + p`)
  );

  // Set error message for each empty field
  all_message_ele.forEach((ele) => {
    ele.textContent = "This Field Is Required";
  });
};

// ========================== FORM VALIDATION ==========================

// Validate all required personal fields
const validate_personal_form = () => {
  const all_per_req_fields = all_personal_fields.filter(
    (field) => field.dataset.type == "require"
  );

  let not_valid_field = [];

  all_per_req_fields.forEach((field) => {
    // Consider empty or invalid fields
    if (
      field.value.trim() == "" ||
      field.classList.contains("not_valid") ||
      field.classList.contains("empty")
    )
      not_valid_field.push(field);
  });

  // Update primary button state based on validation
  if (not_valid_field.length !== 0) {
    next_form_btn.classList.add("not_valid");
    next_form_btn.classList.remove("next_step");
    save_data_btn.hidden = true;
  } else {
    save_data_btn.hidden = false;
    next_form_btn.classList.add("next_step");
    next_form_btn.classList.remove("not_valid");
  }

  return not_valid_field; // Return invalid fields for UI handling
};

// Check if a single field is empty and update its class
export const is_field_empty = (field) => {
  if (field.value.trim() == "") {
    field.classList.add("empty");
  } else {
    field.classList.remove("empty", "not_valid");
  }
};

// Update field UI based on validation result
const update_field_validation_ui = ({ isValid, message }, field) => {
  const message_ele = document.querySelector(`#${field.id} + p`);
  if (isValid) {
    field.classList.remove("empty", "not_valid");
    field.classList.add("valid");
  } else if (!isValid) {
    field.classList.remove("valid");
    field.classList.add("not_valid");
  }
  message_ele.textContent = message;
};

// Validate a single field based on its type or name
const field_validation = (field) => {
  let result;
  if (
    field.name == "first_name" ||
    field.name == "last_name" ||
    field.name == "nationality" ||
    field.name == "birthday"
  ) {
    is_field_empty(field); // Check if field is empty
  } else if (field.name == "email") {
    result = Person.checkValidEmail(field.value); // Email validation
  } else if (field.name == "zip_code") {
    result = Person.checkValidZipCode(field.value); // Zip code validation
  }
  if (result !== undefined) update_field_validation_ui(result, field); // Update UI for non-empty validations
};

// Reset the form to default state
export const reset_to_default_mode = () => {
  all_personal_fields.forEach((ele) => {
    ele.classList.remove("empty", "not_valid", "valid");
    ele.value = "";
  });

  next_form_btn.classList.remove("next_step");

  default_form();
  default_prof_form();

  new_emp_data = {};
};

// ========================== EVENT LISTENERS ==========================

// Validate fields on input and update primary button state
all_personal_fields.forEach((field) =>
  field.addEventListener("input", (e) => {
    field_validation(e.target);
    validate_personal_form(); // Update primary button based on current field states
  })
);

const default_form = () => {
  main_form.classList.add("personal_info");
  main_form.classList.remove("professional_info");
  document.getElementById("pro_info").classList.remove("active");
  document.getElementById("per_info").classList.add("active");
};

export const translate_to_profe_form = () => {
  main_form.classList.remove("personal_info");
  main_form.classList.add("professional_info");
  // show active button UI
  document.getElementById("pro_info").classList.add("active");
  document.getElementById("per_info").classList.remove("active");
};

export const translate_between_froms = (e) => {
  if (next_form_btn.classList.contains("next_step")) {
    if (e.target.closest(".per_info")) {
      default_form();
    } else if (
      e.target.closest(".pro_info") ||
      e.target.classList.contains("next_step")
    ) {
      translate_to_profe_form();
    }
  }
};

// Handle primary action button click
next_form_btn.addEventListener("click", (e) => {
  if (
    e.target.dataset.type == "next" &&
    !e.target.classList.contains("next_step")
  ) {
    const not_valid_field = validate_personal_form();
    highlight_empty_fields(not_valid_field); // Show messages for empty fields
  } else if (
    e.target.dataset.type == "next" &&
    e.target.classList.contains("next_step")
  ) {
    translate_between_froms(e); // Proceed to next step if all fields valid
  }
});

const all_form_nav_btn = [...document.querySelectorAll(".popup_header button")];

all_form_nav_btn.forEach((btn) =>
  btn.addEventListener("click", (e) => translate_between_froms(e))
);

// Reset form when cancel button is clicked
cancel_btn.addEventListener("click", () => {
  reset_to_default_mode();
});

// ========================== CONTACT NUMBER LIMIT ==================

// Handle contact number input: limit length and validate
document.getElementById("contact_number").addEventListener("input", (e) => {
  if (e.target.value.length > 11) {
    e.target.value = e.target.value.slice(0, 11); // Limit input to 11 digits
  }
  update_field_validation_ui(
    Person.checkTheValidPhone(e.target.value),
    e.target
  );
  validate_personal_form(); // Update primary button state after phone validation
});

// ========================== PRODUCTIVE NUMBER LIMIT ==================

// Handle productive number input: limit length and validate
document.getElementById("productive").addEventListener("input", (e) => {
  if (e.target.value.length > 3) {
    e.target.value = e.target.value.slice(0, 3); // Limit input to 3 digits
  }
  update_field_validation_ui(
    Person.checkvalidProductive(e.target.value),
    e.target
  );
  validate_personal_form(); // Update primary button state after phone validation
});

