import { NextFunction, Router } from "express";
import { createStudent, deleteStudentByID, getStudentByID, getStudents } from "./utils";
import { Request, Response } from "express";

export function createNewStudentHandler() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // TODO Validate caller
            // TODO Validate inputs 
            const studentName = req.body.name
            const grade = parseInt(req.body.grade)

            const newStudent = await createStudent(studentName, grade)
            res.status(201)
            res.json(newStudent)
        } catch (err) {
            next(err)
        }
    };
}

export function getStudentsHandler() {
    return async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // TODO Validate caller
            const studentList = await getStudents()
            res.status(200)
            res.json(studentList)
        } catch (err) {
            next(err)
        }
    };
}

export function deleteStudentsHandler() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // TODO Validate input and caller
            const idToDelete = parseInt(req.params.id)
            const studentToDelete = await getStudentByID(idToDelete)

            if (typeof studentToDelete === 'undefined') {
                res.status(404)
                res.json({})
            }

            const studentDeleted = await deleteStudentByID(idToDelete)

            if (studentDeleted) {
                res.status(204)
                res.json({})
            }
            else {
                res.status(404)
                res.json({})
            }
        }
        catch (err) {
            next(err)
        }
    };
}

export function handleErrorResponse(err: Error, _req: Request, res: Response, _next: NextFunction) {
    console.error('handle err response', err)
    res.status(500).json({ error: err.message })
}

export function getStudentRouter(): Router {
    const router: Router = Router()
    router.get('/students', getStudentsHandler())
    router.post('/students', createNewStudentHandler())
    router.delete('/students/:id', deleteStudentsHandler())
    return router
}