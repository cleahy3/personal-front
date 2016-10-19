var express = require('express');
var router = express.Router();
var winesController = require('../controllers/wines');
// Index Route
router.route('/wines')
	.get(winesController.index)
	.post(winesController.create);
router.route("/wines/:id")
	.get(winesController.show)
	.patch(winesController.update)
	.delete(winesController.delete);

module.exports=router;