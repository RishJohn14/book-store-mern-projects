import React, { useEffect } from 'react'
import { useState } from 'react'
import BookCard from '../books/BookCard';

import {Swiper, SwiperSlide} from 'swiper/react';

import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';



const TopSellers = () => {

  const {data: books=[]} = useFetchAllBooksQuery();

  

  const categories = ["Choose a genre", "Business","Fiction","Horror","Adventure","Marketing"]
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
   

  const filteredBooks = selectedCategory === "Choose a genre" ? books :
    books.filter(book => book.category === selectedCategory.toLowerCase());
    



  return (
    <div className='py-10'>
        <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
        <div className='mb-8 flex items-center'>
            <select name='category' id='category' onChange={(e) => setSelectedCategory(e.target.value)}
            className='border bg-[#EAEAEA] bg-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                {categories.map((category, index) => (
                    <option value={category} key={index}>{category}</option>
                ))}
            </select>
        </div>  
        
        <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 60,
                    },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

            {filteredBooks.length>0 && filteredBooks.map((book, index) => (
                <SwiperSlide>
                    <BookCard key= {index} book={book} />
                </SwiperSlide>
            ))}

            </Swiper>


    </div>
  )
}

export default TopSellers