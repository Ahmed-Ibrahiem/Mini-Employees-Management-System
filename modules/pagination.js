import { tbody } from "./definationElements.js";
import { toggle_menu } from "./Utilies.js";
import { renderEmployeeInTable } from "./renderEmployeesInTable.js";

// ======================= Select DOM elements =======================
const display_numbers_box = document.getElementById("list_display_numbers"); // container of "items per page"
const display_numbers_menu = display_numbers_box.querySelector(".options"); // dropdown inside display_numbers_box
const display_numbers_options =
  display_numbers_box.querySelectorAll(".options span"); // all options (10, 20, 50+)
const pages_numbers_box = document.getElementById("numbers_of_pages"); // container of "page numbers"
const pages_numbers_menu = pages_numbers_box.querySelector(".options"); // dropdown inside pages_numbers_box
export const total_entries = document.getElementById("total_entries"); // element showing total number of entries
const next_page = document.getElementById("next_page");
const prev_page = document.getElementById("prev_page");
let number_of_pages; // track total pages

// ================================== Helpers =============================================

// get employees data stored in localStorage
const get_filter_employees = () => {
  try {
    const raw = localStorage.filter_employee;
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Invalid filter_employee in localStorage, fallback to []");
    return [];
  }
};

const selec_nav_btns_is_valid = (current_page = 1) => {
  next_page.classList.remove("valid", "not_valid");
  prev_page.classList.remove("valid", "not_valid");
  if (current_page > 1 && current_page < number_of_pages) {
    next_page.classList.add("valid");
    prev_page.classList.add("valid");
  } else if (current_page >= number_of_pages) {
    next_page.classList.add("not_valid");
  } else if (current_page <= 1) {
    prev_page.classList.add("not_valid");
  }
  if(number_of_pages == 0){
    next_page.classList.add("not_valid");
    prev_page.classList.add("not_valid");
  }
};

// get employees of the current page based on "items per page" and "current page"
export const get_current_page_data = () => {
  const filter_employee = get_filter_employees();
  const display_number = parse_option_number(
    display_numbers_box.querySelector(".current_option").textContent
  );
  const current_page = parse_option_number(
    pages_numbers_box.querySelector(".current_page").textContent
  );
  const start = (current_page - 1) * display_number;
  const end = current_page * display_number;
  selec_nav_btns_is_valid();
  return filter_employee.slice(start, end);
};

// switch between pages and re-render employees in the table
const translate_between_pages = (current_page) => {
  pages_numbers_box.querySelector(".current_page").textContent = current_page;
  renderEmployeeInTable(get_current_page_data(), tbody);
  selec_nav_btns_is_valid(current_page);
};

// convert option text (10, 20, 50+) to number
const parse_option_number = (text) => {
  const filter_eployees = get_filter_employees();
  const t = String(text).trim();
  return parseInt(t.replace(/\+/, `${filter_eployees % 10}`), 10) || 0;
};

// generate page numbers dynamically based on "items per page"
const create_number_of_pages = () => {
  pages_numbers_menu.innerHTML = ``; // reset
  pages_numbers_box.querySelector(".current_page").textContent = "1"; // reset to page 1
  const filter_employee = get_filter_employees();
  const current_option =
    display_numbers_box.querySelector(".current_option").textContent;
  const display_number = parse_option_number(current_option);
  number_of_pages = Math.ceil(filter_employee.length / display_number);

  // create span for each page number
  for (let i = number_of_pages; i >= 1; i--) {
    const span_number = document.createElement("span");
    span_number.textContent = i;
    pages_numbers_menu.appendChild(span_number);

    // click event -> go to that page
    span_number.addEventListener("click", () =>
      translate_between_pages(parse_option_number(span_number.textContent))
    );
  }

  // render employees of first page initially
  renderEmployeeInTable(get_current_page_data(), tbody);
};
create_number_of_pages(10); // init with 10 items/page

// =========================== Validate display options ==================

// mark each option as "valid" or "not_valid" based on employees count
const select_valid_numbers = () => {
  const filter_eployees = get_filter_employees();

  display_numbers_options.forEach((op) => {
    const option_number = parse_option_number(op.textContent);
    const valid = option_number <= Math.ceil(filter_eployees.length / 10) * 10;

    op.dataset.type = valid ? "valid" : "not_valid";
    op.classList.toggle("valid", valid);
    op.classList.toggle("not_valid", !valid);
  });
};
select_valid_numbers(); // run once

// ======================== Event listeners =======================

// handle click on "items per page" (10, 20, 50+)
const init_display_numbers_envent = () => {
  display_numbers_options.forEach((option) => {
    option.addEventListener("click", () => {
      const option_number = parse_option_number(option.textContent);
      if (option.dataset.type === `valid`) {
        display_numbers_box.querySelector(".current_option").textContent =
          option.textContent;
        create_number_of_pages(option_number);
      }
    });
  });
};

// ======================= Update total entries & refresh UI =========================
export const update_total_entries = () => {
  const filter_eployees = get_filter_employees();
  total_entries.textContent = filter_eployees.length; // show total
  display_numbers_box.querySelector(".current_option").textContent = 10; // reset items/page
  create_number_of_pages(10); // regenerate pages
  select_valid_numbers(); // re-validate options
  init_display_numbers_envent(); // rebind events
  renderEmployeeInTable(get_current_page_data(), tbody); // re-render
};
update_total_entries(); // init

// ================== Navigation buttons (next/prev) =============================
const nav_proccess = (procces) => {
  const current_page = parse_option_number(
    pages_numbers_box.querySelector(".current_page").textContent
  );
  if (procces == "next" && current_page < number_of_pages) {
    translate_between_pages(current_page + 1);
  } else if (procces == "prev" && current_page > 1) {
    translate_between_pages(current_page - 1);
  }
};

next_page.addEventListener("click", () => nav_proccess("next"));
prev_page.addEventListener("click", () => nav_proccess("prev"));

// ================== Toggle dropdown menus =============================
display_numbers_box.addEventListener("click", () =>
  toggle_menu(display_numbers_menu)
);
pages_numbers_box.addEventListener("click", () =>
  toggle_menu(pages_numbers_menu)
);
