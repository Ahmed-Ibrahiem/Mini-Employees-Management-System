// Import Person class which contains all employees data
import { Person } from "../js/main.js";
import { all_employee_language, return_to_default_languages } from "./Employee Details Modules/get_knowlage_language_data.js";

// Import loading and completion UI handlers
import { start_complete } from "./Employee Details Modules/Loading&Complete_showing.js";

// Import employee-related helpers and shared state
import {
  employee_details,
  render_form_info,
  render_language_list_items,
  set_sidebar_info,
  update_inputs,
  valid_pin_code,
} from "./InitializeEmployeeDetails.js";

// Import date formatter and localStorage updater
import handle_date, { updateLocalStorage } from "./Utilies.js";

// ============================= Update Employee Information =============================

// Update employee object with values from form inputs
export const update_employee_info = () => {
  // Basic personal information
  employee_details.first_name = update_inputs.first_name.value;
  employee_details.last_name = update_inputs.last_name.value;
  employee_details.gender = update_inputs.employee_gender.textContent;
  employee_details.birthday = handle_date(update_inputs.date_of_birth.value);
  employee_details.email = update_inputs.email_id.value;
  employee_details.contact_number = update_inputs.phone_number.value;

  // Location information
  employee_details.location.address = update_inputs.employee_address.value;
  employee_details.location.state = update_inputs.employee_status.value;
  employee_details.location.country = update_inputs.employee_country.value;
  employee_details.location.city = update_inputs.employee_city.value;

  // Additional personal details
  employee_details.zip_code = update_inputs.pin_code.value;
  employee_details.nationality = update_inputs.employee_nationality.value;

  // Update known languages from localStorage
  employee_details.known_languages = JSON.parse(
    localStorage.all_employee_language,
  );

  // Persist updated employees array to localStorage
  updateLocalStorage(Person.all_employees);

  // Update currently selected employee details in localStorage
  localStorage.employee_details = JSON.stringify(employee_details);

  // Deactivate update button after saving
  update_inputs.update_profile.classList.remove("active");
};

// ============================= Update Button Handling =============================

// Handle clicking on "Update Profile" button
update_inputs.update_profile.addEventListener("click", () => {
  // Start loading animation only if changes exist
  if (update_inputs.update_profile.classList.contains("active")) {
    // Apply updates
    update_employee_info();

    // Show completion animation/state
    start_complete();
  }
});

// ============================= Cancel Update Handling =============================

// Handle canceling any unsaved changes
update_inputs.cancel_any_update.addEventListener("click", () => {
  // Restore known languages from employee object
  localStorage.all_employee_language = JSON.stringify(
    employee_details.known_languages,
  );

  return_to_default_languages()

  // Deactivate update button
  update_inputs.update_profile.classList.remove("active");

  // Re-render form with original employee data
  render_form_info();

  // Re-render sidebar information
  set_sidebar_info();

  // Re-render known languages list
  render_language_list_items(employee_details.known_languages);

  // Reset pin code validation state
  valid_pin_code();
});
