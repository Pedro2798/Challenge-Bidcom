import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProductCard } from "./product-card";
import type { Product } from "@/domain/entities/product";

const baseProduct: Product = {
  id: 101,
  sku: "MOB-APP-APP-101",
  title: "Apple AirPods Max Silver",
  description: "Premium headphones",
  category: "mobile-accessories",
  brand: "Apple",
  price: 549.99,
  discountPercentage: 13.67,
  rating: 3.5,
  stock: 94,
  thumbnail:
    "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
  images: [],
};

const meta = {
  title: "Molecules/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-xs gap-4">
        <Story />
      </div>
    ),
  ],
  args: { product: baseProduct },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDiscount: Story = {
  args: { product: { ...baseProduct, discountPercentage: 0 } },
};

export const OutOfStock: Story = {
  args: { product: { ...baseProduct, stock: 0 } },
};

export const NoBrand: Story = {
  args: { product: { ...baseProduct, brand: null } },
};
