import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

// signup form validation and API calls
export default function useSignup() {
    const [loading, setLoading] = useState(false);

    const { authUser, setAuthUser } = useAuthContext();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputError({ fullName, username, password, confirmPassword, gender });

        if (!success) return;

        setLoading(true);

        try {
            //Sign up API call
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            //local storage
            localStorage.setItem("chat-user", JSON.stringify(data));

            //context
            setAuthUser(data);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, signup };
}

function handleInputError({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName) {
        toast.error('Please fill your name');
        return false;
    }
    else if (!username) {
        toast.error('Please enter username');
        return false;
    }
    else if (!password) {
        toast.error('Please enter password');
        return false;
    }
    else if (!confirmPassword) {
        toast.error('Please confirm password');
        return false;
    }
    else if (!gender) {
        toast.error('Please select gender');
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}