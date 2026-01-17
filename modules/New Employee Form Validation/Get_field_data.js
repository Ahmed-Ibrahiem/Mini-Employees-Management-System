import { Person } from "../../js/main.js";
import handle_date, { handle_format_date_in_input } from "../Utilies.js";

const f_name = document.getElementById("f_name");
const l_name = document.getElementById("l_name");
const contact_number = document.getElementById("contact_number");
const emial_address = document.getElementById("emial_address");
const date_birth = document.getElementById("date_birth");
const employee_image = document.getElementById("employee_image");
const gender_field = document.getElementById("gender_field");
const type_field = document.getElementById("type_field");
const salary = document.getElementById("salary");
const nationality = document.getElementById("nationality");
const city = document.getElementById("city");
const governorate = document.getElementById("governorate");
const zip_code = document.getElementById("zip_code");
const jop_title_field = document.getElementById("jop_title_field");
const joining_date = document.getElementById("joining_date");
const emp_status_field = document.getElementById("emp_status_field");
const productive = document.getElementById("productive");
const work_type_field = document.getElementById("work_type_field");
const team_leader_field = document.getElementById("team_leader_field");
const known_language_field = document.getElementById("known_language_field");
const writing_level = document.getElementById("writing_level");
const speaking_level = document.getElementById("speaking_level");
const understanding_level = document.getElementById("understanding_level");
const educational_field = document.querySelector(".educational_field");
const start_educational_date = document.getElementById("start_duration");
const end_educational_date = document.getElementById("end_duration");
const bank_name = document.getElementById("bank_name");
const account_number = document.getElementById("account_number");
const ifsc_code = document.getElementById("ifsc_code");
const pan_number = document.getElementById("pan_number");

const handle_location_data = () => {
  const location = {
    address: "Unknonw Yet",
    city: city.value || "Unknown Yet",
    country: "Unknown Yet",
    governorate: governorate.value || "Unknown Yet",
    state: "Unknown Yet",
  };

  return location;
};

const handle_known_language_data = () => {
  const known_language = {
    language: known_language_field.textContent || "English",
    skills: {
      speaking: speaking_level.textContent || "Unknown Yet",
      understanding: understanding_level.textContent || "Unknown Yet",
      writing: writing_level.textContent || "Unknown Yet",
    },
  };

  return known_language;
};

const handle_bank_information = () => {
  const bank_information = {
    account_number: account_number.value || "Unknown Yet",
    bank_name: bank_name.value || "Unknown Yet",
    ifsc_code: ifsc_code.value || "Unknown Yet",
    pan_number: pan_number.value || "Unknown Yet",
  };
  return bank_information;
};

const handle_educational_data = () => {
  const start_date = new Date(start_educational_date.value);
  const end_date = new Date(end_educational_date.value);

  if (isNaN(start_date.getTime()) || isNaN(end_date.getTime())) {
    return {
      duration: "Unknown Yet",
      experience: "Unknown Yet",
      title: educational_field.value || "Unknown Yet",
    };
  }

  let yearsDiff = end_date.getFullYear() - start_date.getFullYear();
  let monthsDiff = end_date.getMonth() - start_date.getMonth();

  let totalMonths = yearsDiff * 12 + monthsDiff;

  if (end_date.getDate() < start_date.getDate()) {
    totalMonths--;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const experience = `${years}y ${months}m`;
  console.log(experience);

  return {
    duration: `${start_educational_date.value} - ${end_educational_date.value}`,
    experience,
    title: educational_field.value || "Unknown Yet",
  };
};

end_educational_date.addEventListener("input", () => handle_educational_data());

const handle_team_leader_data = async () => {
  const req = await fetch("team_leaders.json");
  const res = await req.json();

  const team_leader = res.find(
    (team_leader) => team_leader.id == team_leader_field.dataset.id
  );

  return {
    id: team_leader.id,
    image: team_leader.profile_image,
    name: `${team_leader.first_name} ${team_leader.last_name.slice(0, 1)}.`,
  };
};

export const get_emp_data = async () => {
  const data = {
    bank_information: handle_bank_information(),
    birthday: handle_date(date_birth.value),
    category: jop_title_field.textContent || "Unknown Yet",
    contact_number: contact_number.value || "Unknown Yet",
    education: [handle_educational_data()],
    email: emial_address.value || "Unknown Yet",
    first_name: f_name.value || "Unknown Yet",
    gender: gender_field.textContent || "Unknown Yet",
    id: Person.all_employees.length + 1,
    job_title: jop_title_field.textContent || "Unknown Yet",
    joining_date: handle_format_date_in_input(joining_date.value),
    known_languages: [handle_known_language_data()],
    last_name: l_name.value || "Unknown Yet",
    location: handle_location_data(),
    nationality: nationality.value || "Unknown Yet",
    productive:
      isNaN(productive.value) || +productive.value > 100 ? 0 : productive.value,
    profile_image: "users/Unknown_person.jpg",
    role: jop_title_field.textContent || "Unknown Yet",
    salary: salary.value || 0,
    status: emp_status_field.textContent || "Unknown Yet",
    team_leader: await handle_team_leader_data().then((data) => data),
    type: type_field.textContent || "Unknown Yet",
    work_type: work_type_field.textContent || "Unknown Yet",
    zip_code: zip_code.value || "Unknown Yet",
  };

  return data;
};
