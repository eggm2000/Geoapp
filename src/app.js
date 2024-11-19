import express from 'express';
import cors from 'cors'; // Importa los paquetes cors -- permisos de accesos
import { fileURLToPath } from 'url';
import LocalizacionNegocioRoutes from './routes/LocalizacionNegocio.routes.js';
import path from 'path';

// Definir el módulo de ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const corsOptions = {
    origin: 'http://localhost:8100', // La dirección IP del servidor
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true // Corrección: 'cedentials' a 'credentials'
};

app.use(cors(corsOptions));
app.use(express.json()); // Para que interprete los objetos JSON
app.use(express.urlencoded({ extended: true })); // Añadido para poder receptar formularios
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use('/api', LocalizacionNegocioRoutes);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

export default app;

