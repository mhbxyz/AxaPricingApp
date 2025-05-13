import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function NewQuote() {
  const [formData, setFormData] = useState({
    opportunity_number: "",
    client_name: "",
    property_type: "",
    warranty_type: "",
    destination: "",
    work_type: "",
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

    try {
      const res = await fetch(`${API_URL}/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
          select
          label="Type de bien"
          name="property_type"
          value={formData.property_type}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="Habitation">Habitation</MenuItem>
          <MenuItem value="Hors habitation">Hors habitation</MenuItem>
        </TextField>
        <TextField
          select
          label="Type de garantie"
          name="warranty_type"
          value={formData.warranty_type}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="DO seule">DO seule</MenuItem>
          <MenuItem value="DO + TRC">DO + TRC</MenuItem>
        </TextField>
        <TextField
          label="Destination de l’ouvrage"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          select
          label="Type de travaux"
          name="work_type"
          value={formData.work_type}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="Ouvrage neuf">Ouvrage neuf</MenuItem>
          <MenuItem value="Rénovation">Rénovation</MenuItem>
        </TextField>

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
