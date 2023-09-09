import React, { useState } from "react";
import { IconButton, Select, TableCell, MenuItem } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import EditOffIcon from '@mui/icons-material/EditOff';
import useCities from "../../hooks/useCities";


const CartTable = ({ tid, name, duration, ...props }) => {

    const { updateUser } = useCities()


    const onDelete = async (e) => {
        e.stopPropagation();
        const res = window?.confirm("Вы действительно хотите удалить " + props.email + '?');
        if (res) {
            await deleteDoc(doc(db, "users", props.cid));
            window?.location?.reload()
        }
    };

    const [role, setRole] = React.useState(props?.role);

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const [isActive, setActive] = useState(false);


    const editRole = () => {
        if (isActive) {
            updateUser(props.cid, { role: role }).finally(() => {
                alert("success")
            })
            setActive(false)
        } else {
            setActive(true)
        }
    }

    return (
        <TableCellContainer>
            <TableCell component="th" scope="row">
                {props.cid}
            </TableCell>
            <TableCell scope="row">{props.email}</TableCell>
            <TableCell scope="row">
                {isActive ? <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={handleChange}
                    sx={{
                        width: "120px"
                    }}
                >
                    <MenuItem value={"user"}>User</MenuItem>
                    <MenuItem value={"admin"}>Admin</MenuItem>
                </Select> : role}

            </TableCell>
            <TableCell scope="row"></TableCell>
            <TableCell scope="row">
                <IconButton onClick={editRole}>
                    <EditOffIcon />
                </IconButton>
            </TableCell>
            <TableCell scope="row">
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableCellContainer>
    );
};
export default CartTable;
