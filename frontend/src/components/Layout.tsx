import Sidebar from "./Sidebar";

const Layout = () => {
    return <div className="h-screen">
        <div className="h-[90%] flex">
            <Sidebar/>
        </div>
    </div>;
}

export default Layout;