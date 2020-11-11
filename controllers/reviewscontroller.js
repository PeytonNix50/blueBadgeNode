const router = require('express').Router();
const Reviews = require('../db').import('../models/reviews');

const validateSession = require('../middleware/validate_session');

router.get('/', (req, res) => {
  Reviews.findAll()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

router.post('/', validateSession, (req, res) => {
  const reviewsFromRequest = {
    trailName: req.body.name,
    rating: req.body.rating,
    location: req.body.location,
    description: req.body.description,
    date: req.body.date
  }

  Reviews.create(reviewsFromRequest)
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

// How to get items unique to user?
// owner: req.user.id

router.get('/:id', validateSession, (req, res) => {
  Reviews.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({error: "Review not found"}))
});

router.put('/:name', validateSession, (req, res) => {
  Reviews.update(req.body, {
    where: {
      trailName: req.params.name
    }
  })
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({error: "Update not successful"}))
});

router.delete('/:id', validateSession, async (req, res) => {
  try {
      const result = await Reviews.destroy({
          where: { id: req.params.id }
      });

      res.status(200).json(result)
  } catch (err) {
      res.status(500).json({error: "Review not deleted"});
  }
})


module.exports = router;