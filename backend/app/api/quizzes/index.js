const { Router } = require('express')

const { Quiz, Question, Answer } = require('../../models')
const QuestionsRouter = require('./questions')
const QuestionsListRouter = require('./questions')

const router = new Router()


router.get('/', (req, res) => {
  try {
    const quizlist = Quiz.get()
    const questions = Question.get()
    const answers = Answer.get()
    quizlist.forEach((quiz) => {
      quiz.questions = questions.filter((q) => parseInt(q.quizId) === parseInt(quiz.id))
      quiz.questions.forEach((question) => {question.answers = answers.filter((q) => parseInt(q.questionId) === parseInt(question.id))})
    })
    res.status(200).json(quizlist)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quiz = Quiz.getById(req.params.quizId)
    const questions = Question.get()
    quiz.questions = questions.filter((q)=> parseInt(q.quizId) === parseInt(quiz.id))
    quiz.questions.forEach((question) => {question.answers = Answer.get().filter((q) => parseInt(q.questionId) === parseInt(question.id))})
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
  console.log(req.params.quizId)
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    if (req.body.questions && req.body.questions.length > 0) {
      const questions = req.body.questions.map((question) => Question.create({ ...question, quizId: quiz.id }))
      quiz = {...quiz, questions}
    }
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})
router.delete('/:quizId', (req, res) => {
  try {
    const quiz = Quiz.getById(parseInt(req.params.quizId))
    console.log("1")
    let questions = Question.get().filter((q)=> parseInt(q.quizId) === parseInt(quiz.id))
    questions.forEach((question) => {question.answers = Answer.get().filter((q) => parseInt(q.questionId) === parseInt(question.id))})
    console.log(questions)
    questions.forEach((question) => question.answers.forEach((answer) => Answer.delete(answer.id)))
    questions.forEach((question) => Question.delete(question.id))
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    console.log(1)
    res.status(500).json(err)
  }
  console.log(req.params.quizId)
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
  console.log(req.body)
})

module.exports = router
router.use('/:quizId/questions', QuestionsRouter)
