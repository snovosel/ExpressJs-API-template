// User routes

import express from 'express';

const router = express.Router();

router.get('/get', (req, res) => res.send('users motherfucka!'));

module.exports = router;
