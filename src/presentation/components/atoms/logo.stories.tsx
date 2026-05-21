import type { Meta, StoryObj } from "@storybook/nextjs";
import { Logo } from "./logo";

const meta = {
  title: "Atoms/Logo",
  component: Logo,
  tags: ["autodocs"],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: { size: 64 },
};

export const Static: Story = {
  args: { animated: false },
};
