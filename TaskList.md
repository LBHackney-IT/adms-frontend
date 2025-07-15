# Development Tasks for: ADMS Frontend

### Notes
*   Unit tests should be created for all business logic and components, placed alongside the code files they are testing.
*   All new and modified code must have a minimum of **20% unit test coverage**.
*   All new components should follow the existing style guide and be built using `Radix` components.
*   The frontend is responsible for converting user-uploaded CSV files into a JSON array before sending them to the backend API.

## Tasks
- [ ] **1.0 Project Setup & Configuration**
    - [X] 1.1 Initialize a new Next.js project (`npx create-next-app@latest`) with TypeScript and Tailwind CSS.
    - [X] 1.2 Set up `shadcn/ui` by running the `init` command and configuring it according to the documentation.
    - [ ] 1.3 Install necessary libraries for CSV parsing (`papaparse`) and API calls (use the built-in `fetch`).
    - [X] 1.4 Create a foundational project structure: `app/`, `components/`, `lib/` (for API calls and utilities), `hooks/`.
    - [ ] 1.5 Write a basic test to ensure the testing framework (e.g., Jest/Vitest) is configured correctly.

- [ ] **2.0 User Authentication & Core Layout (FR7)**
    - [ ] 2.1 Create a main application layout component (`components/layout/AppLayout.tsx`) that includes a persistent sidebar for navigation and a header.
    - [ ] 2.2 Implement user authentication logic. This includes creating a login page and handling user sessions (e.g., using NextAuth.js or a similar solution).
    - [ ] 2.3 Create a higher-order component or use middleware to protect routes, ensuring only authenticated "apprenticeship team members" can access data pages.
    - [ ] 2.4 Implement logic to handle and display login errors (e.g., "Invalid credentials").
    - [ ] 2.5 Write unit tests for the authentication logic, covering successful login and error states.

- [ ] **3.0 Apprentice Data Management (US1, US2, US5, FR3, FR5)**
    - [ ] 3.1 Create a reusable data table component (`components/ui/DataTable.tsx`) using `shadcn/ui`'s table components.
    - [ ] 3.2 Develop the "Apprentices" page (`app/apprentices/page.tsx`) to fetch and display apprentice records using the data table.
    - [ ] 3.3 Add filtering controls to the Apprentices page for "Status", "Date", and "Program".
    - [ ] 3.4 Create a form component (`components/forms/ApprenticeForm.tsx`) for creating and editing apprentice records.
    - [ ] 3.5 Implement the "Add Apprentice" and "Edit Apprentice" modal or page that uses the `ApprenticeForm`.
    - [ ] 3.6 Implement the API calls for `CREATE`, `READ` (list and individual), `UPDATE`, and `DELETE` operations on apprentice records.
    - [ ] 3.7 Add UI elements (e.g., toast notifications) to provide feedback on API outcomes (success, failure).
    - [ ] 3.8 Write unit tests for the `ApprenticeForm` and the data table, covering user interactions and state changes.

- [ ] **4.0 Financial Transaction Management (US6, FR4, FR5)**
    - [ ] 4.1 Develop the "Transactions" page (`app/transactions/page.tsx`) to display financial records in the reusable data table.
    - [ ] 4.2 Add filtering controls to the Transactions page for "Transaction Date" and "Description".
    - [ ] 4.3 Create a form component (`components/forms/TransactionForm.tsx`) for adding and editing financial records.
    - [ ] 4.4 Implement the UI to perform CRUD operations for transactions, reusing existing components where possible.
    - [ ] 4.5 Implement the API calls for `CREATE`, `READ`, `UPDATE`, and `DELETE` for financial records.
    - [ ] 4.6 Implement robust error handling and user feedback for all transaction-related API calls.
    - [ ] 4.7 Write unit tests for the `TransactionForm` and associated components.

- [ ] **5.0 CSV to JSON Bulk Upload (US3, US4, FR1, FR2)**
    - [ ] 5.1 Create a file upload component (`components/ui/FileUpload.tsx`) that accepts CSV files.
    - [ ] 5.2 Implement the "Bulk Upload" page or section in the UI.
    - [ ] 5.3 Write the client-side logic to parse the uploaded CSV file into a JSON array using `papaparse`.
    - [ ] 5.4 Implement the minor data sanitization and type-checking required by FR2 (e.g., ensure required fields exist).
    - [ ] 5.5 Implement the API call to send the converted JSON data to the appropriate backend ingestion endpoint (one for apprentices, one for transactions).
    - [ ] 5.6 Add UI elements to display the results of the ingestion from the backend API, including the number of successful records and any errors.
    - [ ] 5.7 Write unit tests for the CSV-to-JSON conversion logic, covering valid and invalid CSV formats.

- [ ] **6.0 Activity Log Viewer (US7, FR6)**
    - [ ] 6.1 Create the "Activity Logs" page (`app/logs/page.tsx`).
    - [ ] 6.2 Implement the API call to fetch activity log data from the backend.
    - [ ] 6.3 Display the logs in a clear, readable format (e.g., using a table or a list).
    - [ ] 6.4 Implement logic to handle API failures gracefully when fetching logs.
    - [ ] 6.5 Write basic unit tests for the log viewer component to ensure data is displayed correctly.
