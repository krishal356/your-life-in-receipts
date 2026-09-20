import React from 'react';
import { Music, Play, Smartphone, Disc } from 'lucide-react';
import spotifyDataRaw from '../../data/spotify-insights.json';
import { SpotifyInsights } from '../../types';

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
            5,341.5 Hours of Music History (2013–2024)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-secondary)' }}>
            149,860 listening events across 4,113 unique artists and 14,639 tracks.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
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
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>{artist.streams.toLocaleString()} total streams</div>
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
                key={track.name + track.artist}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.625rem 0.75rem',
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', overflow: 'hidden', paddingRight: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-ink-muted)', width: '20px' }}>
                    #{idx + 1}
                  </span>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-ink-primary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                      {track.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>{track.artist}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink-primary)' }}>{track.plays} plays</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yearly Listening Evolution */}
      <div className="card">
        <h4 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)', marginBottom: '1rem' }}>
          Yearly Listening Trend (2013–2024)
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
          {spotifyData.yearly.map((y) => (
            <div
              key={y.year}
              style={{
                backgroundColor: 'var(--color-canvas)',
                padding: '0.875rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-subtle)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>{y.year}</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-facet-spotify)', margin: '0.25rem 0' }}>
                {y.hours}h
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)' }}>{y.streams.toLocaleString()} streams</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-secondary)', marginTop: '0.25rem', fontWeight: 600 }}>
                {y.topArtist}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Smartphone size={20} color="var(--color-facet-spotify)" />
          <h4 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
            Platform Hardware Breakdown
          </h4>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
          {spotifyData.overall.topPlatforms.map((p) => (
            <div key={p.platform} style={{ backgroundColor: 'var(--color-canvas)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-ink-muted)', textTransform: 'capitalize' }}>
                {p.platform}
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-ink-primary)', margin: '0.2rem 0' }}>
                {p.percentage}%
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)' }}>
                {p.count.toLocaleString()} streams
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
