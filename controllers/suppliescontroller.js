const router = require('express').Router();
const Supplies = require('../db').import('../models/supplies');

const validateSession = require('../middleware/validate_session');

router.get('/', (req, res) => {
  Supplies.findAll()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

router.post('/', validateSession, (req, res) => {
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

// How to get items unique to user?
// owner: req.user.id

router.get('/:name', validateSession, (req, res) => {
  Supplies.findOne({
    where: {
      itemName: req.params.name
    }
  })
  .then(item => res.status(200).json(item))
  .catch(err => res.status(500).json({error: "Item not found"}))
});

router.put('/:name', validateSession, (req, res) => {
  Supplies.update(req.body, {
    where: {
      itemName: req.params.name
    }
  })
  .then(item => res.status(200).json(item))
  .catch(err => res.status(500).json({error: "Update not successful"}))
});

// router.delete('/:id', validateSession, (req, res) => {
//   Supplies.destroy(req.body, {
//       where: { 
//         id: req.params.id
//       }
//     })
//   .then(item => res.status(200),json(item))
//   .catch(err => res.status(500).json({ error: "Item not deleted" }))
// });

router.delete('/:id', validateSession, async (req, res) => {
  try {
      const result = await Supplies.destroy({
          where: { id: req.params.id }
      });

      res.status(200).json(result)
  } catch (err) {
      res.status(500).json({error: "Item not deleted"});
  }
})


module.exports = router;