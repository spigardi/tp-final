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
app.delete('/api/personas/eliminar/:id', eliminarPersona);
app.post('/api/colectivos/agregar', agregarColectivo);
app.put('/api/colectivos/editar/:id', editarColectivo);
app.delete('/api/colectivos/eliminar/:id', eliminarColectivo);
app.post('/api/viajes/agregar', agregarViaje);
app.put('/api/viajes/editar/:id', editarViaje);
app.delete('/api/viajes/eliminar/:id', eliminarViaje);
app.post('/api/viajes/pasajeros/agregar/:viajeId/:personId', agregarPasajero);
app.delete('/api/viajes/pasajeros/eliminar/:viajeId/:personId', eliminarPasajero);

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
    nuevaPersona.id = personas[personas.applength-1].id + 1;

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

function eliminarPersona(req,res) {
  const id = req.params.id;

  // Leer el archivo personas.json
  fs.readFile('assets/personas.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    try {
      // Parsear el contenido del archivo JSON
      const personas = JSON.parse(data);

      // Encontrar y eliminar el persona con el ID especificado
      const index = personas.findIndex((persona) => persona.id === parseInt(id));
      if (index !== -1) {
        personas.splice(index, 1);
      } else {
        res.status(404).send('persona no encontrado');
        return;
      }

      // Guardar los cambios en el archivo personas.json
      fs.writeFile('assets/personas.json', JSON.stringify(personas, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error interno del servidor');
          return;
        }

        //res.send('persona eliminado exitosamente');
        res.status(200).json({ message: 'persona eliminado exitosamente' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    }
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
    nuevoColectivo.id = colectivos[colectivos.length-1].id + 1;

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

function eliminarColectivo(req,res) {
  const id = req.params.id;

  // Leer el archivo colectivos.json
  fs.readFile('assets/colectivos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    try {
      // Parsear el contenido del archivo JSON
      const colectivos = JSON.parse(data);

      // Encontrar y eliminar el colectivo con el ID especificado
      const index = colectivos.findIndex((colectivo) => colectivo.id === parseInt(id));
      if (index !== -1) {
        colectivos.splice(index, 1);
      } else {
        res.status(404).send('colectivo no encontrado');
        return;
      }

      // Guardar los cambios en el archivo colectivos.json
      fs.writeFile('assets/colectivos.json', JSON.stringify(colectivos, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error interno del servidor');
          return;
        }

        //res.send('colectivo eliminado exitosamente');
        res.status(200).json({ message: 'colectivo eliminado exitosamente' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    }
  });
}

function agregarViaje(req, res) {
  const nuevoViaje = req.body;
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
    nuevoViaje.id = viajes[viajes.length-1].id + 1;
    nuevoViaje.pasajeros = [];

    // Agregar la nueva viaje al array
    viajes.push(nuevoViaje);
    
    
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

function eliminarViaje(req,res) {
  const id = req.params.id;

  // Leer el archivo viajes.json
  fs.readFile('assets/viajes.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    try {
      // Parsear el contenido del archivo JSON
      const viajes = JSON.parse(data);

      // Encontrar y eliminar el viaje con el ID especificado
      const index = viajes.findIndex((viaje) => viaje.id === parseInt(id));
      if (index !== -1) {
        viajes.splice(index, 1);
      } else {
        res.status(404).send('Viaje no encontrado');
        return;
      }

      // Guardar los cambios en el archivo viajes.json
      fs.writeFile('assets/viajes.json', JSON.stringify(viajes, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error interno del servidor');
          return;
        }

        //res.send('Viaje eliminado exitosamente');
        res.status(200).json({ message: 'Viaje eliminado exitosamente' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    }
  });
}

function agregarPasajero(req,res) {

  const viajeId = req.params.viajeId;
  const personId = req.params.personId;

  // Leer el archivo viajes.json
  fs.readFile('assets/viajes.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.sendStatus(500);
          return;
      }
  
      // Parsear el contenido del archivo a un array de viajes
      let viajes = JSON.parse(data);
  
      //Obtener el index del viaje
      const viajeIndex = viajes.findIndex((viaje) => viaje.id === parseInt(viajeId));

      if (viajeIndex === -1) {
      res.status(404).json({ error: 'viaje no encontrado' });
      return;
      }

      // Obtener el viaje encontrado
      let viajeExistente = viajes[viajeIndex];

      //obtener la lista de personas
      fs.readFile('assets/personas.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
    
        // Parsear el contenido del archivo a un array de personas
        const personas = JSON.parse(data);

        const personaIndex = personas.findIndex((persona) => persona.id === parseInt(personId));
  
        if (personaIndex === -1) {
        res.status(404).json({ error: 'Persona no encontrada' });
        return;
        }
  
        // Obtener la persona encontrada
        const personaExistente = personas[personaIndex];
        // Agregarla al listado de pasajeros del viaje a editar
        viajeExistente.pasajeros.push(personaExistente);
        //reemplazo en la lista
        viajes[viajeIndex] = viajeExistente;

      
        // Escribir el array actualizado de viajes en el archivo viajes.json
        fs.writeFile('assets/viajes.json', JSON.stringify(viajes, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al escribir en el archivo de viajes' });
                return;
            }
        
            res.status(200).json({ message: 'viaje editado exitosamente', pasajero: personaExistente });
            });
    });
  });


}

function eliminarPasajero(req,res) {

  const viajeId = req.params.viajeId;
  const personId = req.params.personId;

  // Leer el archivo viajes.json
  fs.readFile('assets/viajes.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.sendStatus(500);
          return;
      }
  
      // Parsear el contenido del archivo a un array de viajes
      let viajes = JSON.parse(data);
  
      //Obtener el index del viaje
      const viajeIndex = viajes.findIndex((viaje) => viaje.id === parseInt(viajeId));

      if (viajeIndex === -1) {
      res.status(404).json({ error: 'viaje no encontrado' });
      return;
      }

      // Obtener el viaje encontrado
      let viajeExistente = viajes[viajeIndex];

      //buscar en los pasajeros de ese viaje el id de la persona a eliminar
      const personaIndex = viajeExistente.pasajeros.findIndex((persona) => persona.id === parseInt(personId));
      if (personaIndex !== -1) {
        viajeExistente.pasajeros.splice(personaIndex, 1);
      } else {
        res.status(404).send('Viaje no encontrado');
        return;
      }
      //reemplazo en la lista
      viajes[viajeIndex] = viajeExistente;


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


/*
function obtenerColectivo(patente){
    // Leer el archivo colectivos.json
  fs.readFile('assets/colectivos.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
    // Parsear el contenido del archivo a un array de colectivos
    const colectivos = JSON.parse(data);

    const colectivoIndex = colectivos.findIndex((colectivo) => colectivo.patente === patente);

    if (colectivoIndex === -1) {
    res.status(404).json({ error: 'colectivo no encontrado' });
    return;
    }

    // Obtener el colectivo encontrado
    return colectivos[colectivoIndex];
});
}*/