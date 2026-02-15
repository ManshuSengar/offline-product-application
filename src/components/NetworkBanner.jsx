import './NetworkBanner.css';

export function NetworkBanner({ isOnline, wasOffline }) {
  if (isOnline && !wasOffline) return null;

  return (
    <div className={`network-banner ${isOnline ? 'back-online' : 'offline'}`}>
      <span className="network-dot" />
      {isOnline
        ? '✓ Back online — all changes synced'
        : '📡 You\'re offline — browsing cached content'}
    </div>
  );
}
