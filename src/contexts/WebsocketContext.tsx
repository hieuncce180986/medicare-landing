import { API } from "@/utils/api";
import { io, Socket } from "socket.io-client";
import { createContext } from "react";

export const WEBSOCKET_URL = API.SOCKET.GATEWAY;

export const socket = io(WEBSOCKET_URL);

export const WebsocketContext = createContext<Socket>(socket);

export const WebsocketProvider = WebsocketContext.Provider;
