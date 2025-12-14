# SilverScreen Setup Guide

Welcome to SilverScreen! Follow these steps to get the app running on your machine.

## 📋 Prerequisites
Before you start, make sure you have these installed:
1.  **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**: Required for the database.
2.  **[Go](https://go.dev/dl/)**: Required for the backend API (version 1.18 or newer).
3.  **[Node.js](https://nodejs.org/en/download/)**: Required for the frontend (version 16 or newer).

---

## 🚀 Quick Start

You will need **two separate terminal windows** to run this project.

### Step 1: Start the Database
*Use your first terminal window.*

1.  Open a terminal in the project root folder `silverscreen`.
2.  Navigate to the backend folder:
    ```bash
    cd silverscreen-backend
    ```
3.  Start the database container:
    ```bash
    docker-compose up -d
    ```
    *(Note: On Linux, you might need `sudo docker-compose up -d`)*

### Step 2: Run the Backend API
*Still in the SAME terminal window as Step 1.*

1.  Install the Go dependencies:
    ```bash
    go mod download
    ```
2.  Start the backend server:
    ```bash
    go run ./cmd/api
    ```
3.  You should see a message saying "Starting application on port 8080".
    **Keep this terminal open.** The backend is now running.

### Step 3: Run the Frontend App
*Open a **NEW** terminal window.*

1.  Open a new terminal in the project root folder `silverscreen`.
2.  Install the frontend dependencies:
    ```bash
    npm install
    ```
3.  Start the application:
    ```bash
    npm start
    ```
4.  Your browser should automatically open `http://localhost:3000`.

---

## 🛑 How to Stop
To stop the application:
1.  Press `Ctrl + C` in the Frontend terminal.
2.  Press `Ctrl + C` in the Backend terminal.
3.  To stop the database, run `docker-compose down` inside the `silverscreen-backend` folder.