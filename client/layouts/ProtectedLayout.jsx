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
                        <div
                            className="flex w-full h-screen container-lg"
                        >
                            <Sidebar />
                            <main
                            className="w-10/12"
                                >
                                <Outlet 
                                />
                            </main>
                        </div>
                    </div>
                ) : (
                    <Navigate to="/" />
                )
            }
        </>
    );
};


export default ProtectedLayout;