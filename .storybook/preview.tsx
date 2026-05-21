import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#FFF8F0" },
        { name: "paper", value: "#FFFFFF" },
        { name: "ink", value: "#0B0B1F" },
      ],
    },
  },
};

export default preview;
