var router = require('express').Router()

const userRouter = require('./userRouter')
const surveyRouter = require('./surveyRouter')

router.use('/api/user', userRouter)
router.use('/api/survey', surveyRouter)

module.exports = router;