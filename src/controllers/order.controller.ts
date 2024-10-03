import express, { response } from "express";
import PurchaseOrderModel from "../models/purchase.order.model";
import { Product } from "../models/product.model";
import { IPurchaseOrder } from "../interfaces/IOrder";

export const updateAllWithTotal = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const orders = await PurchaseOrderModel.find().populate({
      path: "orderProducts.product_id",
      model: "Product",
    });

    if (orders.length === 0) {
      return res.status(404).send({ message: "No Orders Found" });
    }

    const updatedOrders = orders.map(async (order) => {
      let total_price = 0;

      for (const orderProduct of order.orderProducts) {
        const { product_id, quantity } = orderProduct;

        const product = await Product.findById(product_id);

        if (!product || !product.unit_price) {
          return res
            .status(404)
            .json({ message: `Product with ID ${product_id} not found` });
        }

        total_price += product.unit_price * quantity;
      }

      order.total_price = total_price;
      await order.save();
    });

    await Promise.all(updatedOrders);

    res.status(200).send({ message: "Updated successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const createOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { user_id, orderProducts, billing_address, order_status } = req.body;

    let total_price = 0;

    const newOrder = new PurchaseOrderModel({
      user_id,
      orderProducts,
      billing_address,
      order_status,
    });

    for (const orderProduct of orderProducts) {
      const { product_id, quantity, color, size } = orderProduct;

      const product = await Product.findById(product_id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${product_id} not found` });
      }

      const metaDataItem = product.metadata.find(
        (meta) => meta.color === color && meta.size === size
      );

      if (!metaDataItem) {
        return res.status(400).json({
          message: `No product variant found for color ${color} and size ${size}`,
        });
      }

      if (metaDataItem.quantity < quantity) {
        return res.status(400).json({
          message: `Not enough quantity available for product ${product.name} in color ${color} and size ${size}`,
        });
      }

      /* metaDataItem.quantity -= quantity; */
      total_price += product.unit_price * quantity;
      //console.log(typeof(product.unit_price));
      //console.log(typeof(quantity));
      console.log(total_price);

      await product.save();
    }

    newOrder.total_price = total_price;

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const getAllOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const orders = await PurchaseOrderModel.find().populate({
      path: "orderProducts.product_id",
      model: "Product",
    });

    if (orders.length < 0) {
      return res.status(404).send({ message: "No Orders Found" });
    }

    return res.status(200).send(orders);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const getOneOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;

    const order = await PurchaseOrderModel.findById(id).populate({
      path: "orderProducts.product_id",
      model: "Product",
    });

    /* const order = await PurchaseOrderModel.findOne({order : req.params.id}); */
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    } else {
      /* order.orderProducts.forEach((orderProduct) => {
                const product = orderProduct.product_id;
                console.log(orderProduct.product_id._id);  // Access the product_id object
                product.metadata.forEach(async (meta) => {
                    
                    if(meta.color === orderProduct.color && meta.size === orderProduct.size){
                        meta.quantity -= orderProduct.quantity;

                        const product = await Product.findById(orderProduct.product_id._id);

                        console.log(product);
                        
                        
                    }
                    // Iterate through the metadata array
                    //console.log(`Color: ${meta.color}, Size: ${meta.size}, Quantity: ${meta.quantity}`);
                });
            });  */

      return res.status(200).send(order);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const getOrdersOnYear = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const year = parseInt(req.query.year as string);
    console.log(year);
    const orders = await PurchaseOrderModel.find().populate({
      path: "orderProducts.product_id",
      model: "Product",
    });

    if (orders.length < 0) {
      return res.status(404).send({ message: "No Orders Found" });
    }

    const filteredOrders = orders.filter((order) => {
      const orderYear = new Date(order.purchase_date).getFullYear();
      console.log(orderYear);
      console.log(typeof orderYear);
      return orderYear == year;
    });

    console.log(filteredOrders.length);

    res.status(200).send(filteredOrders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const getPendingOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.id;

    const pendingOrders = await PurchaseOrderModel.find({
      user_id: userId,
      order_status: "processing",
    });

    if (!pendingOrders) {
      return res
        .status(404)
        .send({ message: "No Pending Orders Found for this user" });
    }

    return res.status(200).send(pendingOrders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const updateOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const { billing_address } = req.body;

    const order = await PurchaseOrderModel.findById(id);
    if (order) {
      order.billing_address = billing_address;

      await order.save();
      return res.status(200).json({ message: "Product updated", data: order });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const deleteOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;

    const result = await PurchaseOrderModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).send({ message: "Order not found" });
    } else {
      return res.status(200).json({ message: "Order deleted successfully" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};
