export const cleanupChannel = (ch: BroadcastChannel | null) => () => {
  if (ch) {
    ch.close();
  }
};
