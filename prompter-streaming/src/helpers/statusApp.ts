import {useEffect, useState} from "react";

export function useStatusApp() {
  const [isRealTimeConnected, setIsRealTimeConnected] = useState(false);

  useEffect(() => {
    const checkConnection = () => {
      try {
        const channel = new BroadcastChannel("test-connection");

        channel.postMessage({type: "PING"});
        setIsRealTimeConnected(true);
        channel.close();
      } catch (error) {
        setIsRealTimeConnected(false);
      }
    };

    checkConnection();

    // Check connection 🟢
    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, []);

  return isRealTimeConnected;
}
