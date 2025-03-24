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
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

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

## Deployment

The application is deployed using [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), or [GitHub Pages](https://pages.github.com/). Access the live site [here](<YOUR_LIVE_SITE_URL>).

## Screenshots

![Screenshot 1](path/to/screenshot1.png)
![Screenshot 2](path/to/screenshot2.png)

## Submission

Submit your project as a GitHub repository link with a detailed README on setup and running instructions. Include screenshots and a brief overview of the features implemented.

## License

This project is licensed under the MIT License.

---

Happy coding!