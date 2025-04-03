import pool from "../db";

interface IStudent {
    id: number
    name: string
    grade: number
}

export const createStudent = async (name: string, grade: number): Promise<IStudent> => {
    const insertUser =
        "INSERT INTO students (name, grade) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(insertUser, [name, grade]);

    const createdUser = result.rows[0];
    return createdUser
}

export const getStudents = async (): Promise<IStudent[] | undefined> => {
    const result = await pool.query("SELECT * FROM students");
    const students = result.rows;
    return students;
}

export const getStudentByID = async (id: number): Promise<IStudent | undefined> => {
    const result = await pool.query("SELECT * FROM students WHERE ID = ($1)", [id]);
    const student = result.rows[0];
    return student;
}

export const deleteStudentByID = async (id: number): Promise<boolean> => {
    const result = await pool.query("DELETE FROM students WHERE ID = ($1)", [id]);
    return (result.rowCount || 0) > 0;
}