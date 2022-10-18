import React from 'react'
import TaskItem from './TaskItem'

const TaskContainer = ({data}) => {
  return (
    <div className='side'>
        {data.map(({ _id, todo, isDone }) => (
          <TaskItem key={_id}
            id={_id}
            todo={todo}
            isDone={isDone}
          />
        ))
        }
    </div>
  )
}

export default TaskContainer