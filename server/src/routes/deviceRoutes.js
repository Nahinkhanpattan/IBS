const express = require("express");
const router = express.Router();
const blockchainService = require("../services/blockchainService");

// POST /api/devices/register
router.post("/register", async (req, res) => {
    const { deviceAddress } = req.body;

    if (!deviceAddress) {
        return res.status(400).json({ error: "Missing deviceAddress" });
    }

    try {
        const result = await blockchainService.registerDevice(deviceAddress);
        res.json({ message: "Device registered successfully", ...result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/devices/grant
router.post("/grant", async (req, res) => {
    const { deviceAddress, resource } = req.body;

    if (!deviceAddress || !resource) {
        return res.status(400).json({ error: "Missing deviceAddress or resource" });
    }

    try {
        const result = await blockchainService.grantPermission(deviceAddress, resource);
        res.json({ message: "Permission granted successfully", ...result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
