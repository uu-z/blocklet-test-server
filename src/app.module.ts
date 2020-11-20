import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ForgeModule } from "./modules/forge/forge.module";

@Module({
  imports: [ForgeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
