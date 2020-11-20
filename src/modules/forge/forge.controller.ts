import { Controller, Get, Post, Body, Put, Param, Delete, Query } from "@nestjs/common";
import { ForgeService } from "./forge.service";

@Controller("forge")
export class ForgeController {
  constructor(private readonly forgeService: ForgeService) {}

  @Get("/search")
  async search(@Query("query") query: string) {
    const data = { accounts: [], txs: [], assets: [] };
    await Promise.all(
      this.forgeService.networks.map(async i => {
        try {
          const [accountState = {}, tx = {}, assetState = {}] = await Promise.all([
            //@ts-ignore
            query.length == 36 ? i.graphql.getAccountState({ address: query }) : Promise.resolve({} as any),
            query.length == 64 ? i.graphql.getTx({ hash: query }) : Promise.resolve({} as any)
            //@ts-ignore
            //TODO: fix query failed
            // query.length == 36 ? i.graphql.getAssetState({ address: query }) : Promise.resolve({} as any)
          ]);

          if (accountState.state) {
            data.accounts.push(accountState.state);
          }
          if (tx.info) {
            data.txs.push(tx.info);
          }
          // if (assetState.state) {
          //   data.txs.push(assetState.state);
          // }
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      })
    );
    return data;
  }
}
