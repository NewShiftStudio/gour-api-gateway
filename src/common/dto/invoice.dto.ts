export enum InvoiceStatus {
  WAITING = 'WAITING', // Ожидает оплаты | (заказ еще не был оплачен и не было попыток оплаты)
  PAID = 'PAID', // Оплачен |
  FAILED = 'FAILED', // Ошибка оплаты | (любая ошибка при оплате, в том числе и нехватка денег на карте)
  CANCELLED = 'CANCELLED', // Отменен | (Оплата не поступила в принципе и истек таймер жизни инвойса)
}

export class InvoiceDto {
  uuid: string;
  status: InvoiceStatus;
  redirectUri?: string; // если используется 3d secure
  expiresAt: Date;
}

export class InvoiceResponse {
  MD: string;
  PaReq: string;
  TermUrl: string;
  acsUrl: string;
}
