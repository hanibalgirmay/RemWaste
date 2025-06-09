# REM Waste

# Multi-Step Order Form with Stepper & Skip Selection

This project demonstrates a dynamic waste page redesign, primarily focusing on a skip hiring service. It features a visual stepper component, a selection interface for skip options, and a global overlay that provides summary information and navigation when a selection is made. State management is handled efficiently using Zustand.

## ✨ Features

* **Multi-Step Stepper:** Guides users through a defined sequence of steps for an order.
* **Visual Progress Indicator:** Clear indication of current, completed, and upcoming steps.
* **Clickable Steps:** Navigate to previous completed/active steps directly.
* **Dynamic Skip Selection:** Display and allow selection of various skip options with detailed information.
* **"Unavailable" Skip Handling:** Visually distinguish and disable selection for forbidden options.
* **Global Selected Item Overlay:** A sticky bottom overlay that appears when a skip is selected on the relevant step, showing summary and navigation buttons.
* **Centralized State Management:** Utilizes Zustand for predictable and scalable state.
* **Reusable Logic:** Custom React Hooks for formatting and business logic.
* **Responsive Design:** Adapts to various screen sizes using Tailwind CSS.

## 🚀 Technologies Used

* **vite**: A fast, opinionated build tool for modern web projects, used for development and bundling.
* **React.js**: A declarative, component-based JavaScript library for building user interfaces.
* **TypeScript**: A superset of JavaScript that adds static type definitions, enhancing code quality and maintainability.
* **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs without leaving your HTML.
* **Zustand**: A small, fast, and scalable bear-necessities state-management solution for React.
* **Lucide React**: A collection of beautiful, pixel-perfect icons for React projects.
* **clsx**: A tiny utility for constructing `className` strings conditionally.

## 📁 Project Structure

The project follows a modular structure to ensure maintainability and scalability:
```
├── public/                     # Static assets
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── navigation/         # Stepper components
│   │   │   ├── stepper-content.tsx
│   │   │   └── stepper-item.tsx
|   |   └── card/ 
│   │       |── skip-card.tsx        # Individual skip option card
│   │       └── skip-selection.tsx   # Container for skip options
│   ├── hooks/                  # Custom React Hooks for reusable logic
│   │   ├── useFormattedPrice.ts
│   │   └── useHirePeriodDisplay.ts
│   ├── layouts/                # General page layouts
│   │   └── main-layout.tsx
│   ├── stores/                 # Zustand stores for state management
│   │   ├── useSkipStore.ts
│   │   └── useStepperStore.ts
│   ├── types/                  # TypeScript type definitions
│   │   ├── skip.ts
│   │   └── stepper.ts
│   ├── App.tsx                 # Main application component
│   ├── index.css               # Global Tailwind CSS imports
│   └── main.tsx                # Entry point for React application
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration for Tailwind
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```
## 🛠️ How to Run

Follow these steps to get the project up and running on your local machine:

1.  **Clone the Repository:**
    ```bash
    git clone git@github.com:hanibalgirmay/RemWaste.git
    cd RemWaste
    ```

2.  **Install Dependencies:**
    Using pnpm:
    ```bash
    pnpm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

3.  **Start the Development Server:**
    Using pnpm:
    ```bash
    pnpm dev
    ```
    Or using Yarn:
    ```bash
    yarn dev
    ```

    The application should now be running in your browser, typically at `http://localhost:5173`.

## 💡 Key Approaches & Architectural Decisions

* **Component-Based Architecture:** The UI is broken down into small, reusable components, promoting modularity and easier maintenance.
* **Zustand for Global State:**
    * Separate stores (`useStepperStore`, `useSkipStore`) are created for different domains of application state.
    * This provides a clear and efficient way to manage `currentStepIndex`, `completedSteps`, `selectedSkipId`, and other global states, allowing components to subscribe only to the parts of the state they need.
* **Custom Hooks for Logic Reusability:**
    * Logic for calculating and formatting prices (`useFormattedPrice`) and hire periods (`useHirePeriodDisplay`) is extracted into custom hooks.
    * This keeps components lean, makes logic reusable across different components, and improves testability.
* **Single Source of Truth for Data:** Mock data for skips and stepper forms is loaded once in `App.tsx` and then distributed to the respective Zustand stores, simulating an API fetch.
* **Responsive Styling with Tailwind CSS:** Utility classes are used directly in JSX to build responsive layouts and apply styles conditionally based on screen size (`md:`, `sm:` prefixes).
* **Type Safety with TypeScript:** All components, hooks, and stores are strongly typed, reducing runtime errors and improving developer experience with auto-completion and compile-time checks.
* **Global Overlay for User Feedback:** The selected skip card's summary information is presented in a global, sticky overlay at the bottom. This ensures crucial information and navigation options are always accessible on the relevant step, regardless of scroll position. This centralizes the overlay logic in `App.tsx` rather than repeating it per `SkipCard`.

---