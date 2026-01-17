export class Person {
  static all_employees = [];
  constructor(data) {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.profile_image = data.profile_image;
    this.contact_number = data.contact_number;
    this.status = data.status;
    this.email = data.email;
    this.location = data.location;
    this.job_title = data.job_title;
    this.category = data.category;
    this.birthday = data.birthday;
    this.type = data.type;
    this.team_leader = data.team_leader;
    this.role = data.role;
    this.productive = data.productive;
    this.joining_date = data.joining_date;
    this.salary = data.salary;
    this.work_type = data.work_type;
    this.zip_code = data.zip_code;
    this.bank_information = data.bank_information;
    this.education = data.education;
    this.known_languages = data.known_languages;
    this.gender = data.gender;
    this.nationality = data.nationality;
    Person.all_employees = [...Person.all_employees, this];
  }

  getFullName = () => {
    return `${this.first_name} ${this.last_name}`;
  };

  deleteEmployee = () => {
    const index = Person.all_employees.findIndex((emp) => emp.id === this.id);
    if (index !== -1) {
      Person.all_employees.splice(index, 1);
    }
  };

  static checkTheValidPhone = (contact_number) => {
    const all_contact_numbers = Person.all_employees.map(
      (em) => em.contact_number
    );
    if (all_contact_numbers.includes(contact_number))
      return {
        isValid: false,
        message: `This phone is already exist`,
      };

    if (contact_number.length !== 11) {
      return {
        isValid: false,
        message: `It is supposed to consist of 11 numbers`,
      };
    } else if (contact_number.length === 11) {
      return {
        isValid: true,
        message: `The phone number is valid`,
      };
    }
  };

  static checkValidEmail = (emial_to_be_verfiy) => {
    const all_emails = Person.all_employees.map((emp) => emp.email);
    if (all_emails.includes(emial_to_be_verfiy)) {
      return { isValid: false, message: "The emial already exist" };
    } else if (emial_to_be_verfiy.slice(-10) !== "@gmail.com") {
      return { isValid: false, message: "The emial is not valid" };
    } else {
      return { isValid: true, message: "Email is valid" };
    }
  };

  static checkValidZipCode = (zip_code) => {
    const all_zip_code = this.all_employees.map((emp) => emp.zip_code);
    if (zip_code.trim() == "")
      return { isValid: false, message: "The zip Code Is Required" };
    if (all_zip_code.includes(zip_code)) {
      return { isValid: false, message: "The zip Code already exist" };
    } else {
      return { isValid: true, message: "The Zip Code Is Valid" };
    }
  };

  static checkvalidProductive = (productive) => {
    if (productive >= 0 && productive <= 100) {
      return { isValid: true, message: "The productive Is Valid" };
    } else {
      return {
        isValid: false,
        message: "The productive must be between 0 and 100",
      };
    }
  };

  static checkValidId = (id) => {
    const all_emp_id = this.all_employees.map((emp) => emp.id);
    if (all_emp_id.includes(id)) {
      return { isValid: false, message: "The ID already exist" };
    } else {
      return { isValid: true, message: "The ID Is Valid" };
    }
  };
}

window.addEventListener("load", () => {
  window.scrollTo({
    top: 0,
    left: 0,
  });
});
