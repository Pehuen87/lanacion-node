import express, { Request, Response } from 'express';
import { myDataSource } from './datasourse';
import inquirer from 'inquirer';
import productRoutes from './routes/productRoutes';

const app = express();
app.use(express.json());

// Conexión a la base de 
myDataSource
    .initialize()
    .then(() => {
        console.log('Conexión a la base de datos establecida');
    })
    .catch((error) => {
        console.log('Error al conectar a la base de datos:', error);
    });

// Rutas de productos
app.use('/products', productRoutes);

// Manejo de errores global
app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});

const startServer = (port: number) => {
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    });
};

const createMockDatabase = () => {
    // Your code for creating the mock database goes here
    // ...
};

const configDatabase = () => {
    // Your code for creating the mock database goes here
    // ...
};


inquirer
    .prompt([
        {
            type: 'input',
            name: 'port',
            message: 'Enter the port number:',
            default: 3000, // Default port number
        },
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Start Server', 'Create Mock Database', 'Config Database Connection'],
        },
    ])
    .then((answers) => {
        const { port, action } = answers;

        // Use the port value as needed in your server configuration
        // For example, you can pass it to app.listen()
        console.log(`Selected port: ${port}`);

        if (action === 'Start Server') {
            startServer(port);
        } else if (action === 'Create Mock Database') {
            createMockDatabase();
        } else if (action === 'Config Database Connection') {
            configDatabase();
        }
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    });

