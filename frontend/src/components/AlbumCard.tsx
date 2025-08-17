import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMusic, FaPlay } from "react-icons/fa";

interface AlbumCardProps {
  image: string;
  name: string;
  description: string;
  id: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ image, name, description, id }) => {
  const navigate = useNavigate();

  const handleViewAlbum = () => {
    navigate(`/album/${id}`);
  };

  return (
    <div className="min-w-[180px] p-3 rounded-xl cursor-pointer card-hover group bg-white/5 backdrop-blur-sm border border-white/10">
      <div className="relative">
        {/* Album Image - More compact */}
        <div className="relative overflow-hidden rounded-lg mb-3">
          <img
            src={image || "/downlode.png"}
            className="w-full h-[140px] object-cover transition-transform duration-500 group-hover:scale-105"
            alt={name}
          />
          
          {/* Overlay with music icon - More refined */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <FaMusic className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Album Info - More compact */}
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base text-white truncate">{name}</h3>
          <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed">{description}</p>
        </div>

        {/* View Album Button - More compact */}
        <div className="mt-3 pt-3 border-t border-white/8">
          <button
            className="w-full p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm cursor-pointer"
            onClick={handleViewAlbum}
            title="View Album"
          >
            <FaPlay className="w-3.5 h-3.5" />
            <span>View Album</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;