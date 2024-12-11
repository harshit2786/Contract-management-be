import { prisma } from "../lib/client";
import express, { Request } from 'express';
import { WebSocket } from "ws";

const router = express.Router();

const SocketStore: WebSocket[] = [];

router.ws('/notification', (ws: WebSocket, req: Request) => {
    SocketStore.push(ws);
    ws.on('close', () => {
        const index = SocketStore.indexOf(ws);
        if (index !== -1) {
            SocketStore.splice(index, 1);
        }
    });
    ws.on('message', async (message: string) => {
        try {
            const parsedMessage = JSON.parse(message);
            const { type, id } = parsedMessage;

            if (type === 'delete') {
                const deleteMessage = JSON.stringify({ type: 'delete', id });
                SocketStore.forEach(socket => {
                    if (socket.readyState === WebSocket.OPEN) {
                        socket.send(deleteMessage);
                    }
                });
            } else if (type === 'update') {
                const contract = await prisma.contracts.findUnique({ where: { id } });
                if (contract) {
                    const updateMessage = JSON.stringify({ type: 'update', contract });
                    SocketStore.forEach(socket => {
                        if (socket.readyState === WebSocket.OPEN) {
                            socket.send(updateMessage);
                        }
                    });
                } else {
                    console.error(`Contract with id ${id} not found`);
                }
            } else {
                console.error('Unknown message type');
            }
        } catch (error) {
            console.error('Failed to handle message', error);
        }
    });
})


export default router;