const { Router } = require('express')

const { User } = require('../../../models')
const { Result } = require('../../../models')
const ResponsesRouter = require('./responses')
const router = new Router({ mergeParams: true })


router.get('/:resultId', (req, res) => {//result/resultId
    try {
      console.log(req.params.resultId)
      results = Result.getById(parseInt(req.params.resultId))
      res.status(200).json(results)
    } catch (err) {
      res.status(500).json(err)
    }
  })

router.post('/', (req, res) => {
  try {
    userId = parseInt(req.params.userId, 10)
    let result = Result.create({ ...req.body})
    console.log(result);
    res.status(201).json(result)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

const filterResultsFromUser = (userId) => {
  const results = Result.get()
  id = parseInt(userId,10)
  console.log(results)
  return results.filter((result) => result.userId == id)
}

router.get('/:userId/results', (req, res) => {//result
try {
  results = filterResultsFromUser(req.params.userId)
  res.status(200).json(results)
} catch (err) {
  res.status(500).json(err)
}
})

  
module.exports = router
router.use('/:resultId/responses', ResponsesRouter)