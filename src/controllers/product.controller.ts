import { Product } from "../models/product.model";

export const getProducts = async () => {
  return await Product.find();
};

export const createProduct = async (data: {
  productName: string;
  productPrice: number;
}) => {
  const product = new Product(data);
  return await product.save();
};

export const getProductById = async (id: string) => {
  return await Product.findById(id);
};

export const updateProduct = async (
  id: string,
  data: Partial<{ productName: string; productPrice: number }>,
) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result ? true : false;
};
