import { config } from 'dotenv'
config()

export const BD_HOST = process.env.BD_HOST || "bb4i0opj17hbnrwvqiot-mysql.services.clever-cloud.com";
export const BD_DATABASE = process.env.BD_DATABASE || "bb4i0opj17hbnrwvqiot";
export const DB_USER = process.env.DB_USER || "ucocw3rdxad8929j";
export const DB_PASSWORD = process.env.DB_PASSWORD || "63hZ0uKqw9neP1UM9Wbl";
export const DB_PORT = process.env.DB_PORT || 3306;
export const PORT = process.env.PORT || 3000;
