// import { loginMutation, loginMutationPayload } from "@/api/functions/user.api";
// import { useAppSelector } from "@/hooks/redux/useAppSelector";
// import validationText from "@/json/messages/validationText";
// import { setCookieClient } from "@/lib/functions/storage.lib";
// import { emailRegex } from "@/lib/regex";
// import { setAccessToken } from "@/reduxtoolkit/slices/userSlice";
// import LoadingButton from "@mui/lab/LoadingButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import { useMutation } from "@tanstack/react-query";

// export default function LoginView() {
//   const { isLoggedIn } = useAppSelector((s) => s.userSlice);

//   const { mutate, isPending } = useMutation({
//     mutationFn: loginMutation
//   });

//   const handleLogin = (data: loginMutationPayload) => {
//     setCookieClient(process.env.NEXT_APP_TOKEN_NAME!!, "test@1234");
//     dispatch(setAccessToken("test@1234"));
//     router.push("/dashboard");
//     // mutate(
//     //   { ...data },
//     //   {
//     //     onSuccess: (res) => {
//     //       if (res?.status === "success") {
//     //         if (res?.data) {
//     //           toast.success(messages.success.loginsuccess(res?.data?.name));
//     //           //   dispatch(setAccessToken(access));
//     //           //   dispatch(setUserData(userData));
//     //           router.push("/dashboard/branch");
//     //         }
//     //       }
//     //     }
//     //   }
//     // );
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       router.push("/dashboard");
//     }
//   }, [isLoggedIn]);

//   return (
//      <>
//      enter JSX component
//      </>
//   );
// }

"use client";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import Logo from "@/components/logo/logo";
import validationText from "@/json/messages/validationText";
import { emailRegex } from "@/lib/regex";
import { setAccessToken } from "@/reduxtoolkit/slices/userSlice";
import { bgGradient } from "@/themes/css";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { supabase } from "@/lib/initSupabase";
import CustomInput from "@/ui/Inputs/CustomInput";
import { Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { toast } from "sonner";
import * as yup from "yup";
import { setCookieClient } from "@/lib/functions/storage.lib";

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email)
    .matches(emailRegex, validationText.error.email_format),

  password: yup.string().trim().required(validationText.error.enter_password)
});

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      email: "",
      password: ""
    }
  });
  // const supabase = createClientComponentClient();
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const resp = await supabase.auth.signInWithPassword(data);
      console.log("resp", resp);
      if (resp.data.session?.user) {
        setCookieClient(process.env.NEXT_APP_TOKEN_NAME!!, resp.data.session.access_token);
        dispatch(setAccessToken(resp.data.session.access_token));
        router.push("/dashboard");
        localStorage.setItem("userid", resp.data.session.user.id);
        localStorage.setItem(
          "username",
          resp.data.user.email?.slice(0, 5) as string
        );
        toast.success("Logged in successfully");
        setCookie("token", resp.data.session.access_token);

        setCookie("username", resp.data.user.email?.slice(0, 5) as string);
        return resp;
      } else if (resp.error) {
        toast.error(resp.error.message);
        return resp;
      }
    } catch (error) {
      console.log(error, "err");
    }
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            ...bgGradient({
              color: alpha(theme.palette.background.default, 0.9),
              imgUrl: "/assets/background/overlay_4.jpg"
            }),
            height: "100vh"
          }}
        >
          <Logo
            sx={{
              position: "fixed",
              top: { xs: 16, md: 24 },
              left: { xs: 16, md: 24 }
            }}
          />

          <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
            <Card
              sx={{
                p: 5,
                width: 1,
                maxWidth: 420
              }}
            >
              <Typography variant="h4">Login</Typography>
              <Divider sx={{ my: 3 }} />
              <Box component="form" onSubmit={handleSubmit(handleSignIn)}>
                <Stack spacing={3}>
                  <CustomInput
                    placeholder="Enter email"
                    type="email"
                    {...register("email")}
                    helperText={errors.email?.message}
                  />

                  <CustomInput
                    placeholder="Enter Password"
                    {...register("password")}
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    helperText={errors.password?.message}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <RemoveRedEyeIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />

                  <LoadingButton
                    fullWidth
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    // onClick=
                  >
                    Login
                  </LoadingButton>
                </Stack>
              </Box>
              Don't have an account? &nbsp;
              <Button onClick={() => router.push("/auth/register")}>
                Sign up
              </Button>
            </Card>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
