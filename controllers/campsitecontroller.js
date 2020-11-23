const router = require('express').Router();
const Campsite = require('../db').import('../models/campsite');

const validateSession = require('../middleware/validate_session');

router.get('/', (req, res) => {
  Campsite.findAll()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

router.post('/', validateSession, (req, res) => {
  const campsiteFromRequest = {
    campName: req.body.name,
    rating: req.body.rating,
    location: req.body.location,
    description: req.body.description,
    date: req.body.date
  }

  Campsite.create(campsiteFromRequest)
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

// How to get items unique to user?
// owner: req.user.id

router.get('/:id', validateSession, (req, res) => {
  Campsite.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({error: "Campsite not found"}))
});

router.put('/:name', validateSession, (req, res) => {
  Campsite.update(req.body, {
    where: {
      campName: req.params.name
    }
  })
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({error: "Update not successful"}))
});

router.delete('/:id', validateSession, async (req, res) => {
  try {
      const result = await Campsite.destroy({
          where: { id: req.params.id }
      });

      res.status(200).json(result)
  } catch (err) {
      res.status(500).json({error: "Campsite review not deleted"});
  }
})


module.exports = router;