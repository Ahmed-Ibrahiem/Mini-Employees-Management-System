import createNewEmployee from "../createNewEmployee.js";
import { show_toast_message } from "../Employee Details Modules/Toast_message.js";
import { get_emp_data } from "./Get_field_data.js";
import {
  reset_to_default_mode,
  translate_to_profe_form,
} from "./Personal_form_validation.js";

const all_professional_fields = [
  ...document.querySelectorAll(".pro_form input"),
];
const required_field = all_professional_fields.find(
  (field) => field.dataset.type == "require"
);

const save_data_btn = document.getElementById("save_data_btn");

const validate_required_field = () => {
  const message = document.querySelector(` #${required_field.id} + p`);
  if (required_field.value.trim() === "") {
    message.textContent = "This Field Is Required";
    required_field.classList.add("empty");
    required_field.classList.remove("valid");
    save_data_btn.classList.remove("saved");
  } else {
    message.textContent = "This Field Is Valid";
    save_data_btn.classList.add("saved");
    required_field.classList.remove("empty", "not_valid");
    required_field.classList.add("valid");
  }
};

export const default_prof_form = () => {
  required_field.classList.remove("empty", "not_valid", "valid");
  required_field.value = "";
  save_data_btn.classList.remove("saved");
  save_data_btn.hidden = true;
};

required_field.addEventListener("input", () => validate_required_field());

save_data_btn.addEventListener("click", async (e) => {
  if (e.target.classList.contains("saved")) {
    const emp_data = await get_emp_data();
    createNewEmployee(emp_data);
    default_prof_form();
    reset_to_default_mode();
    show_toast_message("The Addition Completed");
  } else {
    validate_required_field();
    translate_to_profe_form();
  }
});
