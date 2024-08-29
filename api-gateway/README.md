# API Gateway Service

## Overview

This API Gateway serves as the central point of entry for various microservices, such as the Login Service, Train Service, Schedule Service, etc. It handles routing, request forwarding, between the client and backend microservices. 

## Features

- **Routing:** Routes incoming HTTP requests to the appropriate microservice.
- **Security:** Provides centralized security, including authentication and authorization.
- **Logging:** Centralized logging for incoming requests and responses.
- **Error Handling:** Provides consistent error responses across all services.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 18 or higher).
- **NPM/Yarn**: Package manager for Node.js.
- **Microservices**: The individual microservices must be up and running (e.g., Login Service, Train Service).

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/tharusha1004/SriLankan-Railway-Live-Train-Tracking-API.git
   cd api-gateway

2. **Install Dependencies**

Use npm or yarn to install the required dependencies:

    ```bash
    npm install or  yarn install 

3. **Configuration**

    Environment Variables

    Create a .env file in the root directory to configure environment variables:

    ```bash
    PORT=3000;

    LOGIN_SERVICE_URL=http://localhost:3007
    TRAIN_SERVICE_URL=http://localhost:3006
    SCHEDULE_SERVICE_URL=http://localhost:3008
            .   
            .
            .
            .

4. **Start the API Gateway service:**

    ```bash
    npm start
    [The service will start on the port specified in the .env file (default is 3000).]

5. **Usage**

After starting the API Gateway, you can access the microservices through the following endpoints:

Login Service: http://localhost:3000/api/login
Train Service: http://localhost:3000/api/trains
Schedule Service: http://localhost:3000/api/schedules
                .
                .
                .
                .