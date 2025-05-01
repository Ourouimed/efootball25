const StatsCard = ({label , value , icon}) => {
    return (
        <div className="bg-white shadow-md rounded-lg py-8 px-6 w-full">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-4xl text-primary font-bold mb-1">{value}</h3>
                    <p className="text-gray-600 text-2xl">{label}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default StatsCard;