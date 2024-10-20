import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../redux/taskSlice'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid'

export const AddTask = () => {
    const dispatch = useDispatch()
    const [tasks, setTasks] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            id: uuidv4(),
            title: tasks,
            description,
            status,
        };

        dispatch(addTask(newTask));

        setTasks('');
        setDescription('');
        setStatus('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup className='my-3 bg-light'>
                <Label for="task">Task</Label>
                <Input type="text" value={tasks} name="task" id="task" placeholder="Enter task" onChange={(e) => setTasks(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="text" value={description} name="description" id="description" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <select name="status" id="status" onChange={(e) => setStatus(e.target.value)}>
                    <option value=""></option>
                    <option value="To Do">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </FormGroup>
            <FormGroup>
                <button className='btn btn-primary btn-lg'>Submit</button>
            </FormGroup>
        </Form>
    )
}