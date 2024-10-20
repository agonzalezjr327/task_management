import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTask } from '../redux/taskSlice'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

export const EditTask = (props) => {
    
const [isEditing, setIsEditing] = useState(false)
const dispatch = useDispatch()
const [tasks, setTasks] = useState(props.task.title)
const [description, setDescription] = useState(props.task.description)
const [status, setStatus] = useState(props.task.status)

const handleEdit = (e) => {

    dispatch(editTask({
        id: props.task.id,
        title: tasks,
        description,
        status,
    }));

    setTasks('');
    setDescription('');
    setStatus('');
    setIsEditing(false);
};

  return (
    <>
    {isEditing ? (
      <div className='my-3 bg-warning vw-100 border border-danger-subtle border-5'>
        <FormGroup className='my-3'>
                <Label for="task">Edit Task</Label>
                <Input type="text" value={tasks} name="task" id="task" placeholder="Enter task" onChange={(e) => setTasks(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="text" value={description} name="description" id="description" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <select value={status} name="status" id="status" onChange={(e) => setStatus(e.target.value)}>
                    <option value=""></option>
                    <option value="To Do">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </FormGroup>
            <FormGroup>
                <button onClick={handleEdit} className='btn btn-primary btn-lg'>Save</button>
            </FormGroup>
        <button className="btn btn-info" onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    ) : (
      <>
        <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit</button>
      </>
    )}
    </>
  )
}