import { SocketContext } from "@/providers/socket"
import { useContext } from "react"

export const useSocket =  () => {
    const {socket} = useContext(SocketContext);

    return {
        socket
    }
}