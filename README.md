# Flowly - Task Management Application

Flowly is a modern, responsive task management application built with React and Vite. It provides users with an intuitive Kanban-style interface to organize and track their tasks efficiently.

## Features

- **User Authentication**: Secure sign up and login system with user-specific data isolation
- **Kanban Board**: Drag-and-drop task management across To-Do, In Progress, and Completed columns
- **Task Management**: Create, edit, and delete tasks with priority levels
- **User-Specific Data**: Tasks are stored uniquely per user with email-based identification
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark/Light Theme**: Toggle between color schemes based on user preference
- **Statistics Dashboard**: Visual representation of task completion with charts
- **Custom Storage Service**: Abstracted data layer ready for backend integration

## Tech Stack

- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Framer Motion for animations, Heroicons for icons
- **Drag & Drop**: @hello-pangea/dnd library
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MIKOXO/Flowly
   ```

2. Navigate to the project directory:

   ```bash
   cd flowly
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Create an account or log in to access your personal task board
2. Add tasks using the "Add Task" button or modal
3. Organize tasks by dragging them between columns
4. Edit or delete tasks using the buttons on each task card
5. View statistics on the dashboard to track your progress

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   └── Board/          # Main board page
├── services/           # API and storage services
└── utils/              # Utility functions
```

## Customization

The application uses a custom storage service that can be easily extended to connect to a real backend API. The current implementation stores data in a simulated backend structure that persists in localStorage.

## Credits

Coded by [MIKOXO](https://github.com/MIKOXO)
