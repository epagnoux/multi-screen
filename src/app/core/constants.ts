import { ProductCategory } from '../services/webapi';

export enum QueryParam {
  AppRedirectUrl = 'AppRedirectUrl'
}

export enum AppSettingsConfigKey {
  FileName = 'appSettings.json',
  Path = 'assets/configs'
}

export enum CommonParam {
  EchoWebSiteUrl = 'https://echodigitaltwins.com',
  MediaBaseUrl = 'https://caecacedevechodt.z9.web.core.windows.net/'
}

export class Constants {
  public static readonly PinWidthSize: number = 36;
  public static readonly PinHeightSize: number = 36;
  public static readonly PremiumKey = ProductCategory.KeyPremium;
}
export class PaletteColors {
  public static readonly CiviliantEthnicityNormal = ['#c4cb01', '#4169E1', '#FF4500'];
  public static readonly CiviliantEthnicityActive = ['#f6ff00', '#b7c9ff', '#f6a283'];
  public static readonly BlastRingDefault = ['#FF000059', '#FF770080', '#FFBD0080'];
}
