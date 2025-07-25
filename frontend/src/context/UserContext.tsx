import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import { createContext,ReactNode, useContext, useEffect, useState } from "react";

const server = import.meta.env.VITE_USER_SERVICE_URL;
export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    playlist: string[];
}
interface UserContextType {
    user: User | null;
    isAuth: boolean;
    loading: boolean;
    btnLoading: boolean;
    loginUser: (
        email: string,
        password: string,
        navigate: (path: string) => void
    )=> Promise<void>;
    registerUser: (
        name: string,
        email: string,
        password: string,
        navigate: (path: string) => void
    )=> Promise<void>;
    addToPlaylist: (id: string) => Promise<void>;
    fetchUser: () => Promise<void>;
    logoutUser: () => Promise<void>;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

async function registerUser(
        name:string,
        email:string,
        password:string,
        navigate: (path: string) => void
     ){
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/v1/user/register`, {
                name,
                email,
                password
            });

            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
            setBtnLoading(false);
        }
        
    }

    async function loginUser(
        email:string,
        password:string,
        navigate: (path: string) => void
     ){
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/v1/user/login`, {
                email,
                password
            });

            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
            setBtnLoading(false);
        }
        
    }

    async function fetchUser(){
        try {
            const { data } = await axios.get(`${server}/api/v1/user/me`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setUser(data);
            setIsAuth(true);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false);
        }
    }

    async function logoutUser() {
        localStorage.clear();
        setUser(null);
        setIsAuth(false);
        toast.success("Logged out successfully");
    }

    async function addToPlaylist(id:string) {
        try{
            const {data}= await axios.post(`${server}/api/v1/song/${id}`,{},
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            toast.success(data.message);
            fetchUser();

        }catch(error :any) {
            toast.error(error.response?.data?.message || "Failed to add to playlist");
        }
        
    }

    // Fetch user data when the provider mounts
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user, isAuth, loading,btnLoading, loginUser, registerUser, logoutUser, addToPlaylist, fetchUser}}>
            {children}
            <Toaster/>
        </UserContext.Provider>
    );
};

export const useUserData=():UserContextType=>{
    const context = useContext(UserContext);
    // Use the correct hook name
    if (!context) {
        throw new Error("useUserData must be used within a UserProvider");
    }
    return context;
}