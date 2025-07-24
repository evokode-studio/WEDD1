const fetch = require('node-fetch');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para leer JSON
app.use(express.json());

// Ruta que recibe datos del frontend
app.post('/enviar-a-google', async (req, res) => {
  try {
    const data = req.body;

    const response = await fetch('https://script.google.com/macros/s/AKfycbxYihpRoFqIJLdUonE69IfUYI-nElM3kQH_vKkVn-Zl5CGMzw-izGY26dfVNAL8v2d6/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    res.status(200).json({ message: 'Datos enviados a Google Script', result });
  } catch (error) {
    console.error('Error al enviar a Google Script:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
