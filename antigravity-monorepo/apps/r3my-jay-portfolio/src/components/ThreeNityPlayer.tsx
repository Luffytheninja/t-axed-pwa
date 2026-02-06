'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, ListMusic, Volume2 } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  era: string;
  mood: string;
  duration: string;
  streamCount: string;
  youtubeId: string;
  isPlaylist?: boolean;
  art: string;
}

const tracks: Track[] = [
  {
    id: '1',
    title: "THRONE (Didn't Dey)",
    era: 'THE AGGRESSIVE',
    mood: 'COMMANDING',
    duration: '3:05',
    streamCount: '500K+',
    youtubeId: 'ivVHy_Z_iFk',
    art: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'COLDER (Album)',
    era: 'THE MELODIC',
    mood: 'CULTURAL',
    duration: 'ALBUM',
    streamCount: '1.2M+',
    youtubeId: 'OLAK5uy_mBuQJJUf5JgXZ38zRZXjxZqRv0IAfP5XE',
    isPlaylist: true,
    art: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'YUNNO THE DRILL (EP)',
    era: 'THE AGGRESSIVE',
    mood: 'HOSTILE',
    duration: 'EP',
    streamCount: '250K+',
    youtubeId: 'OLAK5uy_nM_k__K8nU1PYQJini8LSsDHMEWR51ja4',
    isPlaylist: true,
    art: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '4',
    title: '3NITY SELECTIONS',
    era: 'THE EXPERIMENTAL',
    mood: 'HYPNOTIC',
    duration: 'PLAYLIST',
    streamCount: '100K+',
    youtubeId: 'PLTOIl-0QsjvyQvAc73s1-HSPT8bggf6l8',
    isPlaylist: true,
    art: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
  },
];

export default function ThreeNityPlayer() {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Era filters
  const eras = ['ALL', 'THE MELODIC', 'THE AGGRESSIVE', 'THE EXPERIMENTAL'];
  const [activeEra, setActiveEra] = useState('ALL');

  const filteredTracks = activeEra === 'ALL' ? tracks : tracks.filter((t) => t.era === activeEra);

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Era Tabs */}
      <div className="flex items-center gap-6 overflow-x-auto pb-4 border-b border-accent/10 no-scrollbar">
        {eras.map((era) => (
          <button
            key={era}
            onClick={() => setActiveEra(era)}
            className={`text-xs font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap ${
              activeEra === era
                ? 'text-accent border-b border-accent pb-2'
                : 'text-cloudDancer/40 hover:text-cloudDancer'
            }`}
          >
            {era}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Player Display */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="relative aspect-video w-full bg-charcoal group overflow-hidden border border-accent/10">
            {isPlaying ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentTrack.isPlaylist ? 'videoseries?list=' : ''}${currentTrack.youtubeId}?autoplay=1`}
                title={currentTrack.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <>
                <motion.div
                  key={currentTrack.id}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
                  style={{ backgroundImage: `url(${currentTrack.art})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 bg-accent text-background flex items-center justify-center rounded-full transform hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,217,255,0.3)]"
                  >
                    <Play fill="currentColor" className="ml-1" size={32} />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-accent text-[10px] font-bold tracking-widest uppercase mb-1 block">
                  {currentTrack.isPlaylist ? 'Now Accessing' : 'Now Playing'}
                </span>
                <h3 className="text-3xl font-black kinetic-text tracking-tighter uppercase">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-cloudDancer/60 font-medium italic">
                  {currentTrack.era} — {currentTrack.mood}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-accent/60 font-bold uppercase">
                  {currentTrack.streamCount} REACH
                </p>
                <p className="text-[10px] text-cloudDancer/40 uppercase">AUTHENTIC 3NITY SOUND</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 bg-accent/10 border border-accent/20 text-accent py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-all"
              >
                {isPlaying ? 'DISCONNECT STREAM' : 'INITIALIZE STREAM'}
              </button>
              <a
                href={`https://youtube.com/${currentTrack.isPlaylist ? 'playlist?list=' : 'watch?v='}${currentTrack.youtubeId}`}
                target="_blank"
                className="flex items-center justify-center aspect-square h-[50px] border border-accent/20 text-accent hover:bg-accent/5 transition-all"
              >
                <Play size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Tracklist */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          {filteredTracks.map((track, index) => (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={track.id}
              onClick={() => {
                setCurrentTrack(track);
                setIsPlaying(false);
              }}
              className={`group flex items-center justify-between p-4 border border-transparent hover:border-accent/20 cursor-pointer transition-all ${
                currentTrack.id === track.id ? 'bg-accent/5 border-accent/20' : 'hover:bg-accent/2'
              }`}
            >
              <div className="flex items-center gap-6">
                <span
                  className={`text-xs font-bold w-4 ${currentTrack.id === track.id ? 'text-accent' : 'text-cloudDancer/20'}`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative w-12 h-12 overflow-hidden bg-charcoal">
                  <img
                    src={track.art}
                    alt={track.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                  {currentTrack.id === track.id && (
                    <div className="absolute inset-0 bg-accent/40 flex items-center justify-center">
                      <div className="flex gap-1 h-3 items-end">
                        <div
                          className="w-0.5 bg-background animate-bounce"
                          style={{ animationDelay: '0s' }}
                        />
                        <div
                          className="w-0.5 bg-background animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        />
                        <div
                          className="w-0.5 bg-background animate-bounce"
                          style={{ animationDelay: '0.4s' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h4
                    className={`text-sm font-bold tracking-wider uppercase transition-colors ${currentTrack.id === track.id ? 'text-accent' : 'group-hover:text-accent'}`}
                  >
                    {track.title}
                  </h4>
                  <p className="text-[10px] text-cloudDancer/40 font-bold uppercase tracking-[0.1em]">
                    {track.mood} // {track.era}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <span className="text-[9px] font-bold text-accent/40 px-2 py-1 border border-accent/10 uppercase hidden md:block">
                  {track.isPlaylist ? 'PROJECT' : 'SINGLE'}
                </span>
                <span className="text-[10px] font-bold text-cloudDancer/40 hidden md:block">
                  {track.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
