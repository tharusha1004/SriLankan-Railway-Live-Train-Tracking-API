# User Service 

## Overview

The User Service manages user registration, login, and profile management.

## Features

- **Register a new user**
- **User login (Admin and normal users)**
- **Update and retrieve user profiles**

## Installation

- **Clone the repository.**
- **Install dependencies using npm install.**
- **Start the service using npm start.**

## Endpoints

- **POST /api/users: Register a new user.**
- **POST /api/login: User login.**
- **GET /api/users/:username/profile: Get user profile.**
- **PUT /api/users/:username/profile: Update user profile.**
- **DELETE /api/users/:username: Delete user.**

## Running the Service

- **The service runs on port 3007 by default.
- **Ensure MongoDB is running and accessible.