import DataGridTable from "@/components/Table/DataGridTable";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { supabase } from "@/lib/initSupabase";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const VISIBLE_FIELDS = [
  "name",
  "expense",
  "category",
  "dateCreated",
  "isCosteffective"
];

const expenseRecord = () => {
  // const { data } = useDemoData({
  //   dataSet: "Employee",
  //   visibleFields: VISIBLE_FIELDS,
  //   rowLength: 100
  // });

  const { data: users } = useQuery({
    queryKey: ["userlists"],
    queryFn: async () => {
      const { data } = await supabase.from("users").select();
      console.log(data);

      return data
    }
  });

  console.log("users", users);

  // const fetchCountries = async () => {
  //   const { data: countries } = await supabase
  //     .from('countries')
  //     .select('*')
  //     .order('name', true);
  //   setCountries(countries);
  // };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120, sortable: true },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true
    },
    {
      field: "email",
      headerName: "Email",
      width: 140,
      editable: true
    },
    {
      field: "address",
      headerName: "Address",
      width: 140,
      editable: true
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 180,
      editable: true
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <Button variant="contained">Actions</Button>
    }
  ];

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center"
            }}
          >
            Users Page
          </Typography>
          <Button variant="contained" color="inherit">
            Add New User
          </Button>
        </Stack>

        <Card>
          <CardContent>
            {/* <Grid container spacing={4}>
              {/* <pre>{JSON.stringify(notes, null, 2)}</pre> 
              {Array.isArray(note) &&
                note?.map((item, i) => {
                  return (
                    <Grid item xs={4}>
                      <Paper sx={{ mx: 2 }}>
                        <Typography>{JSON.stringify(item?.title)}</Typography>
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid> */}

            <DataGridTable
              columns={columns}
              rows={users as any[] ?? ""}
              loading={false}
            />
          </CardContent>
        </Card>
      </Container>
    </DashboardLayout>
  );
};

export default expenseRecord;