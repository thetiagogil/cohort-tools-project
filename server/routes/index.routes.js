const router = require('express').Router()

const studentsRoutes = require('./students.routes')
router.use('/students', studentsRoutes)

const cohortsRoutes = require('./cohorts.routes')
router.use('/cohorts', cohortsRoutes)

module.exports = router
