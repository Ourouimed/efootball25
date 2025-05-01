const Card = ({title , children})=>{
    return <>
        <div className="bg-white shadow-md rounded-lg w-full">
            <div className="px-4 py-3 border-b border-[#ededed]">
                 <h3 className="text-2xl">{title}</h3>
            </div>
            <div className="px-4 py-2">
                {children}
            </div>
        </div>
    </>
}

export default Card