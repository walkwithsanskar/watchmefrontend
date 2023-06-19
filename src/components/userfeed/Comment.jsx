import React from 'react'
import LazyLoad from 'react-lazy-load'

const Comment = ({comment,setComments}) => {
  return (
    <div className='flex lg:flex-row md:flex-row flex-col lg:gap-[20px] md:gap-[20px] gap-2 w-[100%]'>
        <div  className='flex flex-row lg:gap-1 md:gap-1 gap-0  w-[30%]' >
       
        <div className='h-[40px] min-w-[40px] flex justify-between items-center'>
        <LazyLoad once threshold={0.99}>
      
        <img src={comment?.user_id?.profilePic} className="rounded-[50%] w-[30px]  min-w-[30px] aspect-square object-cover" alt="" />
        </LazyLoad>
        </div>
        
        

        
        <h1  className='text-[12px] w-fit font-bold  self-center min-w-fit'>{comment?.user_id?.email.split("@")[0]}</h1>
        </div>
        
        <h1 className="w-[100%] overflow-x-hidden whitespace-pre-wrap break-words  bg-neutral-800   text-[12px] px-1 self-center py-1">{comment?.comment}</h1>
    </div>
  )
}

export default Comment