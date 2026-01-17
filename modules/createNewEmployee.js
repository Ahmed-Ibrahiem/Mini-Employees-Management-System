import { Person } from "../js/main.js";
import { updateLocalStorage } from "./Utilies.js";
import filter from "./filter.js";

const createNewEmployee = (data = {}) => {
  const newEmployee = new Person(data);

  // Update Employee Table
  filter();

  // Update Local Storage
  updateLocalStorage(Person.all_employees);
};

export default createNewEmployee;
