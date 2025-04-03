import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';


interface IProps {
    id: number
    handleEdit: (id: number) => void
    handleDelete: (id: number) => void
}

export const StudentMenu = (props: IProps) => {
    const { handleEdit, handleDelete, id } = props
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleEdit(id)}>Edit</MenuItem>
                <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
            </Menu>
        </div>
    );
}