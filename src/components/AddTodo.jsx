import { gql, useMutation } from '@apollo/client';
import React, { useRef } from 'react'
import Loader from './Loader';

const ADD_TASK = gql`
    mutation AddTask($title: String!) {
        addTask(title: $title) {
        _id
        todo
        isDone
        }
    }
`

const AddTodo = () => {
	const inputRef = useRef('')
	const addHandler = () => {
		const val = inputRef.current.value
		if (val.trim() !== '') {
			addTask({
				variables: {
					"title": val
				}
			})
		}
	}
	const [addTask, { loading }] = useMutation(ADD_TASK, {
		refetchQueries: ['GetAllTasks'],
		onCompleted: () => {
			inputRef.current.value = ''
		},
		onError: () => {
			window.alert('Error!')
		}
	})
	return (
		<div className='add-task__wrapper'>
			<input
				type="text"
				ref={inputRef}
				className={'add-task__input'}
			/>
			{loading ?
				<Loader />
				:
				<div onClick={addHandler} className={`add-btn`}>
					<span className='add-btn__line-1'></span>
					<span className='add-btn__line-2'></span>
				</div>
			}
		</div>
	)
}

export default AddTodo