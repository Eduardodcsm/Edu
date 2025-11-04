# Project Documentation

## Folder Structure

- `src/`
  - `components/`: Reusable UI components (e.g., `AddDoctorForm.tsx`, `DoctorList.tsx`).
  - `pages/`: Top-level components representing different views or pages of the application (e.g., `AdminPage.tsx`).
  - `styles/`: Global CSS files and styling configurations (e.g., `App.css`, `index.css`).
  - `constants/`: Files containing constant values, such as `specialties.ts` for dental specialties.
  - `types/`: TypeScript type definitions (e.g., `Doctor.ts`).
  - `App.tsx`: The main application component.
  - `main.tsx`: The entry point of the React application.

- `docs/`: Project documentation, including this README.

## Naming Conventions

- **Components:** PascalCase (e.g., `AdminPage`, `AddDoctorForm`).
- **Variables:** camelCase (e.g., `dentalSpecialties`, `doctorList`).
- **Types/Interfaces:** PascalCase (e.g., `Doctor`).
- **CSS Classes:** kebab-case (e.g., `app-container`).

## Navigation

- The application starts at `main.tsx`, which renders the `App` component.
- `App.tsx` currently renders the `AdminPage`.
- The `AdminPage` contains the `AddDoctorForm` and `DoctorList` components.

## Dental Specialties

The `src/constants/specialties.ts` file contains an array `dentalSpecialties` which lists the available specialties. This can be updated as needed.
