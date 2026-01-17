import { Person } from "../js/main.js";

// Format a given date string into "MMM DD, YYYY"
const handle_date = (date_string) => {
  const date = new Date(date_string);
  const date_options = { year: "numeric", month: "short", day: "numeric" };

  const formatted = date.toLocaleDateString("en-US", date_options);
  return formatted;
};
export default handle_date;

export const handle_format_date_in_input = (date_string) => {
  const date = new Date(date_string);

  if (isNaN(date)) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Save employees array into localStorage
export const updateLocalStorage = (arr) => {
  localStorage.actual_employees = JSON.stringify(arr);
};

// Show a menu (set hidden = false)
export const open_menu = (menu) => {
  menu.hidden = false;
};

// Hide a menu (set hidden = true)
export const close_menu = (menu) => {
  menu.hidden = true;
};

// Toggle menu visibility (open if closed, close if open)
export const toggle_menu = (menu) => {
  if (menu.hidden) open_menu(menu);
  else close_menu(menu);
};

// Handle all checkboxes in a table based on master checkbox state
export const handleCheckBoxInTable = (master_btn, all_checkbox) => {
  all_checkbox.map((checkbox) => {
    checkbox.checked = master_btn.checked;
  });
};

// Fetch employees data from employees.json file
export async function getData(URL) {
  let there_loading = false;
  let there_error = false;
  try {
    there_loading = true;
    const req = await fetch(URL);
    if (req.status === 200) {
      there_loading = false;
      const res = await req.json();
      const data = await res;
      return data;
    } else {
      there_error = true;
      console.log("Fail");
    }
  } catch {
    there_error = true;
    throw Error("Something Went Wrong In Server");
  } finally {
    there_loading = false;
  }
}

// Delete employees by their IDs
export const deleteEmployee = (arr) => {
  // Filter employees whose IDs are included in arr
  const all_employees = Person.all_employees.filter((data) =>
    arr.includes(Number.parseInt(data.id)),
  );

  // Call delete method for each employee and update localStorage
  all_employees.map((emp) => {
    emp.deleteEmployee();
    updateLocalStorage(Person.all_employees);
  });
};

// Create new Person objects from given array of employee data
export const createEmployeeObjects = (arr_of_data) => {
  // Iterate over each data object and create a new Person instance
  arr_of_data.forEach((empData) => {
    const employee = new Person(empData);
  });
};

// Format date to DD/MM/YYYY
export const format_date = (date) => {
  const new_date = new Date(date);
  return new_date.toLocaleDateString("en-GB");
};

// Format time to 12-hour format with AM/PM

export const fromat_time = (time) => {
  let [hours, minutes] = time.split(":");
  hours = hours % 12 || 12;
  const period = hours >= 12 ? "PM" : "AM";

  return `${hours.toString().padStart(2, "0")}:${minutes} ${period}`;
};
