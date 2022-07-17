import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleComplete,DeleteTodo } from '../redux/todoSlice';
const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();
	const handleCompleteClick = () => {
		dispatch(toggleComplete({id: id, completed: !completed}))
	}
	const handleDeleteClick = () => {
		dispatch(DeleteTodo({
			id: id
		}))
	}
	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input type='checkbox' onClick={handleCompleteClick} className='mr-3' checked={completed}></input>
					{title}
				</span>
				<button onClick={handleDeleteClick} className='btn btn-danger'>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
