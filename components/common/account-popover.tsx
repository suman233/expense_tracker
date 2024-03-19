import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Theme, alpha } from "@mui/material/styles";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { supabase } from "@/lib/initSupabase";
import { deleteCookie } from "cookies-next";

interface AccountPopoverProps {
  // You can define any additional props here
}

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill"
  },
  {
    label: "Profile",
    icon: "eva:person-fill"
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill"
  }
];

const AccountPopover: React.FC<AccountPopoverProps> = () => {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const router = useRouter();

  // const supabase = createClientComponentClient();
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    deleteCookie('token')
    router.push('/auth/login')
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme: Theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme: Theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
          })
        }}
      >
        <Avatar
          src=""
          alt="test"
          sx={{
            width: 36,
            height: 36,
            border: (theme: Theme) =>
              `solid 2px ${theme.palette.background.default}`
          }}
        >
          A
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            User
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            email
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleClose}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          <Button onClick={handleSignOut}>Logout</Button>
        </MenuItem>
      </Popover>
    </>
  );
};

export default AccountPopover;
