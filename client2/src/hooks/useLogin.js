import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputError({ username, password });

        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // setting localstorage with user's data
            localStorage.setItem("chat-user", JSON.stringify(data));

            // setting auth context
            setAuthUser(data);

        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, login };
}

function handleInputError({ username, password }) {

    if (!username) {
        toast.error('Please enter username');
        return false;
    }
    else if (!password) {
        toast.error('Please enter password');
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}