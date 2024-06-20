import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "./context/AuthUserContext";

function ProtectedRoutesUser () {

    const { isAuthenticated, loading } = useAuthUser();

    if(loading) return <h1>Cargando...</h1>

    if(!loading && !isAuthenticated) return <Navigate to='/login-admin' />

    return(
        <Outlet />
    )
}

export default ProtectedRoutesUser;