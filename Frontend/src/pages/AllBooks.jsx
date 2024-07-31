import axios from 'axios'
import { useEffect, useState } from 'react'
import BookCards from '../components/BookCards'
import Loader from '../components/Loader'


const AllBooks = () => {
 
    const [data,setData] = useState()

    const recentBook = async()=>{
        try {
            const response =  await axios("http://localhost:5000/api/admin/getAllBooks",{
                method:'GET',
                headers: {
                    "Content-Type": "application/json",
                  },
                  
            });
             setData(response.data)
          
           
         
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
       recentBook()
    },[])

  return (
    <div className="bg-zinc-900 h-auto py-8 px-12">

<h3 className="text-4xl font-semibold text-yellow-100">All Books</h3>

{!data && <div className="w-full h-screen flex items-center justify-center"> 
    <Loader/></div>}

<div className='my-8  grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>

{
    data && data.map((items,i)=>(
   <div key={i}>
         <BookCards datas={items}/> {" "}
    </div>
    ))
}
</div>

    </div>
  )
}


export default AllBooks