const { Router } = require('express')

const { Answer, Quiz, Question } = require('../../../models')
const AnswersRouter = require('./answers')
const router = new Router({ mergeParams: true })

const filterQuestionsFromQuizz = (quizId) => {
  const questions = Question.get()
  const parsedId = parseInt(quizId, 10)
  return questions.filter((question) => question.quizId === parsedId)
}

router.get('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    res.status(200).json(filterQuestionsFromQuizz(req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    res.status(200).json(Question.getById(req.params.questionId))
  } catch (err) {
    res.status(500).json(err)
  }
  console.log(req.params.quizId)
})

router.post('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    const quizId = parseInt(req.params.quizId, 10)
    let question = Question.create({ label: req.body.label, quizId })
    // If answers have been provided in the request, we create the answer and update the response to send.
    if (req.body.answers && req.body.answers.length > 0) {
      const answers = req.body.answers.map((answer) => Answer.create({ ...answer, questionId: question.id }))
      question = {...question, answers}
    }
    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    res.status(200).json(Question.delete(req.params.questionId))
  } catch (err) {
    res.status(500).json(err)
  }
  console.log(req.params.questionId)
})

router.put('/:questionId', (req, res) => {
  try {
    res.status(200).json(Question.update(req.params.questionId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
  console.log(req.body)
})

router.use('/:questionId/answers', AnswersRouter)

module.exports = router
