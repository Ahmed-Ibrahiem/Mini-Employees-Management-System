import handle_date from "./Utilies.js"; // Utility function to format date

// Create and return an employee card element
export const createEmployeeCard = (emp_data) => {
  /* ============================
     Main Card Containers
  ============================ */
  const card_box = document.createElement("div");
  card_box.classList.add("card_box", "col-xl-3", "col-lg-4");

  const card = document.createElement("div");
  card.classList.add("emp_card");

  // Store employee metadata
  card_box.dataset.id = emp_data.id;
  card_box.dataset.category = emp_data.category;

  /* ============================
     Card Header Elements
  ============================ */
  const card_header = document.createElement("div");
  card_header.classList.add("card_header");

  const card_header_top = document.createElement("div");
  card_header_top.classList.add("card_header_top");

  const card_header_bottom = document.createElement("div");
  card_header_bottom.classList.add("card_header_bottom");

  const employee_name = document.createElement("span");
  employee_name.classList.add("employee_name");

  const employee_status = document.createElement("span");
  employee_status.classList.add("employee_status");

  const employee_job_title = document.createElement("p");
  employee_job_title.classList.add("employee_job_title");

  /* ============================
     Card Body Elements
  ============================ */
  const card_body = document.createElement("div");
  card_body.classList.add("card_body");

  const employee_img_box = document.createElement("div");
  employee_img_box.classList.add("emp_img_box");

  const employee_img = document.createElement("img");

  const employee_email = document.createElement("p");
  employee_email.classList.add("employee_email");

  /* ============================
     Employee Info Section
  ============================ */
  const employee_info = document.createElement("div");
  employee_info.classList.add("employee_info");

  // Location container
  const employee_location_container = document.createElement("div");
  employee_location_container.classList.add("employee_location_container");

  const employee_location_container_left = document.createElement("div");
  employee_location_container_left.classList.add(
    "employee_location_container_left"
  );

  const employee_location_container_right = document.createElement("div");
  employee_location_container_right.classList.add(
    "employee_location_container_right"
  );

  // Contact container
  const employee_contact_container = document.createElement("div");
  employee_contact_container.classList.add("employee_contact_container");

  const employee_contact_container_left = document.createElement("div");
  employee_contact_container_left.classList.add(
    "employee_contact_container_left"
  );

  const employee_contact_container_right = document.createElement("div");
  employee_contact_container_right.classList.add(
    "employee_contact_container_right"
  );

  // Birthday container
  const employee_barthday_container = document.createElement("div");
  employee_barthday_container.classList.add("employee_barthday_container");

  const employee_barthday_container_left = document.createElement("div");
  employee_barthday_container_left.classList.add(
    "employee_barthday_container_left"
  );

  const employee_barthday_container_right = document.createElement("div");
  employee_barthday_container_right.classList.add(
    "employee_barthday_container_right"
  );

  /* ============================
     Icons
  ============================ */
  const location_icon = document.createElement("i");
  location_icon.classList.add("fa-solid", "fa-location-dot");

  const contact_icon = document.createElement("i");
  contact_icon.classList.add("fa-solid", "fa-phone");

  const barthday_icon = document.createElement("i");
  barthday_icon.classList.add("fa-solid", "fa-calendar-days");

  /* ============================
     Text Elements
  ============================ */
  const location_text = document.createElement("p");
  location_text.classList.add("location_text");

  const location_title = document.createElement("p");
  location_title.classList.add("location_title");

  const employee_contact_text = document.createElement("p");
  employee_contact_text.classList.add("employee_contact_text");

  const employee_contact_title = document.createElement("p");
  employee_contact_title.classList.add("employee_contact_title");

  const barthday_text = document.createElement("p");
  barthday_text.classList.add("barthday_text");

  const barthday_title = document.createElement("p");
  barthday_title.classList.add("barthday_title");

  /* ============================
     Set Text Content & Data
  ============================ */
  employee_name.textContent = emp_data.getFullName();
  employee_status.textContent = emp_data.status;
  employee_job_title.textContent = emp_data.job_title;
  employee_email.textContent = emp_data.email;

  // Highlight active employee
  emp_data.status === "Active" ? employee_status.classList.add("active") : "";

  // Employee image fallback
  employee_img.src = emp_data.profile_image
    ? emp_data.profile_image
    : "/users/Unknown_person.jpg";

  employee_img.onerror = () => {
    employee_img.src = "/users/Unknown_person.jpg";
  };

  location_text.textContent = "Location";
  location_title.textContent = `${emp_data.location.city}, ${emp_data.location.governorate}`;

  employee_contact_text.textContent = "Contact Us";
  employee_contact_title.textContent = emp_data.contact_number;

  barthday_text.textContent = "Barthday";
  barthday_title.textContent = handle_date(emp_data.birthday);

  /* ============================
     Build DOM Structure
  ============================ */
  card_header_top.appendChild(employee_name);
  card_header_top.appendChild(employee_status);

  card_header_bottom.appendChild(employee_job_title);

  card_header.appendChild(card_header_top);
  card_header.appendChild(card_header_bottom);

  employee_img_box.appendChild(employee_img);

  card_body.appendChild(employee_img_box);
  card_body.appendChild(employee_email);

  card.appendChild(card_header);
  card.appendChild(card_body);
  card.appendChild(employee_info);

  card_box.appendChild(card);

  employee_location_container_left.appendChild(location_icon);
  employee_location_container_left.appendChild(location_text);
  employee_location_container_right.appendChild(location_title);

  employee_location_container.appendChild(employee_location_container_left);
  employee_location_container.appendChild(employee_location_container_right);

  employee_contact_container_left.appendChild(contact_icon);
  employee_contact_container_left.appendChild(employee_contact_text);
  employee_contact_container_right.appendChild(employee_contact_title);

  employee_contact_container.appendChild(employee_contact_container_left);
  employee_contact_container.appendChild(employee_contact_container_right);

  employee_barthday_container_left.appendChild(barthday_icon);
  employee_barthday_container_left.appendChild(barthday_text);
  employee_barthday_container_right.appendChild(barthday_title);

  employee_barthday_container.appendChild(employee_barthday_container_left);
  employee_barthday_container.appendChild(employee_barthday_container_right);

  employee_info.appendChild(employee_location_container);
  employee_info.appendChild(employee_contact_container);
  employee_info.appendChild(employee_barthday_container);

  /* ============================
     Navigation Event
  ============================ */
  // Navigate to employee details page and store employee data
  card_box.addEventListener("click", () => {
    localStorage.employee_details = JSON.stringify(emp_data);
    window.location.assign("EmployeeDetails.html");
  });

  return card_box;
};
