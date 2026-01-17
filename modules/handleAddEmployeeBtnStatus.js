// Create function to handle add_employee status
export const handleAddEmployeeBtnStatus = (add_employee_btn, all_checkbox) => {
  add_employee_btn.classList.remove("delete_status");
  add_employee_btn.classList.add("add_status");

  // Get All Checkbox has been checked
  const checkboxsHasBeenChecked = [
    ...all_checkbox.filter((checkbox) => checkbox.checked == true),
  ];

  // if there are any checkbox has been checked so change the state of add_employee btn to delete_employe and it content
  if (checkboxsHasBeenChecked.length > 0) {
    add_employee_btn.classList.add("delete_status");
    add_employee_btn.classList.remove("add_status");
    add_employee_btn.innerHTML = `
        <i class="fa-solid fa-trash"></i>
        <span>Delete</span>
    `;
  }
  // Return add_employee btn to defualt status
  else {
    add_employee_btn.innerHTML = `
          <i class="fa-solid fa-plus"></i>
          <span>add new employee</span>
      `;
  }
};

export const defualt_add_new_employee_btn = (
  add_employee_btn,
  defualt_status,
  removed_status
) => {
  add_employee_btn.classList.add(defualt_status);
  add_employee_btn.classList.remove(removed_status);
  add_employee_btn.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            <span>add new employee</span>
        `;
};
