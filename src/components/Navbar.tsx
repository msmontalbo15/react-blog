import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '../lib/supabase'
import type { RootState } from '../store/store'
import { setUser } from '../store/authSlice'
import type { JSX } from 'react'


export default function Navbar(): JSX.Element {
const navigate = useNavigate()
const dispatch = useDispatch()
const user = useSelector((state: RootState) => state.auth.user)


const handleLogout = async () => {
await supabase.auth.signOut()
dispatch(setUser(null))
navigate('/login', { replace: true })
}


return (
<nav className="bg-white border-b px-6 py-3 flex justify-between items-center">
<Link to="/blogs" className="text-xl font-bold">
Blogify
</Link>


<div className="flex items-center gap-4">
{user && (
<>
<button 
onClick={() => navigate('/create')}
className="text-sm font-medium bg-blue-600 text-white px-3 py-1 rounded"
>
  Create Blog
</button>
<button
onClick={handleLogout}
className="bg-red-600 text-white px-3 py-1 rounded"
>
Logout
</button>
</>
)}


{!user && (
<>
<Link to="/login" className="text-sm">Login</Link>
<Link to="/register" className="text-sm">Register</Link>
</>
)}
</div>
</nav>
)
}