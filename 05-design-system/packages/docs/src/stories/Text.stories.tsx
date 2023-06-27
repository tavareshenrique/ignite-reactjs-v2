import type { Meta, StoryObj } from '@storybook/react'
import { Text, ITextProps } from '@ignite-ui/react'

export default {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro reprehenderit est veniam? Rem recusandae sint perspiciatis debitis corrupti. Deserunt neque exercitationem illo voluptatum laudantium culpa suscipit accusantium blanditiis voluptas numquam.',
  },
} as Meta<ITextProps>

export const Primary: StoryObj<ITextProps> = {}

export const CustomTag: StoryObj<ITextProps> = {
  args: {
    children: 'Strong text',
    as: 'strong',
  },
}