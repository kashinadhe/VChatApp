import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className="h-full w-full bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
                <h1 className="text-3x1 font-semibold text-center text-gray-300 pt-15">Login</h1>
                <form className='w-3/4 m-auto pb-5'
                    onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="" className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="" className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow" placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>

                    <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button className="btn btn-block btn-sm mt-2"
                            disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}
