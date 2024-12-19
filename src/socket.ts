import { io, Socket } from "socket.io-client";
import { backendUrl } from "./constants/constant";

export const socket: Socket = io(backendUrl);
