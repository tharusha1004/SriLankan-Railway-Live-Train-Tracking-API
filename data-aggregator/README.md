# Data Aggregator

## Overview

The Data Aggregator Service collects GPS data from train GPS devices and stores it in a MySQL database. This data is crucial for other services, such as the Train Tracking Service.

## Features

- Collects and stores GPS data

## Prerequisites

- Node.js
- MySQL

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tharusha1004/SriLankan-Railway-Live-Train-Tracking-API/data-aggregator.git
   cd data-aggregator

2. Install dependencies:
   ```bash
   npm install

3. Set up the MySQL database and insert dummy data:
   ```sql
   USE train_tracking;

   CREATE TABLE IF NOT EXISTS gps_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trainId VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL
   );

4. Running the Service
   ```bash
   npm start
