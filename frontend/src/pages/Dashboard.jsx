import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        document.title = "PayTM Dashboard";
        const token = localStorage.getItem("token");

        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get("http://localhost:3000/api/v1/user/me", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const user = userResponse.data;
                setUser(user);

                const balanceResponse = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const balanceData = balanceResponse.data;
                setBalance(balanceData.balance);
            } catch (error) {
                console.error("Error fetching user or account data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <Appbar user={user} />
            <div className="m-8">
                <Balance value={balance ? balance.toLocaleString() : "Loading..."} />
                <Users />
            </div>
        </div>
    );
};
