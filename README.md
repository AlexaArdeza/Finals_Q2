# Finals_Q2 - Todo App (Frontend)

A React + TypeScript frontend for the Todo Management System, integrating all core architectural patterns.

## Features
- **Global Operation Management**: Atomic CRUD operations synchronized via `TodoContext`.
- **High-Pressure Logic (Challenge A)**: Maximum 5 active tasks constraint with sequential (FIFO) enforcement.
- **Shadow Archive (Challenge A)**: Completed tasks are archived (deleted) 15 seconds after toggling.
- **Integrity Monitoring (Challenge B)**: Real-time verification of the data chain with visual "REDACTED" alerts.
- **Dynamic Theming**: Consumer of shared ThemeContext for visual consistency.

## Technical Debt Remediation
- **Fixed Filter Logic**: Replaced title-based filtering with unique ID-based filtering.
- **Fixed Immuted Updates**: Replaced `filter` with `map` for state updates to ensure data integrity.
- **Correct Reconciliation**: Replaced index-based keys with persistent unique IDs (`todo.id`) in the list renderer.

## Setup Instructions
1. Install dependencies: `npm install`
2. Ensure the backend (Finals_Q1) is running on port 5000.
3. Run the frontend: `npm run dev`
