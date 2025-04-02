import axios from "axios"

export interface IStudent extends IStudentBase {
    id: number
}

export interface IStudentBase {
    name: string
    grade: number
}

export const getStudentsList = async (): Promise<IStudent[]> => {
    const response = await axios.get("/students")
    return response.data
}

export const addNewStudent = async (studentInput: IStudentBase): Promise<IStudent> => {
    const response = await axios.post("/students", { name: studentInput.name, grade: studentInput.grade })
    return response.data
}