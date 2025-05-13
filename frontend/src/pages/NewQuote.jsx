import React, { useState, useEffect } from "react";
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
    destination: "",
    warranty_type: "",
    warranty_rate: "",
    work_type: "",
    cost: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    success: true,
    message: "",
  });

  const navigate = useNavigate();

  // Auto-forçage de la garantie si destination = Habitation
  useEffect(() => {
    if (formData.destination === "Habitation") {
      setFormData((prev) => ({
        ...prev,
        warranty_type: "DO seule",
      }));
    }
  }, [formData.destination]);

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
        body: JSON.stringify({
          ...formData,
          warranty_rate: parseFloat(formData.warranty_rate),
          cost: parseFloat(formData.cost),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erreur lors de la création du devis");
      }

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
          label="Destination de l’ouvrage"
          name="destination"
          value={formData.destination}
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
          disabled={formData.destination === "Habitation"}
        >
          <MenuItem value="DO seule">DO seule</MenuItem>
          <MenuItem value="TRC seule">TRC seule</MenuItem>
        </TextField>
        <TextField
          label="Taux associé à la garantie (%)"
          name="warranty_rate"
          type="number"
          value={formData.warranty_rate}
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
          <MenuItem value="Rénovation légère">Rénovation légère</MenuItem>
          <MenuItem value="Rénovation lourde">Rénovation lourde</MenuItem>
        </TextField>
        <TextField
          label="Coût de l’ouvrage (€)"
          name="cost"
          type="number"
          value={formData.cost}
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
