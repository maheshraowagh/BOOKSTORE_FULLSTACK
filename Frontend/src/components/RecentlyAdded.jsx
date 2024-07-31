import axios from 'axios'
import { useEffect, useState } from 'react'
import BookCards from './BookCards.jsx'
import Loader from './Loader.jsx'

const RecentlyAdded = () => {
    const [data,setData] = useState()
      const API = "https://bookstore-backenc.onrender.com"

    const recentBook = async()=>{
        try {
            const response =  await axios(`${API}/api/admin/getFourBooks`,{
                method:'GET',
                headers: {
                    "Content-Type": "application/json",
                  },
                  
            });
             setData(response.data)
            // console.log(response.data);
           
         
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
       recentBook()
    },[])
  return (
    <>
<div className="mt-24  md:px-20">
<h3 className=" text-center  text-3xl lg:text-4xl font-semibold text-yellow-100">Recently added books</h3>
</div>
{!data && <div className='flex items-center justify-center my-8'> <Loader/></div>}
<div className='my-8  grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
{
    data && data.map((items,i)=>(
   <div key={i}>
         <BookCards datas={items}/> {" "}
    </div>
    ))
}
</div>

    </>
  )
}

export default RecentlyAdded
