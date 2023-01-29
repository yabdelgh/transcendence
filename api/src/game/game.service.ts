import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHistory(userId: number) { 
    const ret = await this.prismaService.games.findMany({
      where: {
        OR: [{ redCornerId: userId }, {blueCornerId: userId}]
      },
      take: 10
    });
    return ret;
  }

  async getChallenges(userId: number) {
    const ret = await this.prismaService.challenges.findMany({
      where: {
        OR: [{ challengedId: userId }, {challengerId: userId}]
      },
    })
    return ret;
  }

  async challenge(challengerId: number, challenge: any) {
    try {
      const ret = await this.prismaService.challenges.create({
        data: {
          challengerId,
          challengedId: challenge.challengedId,
          map: challenge.map,
        },
      });
        return ret;
    } catch {
      return undefined;
    }
  }

  async deleteChallenge(challengerId: number, challengedId: number) { 
    const ret = await this.prismaService.challenges.delete({
      where: {
        challengerId_challengedId: { challengerId, challengedId }
      }
    })
    return ret;
  }

}