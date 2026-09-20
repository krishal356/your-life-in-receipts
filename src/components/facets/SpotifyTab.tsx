import React from 'react';
import { Music, Play, Disc } from 'lucide-react';
import spotifyDataRaw from '../../data/spotify-insights.json';
import { SpotifyInsights } from '../../types';
import { formatNumber, formatHours } from '../../utils/formatters';

const spotifyData = spotifyDataRaw as SpotifyInsights;

export const SpotifyTab: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-facet-spotify-bg)',
          border: '1px solid var(--color-facet-spotify-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div className="badge badge-spotify" style={{ marginBottom: '0.5rem' }}>
            <Music size={14} />
            <span>Cultural Receipt • 11.4 Years of Sound</span>
          </div>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-ink-primary)', marginBottom: '0.25rem' }}>
            {formatHours(spotifyData.overall.totalHours)} of Music History (2013–2024)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-secondary)' }}>
            {formatNumber(spotifyData.overall.totalStreams)} listening events across {formatNumber(spotifyData.overall.uniqueArtists)} unique artists and {formatNumber(spotifyData.overall.uniqueTracks)} tracks.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-facet-spotify-border)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-facet-spotify)' }}>{spotifyData.overall.skipRatePct}%</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Skip Rate</div>
          </div>
          <div style={{ textAlign: 'center', background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-facet-spotify-border)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-facet-spotify)' }}>{spotifyData.overall.shuffleRatePct}%</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Shuffle Rate</div>
          </div>
        </div>
      </div>

      {/* Grid: Top Artists & Top Tracks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
        {/* Top Artists */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Disc size={20} color="var(--color-facet-spotify)" />
            <h4 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
              Top Artists by Listening Hours
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {spotifyData.topArtists.slice(0, 8).map((artist, idx) => (
              <div
                key={artist.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.625rem 0.75rem',
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-ink-muted)', width: '20px' }}>
                    #{idx + 1}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-ink-primary)' }}>{artist.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>{formatNumber(artist.streams)} total streams</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-facet-spotify)' }}>{artist.hours} hrs</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tracks */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Play size={20} color="var(--color-facet-spotify)" />
            <h4 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
              Most Streamed Tracks
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {spotifyData.topTracks.slice(0, 8).map((track, idx) => (
              <div
                key={`${track.artist}-${track.name}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.625rem 0.75rem',
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0, flex: 1, paddingRight: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-ink-muted)', width: '20px' }}>
                    #{idx + 1}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-ink-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {track.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>{track.artist}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-facet-spotify)' }}>
                    {track.plays} plays
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
