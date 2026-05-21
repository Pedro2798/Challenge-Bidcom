import type { Meta, StoryObj } from "@storybook/nextjs";
import { Pill, PILL_TONES } from "./pill";

const meta = {
  title: "Atoms/Pill",
  component: Pill,
  tags: ["autodocs"],
  args: {
    children: "Beauty",
    tone: "pink",
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsLink: Story = {
  args: { href: "/search?s=beauty", children: "Beauty" },
};

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {PILL_TONES.map((tone) => (
        <Pill key={tone} tone={tone}>
          {tone}
        </Pill>
      ))}
    </div>
  ),
};
