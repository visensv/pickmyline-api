const express = require('express');
const { saveToGoogleSheet } = require('../../controllers/saveToGoogleSheet');
const router = express.Router();

router.post('/', saveToGoogleSheet);

module.exports = router;
