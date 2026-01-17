// Import function that collects and processes the known language form data
import { get_knowlage_language_data } from "./Employee Details Modules/get_knowlage_language_data.js";

// Import toast message utility for user feedback
import { show_toast_message } from "./Employee Details Modules/Toast_message.js";

// Import shared form inputs reference from employee initialization file
import { update_inputs } from "./InitializeEmployeeDetails.js";

// Import menu helper functions (open / close dropdown)
import { close_menu, open_menu } from "./Utilies.js";

// ============================= DOM Elements =============================

// Main popup container for adding known languages
export const language_input_popup = document.querySelector(
  ".language_input_popup"
);

// Form inside the popup
const form_known_language = language_input_popup.querySelector("form");

// All input fields inside the form
const all_form_inputs = form_known_language.querySelectorAll("input");

// Custom select element for language selection
const select_language_known_select = document.getElementById(
  "select_language_known"
);

// Currently selected language text
export const current_language_option =
  select_language_known_select.querySelector(".current_option");

// Dropdown menu container
const select_language_known_menu =
  select_language_known_select.querySelector(".options");

// All available language options
const select_language_known_options =
  select_language_known_menu.querySelectorAll("span");

// Action buttons
const add_new_known_language_btn =
  document.getElementById("add_known_language");
const cancel_add_new_known_language = document.getElementById(
  "cancel_add_new_known_language"
);

// Button that opens the popup (Add New Language)
const open_known_language_popup_btn = document.querySelector(".add_new");

// Form validation state
export let is_form_valid = false;

// ======================================================================

// Close the language popup with animation classes
const close_known_language_popup = () => {
  language_input_popup.classList.remove("show_popup");
  language_input_popup.classList.add("hide_popup");
};

// Open the language popup with animation classes
export const open_known_language_popup = () => {
  language_input_popup.classList.remove("hide_popup");
  language_input_popup.classList.add("show_popup");
};

// Open popup when clicking "Add New" button
open_known_language_popup_btn.addEventListener("click", () => {
  open_known_language_popup();
});

// Prevent default form submission behavior
form_known_language.addEventListener("submit", (e) => e.preventDefault());

// Handle opening the custom select dropdown
select_language_known_select.addEventListener("click", (e) => {
  if (e.target.classList.contains("main")) {
    open_menu(select_language_known_menu);
    select_language_known_select.classList.add("open_menu");
  }
});

// Handle selecting a language option
select_language_known_options.forEach((option) => {
  option.addEventListener("click", () => {
    is_form_valid = true; // Mark form as valid once language is selected
    current_language_option.textContent = option.textContent;
    close_menu(select_language_known_menu);
    select_language_known_select.classList.remove("open_menu");
    show_form_validation_ui();
  });
});

// Close dropdown menu when clicking outside the select component
document.addEventListener("click", (e) => {
  if (!select_language_known_select.contains(e.target)) {
    close_menu(select_language_known_menu);
    select_language_known_select.classList.remove("open_menu");
  }
});

// Reset form values and validation state
const return_form_values = () => {
  is_form_valid = false;
  show_form_validation_ui();
};

// Handle form UI state based on validation
const show_form_validation_ui = () => {
  if (is_form_valid) {
    // Enable inputs and activate submit button
    add_new_known_language_btn.classList.add("valid");
    form_known_language.classList.add("valid");
    all_form_inputs.forEach((input) => (input.disabled = false));
  } else {
    // Disable inputs and reset UI
    add_new_known_language_btn.classList.remove("valid");
    form_known_language.classList.remove("valid");
    current_language_option.textContent = "Select language...";
    all_form_inputs.forEach((input) => (input.disabled = true));
  }
};

// Initialize validation UI on load
show_form_validation_ui();

// =================================

// Handle adding a new known language
add_new_known_language_btn.addEventListener("click", (e) => {
  if (e.target.classList.contains("valid")) {
    // Collect language data
    get_knowlage_language_data();

    // Reset form state
    return_form_values();

    // Show success feedback to user
    show_toast_message();
  }
});

// Handle cancel button click
cancel_add_new_known_language.addEventListener("click", () => {
  return_form_values();
  close_known_language_popup();
});
