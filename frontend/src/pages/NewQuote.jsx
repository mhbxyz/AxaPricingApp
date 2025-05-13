import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NewQuote() {
  const [formData, setFormData] = useState({
    opportunity_number: "",
    client_name: "",
    chiffre_affaires: "",
    surface: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    success: true,
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      opportunity_number: formData.opportunity_number,
      client_name: formData.client_name,
      form_data: {
        chiffre_affaires: Number(formData.chiffre_affaires),
        surface: Number(formData.surface),
      },
    };

    try {
      const res = await fetch("http://localhost:5000/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur lors de la création du devis");

      setSnackbar({
        open: true,
        success: true,
        message: "Devis créé avec succès",
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setSnackbar({ open: true, success: false, message: err.message });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Créer un nouveau devis
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Numéro d'opportunité"
          name="opportunity_number"
          value={formData.opportunity_number}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Nom du client"
          name="client_name"
          value={formData.client_name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Chiffre d'affaires (€)"
          name="chiffre_affaires"
          type="number"
          value={formData.chiffre_affaires}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Surface (m²)"
          name="surface"
          type="number"
          value={formData.surface}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Valider
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.success ? "success" : "error"}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
