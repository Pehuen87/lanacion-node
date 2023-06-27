import express, { Request, Response } from 'express';
import { myDataSource } from './datasourse';
import inquirer from 'inquirer';
import productRoutes from './routes/productRoutes';
import { validatePort } from './helpers/validator';
import { createMockData } from './helpers/mockDatabase';


const app = express();
app.use(express.json());

// Conexión a la base de datos
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
    try {
      app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
      });
    } catch (error) {
      console.error(`Error al intentar iniciar el servidor en el puerto ${port}:`, error);
    }
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
            validate: validatePort
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
        if (action === 'Start Server') {
            startServer(port);
        } else if (action === 'Create Mock Database') {
            createMockData();
        } else if (action === 'Config Database Connection') {
            configDatabase();
        }
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    });

