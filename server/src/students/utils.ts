import pool from "../db";

interface IStudent {
    student_name: string
    grade: number
}

export const createStudent = async (studentName: string, grade: number): Promise<IStudent> => {
    const insertUser =
        "INSERT INTO students (student_name, grade) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(insertUser, [studentName, grade]);

    const createdUser = result.rows[0];
    return createdUser
}

export const getStudents = async (): Promise<IStudent[] | undefined> => {
    const result = await pool.query("SELECT * FROM students");
    const students = result.rows;
    return students;
}