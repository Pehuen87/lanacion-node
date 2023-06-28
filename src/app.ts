import 'dotenv/config'
import express, { Request, Response } from 'express';
import { myDataSource } from './datasourse';
import productRoutes from './routes/productRoutes';
import { createMockData } from './helpers/mockDatabase';
import { exit } from 'process';
import { loggerStatus } from './helpers/logger';
import {  Prompted } from './helpers/inquirerPrompt';

console.log(process.env)
const app = express();
app.use(express.json());


// Rutas de productos
app.use('/products', productRoutes);

// Manejo de errores global
app.use((req: Request, res: Response) => {
    try {
        return res.status(403).json({ message: 'Bad Request' });
    } catch {
        console.log("A fatal error ocurred")
    }
});


const startServer = () => {
    const port = parseInt(process.env.SERVER_PORT as string) || 3000;
    try {
        app.listen(port, () => {
            loggerStatus(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error('\nServer Error: ', error);
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
        console.log('\nDatabase Connection Error: ', error);
    });
}

const stopServer = () => {
    console.log("connected")
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
        choice: 'Stop Server',
        action: stopServer,
        disabled: true,
    },
    {
        choice: 'Exit',
        action: () => exit(0),
        disabled: false
    }]


inq.inquirerPrompt();
// Start the prompt loop






