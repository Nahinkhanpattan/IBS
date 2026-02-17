const express = require("express");
const router = express.Router();
const blockchainService = require("../services/blockchainService");

// POST /api/access/request
router.post("/request", async (req, res) => {
    const { deviceAddress, resource } = req.body;

    if (!deviceAddress || !resource) {
        return res.status(400).json({ error: "Missing deviceAddress or resource" });
    }

    try {
        const isAllowed = await blockchainService.checkAccess(deviceAddress, resource);
        if (isAllowed) {
            res.json({ status: "ACCESS GRANTED", deviceAddress, resource });
        } else {
            res.status(403).json({ status: "ACCESS DENIED", deviceAddress, resource });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
