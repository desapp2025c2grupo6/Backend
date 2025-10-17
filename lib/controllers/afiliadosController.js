import Afiliado from '../models/afiliado.js';
function obtenerAfiliados(req, res) {
  Afiliado.findAll()
    .then((afiliados) => {
      res.json({ data: afiliados.map((afiliado) => afiliado.toJSON()) });
    })
    .catch((error) => {
      console.error('Error al obtener los afiliados:', error);
      res.status(500).json({ message: 'Error al obtener los afiliados' });
    });
}

function obtenerAfiliadoPorId(req, res) {
  const { id } = req.params;
  Afiliado.findByPk(id)
    .then((afiliado) => {
      if (afiliado) {
        res.json({ data: afiliado.toJSON() });
      } else {
        res
          .status(404)
          .json({ message: `No se encontró un afiliado con id ${id}` });
      }
    })
    .catch((error) => {
      console.error(`Error al obtener el afiliado con id ${id}:`, error);
      res.status(500).json({ message: 'Error al obtener el afiliado' });
    });
}
function crearAfiliado(req, res) {
  const { nombre, email, telefono } = req.body;
  Afiliado.create({ nombre, email, telefono })
    .then((nuevoAfiliado) => {
      res.status(201).json({ data: nuevoAfiliado.toJSON() });
    })
    .catch((error) => {
      console.error('Error al crear el afiliado:', error);
      res.status(500).json({ message: 'Error al crear el afiliado' });
    });
}
function actualizarAfiliado(req, res) {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;
  Afiliado.findByPk(id)
    .then((afiliado) => {
      if (afiliado) {
        return afiliado.update({ nombre, email, telefono });
      } else {
        res
          .status(404)
          .json({ message: `No se encontró un afiliado con id ${id}` });
      }
    })
    .catch((error) => {
      console.error(`Error al actualizar el afiliado con id ${id}:`, error);
      res.status(500).json({ message: 'Error al actualizar el afiliado' });
    });
}
function eliminarAfiliado(req, res) {
  const { id } = req.params;
  Afiliado.findByPk(id)
    .then((afiliado) => {
      if (afiliado) {
        return afiliado.destroy();
      } else {
        res
          .status(404)
          .json({ message: `No se encontró un afiliado con id ${id}` });
      }
    })
    .catch((error) => {
      console.error(`Error al eliminar el afiliado con id ${id}:`, error);
      res.status(500).json({ message: 'Error al eliminar el afiliado' });
    });
}

export const afiliadosController = {
  index: obtenerAfiliados,
  show: obtenerAfiliadoPorId,
  create: crearAfiliado,
  update: actualizarAfiliado,
  destroy: eliminarAfiliado,
};
