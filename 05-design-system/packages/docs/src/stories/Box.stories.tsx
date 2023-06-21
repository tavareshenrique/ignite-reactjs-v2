import type { StoryObj, Meta } from '@storybook/react';

import { Box, IBoxProps } from '@ignite-ui/react';

export default {
  title: 'Surfaces/Box',
  component: Box,
  args: {
    children: (
      <>
        <span>Box Element</span>
      </>
    )
  },
} satisfies Meta<IBoxProps>;

export const Primary: StoryObj<IBoxProps> = {};

