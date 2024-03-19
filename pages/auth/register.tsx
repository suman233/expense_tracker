"use client";

import { supabase } from "@/lib/initSupabase";
import CustomInput from "@/ui/Inputs/CustomInput";
import { Box, Button, Container, Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import { toast } from "sonner";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password
    });
    router.push('/auth/login');
    toast.success('Registered Successfully')
  };
  return (
    <Container>
     <Box sx={{ m: "auto", width: "20%", mt: 20, textAlign: "center" }}>
          <Typography variant="h3" textAlign={"center"}>
            Register Form
          </Typography>
          <form>
            <CustomInput
              sx={{ my: 2 }}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />{" "}
            <br />
            <CustomInput
              sx={{ my: 2 }}
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />{" "}
            <br />
          <Button variant="contained" color="success" onClick={handleSignUp}>Sign Up</Button>
        </form>
        Already have an account? 
        <button onClick={() => router.push("/auth/login")}>Login here</button>
      </Box>
    </Container>
  );
};

export default signup;
