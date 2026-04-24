import * as productController from "../controllers/product.controller";
import * as customerController from "../controllers/customer.controller";
import * as orderController from "../controllers/order.controller";
import { Order } from "../models/order.model";

export const resolvers = {
  Query: {
    products: async () => await productController.getProducts(),
    customers: async () => await customerController.getCustomers(),
    orders: async () => await orderController.getOrders(),
    getProductById: async (_: any, { id }: { id: string }) =>
      await productController.getProductById(id),
    getCustomerById: async (_: any, { id }: { id: string }) =>
      await customerController.getCustomerById(id),
  },
  Product: {
    customers: async (parent: any) => {
      const orders = await Order.find({ productId: parent._id }).populate(
        "customerId",
      );
      return orders.map((order: any) => order.customerId);
    },
  },
  Customer: {
    products: async (parent: any) => {
      const orders = await Order.find({ customerId: parent._id }).populate(
        "productId",
      );
      return orders.map((order: any) => order.productId);
    },
  },
  Order: {
    product: async (parent: any) =>
      await productController.getProductById(parent.productId.toString()),
    customer: async (parent: any) =>
      await customerController.getCustomerById(parent.customerId.toString()),
  },
  Mutation: {
    addProduct: async (
      _: any,
      {
        productName,
        productPrice,
      }: { productName: string; productPrice: number },
    ) => await productController.createProduct({ productName, productPrice }),
    editProduct: async (
      _: any,
      {
        id,
        productName,
        productPrice,
      }: { id: string; productName?: string; productPrice?: number },
    ) =>
      await productController.updateProduct(id, { productName, productPrice }),
    removeProduct: async (_: any, { id }: { id: string }) =>
      await productController.deleteProduct(id),

    addCustomer: async (
      _: any,
      {
        firstName,
        lastName,
        email,
      }: { firstName: string; lastName: string; email: string },
    ) =>
      await customerController.createCustomer({ firstName, lastName, email }),
    editCustomer: async (
      _: any,
      {
        id,
        firstName,
        lastName,
        email,
      }: { id: string; firstName?: string; lastName?: string; email?: string },
    ) =>
      await customerController.updateCustomer(id, {
        firstName,
        lastName,
        email,
      }),
    removeCustomer: async (_: any, { id }: { id: string }) =>
      await customerController.deleteCustomer(id),

    addOrder: async (
      _: any,
      { productId, customerId }: { productId: string; customerId: string },
    ) => await orderController.createOrder(productId, customerId),
    editOrder: async (
      _: any,
      {
        id,
        productId,
        customerId,
      }: { id: string; productId?: string; customerId?: string },
    ) => await orderController.updateOrder(id, { productId, customerId }),
    removeOrder: async (_: any, { id }: { id: string }) =>
      await orderController.deleteOrder(id),
  },
};
