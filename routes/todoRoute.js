import express from "express";
import TodoCtrl from "../controllers/todoCtrl.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create-todo', auth, TodoCtrl.createTodo);
router.get('/todos', auth, TodoCtrl.getTodos);
router.put('/edit-todo', auth, TodoCtrl.editTodo);
router.delete('/delete-todo', auth, TodoCtrl.removeTodo);
export default router;