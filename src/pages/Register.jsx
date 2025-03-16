const Register = ()=> {
    return (
        <div className="p-5 flex justify-center items-center  min-h-[70vh] flex-col gap-4">
            <div className="register-form">
                <form action="https://getform.io/f/axowrodb" method="POST">
                    <h3 className="text-[var(--third-color)] font-bold text-2xl mb-2">
                        Register Now
                    </h3>
                    <p className="text-white mb-2">Fill Your team informations</p>
                    <div className="input-fields">
                        <input type="text" name="team" placeholder="Your Team name" required/>
                        <input type="text" name="userid" placeholder="Your User Id" required/>
                        <input type="number" name="phone" placeholder="Your Phone Number" required/>
                    </div>
                    <button type="submit" className="font-bold bg-[var(--fourth-color)] text-2xl text-white rounded-md py-2 px-4 cursor-pointer mt-2 w-full">Register Team</button>
                </form>
            </div>
        </div>
    )
}

export default Register