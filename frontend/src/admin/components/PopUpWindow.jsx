import { Close } from "@mui/icons-material"

const PopUpWindow = ({title, onClose , children})=>{
    return <>
        <div className="popup-container">
            <div className="popup">
                <div className='popup-header'>
                    <h3 className="text-2xl">{title}</h3>
                    <button onClick={onClose} className="cursor-pointer"><Close/></button>
                </div>
                <div className="popup-content">
                   {children}
                </div>
            </div>
        </div>
    </>
}

export default PopUpWindow