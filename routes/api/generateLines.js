const express = require('express');
const { generateLines } = require('../../controllers/generateLines');
const router = express.Router();

router.post('/', generateLines);

module.exports = router;
