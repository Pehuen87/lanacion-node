import 'dotenv/config'
import express, { Request, Response } from 'express';
import { myDataSource } from './datasourse';
import productRoutes from './routes/productRoutes';
import { createMockData } from './helpers/mockDatabase';
import { exit } from 'process';
import { loggerError, loggerStatus } from './helpers/logger';
import {  Prompted } from './helpers/inquirerPrompt';


const app = express();
app.use(express.json());


// Rutas de productos
app.use('/products', productRoutes);

// Manejo de errores global
app.use((req: Request, res: Response) => {
    try {
        return res.status(403).json({ message: 'Bad Request' });
    } catch {
        loggerError('Database error');
    }
});


const startServer = () => {
    const port = parseInt(process.env.SERVER_PORT as string) || 3000;
    try {
        app.listen(port, () => {
            loggerStatus(`Server listening on port ${port}`);
        });
    } catch (error) {
        loggerError('Server Error: '  + error);
    }
};

const connectToDatabase = () => {
    // Conexión a la base de datos
    myDataSource
    .initialize()
    .then(() => {
        loggerStatus('Database Connected');
    })
    .catch((error) => {
        loggerError('Database Connection Error: ' + error);
    });
}



const inq : Prompted = new Prompted();
inq.inquirerChoices = [
    {
        choice: 'Start Server',
        action: startServer,
        disabled: false,
    },
    {
        choice: 'Connect to Database',
        action: connectToDatabase,
        disabled: false,
    },
    {
        choice: 'Create Mock Data',
        action: createMockData,
        disabled: false,
    },
    {
        choice: 'Exit',
        action: () => exit(0),
        disabled: false
    }]


inq.inquirerPrompt();
// Start the prompt loop






