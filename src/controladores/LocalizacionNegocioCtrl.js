import { conmysql } from '../db.js';

// Obtener todas las localizaciones
export const getLocalizaciones = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT * FROM LocalizacionNegocio');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar localizaciones" });
  }
};

// Obtener una localización por ID
export const getLocalizacionById = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT * FROM LocalizacionNegocio WHERE id = ?', [req.params.id]);
    if (result.length <= 0) return res.status(404).json({
      id: 0,
      message: "Localización no encontrada"
    });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error del lado del servidor' });
  }
};

// Crear una nueva localización
export const postLocalizacion = async (req, res) => {
  try {
    const { latitud, longitud, nombre_local, dueño, identificacion, tipo_negocio, fecha_registro } = req.body;
    const [rows] = await conmysql.query(
      'INSERT INTO LocalizacionNegocio (latitud, longitud, nombre_local, dueño, identificacion, tipo_negocio, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [latitud, longitud, nombre_local, dueño, identificacion, tipo_negocio, fecha_registro]
    );
    res.send({ id: rows.insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Error del lado del servidor' });
  }
};

// Actualizar una localización completamente
export const putLocalizacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitud, longitud, nombre_local, dueño, identificacion, tipo_negocio, fecha_registro } = req.body;
    const [result] = await conmysql.query(
      'UPDATE LocalizacionNegocio SET latitud=?, longitud=?, nombre_local=?, dueño=?, identificacion=?, tipo_negocio=?, fecha_registro=? WHERE id=?',
      [latitud, longitud, nombre_local, dueño, identificacion, tipo_negocio, fecha_registro, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Localización no encontrada' });

    const [rows] = await conmysql.query('SELECT * FROM LocalizacionNegocio WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error del lado del servidor' });
  }
};

// Actualizar parcialmente una localización
export const patchLocalizacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitud, longitud, nombre_local, dueño, identificacion, tipo_negocio, fecha_registro } = req.body;
    const [result] = await conmysql.query(
      'UPDATE LocalizacionNegocio SET latitud=IFNULL(?, latitud), longitud=IFNULL(?, longitud), nombre_local=IFNULL(?, nombre_local), dueño=IFNULL(?, dueño), identificacion=IFNULL(?, identificacion), tipo_negocio=IFNULL(?, tipo_negocio), fecha_registro=IFNULL(?, fecha_registro) WHERE id = ?',
      [latitud, longitud, nombre_local, dueño, identificacion, tipo_negocio, fecha_registro, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Localización no encontrada' });

    const [rows] = await conmysql.query('SELECT * FROM LocalizacionNegocio WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error del lado del servidor' });
  }
};

// Eliminar una localización
export const deleteLocalizacion = async (req, res) => {
  try {
    const [rows] = await conmysql.query('DELETE FROM LocalizacionNegocio WHERE id = ?', [req.params.id]);
    if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "No se pudo eliminar la localización" });
    res.sendStatus(202);
  } catch (error) {
    return res.status(500).json({ message: "Error del lado del servidor" });
  }
};
