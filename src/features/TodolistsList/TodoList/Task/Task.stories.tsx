import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Task, TaskPropsType } from './Task'
import { TaskStatuses } from '../../../../api/todolist-api'

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
  id: '1', status: TaskStatuses.Completed, title: 'JS',
}

export const TaskIsNotDone = Template.bind({})
TaskIsNotDone.args = {
  ...baseArgs,
  id: '1', status: TaskStatuses.New, title: 'JS',
}