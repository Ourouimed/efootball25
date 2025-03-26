const Register = ()=> {
    return (
        <div className="py-5 flex justify-center items-center  min-h-[90vh] flex-col gap-4 text-center">
            <div className="register-form">
                <form action="https://formspree.io/f/xblgkwgw" method="POST">
                    <h3 className="text-third font-bold text-2xl mb-2">
                        Register Now
                    </h3>
                    <p className="text-white mb-2">Fill Your team informations</p>
                    <div className="input-fields">
                        <input type="text" name="team" placeholder="Your Team name" required/>
                        <input type="text" name="userid" placeholder="Your Username" required/>
                        <input type="number" name="phone" placeholder="Your Phone Number" required/>
                    </div>
                    <button type="submit" className="font-bold bg-fourth text-2xl text-white rounded-md py-2 px-4 cursor-pointer mt-2 w-full">Register Team</button>
                </form>
            </div>
        </div>
    )
}

export default Register