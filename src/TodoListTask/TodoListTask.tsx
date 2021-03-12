import React, { ChangeEvent } from 'react'
import styles from './TodoListTask.module.css'
import { EditableSpan } from '../EditableSpan/EditableSpan'

type TodoListTaskPropsType = {
  todolistId: string
  title: string
  key: string
  id: string
  isDone: boolean
  removeTask: (id: string, todolistId: string) => void
  changeChecked: (id: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (todolistId: string,taskId: string, newTitle: string) => void
}

function TodoListTask(props: TodoListTaskPropsType) {
  
  const onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeChecked(props.id, e.currentTarget.checked, props.todolistId)
  }
  
  const removeTask = () => {
    props.removeTask(props.id, props.todolistId)
  }
  
  const editTitle = (newTitle:string) => {
    props.changeTaskTitle(props.todolistId,props.id,newTitle)
  }
  
  return (
    <div key={props.key}>
			<span className={styles.item}>
				<label className={styles.label}>
          <input className={styles.checkbox} type="checkbox" onChange={onCheckedHandler} checked={props.isDone}/>
        </label>
        <EditableSpan title={props.title} editTitle={editTitle} isDone={props.isDone} />
        <div className={styles.btnContainer}><button className={styles.span} onClick={removeTask}/></div>
			</span>
    </div>
  )
}

export default TodoListTask