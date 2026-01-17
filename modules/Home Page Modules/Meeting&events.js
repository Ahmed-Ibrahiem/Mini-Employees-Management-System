import { format_date, fromat_time } from "../Utilies.js";

// ===================== DOM ELEMENTS =====================
const event_form_popup = document.getElementById("event_form_popup");
const cancel_adding_event_btn = document.getElementById("cancel_add_event");
const open_event_form_popup = document.getElementById("open_event_form_popup");
const events_body = document.getElementById("events_body");

// ===================== EVENTS STORAGE =====================
let all_events;

// Load events data from localStorage if exists
if (localStorage.events_meeting !== undefined) {
  all_events = JSON.parse(localStorage.events_meeting);
} else {
  // Initialize empty events array if not found
  all_events = [];
  localStorage.events_meeting = JSON.stringify(all_events);
}

// Persist events to localStorage
const update_events_in_storage = () => {
  localStorage.events_meeting = JSON.stringify(all_events);
};

// ===================== FETCH EVENTS FROM JSON =====================
const get_all_events_meeting = async () => {
  const url = "meeting&events.json";
  try {
    const req = await fetch(url).then((result) => result.json());
    render_events_UI(req);
    return req;
  } catch (err) {
    throw new Error("Something went wrong while fetching events");
  }
};

// ===================== DATE & TIME HELPERS =====================

// ===================== RENDER EVENTS UI =====================
const render_events_UI = async (event_list) => {
  // Clear existing events
  events_body.innerHTML = ``;

  // Render each event box
  event_list.forEach((event) => {
    const event_box = `
      <div class="box" data-id="${event.id}">
        <div class="left">
          <div class="icon">
            <i class="fa-solid fa-calendar-days"></i>
          </div>
          <div class="text">
            <p>${event.title}</p>
            <span>${event.type}</span>
          </div>
        </div>
        <div class="right">
          <p>${event.time}</p>
          <span>${event.date}</span>
        </div>
      </div>
    `;

    events_body.innerHTML += event_box;
  });

  // Display empty state when no events exist
  if (event_list.length === 0) {
    const div = document.createElement("div");
    div.classList.add("no_events");

    const span = document.createElement("span");
    span.textContent = "There is no meeting or event";

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-box");

    div.appendChild(span);
    div.appendChild(icon);
    events_body.appendChild(div);
  }
};

// Initial render from localStorage
render_events_UI(all_events);

// ===================== EVENT FORM POPUP CONTROLS =====================
const close_event_popup = () => {
  event_form_popup.classList.remove("open_popup");
};

const open_event_popup = () => {
  event_form_popup.classList.add("open_popup");
};

// Close popup and reset form on cancel
cancel_adding_event_btn.addEventListener("click", () => {
  close_event_popup();
  return_inputs_to_defualt_value();
});

// Open popup on add button click
open_event_form_popup.addEventListener("click", open_event_popup);

// ===================== EVENT TYPE SELECT =====================
const current_event_type = document.getElementById("type_event_option");
const type_event_options = document.querySelectorAll(
  ".event_form .field .select .options span"
);

// Update selected event type
type_event_options.forEach((option) =>
  option.addEventListener("click", () => {
    current_event_type.textContent = option.textContent;
  })
);

// ===================== CRUD EVENTS =====================
const add_event_button = document.getElementById("add_event_button");
const date_input = document.getElementById("date_input");
const time_input = document.getElementById("time_input");
const title_input = document.getElementById("title_input");
const desc_input = document.getElementById("desc_input");
const type_event_option = document.getElementById("type_event_option");

const all_inputs = [date_input, time_input, title_input, desc_input];
let empty_inputs = [];

// Validate event form inputs
const validation_event_form = () => {
  add_event_button.classList.remove("allow_to_add");
  empty_inputs = [];

  all_inputs.forEach((input) => {
    if (input.value.trim() === "") empty_inputs.push(input);
  });

  if (empty_inputs.length === 0) {
    add_event_button.classList.add("allow_to_add");
  }
};

// Highlight invalid inputs
const show_validation_ui = (input) => {
  if (input.value.trim() === "") {
    input.classList.add("not_valid");
  } else {
    input.classList.remove("not_valid");
  }
};

// Add new event to storage and UI
const add_new_event = () => {
  console.log(format_date(date_input.value));
  const event_data = {
    id: all_events.length,
    title: title_input.value,
    type: type_event_option.textContent,
    date: format_date(date_input.value),
    time: fromat_time(time_input.value),
    description: desc_input.value,
  };

  all_events.push(event_data);
  update_events_in_storage();
  render_events_UI(all_events);
};

// Reset form inputs to default values
const return_inputs_to_defualt_value = () => {
  all_inputs.forEach((input) => (input.value = ""));
  validation_event_form();
  all_inputs.forEach((input) => input.classList.remove("not_valid"));
};

// Attach validation on input change
all_inputs.forEach((input) => {
  input.addEventListener("change", () => {
    validation_event_form();
    show_validation_ui(input);
  });
});

// Handle add event button click
const adjust_add_event_button = () => {
  if (empty_inputs.length === 0) {
    add_new_event();
    close_event_popup();
    return_inputs_to_defualt_value();
  } else {
    empty_inputs.forEach((input) => input.classList.add("not_valid"));
  }
};

add_event_button.addEventListener("click", adjust_add_event_button);
