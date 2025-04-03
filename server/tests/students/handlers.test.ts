import { createNewStudentHandler, getStudentsHandler } from "../../src/students/handlers"
import { createStudent, getStudents } from "../../src/students/utils"

jest.mock('../../src/students/utils')

const mockStudentList = [
    {
        "id": 1,
        "name": "Sloth Slotherson",
        "grade": 4
    },
    {
        "id": 2,
        "name": "Speedy Turtle",
        "grade": 3
    },
    {
        "id": 3,
        "name": "Pink Cat",
        "grade": 2
    }]

describe('Student handler tests', () => {
    test('get students returns students', async () => {
        //@ts-ignore
        getStudents.mockReturnValue(Promise.resolve(mockStudentList))

        const mockReq = {};
        const mockRes = {
            status: jest.fn(),
            json: jest.fn(),
        };
        const mockNext = jest.fn();

        const handler = getStudentsHandler();

        //@ts-ignore
        await handler(mockReq, mockRes, mockNext);

        expect(getStudents).toHaveBeenCalledTimes(1)
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockStudentList);
        expect(mockNext).not.toHaveBeenCalled();
    })

    test('createNewStudentHandler creates student', async () => {

        //@ts-ignore
        createStudent.mockReturnValue(Promise.resolve(
            {
                "id": 1,
                "name": "Sloth Slotherson",
                "grade": 4
            }
        ))

        const mockReq = { body: { name: "Sloth Slotherson", grade: 4 } };
        const mockRes = {
            status: jest.fn(),
            json: jest.fn(),
        };
        const mockNext = jest.fn();

        const handler = createNewStudentHandler();

        //@ts-ignore
        await handler(mockReq, mockRes, mockNext);

        expect(createStudent).toHaveBeenCalledTimes(1)
        expect(createStudent).toHaveBeenCalledWith('Sloth Slotherson', 4)
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            "id": 1,
            "name": "Sloth Slotherson",
            "grade": 4
        });
        expect(mockNext).not.toHaveBeenCalled();
    })

    test('createNewStudentHandler pukes', async () => {
        //@ts-ignore
        createStudent.mockReturnValue(Promise.reject("nope"))

        const mockReq = { body: { name: "Sloth Slotherson", grade: 4 } };
        const mockRes = {
            status: jest.fn(),
            json: jest.fn(),
        };
        const mockNext = jest.fn();

        const handler = createNewStudentHandler();

        //@ts-ignore
        await handler(mockReq, mockRes, mockNext);

        expect(createStudent).toHaveBeenCalledTimes(1)
        expect(createStudent).toHaveBeenCalledWith('Sloth Slotherson', 4)
        expect(mockRes.status).not.toHaveBeenCalled()
        expect(mockRes.json).not.toHaveBeenCalled()
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith('nope')
    })
})