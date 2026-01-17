import {
  employee_details,
  render_language_list_items,
  update_inputs,
} from "../InitializeEmployeeDetails.js";
import {
  current_language_option,
  is_form_valid,
} from "../Known_language_popup.js";

export let all_employee_language = structuredClone(
  employee_details.known_languages,
);
localStorage.all_employee_language = JSON.stringify(all_employee_language);

export const return_to_default_languages = () => {
  all_employee_language = JSON.parse(localStorage.all_employee_language);
};

export const get_knowlage_language_data = () => {
  const all_input = Array.from(
    document.querySelectorAll(".language_input_popup section input"),
  );

  let known_language = {
    language: current_language_option.textContent || "Unknown",
    skills: {
      writing: "Unknown",
      speaking: "Unknown",
      understanding: "Unknown",
    },
  };

  all_input.forEach((input) => {
    if (input.checked) {
      if (input.name == "writing") {
        known_language.skills.writing = input.dataset.choose;
      } else if (input.name == "understanding") {
        known_language.skills.understanding = input.dataset.choose;
      } else if (input.name == "speaking") {
        known_language.skills.speaking = input.dataset.choose;
      }
    }
  });

  if (is_form_valid) {
    all_employee_language.push(known_language);
    render_language_list_items(all_employee_language);
    update_inputs.update_profile.classList.add("active");
    localStorage.all_employee_language = JSON.stringify(all_employee_language);
  }
};
