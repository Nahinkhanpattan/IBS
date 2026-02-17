IoT Blockchain Security System (IBS) — Project Documentation
🔹 1. Project Overview

The IoT Blockchain Security System (IBS) is a decentralized Industrial IoT security platform that integrates:

IoT Devices for sensing and data generation

Node.js Edge Server for request handling

Ethereum Blockchain for secure identity and permission storage

Smart Contracts (Solidity) for automated access control

React Web Dashboard for system monitoring and administration

MongoDB (optional) for caching and logs

The system ensures:

Secure device authentication

Tamper-proof permission storage

Decentralized access verification

Real-time monitoring of device interactions

This implementation follows the architecture proposed in the research paper:

“A Blockchain-Based Intelligent IoT Communication System for Enhanced Security, Reliability, and Efficiency.”

🔹 2. System Architecture
Overall Flow
IoT Device → Node.js Edge Server → Ethereum Blockchain → Smart Contract
      ↑                                                ↓
      └────────────── Response (Grant / Deny) ─────────┘

Admin Dashboard (React) → interacts with server → blockchain
Optional MongoDB → stores logs & metadata

🔹 3. How the System Works
Step 1 — Device Registration

A new IoT device is registered using the dashboard or API.

Server calls the blockchain smart contract

Device address stored immutably

Device becomes trusted participant

Step 2 — Permission Assignment

Admin assigns permissions:

Example:

Device: 0xABC...
Resource: temperature_data


Smart contract records:

device.permissions["temperature_data"] = true

Step 3 — Device Request

IoT device (ESP32 in Wokwi) sends HTTP request:

POST /api/access/request
{
  "deviceAddress": "0xABC...",
  "resource": "temperature_data"
}

Step 4 — Edge Server Verification

Node.js server:

Receives request

Calls blockchain using ethers.js

Executes:

checkAccess(deviceAddress, resource)

Step 5 — Smart Contract Decision

Smart contract verifies:

IF registered AND permission exists
→ return true
ELSE return false


Blockchain emits event:

AccessChecked(device, resource, allowed)

Step 6 — Response Returned

Server sends:

ACCESS GRANTED


or

ACCESS DENIED


Device acts accordingly.

Step 7 — Dashboard Update

React dashboard shows:

Registered devices

Permission list

Access logs

Real-time activity

MongoDB optionally stores:

request history

device metadata

analytics data

🔹 4. Project Folder Structure
IBS/
│
├── blockchain/
├── server/
├── client/
├── devices/
├── docs/
└── README.md

📦 blockchain/ — Ethereum Smart Contract Layer

Handles:

Device identity storage

Permission rules

Access verification

blockchain/
│
├── contracts/
│   └── DeviceAccess.sol
│
├── scripts/
│   └── deploy.js
│
├── test/
├── hardhat.config.js
├── package.json
└── .env

Key File

contracts/DeviceAccess.sol

Contains:

registerDevice() → adds device identity

grantPermission() → assigns resource access

checkAccess() → verifies permission

This file represents the core security logic of the system.

📦 server/ — Node.js Edge Node

Acts as:

Gateway between devices and blockchain

API server for dashboard

Blockchain interaction layer

server/
│
├── src/
│   ├── config/
│   │   ├── blockchain.js
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── deviceController.js
│   │   └── accessController.js
│   │
│   ├── routes/
│   │   ├── deviceRoutes.js
│   │   └── accessRoutes.js
│   │
│   ├── services/
│   │   ├── blockchainService.js
│   │   └── deviceService.js
│   │
│   ├── models/
│   │   └── Device.js
│   │
│   ├── app.js
│   └── server.js
│
├── package.json
└── .env

Key Files

server.js
Starts Express server.

app.js
Loads middleware and routes.

routes/accessRoutes.js
Defines API endpoint:

POST /api/access/request


services/blockchainService.js
Uses ethers.js to:

Connect to Ethereum node

Load contract ABI

Call smart contract functions

📦 client/ — React Dashboard

Provides:

Device management UI

Permission configuration

Access logs

Monitoring interface

client/
│
├── src/
│   ├── components/
│   │   ├── RegisterDevice.jsx
│   │   ├── GrantPermission.jsx
│   │   └── Logs.jsx
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── main.jsx

Key File

services/api.js

Handles:

axios.post("/api/access/request")


to communicate with server.

📦 devices/ — IoT Simulation Layer

Contains:

ESP32 Wokwi sketches

Optional Python test clients

devices/
│
├── esp32/
│   └── esp32_sensor.ino
│
└── python/
    └── simulated_device.py


Your ESP32 sketch:

Connects to WiFi

Reads sensors

Sends HTTP request to server

Receives access decision

This simulates real industrial IoT devices.

📦 docs/

Stores:

diagrams

ABI files

deployment notes

research references

🔹 5. Technologies Used
Layer	Technology
Blockchain	Ethereum Local Network
Smart Contracts	Solidity
Backend	Node.js + Express
Blockchain Client	ethers.js
Frontend	React + Axios
Database	MongoDB (optional)
IoT Simulation	Wokwi ESP32
🔹 6. Security Advantages

This system provides:

Decentralized authentication

Tamper-proof identity storage

Immutable access logs

No single point of failure

Automated permission enforcement

Real-time verification