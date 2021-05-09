import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import App from '../App'
import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator'

export default {
  title: 'Todolist/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator],
} as Meta

const Template: Story = () => <App/>

export const AppWithReduxExample = Template.bind({})
