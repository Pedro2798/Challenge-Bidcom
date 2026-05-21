import type { Meta, StoryObj } from "@storybook/nextjs";
import { SearchBar } from "./search-bar";

const meta = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { initialQuery: "" },
};

export const WithSeed: Story = {
  args: { initialQuery: "iphone" },
};
