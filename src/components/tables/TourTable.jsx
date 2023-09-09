import React from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const TourTable = ({ tid, name, duration, ...props }) => {
  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm("Вы действительно хотите удалить " + tid + '?');
    if (res) {
      await deleteDoc(doc(db, "man", tid));
      window?.location?.reload()
    }
  };

  return (
    <TableCellContainer path={`/tour/${tid}`}>
      <TableCell component="th" scope="row">
        {tid}
      </TableCell>

      <TableCell scope="row">{name}</TableCell>
      <TableCell scope="row">{props.price}</TableCell>
      <TableCell scope="row"></TableCell>
      <TableCell scope="row">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableCellContainer>
  );
};
export default TourTable;
