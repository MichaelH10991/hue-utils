import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { GridToolbarContainer, useGridApiRef } from "@mui/x-data-grid-pro";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function EditToolbar(props) {
  const { handleAddRow } = props;

  // const handleClick = () => {
  //   const id = uuidv4();
  //   console.log(apiRef);
  //   apiRef.current.updateRows([{ id, isNew: true }]);
  //   apiRef.current.startRowEditMode({ id });

  //   // Wait for the grid to render with the new row
  //   setTimeout(() => {
  //     apiRef.current.scrollToIndexes({
  //       rowIndex: apiRef.current.getRowsCount() - 1,
  //     });

  //     apiRef.current.setCellFocus(id, "name");
  //   });
  // };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRow}>
        Add Item
      </Button>
    </GridToolbarContainer>
  );
}

// EditToolbar.propTypes = {
//   apiRef: PropTypes.shape({
//     current: PropTypes.object.isRequired,
//   }).isRequired,
// };

/**
 *
 * @param {*} param0
 * @returns
 */
export default function BasicEditingGrid({ columns, update, weekday, api }) {
  const apiRef = useGridApiRef();
  const [rows, setRows] = React.useState([]);

  const deleteRow = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        api.delete_single_shopping_item(id);
      });
    },
    []
  );

  columns.push({
    field: "actions",
    type: "actions",
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={deleteRow(params.id)}
      />,
    ],
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await api.get_shopping_list_for_weekday(weekday);
      if (result) {
        setRows(result[weekday]);
      } else {
        setRows([]);
      }
    };

    fetchData();
  }, []);

  // const processRowUpdate1 = async (newRow) => {
  //   console.log({ ...newRow, isNew: false });
  //   return { ...newRow, isNew: false };
  // };

  const processRowUpdate = React.useCallback(async (value) => {
    setRows((prevRows) => {
      return prevRows.map((prevRow) => {
        if (prevRow.id === value.id) {
          return { ...prevRow, ...value };
        }
        return prevRow;
      });
    });
    update(value);
    return value;
  });

  const handleAddRow = () => {
    const id = uuidv4();
    setRows((prevRows) => {
      return [...prevRows, { id, weekday }];
    });
  };

  return (
    <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
      <DataGrid
        rows={rows}
        processRowUpdate={processRowUpdate}
        // onCellEditStop={update}
        columns={columns}
        apiRef={apiRef}
        // editMode="row"
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { handleAddRow },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}
