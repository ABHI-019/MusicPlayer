import { useNavigate, useLocation } from "react-router-dom";
import { useUserData } from "../context/UserContext";
import { FaArrowLeft, FaArrowRight, FaSignOutAlt, FaSignInAlt, FaCrown, FaDownload } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, logoutUser } = useUserData();
  
  const logoutUserHandler = () => {
    logoutUser();
    navigate("/");
  };

  const canGoBack = window.history.length > 1;
  const canGoForward = window.history.length > 1;

  return (
    <div className="w-full space-y-4">
      {/* Top Navigation Bar - More compact */}
      <div className="w-full flex justify-between items-center">
        {/* Navigation Arrows - More refined */}
        <div className="flex items-center gap-2">
          <button
            className={`p-2 rounded-lg transition-all duration-300 ${
              canGoBack 
                ? "bg-white/8 hover:bg-white/15 text-white cursor-pointer hover:scale-105" 
                : "bg-white/4 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => canGoBack && navigate(-1)}
            disabled={!canGoBack}
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            className={`p-2 rounded-lg transition-all duration-300 ${
              canGoForward 
                ? "bg-white/8 hover:bg-white/15 text-white cursor-pointer hover:scale-105" 
                : "bg-white/4 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => canGoForward && navigate(1)}
            disabled={!canGoForward}
          >
            <FaArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Side Actions - More compact */}
        <div className="flex items-center gap-3">
          <button className="btn-secondary hidden md:flex items-center gap-2 text-sm">
            <FaCrown className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Premium</span>
          </button>
          <button className="btn-secondary hidden md:flex items-center gap-2 text-sm">
            <FaDownload className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Install</span>
          </button>
          
          {isAuth ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate("/playlist")}
                className="btn-secondary text-sm"
              >
                <span className="hidden sm:inline">Playlist</span>
                <span className="sm:hidden">List</span>
              </button>
              <button 
                onClick={logoutUserHandler} 
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <FaSignOutAlt className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate("/login")} 
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <FaSignInAlt className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Navigation - More refined */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button 
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
            location.pathname === "/" 
              ? "bg-green-500 text-black shadow-md" 
              : "bg-white/8 hover:bg-white/15 text-white"
          }`}
          onClick={() => navigate("/")}
        >
          All
        </button>
        <button 
          className="px-4 py-2 rounded-lg font-medium bg-white/8 hover:bg-white/15 text-white transition-all duration-300 hidden md:block text-sm"
        >
          Music
        </button>
        <button 
          className="px-4 py-2 rounded-lg font-medium bg-white/8 hover:bg-white/15 text-white transition-all duration-300 hidden md:block text-sm"
        >
          Podcast
        </button>
        <button 
          className="px-4 py-2 rounded-lg font-medium bg-white/8 hover:bg-white/15 text-white transition-all duration-300 md:hidden text-sm"
          onClick={() => navigate("/playlist")}
        >
          PlayList
        </button>
      </div>
    </div>
  );
};

export default Navbar;