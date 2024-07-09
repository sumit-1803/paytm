import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        document.title = "PayTM Dashboard";
        const token = localStorage.getItem("token");

        axios.get("http://localhost:3000/api/v1/user/me", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });

        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setBalance(response.data.balance);
        })
        .catch(error => {
            console.error("Error fetching balance:", error);
        });
    }, []);

    return (
        <div>
            <Appbar user={user} />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
};
