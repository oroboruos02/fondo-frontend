import { Navigate, Outlet } from "react-router-dom";
import { useAuthPartner } from "./context/AuthPartnerContext";

function ProtectedRoutesPartner () {

    const { isAuthenticatedPartner, loading } = useAuthPartner();

    if(loading) return <h1>Cargando...</h1>

    if(!loading && !isAuthenticatedPartner) return <Navigate to='/login-partner' />

    return(
        <Outlet />
    )
}

export default ProtectedRoutesPartner;