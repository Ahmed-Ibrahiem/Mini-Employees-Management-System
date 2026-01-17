// Main container that holds all toast messages
const toast_message_container = document.querySelector(".toast_message");

// Counter to give each message a unique index/class
let message_count = 0;

// Flag to track whether there are active toast messages
export let is_there_message = false;

// Show toast message with a small delay (for animation)
const show_message = (message) => {
  setTimeout(() => message.classList.add("active"), 100);
};

// Toggle container state depending on whether messages exist
export const show_hide_toast_contianer = () => {
  console.log(is_there_message);

  if (is_there_message) {
    // Apply class when at least one message exists
    toast_message_container.classList.add("there_message");
  } else {
    // Remove class when no messages exist
    toast_message_container.classList.remove("there_message");
  }
};

// Remove message element completely from DOM after a delay
const remove_message = (message) => {
  setTimeout(() => {
    message.remove();
  }, 3000);
};

// Add hide animation class before removing the message
const hide_message = (element) => {
  setTimeout(() => {
    element.classList.add("hide");
  }, 2500);
};

// Create a single toast message element dynamically
const create_message_element = (index, message) => {
  // Main message wrapper
  const div = document.createElement("div");
  div.classList.add("message");
  div.classList.add(`index${index}`);

  // Icon container
  const icons_box = document.createElement("div");
  const i = document.createElement("i");
  i.classList.add("fa-solid", "fa-check");
  icons_box.appendChild(i);

  // Message text
  const h1 = document.createElement("h1");
  h1.classList.add("message_text");
  h1.textContent = message;

  // Progress bar element
  const span = document.createElement("span");
  span.classList.add("progress");

  // Append all elements to message container
  div.appendChild(icons_box);
  div.appendChild(h1);
  div.appendChild(span);

  return div;
};

// Show a new toast message
export const show_toast_message = (message = "Language Added") => {
  // Mark that there is at least one message
  is_there_message = true;
  show_hide_toast_contianer();

  // Create message element
  const message_element = create_message_element(message_count, message);

  // Append message to container
  toast_message_container.appendChild(message_element);

  // Trigger show animation
  show_message(message_element);

  // Trigger hide animation before removal
  hide_message(message_element);

  // Remove message from DOM
  remove_message(message_element);

  // Increment message index
  message_count += 1;
};
