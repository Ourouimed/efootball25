import axios from 'axios'
export const sendWtsp = async (recepient , message)=>{
    try {
        const response = await axios.post('http://api.textmebot.com/send.php' , {
            recipient: recepient ,
            apikey: process.env.WHATSAPP_API_KEY ,
            text: message
        })
        return response
    }
    catch (err){
         console.log(err)
    }
}