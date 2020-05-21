const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController');

router.get('/', dataController.list);
router.post('/add', dataController.save);
router.get('/delete/:id', dataController.delete);
router.get('/update/:id', dataController.update);
router.post('/sendFile', dataController.import);


module.exports = router;