import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box, Container } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineDescription } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TbCategoryPlus } from "react-icons/tb";
import { supabase } from "@/lib/initSupabase";

export default function Transaction() {
  const [value, setValue] = useState<Dayjs | null>(dayjs()); // Initialize with current date
  const { register, control, handleSubmit, reset } = useForm();
  // console.log(supabase);
  const router = useRouter();

  const { data: categories } = useQuery({
    queryKey: ["catlists"],
    queryFn: async () => {
      const { data } = await supabase.from("category").select();
      console.log(data);

      return data;
    }
  });

  console.log("cats", categories);

  return (
      <Container style={{ marginTop: "2rem", fontFamily: "ui-rounded" }}>
        <Grid container spacing={20}>
          <Grid item xs={12} md={6}>
            <Box style={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                New Transaction
              </Typography>

              <Typography variant="h2" sx={{ mb: 5 }}>
                Rs. 170
              </Typography>

              <form onSubmit={handleSubmit((data) => console.log(data))}>
                <Box className="form_grp">
                  <Typography sx={{ mb: 3 }}>
                    <p style={{ fontSize: "1rem", fontWeight: "300" }}>
                      Select date :{" "}
                      <span>
                        <SlCalender /> {value?.format("YYYY-MM-DD")}
                      </span>
                    </p>
                  </Typography>
                </Box>

                <Typography sx={{ mb: 3 }}>
                  <p style={{ fontSize: "1rem", fontWeight: "800" }}>Expense</p>
                </Typography>

                <Box
                  className="form_grp"
                  sx={{ position: "relative", width: "100%" }}
                >
                  <TextField
                    required
                    placeholder="Description"
                    {...register("description")}
                    sx={{ marginBottom: 1, width: "100%" }}
                  />
                  <MdOutlineDescription
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)"
                    }}
                  />
                </Box>

                <Box>
                  <Typography style={{ textAlign: "left" }}>
                    Category
                  </Typography>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          color: "black"
                        }}
                        inputProps={{ "aria-label": "Without label" }}
                        {...field}
                        defaultValue=""
                        {...register("category")}
                      >
                        {Array.isArray(categories) &&
                          categories?.map((item, i) => {
                            return (
                            
                                <MenuItem key={i} value={item}>
                                  {item?.category_name}
                                </MenuItem>
                              
                            );
                          })}
                      </Select>
                    )}
                  />
                </Box>

                <Button
                  variant="outlined"
                  type="submit"
                  style={{
                    width: "18rem",
                    marginTop: "10px",
                    borderRadius: "20px"
                  }}
                  onClick={() => router.push("/expenserecord")}
                >
                  {" "}
                  Add Transaction
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={value}
                  {...register("value")}
                  onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
            </Box>
            <Box>
              <Typography sx={{ my: 5 }} style={{ textAlign: "center" }}>
                <TbCategoryPlus /> New Category
              </Typography>
              <Grid container spacing={4}>
                {categories &&
                  categories?.map((item) => {
                    return (
                      <Grid item md={3} sm={4} xs={12}>
                        <span key={item.id}>
                          <Chip label={item.category_name} />
                        </span>
                      </Grid>
                    );
                  })}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
  );
}

