const { Router } = require('express')
const { Answer, Quiz, Question } = require('../../../../models')

const router = new Router({ mergeParams: true })

const getQuestionFromQuiz = (quizId, questionId) => {
  // Check if quizId exists, if not it will throw a NotFoundError
  const quiz = Quiz.getById(quizId)
  const quizIdInt = parseInt(quizId, 10)
  const question = Question.getById(questionId)
  if (question.quizId !== quizIdInt) throw new NotFoundError(`${question.name} id=${questionId} was not found for ${quiz.name} id=${quiz.id} : not found`)
  return question
}

const getAnswerFromQuestion = (quizId, questionId, answerId) => {
  const question = getQuestionFromQuiz(quizId, questionId)
  const answer = Answer.getById(answerId)
  if (answer.questionId !== question.id) throw new NotFoundError(`${answer.name} id=${answerId} was not found for ${question.name} id=${question.id} : not found`)
  return answer
}

const filterAnswersFromQuestion = (questionId) => Answer.get().filter((answer) => (answer.questionId === questionId))


router.get('/', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const answers = filterAnswersFromQuestion(question.id)
    res.status(200).json(answers)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/:answerId', (req, res) => {
  try {
    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId)
    res.status(200).json(answer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.post('/', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const answer = Answer.create({ ...req.body, questionId: question.id })
    res.status(201).json(answer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:answerId', (req, res) => {
  try {
    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId)
    const updatedAnswer = Answer.update(req.params.answerId, { ...req.body, questionId: answer.questionId })
    res.status(200).json(updatedAnswer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:answerId', (req, res) => {
  try {
    getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId)
    Answer.delete(req.params.answerId)
    res.status(204).end()
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
