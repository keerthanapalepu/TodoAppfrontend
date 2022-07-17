import React from 'react';
import { useSelector } from 'react-redux';
const TotalCompleteItems = () => {
	const CompletedItems = useSelector((state) => state.todos.filter((todo) => todo.completed === true))
	return <h4 className='mt-3'>Total Complete Items: {CompletedItems.length}</h4>;
};

export default TotalCompleteItems;
