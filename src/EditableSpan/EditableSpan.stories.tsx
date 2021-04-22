import React from 'react'
//@ts-ignore
import { Meta, Story } from '@storybook/react/types-6-0'
//@ts-ignore
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
