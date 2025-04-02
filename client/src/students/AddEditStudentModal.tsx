import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { addNewStudent } from './utils';
import { AlertColor } from '@mui/material/Alert';

interface IProps {
    open: boolean
    handleCloseModal: () => void
    refreshStudentList: () => void
    handleShowMessage: (type: AlertColor, messageToShow: string) => void
}

export default function AddEditStudentModal(props: IProps) {
    const { open, handleCloseModal, refreshStudentList, handleShowMessage } = props
    
    const [name, setName] = useState<string>('')
    const [grade, setGrade] = useState<string>('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        //TODO validate fields
        const studentInput = { name, grade: parseInt(grade) }

        addNewStudent(studentInput).then(() => {
            handleCloseModal()
            handleShowMessage("success", 'Yay! Student added.')
            refreshStudentList()

        }).catch((err) => {
            handleShowMessage("error", 'Oops. Something went wrong.')
            console.log(err)
        })
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleCloseModal}
            >
                <form id='addEditStudent' onSubmit={handleSubmit}>
                    <DialogTitle>Add new student</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="name"
                            name="name"
                            label="Student Name"
                            variant="filled"
                            fullWidth
                            required
                            margin="normal"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            id="name"
                            name="grade"
                            label="Grade"
                            variant="filled"
                            required
                            fullWidth
                            margin="normal"
                            onChange={(e) => setGrade(e.target.value)}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}