import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, ListMusic, Home, Search, Plus, X, Volume2 } from 'lucide-react';
import './App.css';

const PUBLIC_BASE_URL = process.env.PUBLIC_URL || '';

const MusicApp = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [activeView, setActiveView] = useState('home');
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'Mes favoris', tracks: [] }
  ]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  
  const audioRef = useRef(null);

  const tracks = [
    // APOCALYPSE (2024)
    { id: 1, title: "TOKI", artist: "Gazo", album: "APOCALYPSE", duration: 206, cover: "🔥", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_TOKI.mp3` },
    { id: 2, title: "SELELE", artist: "Gazo feat. Fally Ipupa", album: "APOCALYPSE", duration: 197, cover: "🔥", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 3, title: "NANANI NANANA", artist: "Gazo", album: "APOCALYPSE", duration: 217, cover: "🔥", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_NANANINANANA.mp3` },
    { id: 4, title: "PURE CODEI", artist: "Gazo feat. Yamê", album: "APOCALYPSE", duration: 244, cover: "🔥", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_PURECODEI.mp3` },
    { id: 5, title: "WEMBY", artist: "Gazo feat. Offset", album: "APOCALYPSE", duration: 180, cover: "🔥", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_WEMBY.mp3` },
    { id: 6, title: "PROBATION", artist: "Gazo", album: "APOCALYPSE", duration: 219, cover: "🔥", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_PROBATION.mp3` },
    { id: 7, title: "FIESTA", artist: "Gazo feat. Morad", album: "APOCALYPSE", duration: 176, cover: "🔥", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 8, title: "OPTIMALE", artist: "Gazo feat. OrelSan", album: "APOCALYPSE", duration: 184, cover: "🔥", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 9, title: "WAYANS", artist: "Gazo", album: "APOCALYPSE", duration: 156, cover: "🔥", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 10, title: "POP", artist: "Gazo feat. La Mano 1.9", album: "APOCALYPSE", duration: 216, cover: "🔥", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 11, title: "ILUV", artist: "Gazo", album: "APOCALYPSE", duration: 146, cover: "🔥", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_ILUV.mp3` },
    
    // LA MÉLO EST GANGX (2023) - avec Tiakola
    { id: 12, title: "100K", artist: "Gazo & Tiakola", album: "LA MÉLO EST GANGX", duration: 187, cover: "💎", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 13, title: "200K", artist: "Gazo & Tiakola", album: "LA MÉLO EST GANGX", duration: 205, cover: "💎", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 14, title: "NOTRE DAME", artist: "Gazo & Tiakola", album: "LA MÉLO EST GANGX", duration: 198, cover: "💎", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 15, title: "MAMI WATTA", artist: "Gazo & Tiakola", album: "LA MÉLO EST GANGX", duration: 189, cover: "💎", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 16, title: "HAINE&SEX", artist: "Gazo", album: "LA MÉLO EST GANGX", duration: 201, cover: "💎", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 17, title: "CARTIER", artist: "Tiakola", album: "LA MÉLO EST GANGX", duration: 196, cover: "💎", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    
    // KMT (2022)
    { id: 19, title: "BECTE", artist: "Gazo", album: "KMT", duration: 189, cover: "👑", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 20, title: "BODIES", artist: "Gazo", album: "KMT", duration: 176, cover: "👑", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 21, title: "LETTRE À UN OPPS", artist: "Gazo", album: "KMT", duration: 198, cover: "👑", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 22, title: "RAPPEL", artist: "Gazo", album: "KMT", duration: 201, cover: "👑", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 23, title: "HENNESSY", artist: "Gazo", album: "KMT", duration: 195, cover: "👑", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 24, title: "IMPACT", artist: "Gazo feat. Damso", album: "KMT", duration: 219, cover: "👑", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 25, title: "DIE", artist: "Gazo", album: "KMT", duration: 207, cover: "👑", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 26, title: "CELINE 3X", artist: "Gazo", album: "KMT", duration: 211, cover: "👑", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 27, title: "MAUVAIS 2X", artist: "Gazo feat. Ninho", album: "KMT", duration: 231, cover: "👑", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    
    // DRILL FR (2021)
    { id: 28, title: "TCHIN 2X", artist: "Gazo", album: "DRILL FR", duration: 189, cover: "🎯", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` },
    { id: 29, title: "DADDY CHOCOLAT", artist: "Gazo", album: "DRILL FR", duration: 209, cover: "🎯", audioUrl: `${PUBLIC_BASE_URL}/music/Gazo_SELELE.mp3` }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl;
        audioRef.current.load();
        setTimeout(() => audioRef.current?.play().catch(err => console.log('Lecture audio:', err)), 100);
      }
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextTrack = tracks[(currentIndex + 1) % tracks.length];
    playTrack(nextTrack);
  };

  const playPrevious = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
    playTrack(prevTrack);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFavorite = (trackId) => {
    setFavorites(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const createPlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylists([...playlists, {
        id: Date.now(),
        name: newPlaylistName,
        tracks: []
      }]);
      setNewPlaylistName('');
      setShowNewPlaylist(false);
    }
  };

  const addToPlaylist = (playlistId, trackId) => {
    setPlaylists(playlists.map(pl => 
      pl.id === playlistId && !pl.tracks.includes(trackId)
        ? { ...pl, tracks: [...pl.tracks, trackId] }
        : pl
    ));
  };

  const removeFromPlaylist = (playlistId, trackId) => {
    setPlaylists(playlists.map(pl => 
      pl.id === playlistId
        ? { ...pl, tracks: pl.tracks.filter(t => t !== trackId) }
        : pl
    ));
  };

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const TrackItem = ({ track, showAddToPlaylist = false, playlistId = null }) => (
    <div className="track-item">
      <button
        onClick={() => playTrack(track)}
        className="track-cover"
      >
        {track.cover}
      </button>
      <div className="track-info">
        <div className="track-title">{track.title}</div>
        <div className="track-artist">{track.artist}</div>
      </div>
      <div className="track-duration">{formatTime(track.duration)}</div>
      <button
        onClick={() => toggleFavorite(track.id)}
        className={`btn-favorite ${favorites.includes(track.id) ? 'active' : ''}`}
      >
        <Heart size={18} fill={favorites.includes(track.id) ? 'currentColor' : 'none'} />
      </button>
      {playlistId ? (
        <button
          onClick={() => removeFromPlaylist(playlistId, track.id)}
          className="btn-remove"
        >
          <X size={18} />
        </button>
      ) : showAddToPlaylist && (
        <div className="playlist-select-wrapper">
          <select
            onChange={(e) => {
              if (e.target.value) {
                addToPlaylist(parseInt(e.target.value), track.id);
                e.target.value = '';
              }
            }}
            className="playlist-select"
          >
            <option value="">+ Playlist</option>
            {playlists.map(pl => (
              <option key={pl.id} value={pl.id}>{pl.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );

  return (
    <div className="music-app">
      <audio ref={audioRef} src="" />
      
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">🎵 MusicStream</h1>
          {activeView === 'search' && (
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Rechercher une musique, un artiste..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          )}
        </div>
      </header>

      <div className="app-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="nav-menu">
            <button
              onClick={() => setActiveView('home')}
              className={`nav-button ${activeView === 'home' ? 'active' : ''}`}
            >
              <Home size={20} />
              <span>Accueil</span>
            </button>
            <button
              onClick={() => setActiveView('search')}
              className={`nav-button ${activeView === 'search' ? 'active' : ''}`}
            >
              <Search size={20} />
              <span>Rechercher</span>
            </button>
            <button
              onClick={() => setActiveView('favorites')}
              className={`nav-button ${activeView === 'favorites' ? 'active' : ''}`}
            >
              <Heart size={20} />
              <span>Favoris</span>
            </button>
          </nav>

          <div className="playlists-section">
            <div className="playlists-header">
              <h3>Playlists</h3>
              <button
                onClick={() => setShowNewPlaylist(true)}
                className="btn-add"
              >
                <Plus size={18} />
              </button>
            </div>
            
            {showNewPlaylist && (
              <div className="new-playlist-form">
                <input
                  type="text"
                  placeholder="Nom de la playlist"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && createPlaylist()}
                  className="playlist-input"
                  autoFocus
                />
                <div className="form-actions">
                  <button onClick={createPlaylist} className="btn-create">
                    Créer
                  </button>
                  <button
                    onClick={() => {
                      setShowNewPlaylist(false);
                      setNewPlaylistName('');
                    }}
                    className="btn-cancel"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}

            <div className="playlists-list">
              {playlists.map(playlist => (
                <button
                  key={playlist.id}
                  onClick={() => {
                    setSelectedPlaylist(playlist);
                    setActiveView('playlist');
                  }}
                  className={`playlist-item ${
                    activeView === 'playlist' && selectedPlaylist?.id === playlist.id ? 'active' : ''
                  }`}
                >
                  <ListMusic size={18} />
                  <span className="playlist-name">{playlist.name}</span>
                  <span className="playlist-count">{playlist.tracks.length}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="main-content">
          {activeView === 'home' && (
            <div>
              <h2 className="page-title">Toutes les musiques</h2>
              <div className="tracks-list">
                {tracks.map(track => (
                  <TrackItem key={track.id} track={track} showAddToPlaylist />
                ))}
              </div>
            </div>
          )}

          {activeView === 'search' && (
            <div>
              <h2 className="page-title">
                {searchQuery ? `Résultats pour "${searchQuery}"` : 'Rechercher'}
              </h2>
              {searchQuery && (
                <div className="tracks-list">
                  {filteredTracks.length > 0 ? (
                    filteredTracks.map(track => (
                      <TrackItem key={track.id} track={track} showAddToPlaylist />
                    ))
                  ) : (
                    <p className="empty-message">Aucun résultat trouvé</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeView === 'favorites' && (
            <div>
              <h2 className="page-title">Mes favoris</h2>
              <div className="tracks-list">
                {favorites.length > 0 ? (
                  tracks.filter(t => favorites.includes(t.id)).map(track => (
                    <TrackItem key={track.id} track={track} showAddToPlaylist />
                  ))
                ) : (
                  <p className="empty-message">Aucun favori pour le moment</p>
                )}
              </div>
            </div>
          )}

          {activeView === 'playlist' && selectedPlaylist && (
            <div>
              <h2 className="page-title">{selectedPlaylist.name}</h2>
              <div className="tracks-list">
                {selectedPlaylist.tracks.length > 0 ? (
                  tracks.filter(t => selectedPlaylist.tracks.includes(t.id)).map(track => (
                    <TrackItem key={track.id} track={track} playlistId={selectedPlaylist.id} />
                  ))
                ) : (
                  <p className="empty-message">
                    Cette playlist est vide. Ajoutez des musiques depuis l'accueil !
                  </p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Player */}
      {currentTrack && (
        <footer className="player">
          <div className="player-content">
            <div className="player-track-info">
              <span className="player-cover">{currentTrack.cover}</span>
              <div className="player-track-details">
                <div className="player-track-title">{currentTrack.title}</div>
                <div className="player-track-artist">{currentTrack.artist}</div>
              </div>
            </div>

            <div className="player-controls-section">
              <div className="player-buttons">
                <button onClick={playPrevious} className="player-btn">
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={togglePlayPause}
                  className="player-btn-main"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button onClick={playNext} className="player-btn">
                  <SkipForward size={20} />
                </button>
              </div>
              
              <div className="player-progress">
                <span className="time-display">{formatTime(currentTime)}</span>
                <div
                  onClick={handleSeek}
                  className="progress-bar"
                >
                  <div
                    className="progress-fill"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="progress-handle" />
                  </div>
                </div>
                <span className="time-display">{formatTime(duration)}</span>
              </div>
            </div>

            <div className="player-volume">
              <Volume2 size={20} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="volume-slider"
              />
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default MusicApp;