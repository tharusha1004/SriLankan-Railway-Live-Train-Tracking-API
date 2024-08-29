# Sri Lanka Railways Train Tracking REST API

## Project Overview

**Project**: SriLankan-Railway-Live-Train-Tracking-API  
**Project Type**: Backend Development (API)

This project is designed to facilitate real-time tracking of trains operated by Sri Lanka Railways. The system uses IoT devices installed on train engines to transmit GPS data every minute, which is then processed and stored by a REST API server. The data is accessible to various client applications for real-time tracking, historical data analysis, and administrative purposes.

## Key Functionalities

- IoT Devices on Train Engines send GPS data at one-minute intervals.
- Network facilitates the transmission of GPS data from IoT devices to the server.
- REST API Server receives, processes, and stores the GPS data.
- Database stores the GPS data for up to 90 days.
- Client applications consume the GPS data for various purposes.

## High-Level Architecture

### Data Flow

1. IoT devices transmit GPS data every minute.
2. Data is sent over the mobile network to the REST API server.
3. The REST API processes and stores the data in the database.
4. Client applications access the data via the REST API for various purposes such as real-time tracking, historical data analysis, and administrative functions.

### Components

- **IoT Devices**: Collect GPS data.
- **Network**: Transmits data.
- **REST API Server**: Built using an Express framework.
- **Database**: NoSQL database like MongoDB (or a time-series database like InfluxDB) for efficient storage and retrieval of time-stamped data.
- **Client Applications**: Web applications for various stakeholders.

