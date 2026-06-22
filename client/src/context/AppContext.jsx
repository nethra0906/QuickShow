import { createContext, useContext, useEffect, useEffectEvent, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) =>
{
    const [isAdmin, setIsAdmin] = useState(false);
    const [shows, setShows] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const {user} = useUser()
    const {get} = useAuth()
    const {location} = useLocation()
    const navigate = useNavigate()
     
    const fetchisAdmin = async()=> 
    {
        try{
            const {data} = await axios.get('/api/admin/is-admin', {headers: {
                Authorization:  `Bearer ${await getToken()}`}})
                setIsAdmin(data.isAdmin)

                if(!data.isAdmin && location.pathname.startsWith('/admin'))
                {
                    navigate('/')
                    toast.error('You are not authorized to access admin dashboard')
                }
        }

        catch(error)
        {
            console.error(error);
        }
    }

    const fetchShows = async() =>
    {
        try{
            const { data } = await axios.get('/api/show/all')
            if(data.success)
            {
                setShows(data.shows)
            }

            else
            {
                toast.error(data.message)
            }
        }

        catch(error)
        {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchShows()
    }, [])
    

    useEffect(() => {
        
        if(user)
        {
            fetchisAdmin()

        }
    }, [user])
    
    const value = {axios}


    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext)
