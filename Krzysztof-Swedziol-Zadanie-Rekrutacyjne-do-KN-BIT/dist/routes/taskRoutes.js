import { Router } from 'express';
import { AppDataSource } from '../config/database.js';
import { Task } from '../entities/Task.js';
import { validate } from 'class-validator';
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the task
 *         name:
 *           type: string
 *           description: The name of the task
 *         completed:
 *           type: boolean
 *           description: The status of task completion
 *       example:
 *         id: 1
 *         name: enhance enroll
 *         completed: false
 */
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', async (req, res) => {
    try {
        const taskRepository = AppDataSource.getRepository(Task);
        const tasks = await taskRepository.find();
        res.json(tasks);
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the task
 *               completed:
 *                 type: boolean
 *                 description: The status of task completion
 *             example:
 *               name: enhance enroll
 *               completed: false
 *     responses:
 *       200:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task();
        task.name = title;
        const errors = await validate(task);
        if (errors.length > 0) {
            res.status(400).json(errors);
        }
        else {
            const taskRepository = AppDataSource.getRepository(Task);
            const savedTask = await taskRepository.save(task);
            res.json(savedTask);
        }
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the task
 *               completed:
 *                 type: boolean
 *                 description: The status of task completion
 *             example:
 *               name: enhance enroll
 *               completed: true
 *     responses:
 *       200:
 *         description: The task was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const taskRepository = AppDataSource.getRepository(Task);
        const task = await taskRepository.findOneBy({ id: parseInt(id) });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        else {
            task.name = title;
            task.completed = completed;
            const errors = await validate(task);
            if (errors.length > 0) {
                res.status(400).json(errors);
            }
            else {
                const updatedTask = await taskRepository.save(task);
                res.json(updatedTask);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Update a particular attribute in a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: The task was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "enhance enroll"
 *                 completed:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Task not found
 */
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const taskRepository = AppDataSource.getRepository(Task);
        const task = await taskRepository.findOneBy({ id: parseInt(id) });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        else {
            if (title !== undefined) {
                task.name = title;
            }
            if (completed !== undefined) {
                task.completed = completed;
            }
            const errors = await validate(task);
            if (errors.length > 0) {
                res.status(400).json(errors);
            }
            else {
                const updatedTask = await taskRepository.save(task);
                res.json(updatedTask);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task was deleted
 *       404:
 *         description: Task not found
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const taskRepository = AppDataSource.getRepository(Task);
        const result = await taskRepository.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'Task not found' });
        }
        else {
            res.json({ message: 'Task deleted' });
        }
    }
    catch (error) {
        console.log(error);
    }
});
export default router;
