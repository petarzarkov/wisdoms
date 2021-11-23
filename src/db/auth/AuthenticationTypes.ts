export enum AuthStrategyType { Basic = "basic", VaultAppID = "vault_app_id", VaultToken = "vault_token" }

export type BaseOptions = { name: string; host: string; port: number };
export type LoginOptions = { strategy: AuthStrategyType.Basic; username: string; password: string };
export type BasicAuthenticationOptions = BaseOptions & LoginOptions;

export type BaseVaultOptions = { server: string; roleID: string };
export type AppIDOptions = { strategy: AuthStrategyType.VaultAppID; appID: string; secretID: string };
export type ClientTokenOptions = { strategy: AuthStrategyType.VaultToken; clientToken: string };

export type VaultAppIDAuthenticationOptions = BaseOptions & BaseVaultOptions & AppIDOptions;
export type VaultClientTokenAuthenticationOptions = BaseOptions & BaseVaultOptions & ClientTokenOptions;

export type AuthenticationStrategiesOptions = BasicAuthenticationOptions | VaultAppIDAuthenticationOptions | VaultClientTokenAuthenticationOptions;
