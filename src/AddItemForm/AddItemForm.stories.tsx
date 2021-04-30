import React from 'react'
import { AddItemForm, AddItemFormType } from './AddItemForm'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: {
    onClick: {description: 'Button inside form clicked'},
  },
} as Meta

const Template: Story<AddItemFormType> = (args: AddItemFormType) => <AddItemForm {...args} />

export const AddItemFormExample = Template.bind({})
AddItemFormExample.args = {
  addItem: action('Button inside form clicked'),
}
