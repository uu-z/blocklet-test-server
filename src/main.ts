import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import passport from "@abtnode/passport";

const { BLOCKLET_PORT = 3000 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(
    passport({
      nodeHost: `http://127.0.0.1:${process.env.ABT_NODE_PORT}`,
      blockletSk: process.env.BLOCKLET_APP_SK,
      blockletRoutes: [/^\/admin/, /^\/config/]
    })
  );
  await app.listen(BLOCKLET_PORT, () => Logger.log(`Server is running on http://localhost:${BLOCKLET_PORT}`));
}
bootstrap();
