import { Person } from "../../js/main.js";
import { format_date } from "../Utilies.js";

const birthday_container_body = document.querySelector(
  ".home-content-area .birthday .birthday_content"
);
const birthday_options = document.querySelectorAll(
  ".birthday .head .select .options span"
);
const current_birthday_option = document.querySelector(
  ".birthday .head .select .current_option"
);

const render_employee_birthday = (data_list = []) => {
  birthday_container_body.innerHTML = ``;
  data_list.forEach((data) => {
    const html = `
        <div class="box">
            <div class="left">
                <div class="img_box">
                <img src="${data.profile_image}" alt="" />
                </div>
                <div class="text">
                <p>${data.getFullName()}</p>
                <span>${data.job_title}</span>
                </div>
            </div>
            <div class="date">${format_date(data.birthday)}</div>
        </div>
        `;

    birthday_container_body.innerHTML += html;
  });
};

const filter_birthday = (employee_data = []) => {
  let final_date = [];
  const current_month = new Date().getMonth() + 1;

  employee_data.forEach((data) => {
    const emp_date = new Date(data.birthday).getMonth() + 1;

    if (current_birthday_option.textContent.toLowerCase() == "this month") {
      if (emp_date == current_month) {
        final_date.push(data);
      }
    }
  });

  if (current_birthday_option.textContent.toLowerCase() == "this year") {
    final_date = employee_data;
  }

  render_employee_birthday(final_date);
};

filter_birthday(Person.all_employees);

// ============================= upate birthday option ========================

birthday_options.forEach((option) => {
  option.addEventListener("click", () => {
    current_birthday_option.textContent = option.textContent;
    filter_birthday(Person.all_employees);
  });
});
