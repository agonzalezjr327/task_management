import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodo, deleteTask } from '../redux/taskSlice'
import { Row, Col } from 'reactstrap'
import { EditTask } from './EditTask'

export const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks)
    const isLoading = useSelector(state => state.tasks.isLoading)
    const error = useSelector(state => state.tasks.error)
    
    
    useEffect(() => {
        dispatch(fetchTodo());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteTask(id))
    }
    
    if (isLoading) return <h1>Loading...</h1>
    if (error) return <h1>{error}</h1>
    
    return (
        <>
            
                <h2 className='text-center text-primary mt-3'>Task List</h2>
                
                    {tasks.map(task => (
                        <Row key={task.id} className='bg-light mb-3'>
                            <Col xs={5}>
                                <p>{task.title}</p>
                            </Col>
                                <Col><p>{task.description}</p></Col>
                                <Col>
                                    <p>Status: {task.status}</p>
                                </Col>
                                <Col>
                                    <EditTask task={task} />
                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                                </Col>
                        </Row>
                    )
                    )}
               
          
        </>
    )
}