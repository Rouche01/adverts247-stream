import { useContext, useEffect } from "react";
import { Context as DriverContext } from "../context/DriverContext";
import { Context as StreamingContext } from "../context/StreamingContext";
import { customNavigate } from "../navigationRef";

export default () => {
  const {
    state: { user, error },
    getUser,
  } = useContext(DriverContext);
  const {
    state: { streamingStatus },
    getStreamingStatus,
  } = useContext(StreamingContext);

  useEffect(() => {
    if (streamingStatus === "off") {
      customNavigate("NoActivity");
    } else if (streamingStatus === "on") {
      customNavigate("Welcome");
    }
  }, [streamingStatus]);

  const signinAndNavigate = (signinFunc, data) => {
    if (!data) {
      signinFunc(getUser);
    } else {
      signinFunc(data, getUser);
    }
  };

  return [signinAndNavigate, error];
};
