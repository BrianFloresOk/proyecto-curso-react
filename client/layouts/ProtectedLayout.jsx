import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import useAuth from "../src/hooks/useAuth";

function ProtectedLayout() {
    const { auth, loading } = useAuth();

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            {
                auth._id ? (
                    <div>
                        <Header />
                        <div>
                            <Sidebar />
                            <main>
                                <Outlet />
                            </main>
                        </div>
                    </div>
                ) : (
                    <Navigate to="/login" />
                )
            }
        </>
    );
};


export default ProtectedLayout;