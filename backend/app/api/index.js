const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UsersRouter = require('./users')
const ThemesRouter = require('./themes')
const VariablesRouter = require('./variables')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UsersRouter)
router.use('/themes', ThemesRouter)
router.use('/variables', VariablesRouter)



module.exports = router
