# GPS Data Service

## Overview

The GPS Data Service is responsible for managing GPS data related to train locations in the train live tracking system. It stores the GPS data in a database and automatically deletes entries older than 90 days.

## Features

- **Store GPS Data:** Save GPS data for train locations.
- **Automatic Data Cleanup:** Automatically remove GPS data entries that are older than 90 days.
- **Retrieve GPS Data:** Fetch GPS data for specific trains.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 18 or higher).
- **NPM/Yarn**: Package manager for Node.js.
- **MongoDB**: Database for storing GPS data.
