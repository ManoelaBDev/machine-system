"use client";

import { Button, Typography, Stack } from "@mui/joy";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" minHeight="60vh">
      <Typography level="h2">Bem-vindo ao sistema de Gerenciamento de Máquinas</Typography>
      <Typography>Atualmente estamos na Home Page.</Typography>
      <Typography>Navegue até a seção de máquinas para gerenciá-las.</Typography>

      <Button
        onClick={() => router.push("/pages/machines")}
        variant="solid"
        color="primary"
        size="lg"
      >
        Ir para Máquinas
      </Button>
    </Stack>
  );
}
