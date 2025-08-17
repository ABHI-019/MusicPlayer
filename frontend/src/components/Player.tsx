import { useEffect, useRef, useState } from "react";
import { useSongData } from "../context/SongContext";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay, FaRandom, FaRedo, FaRedoAlt } from "react-icons/fa";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const Player = () => {
  const { 
    song, 
    fetchSingleSong, 
    selectedSong, 
    isPlaying, 
    setIsPlaying, 
    prevSong, 
    nextSong,
    shuffle,
    toggleShuffle,
    repeat,
    toggleRepeat
  } = useSongData();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [volume, setVolume] = useState<number>(0.7);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime || 0);
    };

    const handleEnded = () => {
      // Handle repeat modes
      if (repeat === 'one') {
        // Replay the same song
        audio.currentTime = 0;
        audio.play();
      } else {
        // Go to next song
        nextSong();
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [song, nextSong, repeat]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const progressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const getRepeatIcon = () => {
    switch (repeat) {
      case 'none':
        return <FaRedo className="w-3.5 h-3.5" />;
      case 'all':
        return <FaRedoAlt className="w-3.5 h-3.5" />;
      case 'one':
        return <FaRedoAlt className="w-3.5 h-3.5" />;
      default:
        return <FaRedo className="w-3.5 h-3.5" />;
    }
  };

  const getRepeatColor = () => {
    switch (repeat) {
      case 'none':
        return 'text-gray-400';
      case 'all':
        return 'text-green-400';
      case 'one':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (selectedSong) {
      fetchSingleSong();
    }
  }, [selectedSong, fetchSingleSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  if (!song) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="relative flex items-center h-16">
          {/* Left: Song Info - Fixed width */}
          <div className="absolute left-0 flex items-center gap-3 w-64">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={song.thumbnail || "/downlode.png"}
                alt={song.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-medium truncate text-sm">{song.title}</h3>
              <p className="text-gray-400 text-xs truncate">{song.description}</p>
            </div>
          </div>

          {/* Center: Controls - Absolutely centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center gap-1">
            {/* Progress Bar - Aligned with controls */}
            <div className="flex items-center gap-2 w-80">
              <span className="text-xs text-gray-400 w-10 text-right">
                {formatTime(progress)}
              </span>
              <input
                type="range"
                className="flex-1 progress-bar cursor-pointer h-1"
                min="0"
                max={duration || 0}
                step="1"
                value={progress}
                onChange={progressChange}
                title="Seek"
              />
              <span className="text-xs text-gray-400 w-10 text-left">
                {formatTime(duration)}
              </span>
            </div>

            {/* Control Buttons - Perfectly centered */}
            <div className="flex items-center justify-center gap-2">
              {/* Shuffle Button */}
              <button 
                className={`p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer ${
                  shuffle ? 'text-green-400' : 'text-gray-400'
                }`}
                onClick={toggleShuffle}
                title={`Shuffle ${shuffle ? 'On' : 'Off'}`}
              >
                <FaRandom className="w-4 h-4" />
              </button>

              <button 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                onClick={prevSong}
                title="Previous Song"
              >
                <GrChapterPrevious className="w-4 h-4 text-white" />
              </button>

              <button 
                className="bg-green-500 hover:bg-green-400 text-black rounded-full p-2.5 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
                onClick={handlePlayPause}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
              </button>

              <button 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                onClick={nextSong}
                title="Next Song"
              >
                <GrChapterNext className="w-4 h-4 text-white" />
              </button>

              {/* Repeat Button */}
              <button 
                className={`p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer ${getRepeatColor()}`}
                onClick={toggleRepeat}
                title={`Repeat: ${repeat === 'none' ? 'Off' : repeat === 'all' ? 'All' : 'One'}`}
              >
                {getRepeatIcon()}
              </button>
            </div>
          </div>

          {/* Right: Volume Control - Fixed width and right-aligned */}
          <div className="absolute right-0 flex items-center gap-2 w-32 justify-end">
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <FaVolumeMute className="w-4 h-4" /> : <FaVolumeUp className="w-4 h-4" />}
            </button>
            <input
              type="range"
              className="w-16 progress-bar cursor-pointer h-1"
              min="0"
              max="100"
              step="1"
              value={isMuted ? 0 : volume * 100}
              onChange={volumeChange}
              title="Volume"
            />
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={song.audio}
        preload="metadata"
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setProgress(audioRef.current.currentTime || 0);
          }
        }}
      />
    </div>
  );
};

export default Player;