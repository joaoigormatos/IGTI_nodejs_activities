const gradesRoutes = require("express").Router()
const GradesController = require('../controller/GradesController')

gradesRoutes.post('/', GradesController.addGrade)
gradesRoutes.get('/bestGrades', GradesController.getBestGrades)
gradesRoutes.get('/studentScore', GradesController.getStudentScore)
gradesRoutes.get('/mediaScore', GradesController.getMediaGrades)
gradesRoutes.get('/:id', GradesController.getGrade)
gradesRoutes.delete('/:id', GradesController.deleteGrade)
gradesRoutes.put('/', GradesController.updateGrade)


module.exports = gradesRoutes