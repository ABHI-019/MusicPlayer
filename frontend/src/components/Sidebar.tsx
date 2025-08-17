import { useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";
import { useUserData } from "../context/UserContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useUserData();

  const handleSearch = () => {
    // Navigate to search page or focus search input
    navigate("/");
    // Focus search input if it exists
    setTimeout(() => {
      const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  };

  const handleBrowsePodcasts = () => {
    // Navigate to podcasts page or show podcast section
    navigate("/");
    // Could add podcast functionality later
  };

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer hover:bg-white/10 p-2 rounded transition-colors"
          onClick={() => navigate("/")}
        >
          <img src="/home.png" alt="" className="w-6" />
          <p className="font-bold">Home</p>
        </div>
        <div 
          className="flex items-center gap-3 pl-8 cursor-pointer hover:bg-white/10 p-2 rounded transition-colors"
          onClick={handleSearch}
        >
          <img src="/search.png" alt="" className="w-6" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/stack.png" className="w-8" alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img src="/arrow.png" className="w-8 cursor-pointer hover:opacity-70 transition-opacity" alt="" />
            <img src="/plus.png" className="w-8 cursor-pointer hover:opacity-70 transition-opacity" alt="" />
          </div>
        </div>
        <div onClick={() => navigate("/playlist")} className="cursor-pointer">
          <PlayListCard />
        </div>

        <div className="p-4 m-2 bg-[#121212] rounded font-semibold flex flex-col items-start gap-1 pl-4 mt-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">we'll keep you updated on new episodes</p>
          <button 
            className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={handleBrowsePodcasts}
          >
            Browse Podcasts
          </button>
        </div>

        {user && user.role === "admin" && (
          <button
            className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => navigate("/admin/dashboard")}
          >
            Admin Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;