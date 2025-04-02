import { NextFunction, Router } from "express";
import { createStudent, getStudents } from "./utils";
import { Request, Response } from "express";

export function createNewStudentHandler() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const studentName = req.body.studentName
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
            console.log('getStudentsHandler')
            const studentList = await getStudents()
            res.status(200)
            res.json(studentList)
        } catch (err) {
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
    return router
}