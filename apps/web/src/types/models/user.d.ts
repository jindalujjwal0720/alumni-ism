import { IDeviceInfo } from '../custom/middlewares/user-agent';

export type IUserRole = 'alumni' | 'partner' | 'admin';

export type IRefreshToken = {
  token: string;
  expires: Date;
  deviceInfo?: IDeviceInfo;
};

export type ITwoFactorAuth = {
  enabled: boolean; // 2FA enabled or not
  otp: {
    enabled: boolean; // OTP enabled or not
    hash?: string; // Hashed OTP
    expires?: Date;
  };
  // for authenticator apps
  totp: {
    enabled: boolean; // TOTP enabled or not
    secret?: string;
  };
};

export type IBackupCode = {
  code: string;
  usedAt?: Date;
};

export type IRecoveryDetails = {
  backupCodes: IBackupCode[];
  email?: string;
  emailVerified?: boolean;
  backupCodesUsedCount?: number;
};

export interface IPartnerData {
  /** Partner's organization name */
  name: string;
  /** Partner's organization logo */
  logo: string;
  /** Partner's organization website */
  supportUrl: string;
  /** Partner's organization description */
  about: string;
}

export interface IUser {
  _id: string;
  // Base properties, required for creating a new user
  // Optional because we will check for these in application code
  name: string;
  email: string;

  // Authorization
  roles: IUserRole[];
  restricted?: string[]; // List of restricted permissions

  // Authentication
  passwordHash?: string;
  emailVerificationToken?: string;
  emailVerificationTokenExpires?: Date;
  isEmailVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpires?: Date;
  refreshTokens?: IRefreshToken[];

  // 2FA
  twoFactorAuth?: ITwoFactorAuth;
  // Recovery
  recoveryDetails?: IRecoveryDetails;
}
