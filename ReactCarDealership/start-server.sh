#!/bin/bash

# Start the backend server
echo "Starting the backend server..."
cd API-CarDealership
npm start &
BACKEND_PID=$!

# Start the frontend server
echo "Starting the frontend server..."
cd ../HTML-CarDealership
npm run dev &
FRONTEND_PID=$!

# Wait for both servers to exit
wait $BACKEND_PID
wait $FRONTEND_PID
