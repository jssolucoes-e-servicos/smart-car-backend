import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface ISendWhatsappMessage {
  phone: string;
  message: string;
  churchId?: string;
  template?: string;
  params?: Record<string, any>;
}

@Injectable()
export class EvolutionService {
  private readonly logger = new Logger(EvolutionService.name);
  private readonly n8nWebhookUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.n8nWebhookUrl = this.configService.get<string>('N8N_EVOLUTION_WEBHOOK_URL') || '';
  }

  async sendTextMessage(data: ISendWhatsappMessage): Promise<boolean> {
    if (!this.n8nWebhookUrl) {
      this.logger.warn('N8N_EVOLUTION_WEBHOOK_URL não configurado.');
      return false;
    }

    try {
      await axios.post(this.n8nWebhookUrl, {
        phone: data.phone.replace(/\D/g, ''),
        message: data.message,
        churchId: data.churchId,
        template: data.template,
        params: data.params,
        sentAt: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      this.logger.error(`Erro ao disparar mensagem via n8n/Evolution para ${data.phone}`, error);
      return false;
    }
  }
}