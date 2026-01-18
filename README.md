# StaffM – Mini Employee Management System

**StaffM** is a mini Employee Management (HR) web application built using **pure HTML, CSS, and Vanilla JavaScript**, without any frontend frameworks or backend services.

The project focuses on demonstrating real-world **CRUD operations**, client-side state management using **LocalStorage**, and building a complete HR-style dashboard with dynamic behavior.

---

## Live Demo

[https://mini-employee-management-dashboard.netlify.app/]

---

## Project Overview

StaffM simulates a real HR Management Dashboard. Although it is a static frontend project, it behaves like a full system through JavaScript logic and browser storage.

The application includes:

- A main dashboard with statistics and charts
- Employee listing and management table
- Employee details page with editable data

All data operations (add, edit, update) are fully functional and persisted using **LocalStorage**.

---

## Features

### Fully Implemented

- Employee Dashboard
  - Total Present
  - Total Absent
  - Total On Leave

- Interactive charts (Team Performance & Employee Distribution)
- Employee Management Table
  - Pagination
  - Sorting
  - Filtering

- Add new employee
- Edit employee data
- Delete employee
- Persist all data using LocalStorage
- Employee Details Page
  - Tabs system implemented
  - General tab fully functional

- Fully working CRUD operations across the application
- Responsive UI across all pages

---

### Not Implemented Yet

The following tabs are **UI-ready but logic is not implemented yet**:

- Job tab
- Payroll tab
- Documents tab
- Settings tab

> Aside from these tabs, **all features and operations in the system are fully functional**.

---

### Partially Implemented / Planned

- Job tab (UI ready – logic planned)
- Payroll tab (UI ready – logic planned)
- Documents tab (UI ready – logic planned)
- Settings tab (UI ready – logic planned)
- Delete employee
- Advanced form validation

> All future features follow the same LocalStorage-based CRUD logic already implemented.

---

## Technologies Used

- **HTML5** – Semantic structure
- **CSS3** – Layout, Flexbox, Grid, Responsive Design
- **JavaScript (ES6+)** – Application logic
- **LocalStorage API** – Client-side data persistence
- **Chart.js** – Data visualization

---

## Data Management Logic

- Initial employee data is loaded once
- Data is stored in **LocalStorage** on first run
- All operations (add / edit) read and write directly from LocalStorage
- UI always reflects the latest stored state

This simulates backend-like behavior on the client side.

---

## Charts & Visualization

Charts are implemented using **Chart.js**, including:

- Line charts for team performance
- Doughnut charts for employee distribution

Charts are responsive and dynamically updated based on stored data.

---

## Project Purpose

This project was built to:

- Practice real-world JavaScript without frameworks
- Apply CRUD operations in a frontend-only environment
- Build a complete dashboard-style application
- Prepare for advanced frontend frameworks (React, Vue)

---

## Author

**Ahmed Komando**
Frontend Developer

---

## License

This project is created for **learning, practice, and portfolio purposes**.

---

> ⚠️ Note: This is a frontend-only project. No backend or database is used by design.
