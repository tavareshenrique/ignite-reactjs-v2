import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, IAvatarProps } from '@ignite-ui/react'

export default {
  title: 'Data display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    src: 'https://github.com/tavareshenrique.png',
    alt: 'Henrique Tavares',
    title: 'Henrique Tavares',
  },
  argTypes: {
    src: {
      control: { type: 'text' },
    },
  }
} as Meta<IAvatarProps>

export const Primary: StoryObj<IAvatarProps> = {}

export const WithFallback: StoryObj<IAvatarProps> = {
  args: {
    src: undefined,
  },
}