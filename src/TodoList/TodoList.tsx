import React from 'react'
import { FilterType, TaskType } from '../App'
import TodoListTask from '../TodoListTask/TodoListTask'
import styles from './TodoList.module.css'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'

type TodoListPropsType = {
  id: string
  title: string
  filter: string
  tasks: TaskType[]
  addTask: (title: string, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
  changeChecked: (id: string, isDone: boolean, todolistId: string) => void
  changeFilter: (value: FilterType, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

function TodoList(props: TodoListPropsType) {
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  
  const deleteTodolist = () => {
    props.deleteTodolist(props.id)
  }
  
  const editTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }
  
  const showAllTasks = () => props.changeFilter('all', props.id)
  const showActiveTasks = () => props.changeFilter('active', props.id)
  const showCompletedTasks = () => props.changeFilter('completed', props.id)
  
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <EditableSpan title={props.title} editTitle={editTodolistTitle}/>
        <span className={styles.btnWrapper}>
          <button className={styles.titleBtn} onClick={deleteTodolist} />
        </span>
      </h3>
      <div className={styles.formContainer}>
        <AddItemForm title={'Create new task'} addItem={addTask}/>
      </div>
      
      <div className={styles.filter}>
        <button className={props.filter !== 'all' ? styles.selected : styles.btn} onClick={showAllTasks}>all
        </button>
        <button className={props.filter !== 'active' ? styles.selected : styles.btn}
                onClick={showActiveTasks}>active
        </button>
        <button className={props.filter !== 'completed' ? styles.selected : styles.btn}
                onClick={showCompletedTasks}>completed
        </button>
      </div>
      <div>
        {props.tasks.map(v =>
          <TodoListTask key={v.id}
                        id={v.id}
                        todolistId={props.id}
                        title={v.title}
                        isDone={v.isDone}
                        removeTask={props.removeTask}
                        changeChecked={props.changeChecked}
                        changeTaskTitle={props.changeTaskTitle}
          />)
        }
      </div>
    </div>
  )
}

export default TodoList