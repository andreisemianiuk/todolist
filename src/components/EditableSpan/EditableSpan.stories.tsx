import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { EditableSpan, EditableSpanType } from './EditableSpan'

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
} as Meta

const Template: Story<EditableSpanType> = (args: EditableSpanType) => <EditableSpan {...args} />

const editTitleCallback = action('Title value changed')

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
  title: 'Title value',
  editTitle: editTitleCallback,
}
export const EditableSpanDisabledExample = Template.bind({})
EditableSpanDisabledExample.args = {
  title: 'Title value',
  editTitle: editTitleCallback, disabled: true,
}
export const EditableSpanLoadingExample = Template.bind({})
EditableSpanLoadingExample.args = {
  title: 'Title value',
  editTitle: editTitleCallback,
  entityStatus: 'loading',
}
