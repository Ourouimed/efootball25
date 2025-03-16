import { Link } from "react-router-dom"
const Home = ()=> {
    return (
        <div className="p-5 flex justify-center items-center  min-h-[70vh] flex-col gap-4 text-center">
            <h3 className='text-[var(--third-color)] text-3xl font-bold'>Welcome Everyone to</h3>
            <h1 className='text-white text-5xl font-bold'><span className="text-[var(--fourth-color)]">Ourouidev</span> Efootball25 League Cup</h1>
            <p className='text-white text-2xl'>Register Now and Join the compition</p>
            <div className='flex items-center gap-2'>
            <Link to='/register' className="font-bold bg-[var(--fourth-color)] text-2xl text-white rounded-full py-2 px-4">Register Now</Link>
            <Link to='/stats' className="font-bold bg-[var(--third-color)] text-2xl text-[var(--main-color)] rounded-full py-2 px-4">Competition stats</Link>
            </div>
        </div>
    )
}

export default Home