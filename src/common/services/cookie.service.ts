import { Injectable } from '@nestjs/common';
import { CookieOptions, Response, Request } from 'express';

@Injectable()
export class CookieService {
  ACCESS_TOKEN_NAME = 'AccessToken';
  REFRESH_TOKEN_NAME = 'RefreshToken';
  PHONE_CODE_NAME = 'PhoneCodeHash';
  EMAIL_CODE_NAME = 'EmailCodeHash';
  NEW_DATE = new Date();
  HOUR = 3600000;
  MAX_AGE_15_MIN = this.HOUR / 4;
  MAX_AGE_1_DAY = this.HOUR * 24;
  MAX_AGE_30_DAYS = this.HOUR * 24 * 30;
  sameSite: CookieOptions['sameSite'] =
    process.env.NODE_ENV === 'production' ? 'lax' : 'none';

  get accessTokenOptions() {
    return {
      httpOnly: true,
      secure: true,
      maxAge: this.MAX_AGE_15_MIN,
      sameSite: this.sameSite,
    };
  }

  get phoneCodeOptions() {
    return {
      httpOnly: true,
      secure: true,
      maxAge: this.MAX_AGE_15_MIN,
      sameSite: this.sameSite,
    };
  }

  get refreshTokenOptions() {
    return {
      httpOnly: true,
      secure: true,
      path: 'refresh',
      maxAge: this.MAX_AGE_30_DAYS,
      sameSite: this.sameSite,
    };
  }

  clearAllTokens(res: Response) {
    res.clearCookie(this.ACCESS_TOKEN_NAME, this.accessTokenOptions);
    res.clearCookie(this.REFRESH_TOKEN_NAME, this.refreshTokenOptions);
  }
}

export function getToken(req: Request): string | undefined {
  const header = req.header('Authorization');
  if (header) {
    return header.replace('Bearer ', '');
  }

  return req.cookies['AccessToken'];
}
