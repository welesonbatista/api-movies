const knex = require("../database/knex")
const AppError = require('../utils/appError');

class MovieNotesController {
    async create(request, response) {
        const { title, description, rating, name } = request.body
        const { user_id } = request.params

        if (rating < 1 || rating > 5) {
            throw new AppError('Rating Invalid, use from 1 to 5')
        }

        const [note_id] = await knex('notes').insert({
            title,
            description,
            rating,
            user_id
        })

        const namesInsert = name.map(name => {
            return { note_id, user_id, name }
        })

        await knex('tags').insert(namesInsert)

        response.json()
    }

    async show(request, response) {
        const { id } = request.params

        const note = await knex("notes").where({ id }).first()
        const names = await knex("tags").where({ note_id: id }).orderBy("name")

        return response.json({
            ...note,
            names
        })
    }

    async delete(request, response) {
        const { id } = request.params

        await knex("notes").where({ id }).delete()

        return response.json()
    }

    async index(request, response) {
        const { title, user_id, name } = request.query

        let notes

        if (name) {
            const filtername = name.split(',').map(tag => name.trim())

            notes = await knex("tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "movie_notes.description", //ln
                    "movie_notes.rating",   //ln
                    "notes.user_id",

                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)
                .whereIn("name", filtername)
                .innerJoin("notes", "notes.id", "name.note_id")
                .orderBy("notes.title")

        } else {
            notes = await knex("notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title")
        }

        const username = await knex("tags").where({ user_id })
        const notesWhithname = notes.map(note => {
            const notename = username.filter(tag => tag.note_id === note.id)

            return {
                ...note,
                name: notename
            }
        })

        return response.json(notesWhithname)
    }
}

module.exports = MovieNotesController