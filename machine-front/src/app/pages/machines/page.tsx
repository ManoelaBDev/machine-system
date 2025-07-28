"use client";

import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import MuiLink from "@mui/joy/Link"; 
import Typography from "@mui/joy/Typography";
import Link from "next/link";

// Ícones
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

// Componentes da UI
import Sidebar from "@/components/MachineMui/Sidebar";
import Header from "@/components/MachineMui/Header";
import MachineTable from "@/components/MachineMui/MachineTable";

export default function HomePage() {
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: "calc(12px + var(--Header-height))",
            sm: "calc(12px + var(--Header-height))",
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100dvh",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon />}
            sx={{ pl: 0 }}
          >
            <MuiLink
              component={Link}
              underline="none"
              color="neutral"
              href="/"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </MuiLink>
            <MuiLink
              component={Link}
              underline="hover"
              color="neutral"
              href="/dashboard" 
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Dashboard
            </MuiLink>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              Orders
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            display: "flex",
            mb: 1,
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "start", sm: "center" },
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h2" component="h1">
            Máquinas Disponíveis
          </Typography>
          <Button
            color="primary"
            startDecorator={<DownloadRoundedIcon />}
            size="sm"
          >
            Imprimir
          </Button>
        </Box>
        <MachineTable />
      </Box>
    </Box>
  );
}