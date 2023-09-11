import { useTheme } from "@emotion/react";
import { Anchor, Box, Loader, useMantineTheme } from "@mantine/core";
import Papa from "papaparse";
import React from "react";
import DataTable from "react-data-table-component";

import { Download } from "tabler-icons-react";

const customStyles = {
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: 600,
    },
  },
  rows: {
    style: {
      fontSize: "14px",
    },
  },
};

const DataGrid = ({ columns, data, type, ...props }) => {
  const theme = useMantineTheme();

  const actionsMemo = React.useMemo(() => {
    data?.forEach((element) => {
      delete element?.id;
    });
    let csv = Papa.unparse(data);
    return (
      <Anchor
        href={`data:text/csv;charset=utf-8,${encodeURI(csv)}`}
        download={`${type}.csv`}
        color="purple"
      >
        <Download />
      </Anchor>
    );
  }, [data, type]);

  return (
    <Box
      style={{
        border: "2px solid #E5E5E5",
        borderRadius: "10px",
        overflow: "hidden",
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <DataTable
        columns={columns}
        data={data}
        pagination
        responsive
        subHeaderAlign="right"
        subHeaderWrap
        // selectableRows
        progressComponent={<Loader my={10} color={theme.primaryColor} />}
        // actions={actionsMemo}
        customStyles={customStyles}
        {...props}
      />
    </Box>
  );
};

export default DataGrid;
