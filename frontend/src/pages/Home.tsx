import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import SongCard from "../components/SongCard";
import { useSongData } from "../context/SongContext";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { FaFire, FaStar, FaSearch, FaTimes, FaKeyboard } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const { albums, songs, loading } = useSongData();
  const [searchQuery, setSearchQuery] = useState("");
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { shortcuts } = useKeyboardShortcuts();

  // Filter songs and albums based on search query
  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return songs;
    return songs.filter(song => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [songs, searchQuery]);

  const filteredAlbums = useMemo(() => {
    if (!searchQuery.trim()) return albums;
    return albums.filter(album => 
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [albums, searchQuery]);

  if (loading) {
    return <Loading />;
  }

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleCreatePlaylist = () => {
    // Navigate to playlist page or show create playlist modal
    navigate("/playlist");
  };

  const handleDiscoverMusic = () => {
    // Navigate to a discovery page or scroll to music section
    const musicSection = document.querySelector('[data-section="music"]');
    if (musicSection) {
      musicSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      <div className="main-content space-y-1">
        {/* Hero Section - Ultra minimal spacing */}
        <section className="section-spacing text-center py-2">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-1">
            Welcome to SpotOn
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-1">
            Discover the latest hits and your favorite albums in one place
          </p>
          
          {/* Keyboard Shortcuts Help */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/8 hover:bg-white/15 text-white transition-all duration-300 text-sm hover:scale-105 cursor-pointer"
            >
              <FaKeyboard className="w-4 h-4" />
              <span>Keyboard Shortcuts</span>
            </button>
          </div>
        </section>

        {/* Search Bar - Perfectly centered */}
        <section className="section-spacing">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for songs, albums, or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pl-12 pr-12 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm"
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  borderColor: 'rgba(71, 85, 105, 0.5)',
                  color: '#f8fafc'
                }}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {searchQuery && (
              <div className="mt-3 text-sm text-gray-400 text-center">
                Found {filteredSongs.length} songs and {filteredAlbums.length} albums
              </div>
            )}
          </div>
        </section>

        {/* Featured Charts Section - Ultra minimal spacing */}
        <section className="section-spacing" data-section="music">
          <div className="flex items-center gap-3 mb-1">
            <FaStar className="text-yellow-400 w-6 h-6" />
            <h2 className="text-3xl font-bold text-white">
              {searchQuery ? 'Search Results - Albums' : 'Featured Charts'}
            </h2>
          </div>
          
          {filteredAlbums && filteredAlbums.length > 0 ? (
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {filteredAlbums.map((album, index) => (
                <AlbumCard 
                  key={album.id || index} 
                  image={album.thumbnail}
                  name={album.title}
                  description={album.description}
                  id={album.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-gray-400 text-lg">
                {searchQuery ? 'No albums found matching your search' : 'No albums available yet'}
              </p>
            </div>
          )}
        </section>

        {/* Today's Hits Section - Ultra minimal spacing */}
        <section className="section-spacing">
          <div className="flex items-center gap-3 mb-1">
            <FaFire className="text-orange-400 w-6 h-6" />
            <h2 className="text-3xl font-bold text-white">
              {searchQuery ? 'Search Results - Songs' : 'Today\'s Hits'}
            </h2>
          </div>
          
          {filteredSongs && filteredSongs.length > 0 ? (
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {filteredSongs.map((song, index) => (
                <SongCard 
                  key={song.id || index} 
                  image={song.thumbnail}
                  name={song.title}
                  description={song.description}
                  id={song.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-gray-400 text-lg">
                {searchQuery ? 'No songs found matching your search' : 'No songs available yet'}
              </p>
            </div>
          )}
        </section>

        {/* Quick Actions - Only show when not searching */}
        {!searchQuery && (
          <section className="section-spacing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-3 rounded-2xl text-center hover-lift">
                <FaStar className="text-yellow-400 w-10 h-10 mx-auto mb-1" />
                <h3 className="text-lg font-semibold text-white mb-1">Create Playlist</h3>
                <p className="text-gray-300 mb-1">Build your perfect music collection</p>
                <button 
                  className="btn-primary px-6 py-3 cursor-pointer"
                  onClick={handleCreatePlaylist}
                >
                  Get Started
                </button>
              </div>
              
              <div className="glass p-3 rounded-2xl text-center hover-lift">
                <FaFire className="text-orange-400 w-10 h-10 mx-auto mb-1" />
                <h3 className="text-lg font-semibold text-white mb-1">Discover Music</h3>
                <p className="text-gray-300 mb-1">Find new artists and tracks</p>
                <button 
                  className="btn-primary px-6 py-3 cursor-pointer"
                  onClick={handleDiscoverMusic}
                >
                  Explore
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass p-8 rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <FaKeyboard className="w-6 h-6" />
                Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setShowShortcuts(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-white text-sm">{shortcut.action}</span>
                  <kbd className="px-3 py-1.5 rounded-md bg-white/10 text-white text-xs font-mono">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setShowShortcuts(false)}
                className="btn-primary px-6 py-3 cursor-pointer"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;