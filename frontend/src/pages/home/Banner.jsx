import React from 'react'
import bannerImg from '../../assets/banner.png'

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row py-16 items-center justify-between gap-12 '>

        <div className='md:w-1/2 w-full'>
            <h1 className='text-5xl font-medium mb-7'>New Releases this Week!</h1>
            <p className='mb-10'>
                It's time to update your reading list with some of the latest an dgreatest relesses in the literary world.
                From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone.
            </p>
            <button className='btn-primary'> Subscribe</button>
        </div>
        

        <div className='md:w-1/2 w-full flex md:justify-end justify-center'>
            <img src={bannerImg} alt="Banner" />
        </div>

    </div>
  )
}

export default Banner