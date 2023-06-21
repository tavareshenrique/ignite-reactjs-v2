import type { StoryObj, Meta } from '@storybook/react';

import { Box, IBoxProps, Text } from '@ignite-ui/react';

export default {
  title: 'Surfaces/Box',
  component: Box,
  args: {
    children: (
      <>
        <Text>Box Element</Text>
      </>
    )
  },
} satisfies Meta<IBoxProps>;

export const Primary: StoryObj<IBoxProps> = {};

