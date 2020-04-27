const express = require('express');
const router = express.Router(); // library for backend stuff

// process user requests (GET request)
router.get('/', (req, res) => {
    res.send('server is up and running bruHHH');
});

// NOTE: no export default
module.exports = router;