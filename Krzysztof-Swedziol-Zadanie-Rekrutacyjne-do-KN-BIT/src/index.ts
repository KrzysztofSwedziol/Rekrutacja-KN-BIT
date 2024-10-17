import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import { initializeDatabase } from './config/database.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = 3000;
app.use(express.json());

initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');
  })
  .catch((error: Error) => {
    console.error('Database initialization failed:', error);
  });

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Task API',
        version: '1.0.0',
        description: 'API for managing tasks in a to-do list',
      },
      servers: [
        {
          url: 'http://localhost:3000',  
        },
      ],
    },
    apis: ['./src/routes/*.ts'],  
  };
  

const swaggerDocs = swaggerJsDoc(swaggerOptions);
  

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});