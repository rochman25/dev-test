const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/',dataController.get);
router.get('/filter',dataController.filter);

module.exports = router;
