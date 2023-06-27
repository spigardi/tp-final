const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());
app.use(bodyParser.json());

app.post('/api/personas/agregar', (req, res) => {
  const nuevaPersona = req.body;

  // Leer el archivo personas.json
  fs.readFile('assets/personas.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    // Parsear el contenido del archivo a un array de personas
    const personas = JSON.parse(data);

    // Asignar un nuevo ID a la persona
    nuevaPersona.id = personas.length + 1;

    // Agregar la nueva persona al array
    personas.push(nuevaPersona);
    
    // Escribir el array actualizado de personas en el archivo personas.json
    fs.writeFile('assets/personas.json', JSON.stringify(personas, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al escribir en el archivo de personas' });
            return;
        }
    
        res.status(200).json({ message: 'Persona guardada exitosamente' });
        });
  });
});

app.put('/api/personas/editar/:id', (req, res) => {

    const personaEditada = req.body;
  
    // Leer el archivo personas.json
    fs.readFile('assets/personas.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
    
        // Parsear el contenido del archivo a un array de personas
        const personas = JSON.parse(data);
    
        const personaId = req.params.id; // Obtener el ID de la persona desde los parámetros de la URL
        const personaIndex = personas.findIndex((persona) => persona.id === parseInt(personaId));

        if (personaIndex === -1) {
        res.status(404).json({ error: 'Persona no encontrada' });
        return;
        }

        // Obtener la persona encontrada
        const personaExistente = personas[personaIndex];
        const personaActualizada = { ...personaExistente, ...personaEditada };
        //reemplazo en la lista
        personas[personaIndex] = personaActualizada;

      
        // Escribir el array actualizado de personas en el archivo personas.json
        fs.writeFile('assets/personas.json', JSON.stringify(personas, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al escribir en el archivo de personas' });
                return;
            }
        
            res.status(200).json({ message: 'Persona editada exitosamente' });
            });
    });
  });

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});