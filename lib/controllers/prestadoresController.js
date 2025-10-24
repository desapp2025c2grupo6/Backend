import db from '../models';

const Prestador = db.Prestador;

function obtenerPrestadores(req, res) {
  Prestador.findAll()
    .then((prestadores) => {
      res.json({ data: prestadores.map((p) => p.toJSON()) });
    })
    .catch((error) => {
      console.error('Error al obtener prestadores:', error);
      res.status(500).json({ message: 'Error al obtener prestadores' });
    });
}

function obtenerPrestadorPorId(req, res) {
  const { id } = req.params;
  Prestador.findByPk(id)
    .then((prestador) => {
      if (prestador) {
        res.json({ data: prestador.toJSON() });
      } else {
        res
          .status(404)
          .json({ message: `No se encontró un prestador con id ${id}` });
      }
    })
    .catch((error) => {
      console.error(`Error al obtener el prestador con id ${id}:`, error);
      res.status(500).json({ message: 'Error al obtener el prestador' });
    });
}

function crearPrestador(req, res) {
  const {
    nombre,
    apellido,
    CUIT,
    especialidad,
    diasAtencion,
    horarioAtencion,
  } = req.body;
  Prestador.create({
    nombre,
    apellido,
    CUIT,
    especialidad,
    diasAtencion,
    horarioAtencion,
  })
    .then((nuevo) => {
      res.status(201).json({ data: nuevo.toJSON() });
    })
    .catch((error) => {
      console.error('Error al crear prestador:', error);
      res.status(500).json({ message: 'Error al crear prestador' });
    });
}

function actualizarPrestador(req, res) {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    CUIT,
    especialidad,
    diasAtencion,
    horarioAtencion,
  } = req.body;
  Prestador.findByPk(id)
    .then((p) => {
      if (!p) {
        return res
          .status(404)
          .json({ message: `No se encontró un prestador con id ${id}` });
      }
      return p
        .update({
          nombre,
          apellido,
          CUIT,
          especialidad,
          diasAtencion,
          horarioAtencion,
        })
        .then((updated) => {
          res.json({ data: updated.toJSON() });
        });
    })
    .catch((error) => {
      console.error(`Error al actualizar prestador con id ${id}:`, error);
      res.status(500).json({ message: 'Error al actualizar prestador' });
    });
}

function eliminarPrestador(req, res) {
  const { id } = req.params;
  Prestador.findByPk(id)
    .then((p) => {
      if (!p) {
        return res
          .status(404)
          .json({ message: `No se encontró un prestador con id ${id}` });
      }
      return p.destroy().then(() => {
        res.status(200).json({ message: 'Prestador eliminado' });
      });
    })
    .catch((error) => {
      console.error(`Error al eliminar prestador con id ${id}:`, error);
      res.status(500).json({ message: 'Error al eliminar prestador' });
    });
}

export const prestadoresController = {
  index: obtenerPrestadores,
  show: obtenerPrestadorPorId,
  create: crearPrestador,
  update: actualizarPrestador,
  destroy: eliminarPrestador,
};
