import { createEmployeeCard } from "./createEmployeeCard.js";

export const render_employees_card = (arr) => {
  // render employees card in browser
  arr.forEach((emp) => {
    const employee_card = createEmployeeCard(emp);
    document.querySelector(".cards_container").appendChild(employee_card);
  });
};
