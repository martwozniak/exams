// CTA.stories.ts|tsx

import type { Meta } from '@storybook/react';
import CTA from './CTA';


const meta: Meta<typeof CTA> = {
  title: 'CTA',
  component: CTA,
};

export default meta;

type Story = StoryObj<typeof CTA>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <CTA />,
};
