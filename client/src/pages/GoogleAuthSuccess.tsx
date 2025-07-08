import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    setItem,
    KEY_ACCESS_TOKEN,
} from "../utils/localStorageManager";

const GoogleAuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const accessToken = query.get("accessToken");
        const refreshToken = query.get("refreshToken");

        if (accessToken && refreshToken) {
            setItem(KEY_ACCESS_TOKEN, accessToken!);
            setItem("refreshToken", refreshToken!);
            navigate("/");
        }

    }, [navigate]);

    return null;
};

export default GoogleAuthSuccess;
