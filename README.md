# Advanced React To-Do Application with API Integration

## Overview

This project is an advanced To-Do application built with React, TypeScript, and Redux. It integrates external API data, implements advanced state management, and ensures responsiveness across different devices.

## Features

- **Task Management**: Add, view, and delete tasks with priority settings (High, Medium, Low).
- **API Integration**: Display relevant data (e.g., weather conditions) for tasks using a public API.
- **User Authentication**: Simulated login/logout functionality with Redux.
- **Persistent Storage**: Save tasks and authentication status using local storage.
- **Responsive Design**: Mobile-first design approach using CSS Grid and Flexbox.

## Technologies Used

- Vite
- TypeScript
- React
- Redux (Thunk/Saga)
- Tailwind CSS
- shadcn-ui

## Getting Started

Follow these steps to set up and run the project:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/Sagargupta028/Advance-to-do.git

# Step 2: Navigate to the project directory.
cd Advance-to-do

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Project Structure

```
src/
├── App.tsx
├── index.css
├── main.tsx
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── layout/
│   │   └── Layout.tsx
│   ├── tasks/
│   │   ├── TaskInput.tsx
│   │   └── TaskList.tsx
│   └── ui/
├── hooks/
│   ├── redux.ts
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── store/
│   ├── authSlice.ts
│   ├── index.ts
│   └── taskSlice.ts
└── utils/
    └── api.ts
```


## Screenshots
![Screenshot 1]
![Screenshot 2025-03-24 165705](https://github.com/user-attachments/assets/4b2ab440-f351-47d6-831a-8cb40395c023)

![Screenshot 2]
![Screenshot 2025-03-24 165622](https://github.com/user-attachments/assets/93e0dfe1-9e3c-4832-a107-0bfb97e2c834)

Happy coding!
