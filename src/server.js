const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());
app.use(bodyParser.json());

app.post('/api/personas/agregar', agregarPersona);
app.put('/api/personas/editar/:id', editarPersona);
app.post('/api/colectivos/agregar', agregarColectivo);
app.put('/api/colectivos/editar/:id', editarColectivo);
app.post('/api/viajes/agregar', agregarViaje);
app.put('/api/viajes/editar/:id', editarViaje);

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});


function agregarPersona(req, res) {
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
}

function editarPersona(req, res) {

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
}


function agregarColectivo(req, res) {
  const nuevoColectivo = req.body;

  // Leer el archivo colectivos.json
  fs.readFile('assets/colectivos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    // Parsear el contenido del archivo a un array de colectivos
    const colectivos = JSON.parse(data);

    // Asignar un nuevo ID a la colectivo
    nuevoColectivo.id = colectivos.length + 1;

    // Agregar la nueva colectivo al array
    colectivos.push(nuevoColectivo);
    
    // Escribir el array actualizado de colectivos en el archivo colectivos.json
    fs.writeFile('assets/colectivos.json', JSON.stringify(colectivos, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al escribir en el archivo de colectivos' });
            return;
        }
    
        res.status(200).json({ message: 'colectivo guardado exitosamente' });
        });
  });
}


function editarColectivo(req, res) {

  const colectivoEditado = req.body;

  // Leer el archivo personas.json
  fs.readFile('assets/colectivos.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.sendStatus(500);
          return;
      }
  
      // Parsear el contenido del archivo a un array de colectivos
      const colectivos = JSON.parse(data);
  
      const colectivoId = req.params.id; // Obtener el ID de la colectivo desde los parámetros de la URL
      const colectivoIndex = colectivos.findIndex((colectivo) => colectivo.id === parseInt(colectivoId));

      if (colectivoIndex === -1) {
      res.status(404).json({ error: 'colectivo no encontrado' });
      return;
      }

      // Obtener la colectivo encontrada
      const colectivoExistente = colectivos[colectivoIndex];
      const colectivoActualizado = { ...colectivoExistente, ...colectivoEditado };
      //reemplazo en la lista
      colectivos[colectivoIndex] = colectivoActualizado;

    
      // Escribir el array actualizado de colectivos en el archivo colectivos.json
      fs.writeFile('assets/colectivos.json', JSON.stringify(colectivos, null, 2), 'utf8', (err) => {
          if (err) {
              console.error(err);
              res.status(500).json({ error: 'Error al escribir en el archivo de colectivos' });
              return;
          }
      
          res.status(200).json({ message: 'colectivo editado exitosamente' });
          });
  });
}


function agregarViaje(req, res) {
  const nuevaviaje = req.body;

  // Leer el archivo viajes.json
  fs.readFile('assets/viajes.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    // Parsear el contenido del archivo a un array de viajes
    const viajes = JSON.parse(data);

    // Asignar un nuevo ID a la viaje
    nuevaviaje.id = viajes.length + 1;

    // Agregar la nueva viaje al array
    viajes.push(nuevoviaje);
    
    // Escribir el array actualizado de viajes en el archivo viajes.json
    fs.writeFile('assets/viajes.json', JSON.stringify(viajes, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al escribir en el archivo de viajes' });
            return;
        }
    
        res.status(200).json({ message: 'viaje guardado exitosamente' });
        });
  });
}

function editarViaje(req, res) {

  const viajeEditado = req.body;

  // Leer el archivo personas.json
  fs.readFile('assets/viajes.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.sendStatus(500);
          return;
      }
  
      // Parsear el contenido del archivo a un array de viajes
      const viajes = JSON.parse(data);
  
      const viajeId = req.params.id; // Obtener el ID de la viaje desde los parámetros de la URL
      const viajeIndex = viajes.findIndex((viaje) => viaje.id === parseInt(viajeId));

      if (viajeIndex === -1) {
      res.status(404).json({ error: 'viaje no encontrado' });
      return;
      }

      // Obtener la viaje encontrada
      const viajeExistente = viajes[viajeIndex];
      const viajeActualizado = { ...viajeExistente, ...viajeEditado };
      //reemplazo en la lista
      viajes[viajeIndex] = viajeActualizado;

    
      // Escribir el array actualizado de viajes en el archivo viajes.json
      fs.writeFile('assets/viajes.json', JSON.stringify(viajes, null, 2), 'utf8', (err) => {
          if (err) {
              console.error(err);
              res.status(500).json({ error: 'Error al escribir en el archivo de viajes' });
              return;
          }
      
          res.status(200).json({ message: 'viaje editado exitosamente' });
          });
  });
}
