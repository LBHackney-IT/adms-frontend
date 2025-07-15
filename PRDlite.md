# Product Requirements Document (PRD) Lite: Apprenticeship Data Management System (ADMS)

## 1. Introduction & Overview

*   **Problem Statement**: The Apprenticeship Department's reliance on a manual, spreadsheet-based system for managing apprentice and financial data is inefficient, error-prone, and lacks long-term data analysis capabilities. This creates a significant administrative burden.
*   **Proposed Solution**: To build a robust, centralized Apprenticeship Data Management System (ADMS). This system will consist of a .NET 8 backend API with a PostgreSQL database to act as the single source of truth, and a modern Next.js frontend application for user interaction. The core goal is to automate data ingestion, ensure data integrity, and provide a secure, efficient, and user-friendly interface for all data management tasks.

## 2. Stakeholders & Target Audience

*   **Stakeholders**: Apprenticeship Team Members.
*   **Target Users**: **Apprenticeship Team Members**. They require a reliable and efficient system to manage apprentice records, track financial data, and respond to inquiries without cross-referencing multiple spreadsheets.

## 3. Goals & Success Metrics

*   **Goals**:
    1.  Establish a unified PostgreSQL database as the single source of truth.
    2.  Automate data ingestion from CSV files to eliminate manual data entry.
    3.  Provide a secure, intuitive, and performant user interface for all data operations.
    4.  Improve data accuracy through centralized validation and error handling.
    5.  Overcome the one-year data export limitation by storing data indefinitely.

*   **Success Metrics (KPIs)**:
    *   A quantifiable reduction in time spent by staff on data entry, reconciliation, and reporting tasks.
    *   A significant decrease in data errors compared to the legacy spreadsheet system.
    *   100% success rate in processing valid, correctly formatted JSON data submissions.
    *   High user satisfaction and positive feedback from the Apprenticeship Team.

## 4. Key Features & User Stories

*   **US1 (Data Retrieval)**: As an apprenticeship team member, I want to retrieve specific apprentice information swiftly to respond to inquiries efficiently.
*   **US2 (Reporting)**: As an apprenticeship team member, I want to extract a comprehensive list of all currently active apprentices to generate requisite reports.
*   **US3 & US4 (Bulk Data Ingestion)**: As an apprenticeship team member, I want to bulk-upload apprentice and financial data from a CSV file, so the system can automatically add new records and update existing ones.
*   **US5 & US6 (CRUD Operations)**: As an apprenticeship team member, I need the ability to view, add, edit, and delete individual apprentice and financial records through a user interface.
*   **US7 (Auditing)**: As an apprenticeship team member, I need access to activity logs for all data ingestion events to monitor data flow and troubleshoot issues.

## 5. System Architecture & Technical Stack

*   **Frontend**:
    *   **Framework**: Next.js (with React Server Components)
    *   **Language**: TypeScript
    *   **UI**: Radix UI components for a modern, accessible interface.
    *   **Responsibilities**: Provides the user interface, handles user authentication, converts uploaded CSV files to JSON, and performs initial client-side data validation.
*   **Backend**:
    *   **Framework**: .NET 8 API
    *   **Database**: PostgreSQL hosted on AWS RDS.
    *   **Hosting**: AWS
    *   **Infrastructure as Code**: Terraform
    *   **Responsibilities**: Provides secure API endpoints for all data operations, enforces business logic and validation rules, performs data transformation and reconciliation (Upsert), and logs all activities.
*   **Unique Identifier**: The **ULN (Unique Learner Number)** is the key field used for apprentice data reconciliation (Upsert logic).

## 6. Functional Requirements (End-to-End)

1.  **Centralized Database (FR1)**: The system will use a PostgreSQL database with a schema defined in the Data Dictionary.
2.  **Data Ingestion (FR2, FR3)**: The frontend will accept CSV file uploads. It will convert the CSV to a JSON array and send it to the backend. The backend will then parse, validate, and transform the data before persisting it.
3.  **Data Validation (FR4)**: The frontend will perform minor sanitization. The backend will enforce comprehensive validation against the database schema (data types, mandatory fields, enums). Invalid records in a bulk upload will be skipped and logged, while valid records are processed.
4.  **Apprentice Data Reconciliation (FR5)**: The system will use the ULN as a unique identifier. If a ULN in an upload does not exist in the database, a new apprentice record is created. If it exists, the existing record is updated (Upsert logic).
5.  **CRUD APIs & UI (FR6, FR7)**: The system will provide UI and corresponding API endpoints for Create, Read, Update, and Delete operations for both apprentice and financial records.
6.  **Data Filtering (FR8)**: The UI will provide filtering options for apprentice and transaction lists. The backend API will support server-side filtering by specified fields (e.g., Status, Program, Transaction Date).
7.  **Comprehensive Logging (FR9)**: The backend will log all data ingestion and modification events in an `AuditLogs` table, detailing metrics, errors, and the user who performed the action. The frontend will display these logs.
8.  **Security (FR10)**: All API endpoints must be protected. The frontend will manage user authentication, and the backend will enforce authorization, restricting data modification operations to authenticated "apprenticeship team members."

## 7. Non-Functional Requirements

*   **Performance**: The API should respond to requests within a reasonable time frame. The frontend application should be fast and responsive, with optimized page loads.
*   **Usability & Accessibility**: The UI must be modern, intuitive, and easy to use. It must be accessible, with full support for screen readers and keyboard navigation.
*   **Reliability**: The system should be highly available and include robust error handling to prevent data loss or corruption during data ingestion.

## 8. Out of Scope (Non-Goals) for this Release

*   Direct, automated API integration with the Department of Education.
*   Automated data ingestion from Google Sheets.
*   In-app graphical reporting or data visualization dashboards.
*   The creation of agentic workflows for automated report generation.

## 9. Open Questions

1.  **Historical Data Management**: The current plan is to overwrite apprentice data on update. Is this acceptable, or does a full audit trail of *changes* to a record need to be preserved?
2.  **Performance Benchmarks**: Are there specific performance requirements, such as the maximum number of records in a single CSV upload or the maximum acceptable processing time for an ingestion request?
