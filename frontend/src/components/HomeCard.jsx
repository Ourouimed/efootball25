const HomeCard= ({title , children})=>{
    return <>
    <div className="bg-white rounded-md overflow-hidden h-[max-content] mb-4">
       <div className="bg-third text-white py-2 px-4">
           <h3 className="text-xl text-center">{title}</h3>
       </div>
       <div className="bg-white p-2">
        {children}
       </div>
    </div>
</>
}

export default HomeCard