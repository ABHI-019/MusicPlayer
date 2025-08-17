import { useEffect } from 'react';
import { useSongData } from '../context/SongContext';

export const useKeyboardShortcuts = () => {
  const { 
    isPlaying, 
    setIsPlaying, 
    nextSong, 
    prevSong, 
    toggleShuffle, 
    toggleRepeat 
  } = useSongData();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore shortcuts when typing in input fields
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        
        case 'ArrowRight':
          event.preventDefault();
          nextSong();
          break;
        
        case 'ArrowLeft':
          event.preventDefault();
          prevSong();
          break;
        
        case 'KeyS':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            toggleShuffle();
          }
          break;
        
        case 'KeyR':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            toggleRepeat();
          }
          break;
        
        case 'KeyM':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            // Toggle mute functionality could be added here
          }
          break;
        
        case 'Escape':
          // Could be used to close modals or return to home
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaying, setIsPlaying, nextSong, prevSong, toggleShuffle, toggleRepeat]);

  // Return keyboard shortcuts info for display
  return {
    shortcuts: [
      { key: 'Space', action: 'Play/Pause' },
      { key: '← →', action: 'Previous/Next' },
      { key: 'Ctrl+S', action: 'Toggle Shuffle' },
      { key: 'Ctrl+R', action: 'Toggle Repeat' },
      { key: 'Esc', action: 'Close/Return' },
    ]
  };
};
