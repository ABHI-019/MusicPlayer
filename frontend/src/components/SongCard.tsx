import React from "react";
import { FaPlay, FaBookmark } from "react-icons/fa";
import { useUserData } from "../context/UserContext";
import { useSongData } from "../context/SongContext";

interface SongCardProps {
  image: string;
  name: string;
  description: string;
  id: string;
}

const SongCard: React.FC<SongCardProps> = ({ image, name, description, id }) => {
  const { addToPlaylist, isAuth } = useUserData();
  const { setSelectedSong, setIsPlaying } = useSongData();

  const saveToPlayListHandler = () => {
    if (isAuth) {
      addToPlaylist(id);
    }
  };

  const playSongHandler = () => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  return (
    <div className="min-w-[180px] p-3 rounded-xl cursor-pointer card-hover group bg-white/5 backdrop-blur-sm border border-white/10">
      <div className="relative">
        {/* Song Image - More compact */}
        <div className="relative overflow-hidden rounded-lg mb-3">
          <img
            src={image || "/downlode.png"}
            className="w-full h-[140px] object-cover transition-transform duration-500 group-hover:scale-105"
            alt={name}
          />
          
          {/* Overlay with play button - More refined */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <button 
              className="bg-green-500 hover:bg-green-400 text-black p-3 rounded-full transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg hover:shadow-green-500/30 cursor-pointer"
              onClick={playSongHandler}
            >
              <FaPlay className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Song Info - More compact */}
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base text-white truncate">{name}</h3>
          <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed">{description}</p>
        </div>

        {/* Action Buttons - More compact */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
          <button
            className={`p-2 rounded-lg transition-all duration-300 ${
              isAuth 
                ? "bg-white/8 hover:bg-white/15 text-white hover:scale-105 cursor-pointer" 
                : "bg-gray-600/40 text-gray-400 cursor-not-allowed"
            }`}
            onClick={saveToPlayListHandler}
            disabled={!isAuth}
            title={isAuth ? "Add to Playlist" : "Login to add to playlist"}
          >
            <FaBookmark className="w-3.5 h-3.5" />
          </button>
          
          <button
            className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={playSongHandler}
            title="Play Song"
          >
            <FaPlay className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;