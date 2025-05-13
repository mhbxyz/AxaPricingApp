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

export default function Home() {
  const [quotes, setQuotes] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/quotes")
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
              <TableCell>Tarif</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Documents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes.map((q) => (
              <TableRow key={q.id}>
                <TableCell>{q.opportunity_number}</TableCell>
                <TableCell>{q.client_name}</TableCell>
                <TableCell>{q.form_data?.tarif || "—"}</TableCell>
                <TableCell>{q.date || "—"}</TableCell>
                <TableCell>
                  <a
                    href={`http://localhost:5000/quotes/${q.id}/document?type=pdf`}
                    target="_blank"
                  >
                    PDF
                  </a>{" "}
                  |{" "}
                  <a
                    href={`http://localhost:5000/quotes/${q.id}/document?type=docx`}
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
