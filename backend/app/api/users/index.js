const { Router } = require('express')

const { User } = require('../../models')
const ResultsRouter = require('./results')
const { Result } = require('../../models')
const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(User.get())
  } catch (err) {
    res.status(500).json(err)
  }
})


router.get('/:userId', (req, res) => {
  try {
    res.status(200).json(User.getById(req.params.userId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    let boolCheckName = true
    User.get().forEach((user) => { if (user.name === req.body.name) { boolCheckName = false } })
    if (boolCheckName) {
      const user = User.create({ ...req.body })
      res.status(201).json(user)
    }
    res.status(400).json('user are already in base')
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:userId', (req, res) => {
  try {
    res.status(200).json(User.delete(req.params.userId))
    console.log(req.params.userId)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:userId', (req, res) => {
  try {
    res.status(200).json(User.update(req.params.userId, req.body))
    console.log(req.body)
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router
router.use('/:userId/results', ResultsRouter)

///:userId/results/:quizId/responses/:questionId