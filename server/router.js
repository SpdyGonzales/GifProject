const { Router } = require('express');

const index = require('./controller/categories.js');

const router = Router();

router.route('/categories')
  .get(index);

module.exports = router;