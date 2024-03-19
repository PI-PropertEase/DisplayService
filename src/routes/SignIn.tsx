import ToogleDarkMode from "../components/ToogleDarkMode";


export default function SignIn() {
    return (
        <>
        <div className="fixed right-0 top-4 px-4">
            <ToogleDarkMode />
        </div>
        <div className="flex flex-row items-center justify-cente px-4">
                <div className="flex flex-col gap-24 items-center">
                    <img src="./src/assets/logo.png" alt="logo" className="bg-white" />
                    <div className="flex flex-col items-center justify-center gap-16">
                        <h1 className="text-6xl font-bold text-center">Sign in to your account</h1>
                        <p className="text-4xl font-light text-center">PropertEase: Your gateway to streamlined real estate management. Sign in and take control of your investments today!</p>
                        <div className="flex flex-col items-center justify-center gap-8 shadow shadow-base-200 p-8 rounded-xl">
                            <input type="text" placeholder="Email" className="input input-bordered input-lg w-96" />
                            <input type="password" placeholder="Password" className="input input-bordered input-lg w-96" />
                            <div className="flex flex-row justify-between items-center w-full">
                                <div className="flex flex-row gap-2 items-center">
                                <input type="checkbox" className="checkbox" />
                                <label className="text-lg">Remember me</label>
                                </div>
                                <p>Forgot Password?</p>

                            </div>
                            <button className="btn btn-primary btn-lg w-full">Sign In</button>
                        </div>
                    </div>
                </div>
        </div>
    
        </>
    );  
}
