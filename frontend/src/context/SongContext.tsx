import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const server = import.meta.env.VITE_SONG_SERVICE_URL;

export interface Song {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audio: string;
  album: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SongContextType {
  songs: Song[];
  song: Song | null;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  loading: boolean;
  selectedSong: string | null;
  setSelectedSong: (id: string) => void;
  albums: Album[];
  fetchSingleSong: () => Promise<void>;
  nextSong: () => void;
  prevSong: () => void;
  albumSong: Song[];
  albumData: Album | null;
  fetchAlbumsongs: (id: string) => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbums: () => Promise<void>;
  // New functionality
  shuffle: boolean;
  toggleShuffle: () => void;
  repeat: 'none' | 'one' | 'all';
  toggleRepeat: () => void;
  currentIndex: number;
  playRandomSong: () => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

interface SongProviderProps {
  children: ReactNode;
}

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // New state for shuffle and repeat
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<'none' | 'one' | 'all'>('none');

  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Song[]>(`${server}/api/v1/song/all`);
      setSongs(data);
      if (data.length > 0) {
        setSelectedSong(data[0].id.toString());
        setCurrentIndex(0);
      }
      setIsPlaying(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const [song, setSong] = useState<Song | null>(null);

  const fetchSingleSong = useCallback(async () => {
    if (!selectedSong) return;
    try {
      const { data } = await axios.get<Song>(
        `${server}/api/v1/song/${selectedSong}`
      );
      setSong(data);
    } catch (error) {
      console.log(error);
    }
  }, [selectedSong]);

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Album[]>(`${server}/api/v1/album/all`);
      setAlbums(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const nextSong = useCallback(() => {
    if (songs.length === 0) return;

    let nextIndex: number;
    
    if (shuffle) {
      // Play random song when shuffle is on
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      // Normal sequential play
      nextIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
    }

    setCurrentIndex(nextIndex);
    setSelectedSong(songs[nextIndex].id.toString());
    
    // Handle repeat modes
    if (repeat === 'one') {
      // Stay on same song
      setCurrentIndex(currentIndex);
      setSelectedSong(songs[currentIndex].id.toString());
    } else if (repeat === 'all' && currentIndex === songs.length - 1) {
      // Loop back to first song
      setCurrentIndex(0);
      setSelectedSong(songs[0].id.toString());
    }
  }, [currentIndex, songs, shuffle, repeat]);

  const prevSong = useCallback(() => {
    if (songs.length === 0) return;

    let prevIndex: number;
    
    if (shuffle) {
      // Play random song when shuffle is on
      prevIndex = Math.floor(Math.random() * songs.length);
    } else {
      // Normal sequential play
      prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    }

    setCurrentIndex(prevIndex);
    setSelectedSong(songs[prevIndex].id.toString());
  }, [currentIndex, songs, shuffle]);

  const playRandomSong = useCallback(() => {
    if (songs.length === 0) return;
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentIndex(randomIndex);
    setSelectedSong(songs[randomIndex].id.toString());
  }, [songs]);

  const toggleShuffle = useCallback(() => {
    setShuffle(prev => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeat(prev => {
      if (prev === 'none') return 'all';
      if (prev === 'all') return 'one';
      return 'none';
    });
  }, []);

  const [albumSong, setAlbumSong] = useState<Song[]>([]);
  const [albumData, setAlbumData] = useState<Album | null>(null);

  const fetchAlbumsongs = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<{ songs: Song[]; album: Album }>(
        `${server}/api/v1/album/${id}`
      );

      setAlbumData(data.album);
      setAlbumSong(data.songs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  return (
    <SongContext.Provider
      value={{
        songs,
        selectedSong,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        loading,
        albums,
        fetchSingleSong,
        song,
        nextSong,
        prevSong,
        fetchAlbumsongs,
        albumData,
        albumSong,
        fetchSongs,
        fetchAlbums,
        // New functionality
        shuffle,
        toggleShuffle,
        repeat,
        toggleRepeat,
        currentIndex,
        playRandomSong,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongData = (): SongContextType => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongData must be used within a songProvider");
  }
  return context;
};