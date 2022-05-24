const { Router } = require('express')
const { Response } = require('../../../../models')
const { Result } = require('../../../../models')

const router = new Router({ mergeParams: true })

  const filterResponseFromResult = (resultId) => {
    rsp = Response.get()
    const responses = rsp.filter((response) => response.resultId == resultId)
    return responses
  }

router.get('', (req, res) => {//response
  try {
    console.log(req.params.resultId)
    res.status(200).json(filterResponseFromResult(req.params.resultId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:responseId', (req, res) => {//response/responseId
  try {
    res.status(200).json(Response.getById(parseInt(req.params.responseId)))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    resultId = parseInt(req.params.resultId, 10)
    let response = Response.create({ ...req.body})
    console.log(response);
    res.status(201).json(response)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
