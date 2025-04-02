import { useState, useEffect } from 'react'
import { getStudentsList, IStudent } from './utils'
import AddEditStudentModal from './AddEditStudentModal'
import { ShowSnackbarMessage } from '../components/ShowSnackbarMessage'
import {StudentMenu} from "./StudentMenu"
import { AlertColor } from '@mui/material/Alert'
import { SnackbarCloseReason } from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'

const StudentList = () => {
    const [students, setStudents] = useState<IStudent[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [messageType, setMessageType] = useState<AlertColor>()
    const [showMessage, setShowMessage] = useState<boolean>(false)

    useEffect(() => {
        fetchStudentList()
    }, [])

    const fetchStudentList = async () => {
        try {
            setIsLoading(true)
            const allStudents = await getStudentsList()
            setStudents(allStudents)
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const toggleAddEditModal = () => {
        setIsAddEditModalOpen(prevState => !prevState)
    }

    const handleShowSnackbarMessage = (type: AlertColor, messageToShow: string) => {
        setShowMessage(true)
        setMessageType(type)
        setMessage(messageToShow)
    }

    const handleSnackbarClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
    };

    //TODO: Wire this up to open the Add Edit Modal 
    const handleEdit = (id: number) => {
        console.log('idToEdit', id)
    }

    //TODO: Wire this up to open a delete confirmation modal
    const handleDelete = (id: number) => {
        console.log('idToDelete', id)
    }

    return (
        <>
            <Typography variant="h2" align='center' margin={"20px"}>
                Student List
            </Typography>
            {isLoading && <CircularProgress />}
            {!isLoading &&
                <>
                    <Button variant='contained' onClick={toggleAddEditModal}>Add new student</Button>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Grade</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student: IStudent) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.grade}</TableCell>
                                    <TableCell align="right">
                                        <StudentMenu handleDelete={handleDelete} handleEdit={handleEdit} id={student.id} />
                                    </TableCell>
                                </TableRow>
                            )
                            )}
                        </TableBody>
                    </Table>
                </>
            }
            {isAddEditModalOpen && (<AddEditStudentModal open={isAddEditModalOpen} refreshStudentList={fetchStudentList} handleCloseModal={toggleAddEditModal} handleShowMessage={handleShowSnackbarMessage} />)}
            {showMessage && <ShowSnackbarMessage open={showMessage} handleClose={handleSnackbarClose} type={messageType ?? "info"} message={message} />}
        </>
    )
}

export default StudentList
