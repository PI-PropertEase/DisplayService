import { useState } from "react";
import ToogleDarkMode from "../components/ToogleDarkMode";
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';


export default function SignUp() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
        <div className="fixed right-0 top-4 px-4">
            <ToogleDarkMode />
        </div>
        <div className="flex flex-row items-center justify-cente px-4">
                <div className="flex flex-col gap-24 items-center">
                    <img src="./src/assets/logo.png" alt="logo" className="bg-white" />
                    <div className="flex flex-col items-center justify-center gap-16">
                        <h1 className="text-6xl font-bold text-center">Create your account</h1>
                        <p className="text-4xl font-light text-center">PropertEase gives you streamlined real estate management with precision pricing, seamless synchronization, and intuitive tools.</p>
                        <div className="flex flex-col items-center justify-center gap-8 shadow shadow-base-200 p-8 rounded-xl">
                            <input type="text" placeholder="First & Last Name" className="input input-bordered input-lg w-full" />
                            <input type="text" placeholder="Email" className="input input-bordered input-lg w-full" />
                            <div className="flex flex-row items-center gap-4">
                            <input type={showPassword ? 'text' : 'password'} placeholder="Create Password" className="input input-bordered input-lg w-96" />
                            <button type="button" className="btn btn-outline btn-primary" onClick={() => setShowPassword(!showPassword)} > 
                                {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                            </button>
                            </div>
                            <div className="flex flex-row gap-4 items-center">
                            <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" className="input input-bordered input-lg w-96" />
                            <button type="button" className="btn btn-outline btn-primary" onClick={() => setShowConfirmPassword(!showConfirmPassword)} > 
                                {showConfirmPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                            </button>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <input type="checkbox" className="checkbox"/>
                                <label className="text-lg">I agree with the <a className="text-primary">Terms & Conditions</a> of PropertEase</label>
                            </div>
                            <button className="btn btn-primary btn-lg w-full">Sign Up</button>
                        </div>
                    </div>
                </div>
        </div>
    
        </>
    );  
}
