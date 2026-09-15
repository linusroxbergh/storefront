const env = import.meta.env;

// On unless the env var says otherwise, e.g. VITE_FLAG_NEW_BADGES=false in .env.local
export const flags = {
  newBadges: env.VITE_FLAG_NEW_BADGES !== 'false',
};
