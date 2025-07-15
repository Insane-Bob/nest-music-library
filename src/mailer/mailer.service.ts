import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
      auth: null,
    });
  }

  async sendMail(options: nodemailer.SendMailOptions): Promise<void> {
    await this.transporter.sendMail(options);
  }
}

