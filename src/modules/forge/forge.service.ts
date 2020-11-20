import { Injectable } from "@nestjs/common";
import ForgeSDK from "@arcblock/forge-sdk/lite";
import GraphqlClient from "@arcblock/graphql-client";

const networkMetas = [
  { name: "playground", default: true, url: "https://playground.network.arcblockio.cn/api" },
  { name: "zinc", url: "https://zinc.abtnetwork.io/api" },
  { name: "xeno", url: "https://zinc.abtnetwork.io/api" }
];

@Injectable()
export class ForgeService {
  constructor() {
    networkMetas.forEach(i => {
      ForgeSDK.connect(i.url, {
        name: i.name,
        default: !!i.default
      });
    });
  }

  networks = networkMetas.map(i => {
    const graphql = new GraphqlClient(i.url);
    return {
      graphql,
      ...i
    };
  });
}
