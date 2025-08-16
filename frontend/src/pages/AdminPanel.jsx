import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";


const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-3xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        {/* Sidebar Links */}
        <div>
            <nav className="grid">
              <Link to={"all-users"} className="p-2 hover:bg-slate-100">All users</Link>
              <Link to={"products"} className="p-2 hover:bg-slate-100">Products</Link>

            </nav>
        </div>
      </aside>
      <main></main>
    </div>
  );
};

export default AdminPanel;
