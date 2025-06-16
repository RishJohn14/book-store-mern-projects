import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const ordersApi = createApi({
    reducerPath: 'ordersApi',

    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include',
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        // fetchAllOrders: builder.query({
        //     query: () => '/',
        //     providesTags: ['Orders'],
        //     method: 'GET',
        // }),
        // fetchOrderById: builder.query({
        //     query: (id) => `/${id}`,
        //     providesTags: (result, error, id) => [{ type: 'Orders', id }],
        //     method: 'GET',
        // }),
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/create-order',
                method: 'POST',
                body: newOrder,
                credentials: 'include',
            }),
            invalidatesTags: ['Orders'],
        }),

        getOrderByEmail: builder.query({
            query: (email) =>({
                url: `/email/${email}`

            }),
            providesTags: ['Orders'],
            method: 'GET',
        }),


        // updateOrder: builder.mutation({
        //     query: ({ id, ...updatedOrder }) => ({
        //         url: `/edit/${id}`,
        //         method: 'PUT',
        //         body: updatedOrder,
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     }),
        //     invalidatesTags: (result, error, { id }) => [{ type: 'Orders', id }],
        // }),
        // deleteOrder: builder.mutation({
        //     query: (id) => ({
        //         url: `/delete/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Orders'],
        // }),
    }),
});


export const {
    // useFetchAllOrdersQuery,
    // useFetchOrderByIdQuery,
    useCreateOrderMutation,
    useGetOrderByEmailQuery
    // useUpdateOrderMutation,
    // useDeleteOrderMutation,
} = ordersApi;

export default ordersApi;
