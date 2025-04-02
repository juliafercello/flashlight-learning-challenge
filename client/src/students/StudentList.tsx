import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useState, useEffect } from 'react'
import { getStudentsList, IStudent } from './utils'

const StudentList = () => {
    const [students, setStudents] = useState<IStudent[]>([])

    useEffect(() => {
        fetchStudentList()
    }, [])

    const fetchStudentList = async () => {
        try {
            const allStudents = await getStudentsList()
            setStudents(allStudents)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Grade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student: IStudent) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>{student.student_name}</TableCell>
                            <TableCell>{student.grade}</TableCell>
                        </TableRow>
                    )
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default StudentList
