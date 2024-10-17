import { DataSource } from 'typeorm';
import { Task } from '../entities/Task.js';  

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'your password',  
  database: 'todo_database',
  entities: [Task],  
  synchronize: true,
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Connected to PostgreSQL Database');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;  
  }
};