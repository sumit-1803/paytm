export const Appbar = ({ user }) => {
    const getInitials = (user) => {
        if (!user || !user.firstName || !user.lastName) return "";

        const { firstName, lastName } = user;
        return `${firstName[0]}${lastName[0]}`;
    };

    return (
        <div className="shadow h-14 flex justify-between">
            <img className="ml-4" src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg" alt="" />
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
            </div>
        </div>
    );
};
