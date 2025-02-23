import { AstroX } from "./astrox"
import { InternetIdentity } from "./internet-identity"
import { PlugWallet } from "./plug-wallet"
import { StoicWallet } from "./stoic-wallet"
import { InfinityWallet } from "./infinity-wallet"
import { NFID } from "./nfid"
import { ICX } from "./icx/connector"
// import { EarthWallet } from "./earth-wallet"
import type { IConnector, IWalletConnector } from "./connectors"
import { DelegationMode } from "@astrox/sdk-web/build/types"

export * from "./connectors"
export type Provider = IConnector & Partial<IWalletConnector>
export type WalletProvider = IConnector & IWalletConnector

type Config = {
  whitelist: Array<string>
  host?: string
  dev?: boolean
  autoConnect?: boolean
  providerUrl: string
  ledgerCanisterId: string
  ledgerHost?: string
  appName?: string
  delegationModes?: Array<DelegationMode>
  derivationOrigin?: string
}

let isICX = !!window.icx

export const defaultProviders: (config: Config) => Array<Provider> = (config) => {
  return isICX ? [new ICX(config)] : [
    new AstroX(config),
    // EarthWallet,
    new InfinityWallet(config),
    new InternetIdentity(config),
    new NFID(config),
    new PlugWallet(config),
    new StoicWallet(config),
  ]
}

export const walletProviders: (Config) => Array<WalletProvider> = (config) => {
  return isICX ? [new ICX(config)] : [
    new AstroX(config),
    new PlugWallet(config),
  ]
}

export {
  AstroX,
  // EarthWallet,
  InfinityWallet,
  InternetIdentity,
  NFID,
  PlugWallet,
  StoicWallet,
  ICX,
}