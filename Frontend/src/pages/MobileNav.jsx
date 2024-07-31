import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role)
  
  return (
    <>
      {role === 'user' && (
        <div className='w-full flex flex-col items-center justify-between lg:hidden mt-4'>
          <Link
            to="/profile"
            className="text-xl text-zinc-100 font-semibold w-full py-5 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-xl text-zinc-100 font-semibold w-full py-5 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-xl text-zinc-100 font-semibold w-full py-5 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}

      {role === 'admin' && (
        <div className='w-full flex  items-center justify-between lg:hidden mt-4'>
          <Link
            to="/profile"
            className="text-xl text-zinc-100 font-semibold w-full py-5 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/addBook"
            className="text-xl text-zinc-100 font-semibold w-full py-5 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
    </>
  )
}

export default MobileNav
