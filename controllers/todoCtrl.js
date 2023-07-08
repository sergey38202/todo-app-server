import Todo from "../models/todoModel.js";

class TodoCtrl {
    async createTodo(req, res) {
        try {
            const { title, isCompleted } = req.body;

            const newTodo = await new Todo({ title, isCompleted, userId: req.userId });

            await newTodo.save();

            res.status(201).json({ message: newTodo });
        } catch (error) {
            console.log('error', error);
            res.status(500).json(error);
        }
    }

    async getTodos(req, res) {
        try {
            const todos = await Todo.find({ userId: req.query.userId });

            res.status(200).json({ message: todos });
        } catch (error) {
            console.log('error', error);
            res.status(500).json({ message: error });
        }
    }

    async editTodo(req, res) {
        try {
            const todoId = req.query.todoId;

            const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, { new: true });

            res.status(200).json({ message: updatedTodo });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    }

    async removeTodo(req, res) {
        try {
            const todoId = req.query.todoId;

            const deletedTodo = await Todo.findByIdAndDelete(todoId);

            if (!deletedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new TodoCtrl();