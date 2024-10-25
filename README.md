# QUIET LIBRARY TRACKER - Frontend

*QUIET LIBRARY TRACKER* is a minimalist library management tool for small libraries or book clubs, streamlining book, member, and loan tracking with a simple web interface.

## Features

- *Book Management*: Add, update, delete books; track availability and loans.
- *Member Management*: Create/manage profiles, loan history, and details.
- *Loan Management*: Issue/return books with overdue tracking.
- *Basic Notifications*: Automated reminders for overdue books.
- *Search Functionality*: Search by book title/author or member details.
- *User Authentication*: User sign-up and login.

## Tech Stack

- *Frontend*: React, Tailwind CSS
- *Backend*: Flask, SQLite (not included in this repo)

## Getting Started

1. *Install Prerequisites*: Ensure [Node.js](https://nodejs.org/) is installed.
2. *Clone Repo & Install Dependencies*:
   bash
   git clone <repository-url>
   cd frontend
   npm install
   
3. *Environment Setup*: Create a .env file with REACT_APP_API_URL=<your-backend-url>.
4. *Run App*:
   bash
   npm start
   
5. *Access*: Visit [http://localhost:3000](http://localhost:3000).

## Build for Production

To build the app for production, run:

bash
npm run build


## License

This project is licensed under the MIT License.