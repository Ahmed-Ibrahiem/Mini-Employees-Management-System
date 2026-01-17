import {
  employee_image_file,
  employee_image_name,
} from "./definationElements.js";

export let image_ulr;

employee_image_file.addEventListener("change", (e) => {
  const file = e.target.files[0];
  // display the image name in the input
  if (file) {
    employee_image_name.textContent = file.name;
    image_ulr = URL.createObjectURL(file);
  }
});
