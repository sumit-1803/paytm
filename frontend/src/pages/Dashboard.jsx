import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch the logged-in user data
        const token = localStorage.getItem("token"); // Retrieve the token from local storage

        axios.get("http://localhost:3000/api/v1/user/me", {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
        .then(response => {
            setUser(response.data.user);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    return (
        <div>
            <Appbar user={user} />
            <div className="m-8">
                <Balance value={"10,000"} />
                <Users />
            </div>
        </div>
    );
};
