import { Module } from "@nestjs/common";
import { ForgeService } from "./forge.service";
import { ForgeController } from "./forge.controller";

@Module({
  controllers: [ForgeController],
  providers: [ForgeService],
})
export class ForgeModule {}
