const router = require('express').Router();
const Supplies = require('../db').import('../models/supplies');

router.get('/', (req, res) => {
  Supplies.findAll()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

router.post('/', (req, res) => {
  const suppliesFromRequest = {
    itemName: req.body.name,
    quantity: req.body.quantity,
    description: req.body.description,
    isNecessary: req.body.necessary,
    alreadyOwn: req.body.own
  }

  Supplies.create(suppliesFromRequest)
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;