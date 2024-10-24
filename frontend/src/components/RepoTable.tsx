import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom"; // useNavigate in the parent component
import data from "../data/dummy.json";
import { Chip, Link } from "@mui/material";

export default function RepoTable() {
  const navigate = useNavigate(); // Hook should be used here, in the parent component

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      hideable:true
    },
    {
      field: "full_name",
      headerName: "Repo Name",
      width: 250,
      renderCell: (params) => (
        <Link href={params.row.html_url} target="_blank">
          {params.row.full_name}
        </Link>
      ),
    },
    {
      field: "stargazers_count",
      headerName: "stars",
      width: 160,
    },
    {
      field: "forks_count",
      headerName: "Forks",
      type: "number",
      width: 160,
    },
    {
      field: "owner.login",
      headerName: "Origin and Pedigree",
      width: 160,
      renderCell: (params) => (
        <Chip label={params.row.owner.login ? params.row.owner.login : "N/A"} />
      ),
    },
    {
      field: "updated_at",
      headerName: "Support ( last updated )",
      width: 250,
    },
    {
      field: "license.name",
      headerName: "License",
      width: 200,
      renderCell: (params) => (
        <Chip label={params.row.license ? (params.row.license.name || "No License") : "No License"} />
      ),
    },

    {
      field: "html_url",
      headerName: "Details Page",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Use the navigate function from the parent RepoTable component
            navigate(`/repo/${params.row.id}`);
          }}
        >
          View DETAILS
        </Button>
      ),
    },
  ];

  const rows = data.items;

  return (
    <Box sx={{ height: "90%", width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
