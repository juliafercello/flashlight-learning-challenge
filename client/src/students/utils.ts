import axios from "axios"

export interface IStudent {
    id: number
    student_name: string
    grade: number
}

export const getStudentsList = async (): Promise<IStudent[]> => {
    const response = await axios.get("http://localhost:8080/students")
    return response.data
}