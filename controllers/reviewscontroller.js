const router = require('express').Router();
const Reviews = require('../db').import('../models/reviews');
const {Op} = require('sequelize')

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
    date: req.body.date,
    owner: req.user.id
  }

  Reviews.create(reviewsFromRequest)
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

// How to get items unique to user?
// owner: req.user.id

router.get('/name/:name', (req, res) => {
  Reviews.findOne({
    where: {
      id: req.params.name
    }
  })
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({error: "Review not found"}))
});

// router.get('/:rating', validateSession, (req, res) => {
//   Reviews.findOne({
//     where: {
//       rating: req.params.rating
//     }
//   })
//   .then(review => res.status(200).json(review))
//   .catch(err => res.status(500).json({error: "Review not found"}))
// });

router.get('/location/:location', (req, res) => {
  Reviews.findAll({
    where: {
      location: {
        [Op.iLike]: '%' + req.params.location + '%'
      }
    }
  })
  .then(item => res.status(200).json(item))
  .catch(err => res.status(500).json({error: "Review not found"}))
});

router.put('/:id', (req, res) => {
  Reviews.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({error: "Update not successful"}))
});

router.delete('/:id', async (req, res) => {
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