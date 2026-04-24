[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/OhQGQ2Eh)
# GraphQL - Lab Day

**Goal:** Create an Apollo Server/Express/MongoDB backend with MVC and CRUD functionality. There will be 3 collections: `products`, `customers`, and `orders` where `orders` is the junction table combining the products to customers.

## Instructions

1. Clone the repository to your local machine and run `npm install` to install the necessary dependencies.
2. Create a database in MongoDB called `my_store` and add `products` as the first collection.
3. Create a unique database user and password and grant them `dbAdmin` and `readWrite` privileges to the `my_store` database. Copy the MongoDB connection string.
4. Create a `.env` file and paste the connection string into a variable called `MONGO_URI`.
5. Set up your Mongoose models, controllers, GraphQL type definitions and resolvers using the following information below:

    ### ⚙️ Mongoose Models

    **Product**
    - productName - String
    - productPrice - Number

    **Customer**
    - firstName - String
    - lastName - String
    - email - String

    **Order**
    - productId - ObjectId *(references Product)*
    - customerId - ObjectId *(references Customer)*

    ---

    ### ⚙️ Controllers

    **Product**
    - getProducts
    - createProduct(data)
    - getProductById(id)
    - updateProduct(id, data)
    - deleteProduct(id)

    **Customer**
    - getCustomers
    - createCustomer(data)
    - getCustomerById(id)
    - updateCustomer(id, data)
    - deleteCustomer(id)

    **Order**
    - getOrders
    - createOrder(productId, customerId)
    - updateOrder(id, data)
    - deleteOrder(id)

    ---

    ### ⚙️ GraphQL TypeDefs

    The type definitions are already provided but you can also find them here:

    ```js
    type Product {
      id: ID!,
      productName: String,
      productPrice: Float,
      customers: [Customer]
    }

    type Customer {
      id: ID!,
      firstName: String,
      lastName: String,
      email: String,
      products: [Product]
    }
    
    type Order {
      id: ID!,
      product: Product,
      customer: Customer
    }

    type Query {
      products: [Product],
      customers: [Customer],
      orders: [Order],
      getProductById(id: ID): Product,
      getCustomerById(id: ID): Customer,
    }

    type Mutation {
      addProduct(productName: String, productPrice: Float): Product,
      editProduct(id: ID, productName: String, productPrice: Float): Product,
      removeProduct(id: ID): Boolean,

      addCustomer(firstName: String, lastName: String, email: String): Customer,
      editCustomer(id: ID, firstName: String, lastName: String, email: String): Customer,
      removeCustomer(id: ID): Boolean,
      
      addOrder(productId: ID, customerId: ID): Order,
      editOrder(id: ID, productId: ID, customerId: ID): Order,
      removeOrder(id: ID): Boolean
    }
    ```

6. Create as many products, customers, and orders as you want as long as your queries are working properly. Review each type definition and resolver to understand what data to return.
7. Commit and push your changes once you are done.
