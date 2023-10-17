import { config } from "@/config/config";
import { store } from "@/redux/store";
import { io } from "socket.io-client";

// const token = store.getState()?.authData?.authToken;
// console.log("🚀 ~ file: socket.js:8 ~ token:", token);

const socket = io(config.baseUrl, {
  autoConnect: true,
  query: { token: store.getState()?.authData?.authToken },
});

export default socket;
