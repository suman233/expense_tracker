import DataGridTable from "@/components/Table/DataGridTable";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { supabase } from "@/lib/initSupabase";
import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

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

  // const [expenses, setExpenses] = useState([]);
  // useEffect(() => {
  //   async function fetchExpenses() {
  //     const { data: expens } = await supabase.from("expenses").select();
  //     setExpenses(expens as any);
  //   }
  //   fetchExpenses();
  // }, []);
  const { data: expenses,refetch } = useQuery({
    queryKey: ["expenselists"],
    queryFn: async () => {
      const { data } = await supabase.from("expenses").select();
      console.log(data);

      return data;
    },
    refetchOnMount: true
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await supabase
        .from("expenses")
        .select();
      console.log(data);

      return data;
    },
    mutationKey: ["expenselists"],
    // refetch: expenses
  });
  // const { data, error } =
  // useEffect(() => {
  //   mutate();
  // }, []);

  const onSubmit = async () => {
    // let expensedata = new FormData();

    const { data } = await supabase
      .from("expenses")
      .insert([{ name: "someValue", expense: 2354 }])
      .select();
    mutate(data as any, {
      onSuccess: (res: any) => {
        toast.success("Expense added successfully");
      }
    });
  };

  useEffect(()=>{
    expenses
  }, [])
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120, sortable: true },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true
    },
    {
      field: "expense",
      headerName: "Expenses (Rs.)",
      width: 140,
      editable: true
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <Button variant="contained">Action</Button>
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
            Expense Page
          </Typography>
          <Button variant="contained" color="inherit" onClick={onSubmit}>
            Add New Expense
          </Button>
        </Stack>

        <Card>
          <CardContent>
            <DataGridTable
              columns={columns}
              rows={(expenses as any[]) ?? ""}
              loading={false}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 8
                  }
                }
              }}
              pageSizeOptions={[10, 25]}
          
            />
          </CardContent>
        </Card>
      </Container>
    </DashboardLayout>
  );
};

export default expenseRecord;
