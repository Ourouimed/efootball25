const Register = ()=> {
    return (
        <div className="py-5 flex justify-center items-center  min-h-[90vh] flex-col gap-4 text-center">
            <div className="register-form">
                <form action="https://formspree.io/f/xjkypgpe" method="POST">
                    <h3 className="text-third font-bold text-2xl mb-2">
                        Register Now
                    </h3>
                    <p className="text-white mb-2">Aji T9yd f Ahsan Tournoi d pes f tarikh</p>
                    <div className="input-fields">
                        <input type="text" name="team" placeholder="Smit fr9tk" required/>
                        <input type="text" name="userid" placeholder="smitk" required/>
                        <input type="number" name="phone" placeholder="Nmra d tele" required/>
                    </div>
                    <button type="submit" className="font-bold bg-fourth text-2xl text-white rounded-md py-2 px-4 cursor-pointer mt-2 w-full">Register Team</button>
                </form>
            </div>
        </div>
    )
}

export default Register