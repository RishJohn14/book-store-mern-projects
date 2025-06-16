import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext'

const OrderPage = () => {
    const {currentUser} = useAuth();

    const {data: orders=[],isLoading,isError} = useGetOrderByEmailQuery(currentUser.email);



    if(isLoading) {
        return <div>Loading...</div>
    }
    if(isError) {
        return <div>Error fetching orders</div>
    }
    // if(orders.length === 0) {
    //     return <div>No orders found</div>
    // }
  return (
    <div className='container mx-auto p-6'>
        <h2 className='text-2xl font-semibold mb-4'>
            Your Orders
        </h2>
        {
            orders.length === 0 ? (
                <div>
                    No orders found
                </div>
            ):(
                <div>
                    {
                       orders.map((order,index) => (
                        <div key={order?._id} className='border p-4 mb-4 gap-4'>
                            <p className='p-1 bg-[#0D0842] w-10 text-white rounded gap-3'>#{index+1}</p>
                            <h3 className='text-xl font-semibold'>Order ID: {order?._id}</h3>
                            <p>Name: {order?.name}</p>
                            <p>Email: {order?.email}</p>
                            <p>Phone: {order?.phone}</p>
                            <p>Total Amount: ${order?.totalPrice}</p>
                            <h4 className='font-semibold mt-2'>Address:</h4>
                            <p> {order?.address.city},{order.address.state},{order.address.country},{order.address.zipcode},</p>
                            <h4 className='font-semibold mt-2'>Books:</h4>
                            <ul>
                                {order.productIds.map((book) => (
                                    <li key={book}>{book}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )
        }
    </div>
  )
}

export default OrderPage