# Hospital Management System - React Frontend

This is a **React.js** web application for managing hospital operations, including patient appointments, billing, and more. The application is designed to work alongside a backend application, which provides the API endpoints for data management and communication. 

---

## 🚀 Features

- **Responsive Design**: Built with [React](https://reactjs.org/), [Material-UI](https://mui.com/), and [Bootstrap](https://getbootstrap.com/) for a user-friendly interface.
- **Routing**: Smooth navigation using [React Router](https://reactrouter.com/).
- **Data Visualization**: Integrated with [Chart.js](https://www.chartjs.org/) for visualizing data.
- **State Management**: Leveraging React's built-in hooks.
- **Secure Communication**: Uses [Axios](https://axios-http.com/) for API requests.
- **Data Table Management**: Supports data grids using Material-UI's `@mui/x-data-grid`.

---

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (v16 or later)
- **Backend Application**: Ensure the backend for the hospital management system is running before starting this application.

### Clone the Repository

```bash
git clone <repository-url>
cd js-project-hms
```

### Install Dependencies
```
npm install
```

### Start the Development Server
```
npm run dev
```

The application will be available at ```http://localhost:5173```

### 🔧 Build for Production
To build the app for production, run:
```
npm run build
```

The build artifacts will be available in the ```dist``` directory. Use a static file server like serve or deploy to a hosting provider.

## 🧰 Running the Backend
This application depends on a separate backend for API services. Ensure the backend application is running and properly configured. Update the base URL for the API in the application's Axios configuration or ```.env``` file.

Example of ```.env``` file configuration:

```
VITE_API_BASE_URL=http://localhost:3030/api
```

## 🛠 Development Tools

* Linting: Run ```npm run lint``` to lint the codebase.
* Preview: Run ```npm run preview``` to serve the production build locally.

## 📂 Project Structure

```
src/
├── _services         # API service calls (e.g., Axios)
├── assets            # Assets included in the app
├── components/       # Reusable React components
├── layout            # Application UI Layouts
├── route             # Routes
├── utils             # Helper Functions
├── views/            # Route-specific pages
└── App.jsx           # Root component
```


## 📦 Dependencies Overview

* UI Frameworks: ```@mui/material, bootstrap```
* Icons: ```@mui/icons-material, react-icons```
* HTTP Requests: ```axios```
* Data Visualization: ```chart.js```
* Data Grid: ```@mui/x-data-grid```

For a complete list of dependencies, refer to the ```package.json``` file.


## 💻 Contributions
Feel free to fork the repository and submit pull requests for new features, bug fixes, or improvements. Ensure to ```run npm run``` lint before submitting any code.