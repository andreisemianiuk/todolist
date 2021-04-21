import React from 'react'
//@ts-ignore
import { Meta, Story } from '@storybook/react/types-6-0'
//@ts-ignore
import { action } from '@storybook/addon-actions'
import { Task, TaskPropsType } from './Task'

export default {
  title: 'Todolist/Task',
  component: Task,
} as Meta

const changeTaskStatusCallback = action('Status changed')
const removeTaskCallback = action('Task removed')
const changeTaskTitleCallback = action('Task title changed')

const Template: Story<TaskPropsType> = (args: TaskPropsType) => <Task {...args} />

const baseArgs = {
  changeTaskStatus: changeTaskStatusCallback,
  removeTask: removeTaskCallback,
  changeTaskTitle: changeTaskTitleCallback,
}

export const TaskIsDone = Template.bind({})
TaskIsDone.args = {
  ...baseArgs,
  id: '1', isDone: true, title: 'JS',
}

export const TaskIsNotDone = Template.bind({})
TaskIsNotDone.args = {
  ...baseArgs,
  id: '1', isDone: false, title: 'JS',
}
//
// export const TaskRemoved = Template.bind({})
// TaskRemoved.args = {
//   ...baseArgs,
//   task: {id: '1', isDone: true, title: 'JS'},
// }
//
// export const TaskTitleChanged = Template.bind({})
// TaskTitleChanged.args = {
//   ...baseArgs,
//   task: {id: '1', isDone: true, title: 'TS'},
// }
