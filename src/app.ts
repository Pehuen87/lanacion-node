import express, { Request, Response } from 'express';
import { myDataSource } from './datasourse';
import inquirer, { Answers } from 'inquirer';
import productRoutes from './routes/productRoutes';
import { validatePort } from './helpers/validator';
import { createMockData } from './helpers/mockDatabase';


const app = express();
app.use(express.json());

// Conexión a la base de datos
myDataSource
    .initialize()
    .then(() => {
        console.log('Database Connected');
    })
    .catch((error) => {
        console.log('Database Connection Error: ', error);
    });

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



const startServer = (port: number) => {


    try {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error('Server Error: ', error);
    }
};



const configDatabase = () => {
    // Your code for creating the mock database goes here
    // ...
};



const loop = () => {
    let continueLoop = true;

    const promptChoices = ['Start Server', 'Create Mock Data', 'Exit'];

    const promptQuestion = [
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: promptChoices,
        },
        {
            type: 'input',
            name: 'port',
            message: 'Enter the port number:',
            default: 3000, // Default port number
            validate: validatePort,
            when: (answers: Answers) => answers.action === 'Start Server',
        },
    ];

    while (continueLoop) {
        inquirer
            .prompt(promptQuestion)
            .then((answers) => {
                const { port, action } = answers;
                if (action === 'Start Server') {
                    startServer(port);
                } else if (action === 'Create Mock Data') {
                    createMockData();
                } else if (action === 'Exit') {
                    continueLoop = false;
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    }
};

loop();



