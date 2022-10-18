import { gql, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'

const REMOVE_TASK = gql`
  mutation RemoveTask($taskId: ID!) {
    removeTask(taskId: $taskId)
  }
`
const UPDATE_TASK = gql`
mutation DoneUpdateTask($taskId: ID!, $taskInput: TaskInput) {
  updateTask(taskId: $taskId, taskInput: $taskInput)
}
`


const TaskItem = ({ id, todo, isDone }) => {
  const [loading, setLoading] = useState(false)
  const [remove, removeHandlerOptions] = useMutation(REMOVE_TASK, {
    variables: {
      taskId: id
    },
    refetchQueries: ['GetAllTasks'],
    onError: (error) => {
      window.alert(`Error!`)
    }
  })
  const [updateHandler, updateHandlerOptions] = useMutation(UPDATE_TASK, {
    refetchQueries: ['GetAllTasks'],
    onError: (error) => {
      window.alert(`Error!`)
    },
  })

  const editHandler = () => {
    let val = window.prompt('Edit task')
    if (val !== todo && val !== '' && val !== null) {
      updateHandler({
        variables: {
          "taskId": id,
          "taskInput": {
            "todo": val
          }
        }
      })
    }
  }

  const isDoneHandler = () => {
    updateHandler({
      variables: {
        "taskId": id,
        "taskInput": {
          "isDone": !isDone
        }
      }
    })
  }


  useEffect(() => {
    if (removeHandlerOptions.loading || updateHandlerOptions.loading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [removeHandlerOptions.loading, updateHandlerOptions.loading]);
  return (
    <div className='row item-wrapper'>
      {loading && (
        <div className="row center fl1">
          <Loader />
        </div>
      )}
      {!loading && (
        <>
          <input type={'checkbox'}
            checked={isDone}
            onChange={isDoneHandler}
          />
          <p className={`task-title ${isDone ? "task-title_done" : ''}`}>{todo}</p>
          <div className="btn-container">
            <span className='btn' onClick={editHandler}>Edit</span>
            <span className='btn' onClick={remove}>Remove</span>
          </div>
        </>
      )}

    </div>
  )
}

export default TaskItem