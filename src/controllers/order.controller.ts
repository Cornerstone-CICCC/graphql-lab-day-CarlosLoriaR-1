import { Order } from "../models/order.model";

export const getOrders = async () => {
  return await Order.find().populate("productId").populate("customerId");
};

export const createOrder = async (productId: string, customerId: string) => {
  const order = new Order({ productId, customerId });
  return await order.save();
};

export const updateOrder = async (
  id: string,
  data: Partial<{ productId: string; customerId: string }>,
) => {
  return await Order.findByIdAndUpdate(id, data, { new: true })
    .populate("productId")
    .populate("customerId");
};

export const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result ? true : false;
};
