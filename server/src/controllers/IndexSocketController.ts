import { ConnectedSocket, OnConnect, SocketController } from "socket-controllers";
import { Socket, Server } from 'socket.io';

@SocketController()
export class IndexSocketController {

  @OnConnect()
  public onConnect(@ConnectedSocket() socket: Socket, io: Server) {
    console.log('Подключение клиента');
  }
}