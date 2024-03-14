import env from "../env";
import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/user/userBuilder";
import { useToast } from "react-native-toast-notifications";

// TODO: make socket connection on mainScreen useEffect()
export interface IuseSocketIo {
  enabled: boolean;
  userId: number;
}

export const useSocketIo = ({ enabled = false, userId }: IuseSocketIo) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const ref = useRef<Socket>();
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const socketConnection = io(env.socketUrl, {
      transports: ["websocket"],
      forceNew: true,
    });

    ref.current = socketConnection;

    socketConnection.on("connect", () => {
      console.log("connected", { userId });
      console.log({ userId });

      socketConnection.emit("registerUser", { userId });
    });
    socketConnection.on("connect_error", (err: Error) => {
      console.log(err);
      console.log(err.message);
    });
    socketConnection.on("newMessage", (message) => {
      console.log({ message });
    });
    socketConnection.on("newFriend", (incomeData) => {
      toast.show("new friend", { type: "success" });
      console.log("FUCKING WORKS", { incomeData });
    });
    socketConnection.on("alreadyLoggedIn", (incomeData) => {
      dispatch(logoutUser({}));
    });
  }, [enabled, toast]);
};
