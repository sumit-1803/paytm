import { useNavigate } from "react-router-dom";

export const Appbar = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    const getInitials = (user) => {
        if (!user) return "";

        const { firstName, lastName } = user;
        return `${firstName[0]}${lastName[0]}`;
    };

    return (
        <div className="shadow h-14 flex justify-between">
            <img src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg" alt="" />
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello {user ? user.firstName : ""}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {getInitials(user)}
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="px-4   text-red-500 font-bold rounded-3xl mr-2 hover:bg-red-500 hover:text-white"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
