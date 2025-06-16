import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const baseQuery  = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('authorization', `Bearer ${token}`);
        }
        return Headers;
    },
});

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => ({
                url: '/' 
            }),
            providesTags: ['Books'],
                method: 'GET',
        }),

        fetchBookById: builder.query({
            query: (id) => ({
                url: `/${id}`
            }),
            providesTags: (result, error, id) => [{type: 'Books', id}],
            method: 'GET',
        }),

        addBooks: builder.mutation({
            query: (newBook) => ({
                url: '/create-book',
                method: 'POST',
                body: newBook,
            }),
            invalidatesTags: ['Books'],
        }),

        updateBook: builder.mutation({
            query: ({id, ...updatedBook}) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: updatedBook,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Books'],
        }),

        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
    
            }),
            invalidatesTags: ['Books'],
        }),
    }),
});


export const {useFetchAllBooksQuery,useFetchBookByIdQuery, useAddBooksMutation,useDeleteBookMutation,useUpdateBookMutation} = booksApi
export default booksApi;
