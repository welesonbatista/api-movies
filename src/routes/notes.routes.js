const { Router } = require('express')
const MovieNotesController = require('../controllers/movieNotesController')

const notesRoutes = Router()
const movieNotesController = new MovieNotesController()


notesRoutes.post('/:user_id', movieNotesController.create)
notesRoutes.get('/:id', movieNotesController.show)
notesRoutes.get('/', movieNotesController.index)
notesRoutes.delete('/:id', movieNotesController.delete)

module.exports = notesRoutes