import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolist-reducer'
import { DomainModelUpdateTaskType, TaskType, todolistAPI } from '../api/todolist-api'
import { Dispatch } from 'redux'
import { RootStateType } from './store'

export type TasksListType = {
  [key: string]: TaskType[]
}
export type RemoveTaskActionType = {
  type: 'REMOVE_TASK'
  todolistId: string
  taskId: string
}
export type AddTaskActionType = {
  type: 'ADD_TASK'
  task: TaskType
}
export type UpdateTaskActionType = {
  type: 'UPDATE_TASK'
  model: DomainModelUpdateTaskType
  todolistId: string
  taskId: string
}
export type ChangeTaskTitleActionType = {
  type: 'CHANGE_TASK_TITLE'
  todolistId: string
  taskId: string
  title: string
}
export type SetTasksActionType = {
  type: 'SET_TASKS'
  tasks: TaskType[]
  todolistId: string
}
export type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType

const initialState: TasksListType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksListType => {
  switch (action.type) {
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistId]:
          state[action.todolistId].filter(t => t.id !== action.taskId),
      }
    case 'ADD_TASK':
      debugger
      return {
        ...state,
        [action.task.todoListId]:
          [{...action.task}, ...state[action.task.todoListId]],
      }
    case 'UPDATE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
          ...t,
          ...action.model,
        } : t),
      }
    case 'ADD_TODOLIST':
      return {
        ...state,
        [action.id]: [],
      }
    case 'REMOVE_TODOLIST':
      const copy = {...state}
      delete copy[action.id]
      return copy
    case 'SET_TODOLISTS': {
      const copy = {...state}
      action.todolists.forEach(tl => {
        copy[tl.id] = []
      })
      return copy
    }
    case 'SET_TASKS': {
      let copy = {...state}
      copy[action.todolistId] = action.tasks
      return copy
    }
    default:
      return state
  }
}

// Action Creators
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {
    type: 'REMOVE_TASK',
    taskId,
    todolistId,
  }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return {
    type: 'ADD_TASK',
    task,
  }
}

export const updateTaskAC = (todolistId: string, taskId: string, model: DomainModelUpdateTaskType): UpdateTaskActionType => {
  return {
    type: 'UPDATE_TASK',
    todolistId,
    taskId,
    model,
  }
}

export const setTasksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
  return {
    type: 'SET_TASKS',
    tasks,
    todolistId,
  }
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.getTasks(todolistId).then(res => {
    dispatch(setTasksAC(res.data.items, todolistId))
  })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  todolistAPI.createTask(todolistId, title).then(res => {
    dispatch(addTaskAC(res.data.data.item))
  })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTask(todolistId, taskId).then(() => {
    dispatch(removeTaskAC(taskId, todolistId))
  })
}

export const updateTaskTC = (todolistId: string, taskId: string, model: DomainModelUpdateTaskType) =>
  (dispatch: Dispatch, getState: () => RootStateType) => {
    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === taskId)
    
    if (task) {
      todolistAPI.updateTask(todolistId, taskId, {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...model,
        
      }).then(() => {
        dispatch(updateTaskAC(todolistId, taskId, model))
      })
      
    }
  }

// export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
//   (dispatch: Dispatch, getState: () => RootStateType) => {
//     const allTasksFromState = getState().tasks
//     const tasksForCurrentTodolist = allTasksFromState[todolistId]
//     const task = tasksForCurrentTodolist.find(t => t.id === taskId)
//
//     if (task) {
//       todolistAPI.updateTask(todolistId, taskId, {
//         title: title,
//         startDate: task.startDate,
//         priority: task.priority,
//         description: task.description,
//         deadline: task.deadline,
//         status: task.status,
//
//       }).then(() => {
//         dispatch(changeTaskTitleAC(todolistId, taskId, title))
//       })
//
//     }
//   }