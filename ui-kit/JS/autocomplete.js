// ===================== DOM ELEMENTS =====================
const autocomplete_selector = document.getElementById("autocomplete_selector"); // Main wrapper
const autocomplete_input = document.getElementById("autocomplete_input"); // Input field
const suggestions_menu = document.getElementById("suggestions"); // Suggestions dropdown container

// ===================== AUTOCOMPLETE OPTIONS =====================
const autocomplete_options = [
  "Primary School Teacher",
  "Elementary School Teacher",
  "Middle School Teacher",
  "Secondary School Teacher",
  "Computer Teacher",
  "ICT Teacher",
  "Teaching Assistant",
  "Academic Supervisor",
  "Curriculum Coordinator",
  "School Administrator",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Web Developer",
  "Software Engineer",
  "UI/UX Designer",
  "QA Engineer",
  "IT Support Specialist",
  "System Administrator",
  "Network Administrator",
  "HR Specialist",
  "HR Manager",
  "Administrative Assistant",
  "Office Manager",
  "Operations Officer",
  "Recruitment Specialist",
  "Payroll Officer",
  "Personnel Coordinator",
  "Team Leader",
  "Supervisor",
  "Department Manager",
  "Project Manager",
  "Product Manager",
  "Operations Manager",
  "Program Manager",
  "Business Analyst",
  "Data Analyst",
  "Customer Support Specialist",
  "Customer Service Representative",
  "Sales Executive",
  "Marketing Specialist",
  "Content Creator",
  "Intern",
  "Trainee",
  "Junior Employee",
  "Junior Developer",
  "Graduate Trainee",
  "Employee",
  "Staff Member",
  "Assistant",
  "Specialist",
];

// ===================== STATE =====================
let current_suggestions = []; // Store currently filtered suggestions

// ===================== UTILITY FUNCTIONS =====================
const close_suggestions_menu = () => {
  suggestions_menu.hidden = true;
};

const open_suggestions_menu = () => {
  suggestions_menu.hidden = false;
};

// Filter suggestions based on input
const get_suggestion = (autocomplete_options, word) => {
  if (!word) return [...autocomplete_options]; // If input empty, show all options
  return autocomplete_options.filter((option) =>
    option.toLowerCase().includes(word.toLowerCase())
  );
};

// ===================== RENDER SUGGESTIONS =====================
const render_suggestions = (arr = []) => {
  suggestions_menu.innerHTML = "";

  if (arr.length === 0) {
    const p = document.createElement("p");
    p.textContent = "------ No Result ------";
    suggestions_menu.appendChild(p);
  } else {
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

    arr.forEach((ele) => {
      const span = document.createElement("span");
      span.textContent = ele;
      fragment.appendChild(span);
    });

    suggestions_menu.appendChild(fragment);
  }

  open_suggestions_menu();
};

// ===================== EVENT DELEGATION =====================
// Using event delegation instead of attaching listeners to each suggestion
suggestions_menu.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    autocomplete_input.value = e.target.textContent;
    current_suggestions = get_suggestion( autocomplete_options ,  e.target.textContent);
    render_suggestions(current_suggestions);
  }
});

// ===================== INPUT EVENT HANDLER WITH DEBOUNCE =====================
let debounce_timer;
autocomplete_input.addEventListener("input", (e) => {
  clearTimeout(debounce_timer); // Clear previous timer
  debounce_timer = setTimeout(() => {
    current_suggestions = get_suggestion(autocomplete_options ,  e.target.value);
    render_suggestions(current_suggestions);
  }, 200); // Wait 200ms after typing stops
});

// ===================== CLOSE DROPDOWN WHEN CLICK OUTSIDE =====================
document.addEventListener("click", (e) => {
  if (!autocomplete_selector.contains(e.target)) {
    close_suggestions_menu();
  }
});
