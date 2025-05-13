import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Home() {
  const [quotes, setQuotes] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_URL}/quotes`)
      .then((res) => res.json())
      .then(setQuotes);
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Liste des Devis
      </Typography>
      <Box
        sx={{
          height: "3px",
          width: "80px",
          backgroundColor: "#00008F",
          mb: 3,
          borderRadius: "2px",
        }}
      />
      <Button variant="contained" color="primary" href="/new">
        Créer un nouveau devis
      </Button>

      <Paper sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Opportunité</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Type de bien</TableCell>
              <TableCell>Garantie</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Travaux</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Documents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes.map((q) => (
              <TableRow key={q.id}>
                <TableCell>{q.opportunity_number}</TableCell>
                <TableCell>{q.client_name}</TableCell>
                <TableCell>{q.property_type}</TableCell>
                <TableCell>{q.warranty_type}</TableCell>
                <TableCell>{q.destination}</TableCell>
                <TableCell>{q.work_type}</TableCell>
                <TableCell>
                  {new Date(q.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <a
                    href={`${API_URL}/quotes/${q.id}/document?type=pdf`}
                    target="_blank"
                  >
                    PDF
                  </a>{" "}
                  |{" "}
                  <a
                    href={`${API_URL}/quotes/${q.id}/document?type=docx`}
                    target="_blank"
                  >
                    DOCX
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
