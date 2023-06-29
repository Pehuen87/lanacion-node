import 'dotenv/config';
import { exit } from 'process';
import express, { Request, Response } from 'express';

import { myDataSource } from './datasource';

import { createMockData } from './helpers/mockDatabase';
import { loggerError, loggerStatus } from './helpers/logger';
import { Prompted } from './helpers/inquirerPrompt';

import productRoutes from './routes/productRoutes';


const app = express();
app.use(express.json());

// Product routes
app.use('/products', productRoutes);

// Global error handling
app.use((req: Request, res: Response) => {
  try {
    return res.status(403).json({ message: 'Bad Request' });
  } catch {
    loggerError('Database error');
  }
});

// Function to start the server
const startServer = () => {
  const port = parseInt(process.env.SERVER_PORT as string, 10) || 3000;
  try {
    app.listen(port, () => {
      loggerStatus(`Server listening on port ${port}`);
    });
  } catch (error) {
    loggerError('Server Error: ' + error);
  }
};

// Function to connect to the database
const connectToDatabase = () => {
  // Database connection
  myDataSource
    .initialize()
    .then(() => {
      loggerStatus('Database Connected');
    })
    .catch((error) => {
      loggerError('Database Connection Error: ' + error);
    });
};

// Initialize the inquirer prompt
const inq: Prompted = new Prompted();

// Define the available choices for the prompt
inq.choices = [
  {
    label: 'Start Server',
    action: startServer,
    disabled: false,
  },
  {
    label: 'Connect to Database',
    action: connectToDatabase,
    disabled: false,
  },
  {
    label: 'Create Mock Data',
    action: createMockData,
    disabled: false,
  },
  {
    label: 'Exit',
    action: () => exit(0),
    disabled: false,
  }
];

// Start the prompt loop
inq.promptUser();