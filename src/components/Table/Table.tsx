import React, { useState } from "react"
import { TableData } from "../../types/TableData"
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import styled from "styled-components";
import { cloneDeep } from 'lodash';


interface Props {
  data: TableData[]
  setLocalData: (newdata: TableData[]) => void
}

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
`;

const Table = ({ data, setLocalData }: Props) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', editable: true, flex: 1 },
    { field: 'name', headerName: 'Name', editable: true, flex: 2 },
    { field: 'email', headerName: 'Email', editable: true, flex: 2 },
    {
      field: 'delete', type: 'actions', headerName: '', width: 300, flex: 1,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteRow(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [updatedData, setUpdatedData] = useState<TableData[]>(cloneDeep(data))

  const processRowUpdate = (newRow: TableData) => {
    const newData = [...updatedData]
    const index = updatedData.findIndex(({ id }) => id === newRow.id)

    if (index < 0) return newRow
    newData[index] = newRow

    setLocalData(newData)
    setUpdatedData(newData)

    return newRow;
  };

  const deleteRow = (id: number | string) => {
    const newData = updatedData.filter((row) => id !== row.id)

    setLocalData(newData)
    setUpdatedData(newData)
  };

  return (
    <StyledBox>
      <DataGrid
        className="dataTable"
        rows={updatedData}
        columns={columns}
        editMode="row"
        disableRowSelectionOnClick
        processRowUpdate={processRowUpdate}
        autoHeight
        sx={{
          display: 'flex',
          width: '100%',
          boxShadow: 2,
        }}
      />
    </StyledBox>
  )
}

export default Table;