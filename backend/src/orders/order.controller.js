const Order = require("./order.model");


const createAnOrder = async (req, res) => {
    try{
        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save();

        res.status(200).json(savedOrder);

    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } 
}

const getOrderByEmail = async (req,res) => {
    try {
        const {email} = req.params;
        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this email' });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



// const getSingleOrder = async (req, res) => {};

// const updateOrder = async (req, res) => {};
// const deleteOrder = async (req, res) => {};


module.exports = {createAnOrder,getAllOrders, getOrderByEmail};


