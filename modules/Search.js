import { Person } from "../js/main.js";
export const search_master = document.getElementById("search");
export const search_popup = document.getElementById("search_popup");
export const search_input = document.getElementById("search_input");
export const cancel_search_btn = document.getElementById("cancel_search");
export const search_result_menu = document.getElementById("search_result");

// Get employees that match search input (by name or id)
export const get_result_data = (search_words) => {
  const all_employees_data = Person.all_employees;
  const result_data = [];

  all_employees_data.forEach((emp) => {
    const emp_name = emp.getFullName().toLowerCase();
    if (isNaN(search_words)) {
      // If input is text, match by employee name
      if (emp_name.includes(search_words.toLowerCase())) {
        result_data.push(emp);
      }
    } else if (emp.id == +search_words) {
      // If input is number, match by employee id
      result_data.push(emp);
    }
  });

  return result_data;
};

// Render search results inside the popup
export const render_search_result = (search_words) => {
  const result_data = get_result_data(search_words);
  search_result_menu.innerHTML = "";

  if (result_data.length > 0) {
    // If results found, display each employee
    result_data.forEach((emp_data) => {
      const emp_name = emp_data.getFullName();
      const span = document.createElement("span");
      span.href = "EmployeeDetails.html";
      span.style.display = "block";
      span.dataset.id = emp_data.id;
      span.dataset.id = emp_data.id;
      span.textContent = emp_name;
      // Navigate to employee details page and store employee data
      span.addEventListener("click", () => {
        localStorage.employee_details = JSON.stringify(emp_data);
        window.location.assign("EmployeeDetails.html");
      });

      search_result_menu.appendChild(span);
    });
  } else {
    // If no results found, show "doesn't exist" message
    const span = document.createElement("span");
    span.classList.add("no_exist");
    span.textContent = "------ doesn't exist ------";
    search_result_menu.appendChild(span);
  }
};

// Handle typing in search input
search_input.addEventListener("input", () => {
  if (search_input.value.trim() == "") {
    hide_result();
  } else {
    show_result();
    render_search_result(search_input.value.trim());
  }
});

search_master.addEventListener("click", () => {
  search_popup.classList.add("show_search_popup");
  search_popup.classList.remove("hide_search_popup");
});

// Animation effect when focusing on search input
search_input.addEventListener("focus", () => {
  search_popup.querySelector(".search_box").style.translate = ` 0 -100px`;
});

// Close popup when clicking cancel button
cancel_search_btn.addEventListener("click", () => {
  hide_result();
  search_popup.classList.add("hide_search_popup");
  search_popup.classList.remove("show_search_popup");
  // Reset animation
  search_popup.querySelector(".search_box").style.translate = ` 0 0`;
});

// Hide search results container
const hide_result = () => {
  search_result_menu.classList.add("hide_result");
  search_result_menu.classList.remove("show_result");
};

// Show search results container
const show_result = () => {
  search_result_menu.classList.remove("hide_result");
  search_result_menu.classList.add("show_result");
};
