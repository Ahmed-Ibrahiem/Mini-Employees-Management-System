// Import Person class which holds all employees data
import { Person } from "../js/main.js";

// Import helper function to format date for input[type="date"]
import { handle_format_date_in_input } from "./Utilies.js";

// ============================= Initialize Employee Information =============================

// Get the selected employee details from localStorage and match it with all employees
export const employee_details = Person.all_employees.find(
  (emp) => emp.id == JSON.parse(localStorage.employee_details).id
);

// ============================= General Form Inputs =============================

// Basic personal information inputs
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const employee_gender = document.getElementById("employee_gender");
const date_of_birth = document.getElementById("date_of_birth");
const email_id = document.getElementById("email_id");
const phone_number = document.getElementById("phone_number");

// Address & status information
const employee_address = document.getElementById("employee_address");
const employee_status = document.getElementById("employee_status");
const employee_country = document.getElementById("employee_country");
const employee_city = document.getElementById("employee_city");
const pin_code = document.getElementById("pin_code");
const employee_nationality = document.getElementById("employee_nationality");

// Action buttons
const update_profile = document.getElementById("update_profile");
const cancel_any_update = document.getElementById("cancel_any_update");

// Pin code validation container
const pin_code_box = document.querySelector(".pin_code_");

// Group all inputs into one object for easier handling
export const update_inputs = {
  first_name,
  last_name,
  employee_gender,
  date_of_birth,
  email_id,
  phone_number,
  employee_address,
  employee_status,
  employee_country,
  employee_city,
  pin_code,
  employee_nationality,
  update_profile,
  cancel_any_update,
};

// Activate update button when any input value changes
for (const key in update_inputs) {
  update_inputs[key].addEventListener("input", () => {
    update_inputs.update_profile.classList.add("active");
  });
}

// ============================= Gender Selection Handling =============================

// Handle gender selection from custom dropdown
const all_gender_options = document.querySelectorAll(".select .options li");

all_gender_options.forEach((li) =>
  li.addEventListener("click", () => {
    update_inputs.employee_gender.textContent = li.textContent;
    update_inputs.update_profile.classList.add("active");
  })
);

// ============================= Render Form Information =============================

// Fill the form with employee existing data
export const render_form_info = () => {
  update_inputs.first_name.value = employee_details.first_name || "Unknown yet";
  update_inputs.last_name.value = employee_details.last_name || "Unknown yet";
  update_inputs.employee_gender.textContent = employee_details.gender || 'Male';

  // Format birthday to be compatible with input[type="date"]
  update_inputs.date_of_birth.value =
    handle_format_date_in_input(employee_details.birthday) || "Unknown yet";

  update_inputs.email_id.value = employee_details.email || "Unknown yet";
  update_inputs.phone_number.value =
    employee_details.contact_number || "Unknown yet";
  update_inputs.employee_address.value =
    employee_details.location.address || "Unknown yet";
  update_inputs.employee_status.value =
    employee_details.location.state || "Unknown yet";
  update_inputs.employee_country.value =
    employee_details.location.country || "Unknown yet";
  update_inputs.employee_city.value =
    employee_details.location.city || "Unknown yet";
  update_inputs.pin_code.value = employee_details.zip_code || "Unknown yet";
  update_inputs.employee_nationality.value =
    employee_details.nationality || "Unknown yet";
};

// Initial render
render_form_info();

// ============================= Known Languages Section =============================

const language_list = document.querySelector(".language_list");

// Render known languages cards dynamically
export const render_language_list_items = (language_array) => {
  language_list.innerHTML = ``;

  if (language_array)
    language_array.forEach((item) => {
      const language_item = `
      <div class="language_items col-lg-4 col-md-6 col-sm-12">
        <p class="language">${item.language}</p>
        <div class="language_info">
          <div class="writing">
            <p>Writing</p>
            <span>${item.skills.writing}</span>
          </div>
          <div class="speaking">
            <p>Speaking</p>
            <span>${item.skills.speaking}</span>
          </div>
          <div class="understanding">
            <p>Understanding</p>
            <span>${item.skills.understanding}</span>
          </div>
        </div>
      </div>`;
      language_list.innerHTML += language_item;
    });

  // Add "Add New Language" button
  const add_new_language_btn = `
    <div class="language_control col-lg-4 col-md-6 col-sm-12">
      <button class="add_new" id="add_new_language">
        <i class="fa-solid fa-plus"></i> <span>Add New</span>
      </button>
    </div>`;

  language_list.innerHTML += add_new_language_btn;

  // Open language popup on button click
  document.querySelector(".add_new").addEventListener("click", () => {
    document
      .querySelector(".language_input_popup")
      .classList.remove("hide_popup");
    document.querySelector(".language_input_popup").classList.add("show_popup");
  });
};

// Initial render of languages
render_language_list_items(employee_details.known_languages);

// ============================= Sidebar Employee Information =============================

// Sidebar elements
const profile_image = document.getElementById("profile_image");
const profile_name = document.getElementById("profile_name");
const profile_status = document.getElementById("profile_status");
const profile_job_title = document.getElementById("profile_job_title");
const profile_email = document.getElementById("profile_email");
const profile_contact_number = document.getElementById(
  "profile_contact_number"
);
const profile_location = document.getElementById("profile_location");
const profile_birthday = document.getElementById("profile_birthday");

// Team leader info
const profile_team_leader_image = document.getElementById(
  "profile_team_leader_image"
);
const profile_team_leader_name = document.getElementById(
  "profile_team_leader_name"
);
const team_leader = document.getElementById("team_leader");

// Bank info
const profile_bank_name = document.getElementById("profile_bank_name");
const profile_bank_account = document.getElementById("profile_bank_account");
const profile_bank_code = document.getElementById("profile_bank_code");
const profile_bank_pan_no = document.getElementById("profile_bank_pan_no");

// Education section
const education_container = document.getElementById("education_container");

// Set all sidebar data
export const set_sidebar_info = () => {
  // Profile image fallback handling
  profile_image.src = employee_details.profile_image
    ? employee_details.profile_image
    : "/users/Unknown_person.jpg";

  profile_image.onerror = () =>
    (profile_image.src = "/users/Unknown_person.jpg");

  // Team leader image fallback
  profile_team_leader_image.src = employee_details.team_leader.image
    ? employee_details.team_leader.image
    : "/users/Unknown_person.jpg";

  profile_team_leader_image.onerror = () =>
    (profile_team_leader_image.src = "/users/Unknown_person.jpg");

  // Set text information
  profile_name.textContent = employee_details.getFullName();
  profile_status.textContent = employee_details.status;
  profile_job_title.textContent = employee_details.job_title;
  profile_email.textContent = employee_details.email;
  profile_contact_number.textContent = employee_details.contact_number;
  profile_location.textContent = employee_details.location.address;
  profile_birthday.textContent = employee_details.birthday;

  // Bank info
  profile_bank_name.textContent =
    employee_details.bank_information.bank_name || "Unknown yet";
  profile_bank_account.textContent =
    employee_details.bank_information.account_number || "Unknown yet";
  profile_bank_code.textContent =
    employee_details.bank_information.ifsc_code || "Unknown yet";
  profile_bank_pan_no.textContent =
    employee_details.bank_information.pan_number || "Unknown yet";

  // Team leader info
  profile_team_leader_name.textContent = employee_details.team_leader.name;
  team_leader.dataset.id = employee_details.team_leader.id;
};

// Initial sidebar render
set_sidebar_info();

// ============================= Education Section =============================

// Render employee education history
const init_education = () => {
  education_container.innerHTML = ``;

  employee_details.education.forEach((edu) => {
    const li = document.createElement("li");
    const div_left = document.createElement("div");
    const div_right = document.createElement("div");
    const p = document.createElement("p");
    const span = document.createElement("span");

    li.classList.add("section");
    div_left.classList.add("left");
    div_right.classList.add("right");

    p.textContent = edu.title;
    span.textContent = edu.duration;
    div_right.textContent = edu.experience;

    div_left.appendChild(p);
    div_left.appendChild(span);
    li.appendChild(div_left);
    li.appendChild(div_right);

    education_container.appendChild(li);
  });
};

// Initial education render
init_education();

// ============================= Pin Code Validation =============================

// Check if pin code already exists for another employee
const is_pin_code_exist = (number) => {
  const is_exist = Person.all_employees.filter((emp) => emp.zip_code == number);
  return is_exist.length > 0;
};

// Show pin code error message
const invalid_pin_code = (message) => {
  pin_code_box.querySelector("p").textContent = message;
  pin_code_box.classList.add("invalid");
};

// Enable update button when pin code is valid
export const valid_pin_code = () => {
  pin_code_box.classList.remove("invalid");
  update_inputs.update_profile.classList.remove("invalid");
  update_inputs.update_profile.disabled = false;
};

// Validate pin code input
update_inputs.pin_code.addEventListener("input", (e) => {
  update_inputs.update_profile.classList.add("invalid");
  update_inputs.update_profile.disabled = true;

  if (e.target.value.trim() == "" || e.target.value.length < 5) {
    invalid_pin_code("The number must be more then 5");
  } else if (is_pin_code_exist(e.target.value)) {
    invalid_pin_code("The pin code is already exsit");
  } else {
    valid_pin_code();
  }
});
