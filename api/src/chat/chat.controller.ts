import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ChatGateway } from './chat.gateway';
import { chatRoomDto } from './dtos/chatRoom.dto';
import { RoomService } from './room/room.service';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(
    private readonly chatGateway: ChatGateway,
    private readonly roomService: RoomService,
  ) {}

  @Post('createRoom')
  async createRoom(@Req() { user }, @Body() payload: chatRoomDto) {
    const room: chatRoomDto = await this.roomService.createRoom(
      payload,
      user.id,
    );
    this.chatGateway.server.in(`${user.id}`).socketsJoin(`room${room.id}`);
    return { ...room, isGroupChat: true };
  }
}
