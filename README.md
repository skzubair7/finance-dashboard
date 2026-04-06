
#  ExpenseTracker - Interactive Finance Dashboard   Live Demo:

A simple and beginner-friendly finance dashboard built with **React**. Track user income, monitor expenses, and visualize user financial health in real-time.

---

##  Key Features

- **Dynamic Summary**: Automatically shows Total Balance, Income, and Expenses.
- **Charts**:  
  - **Doughnut Chart**: Shows spending by category.  
  - **Line Chart**: Shows net cash flow trends over time.
- **Role-Based Access**:  
  - **Viewer**: Read-only access.  
  - **Admin**: Add, Edit, and Delete transactions.
- **Smart Insights**: Highlights user highest Highest Spending Category,Monthly Income,Monthly Expense,Monthly Savings And Total Transactions
- **Fully Responsive**: Works well on Desktop, Tablet, and Mobile devices.

---

##  Tech Stack

- **Framework**: React.js  
- **Styling**: CSS3 (Flexbox, Grid, Media Queries etc)  
- **Charts**: Chart.js with react-chartjs-2  
- **State Management**: I Used useState  React Hook

---

##  Setup & Installation

1. **Clone the project**:

```bash
git clone [https://github.com/skzubair7/finance-dashboard.git]

Install dependencies:

Bash
npm install chart.js react-chartjs-2

Bash
npm start
View in browser at http://localhost:3000.

Screenshots

1. Main Dashboard View (Admin)
Displays the full interface with all charts and management controls.
![Admin Dashboard](./screenshots/desktop-admin-view.png)

2. Mobile Responsive Layout
Shows how the dashboard stacks and adjusts for smaller screens.
![Mobile View](./screenshots/mobile-responsive-view.png)

3. Role-Based Access Control
Comparison between the Admin view (with actions) and Viewer view (read-only).
![RBAC Demo](./screenshots/rbac-role-switch.png)

Documentation of Assumptions
To make the application more robust and user-friendly, I have made the following assumptions and technical choices:

Enhanced CRUD (The Delete Feature)
While the initial requirement focused on Adding/Editing, I have implemented a Delete Feature. In a real-world scenario, users need the ability to remove incorrect entries. The dashboard charts and summary cards update instantly when a record is deleted.