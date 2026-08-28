import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor() {
    const endpoint = process.env.MINIO_ENDPOINT || 'minio-server.jssolucoeseservicos.com.br';
    
    // Adiciona o protocolo se não estiver presente
    const formattedEndpoint = endpoint.startsWith('http://') || endpoint.startsWith('https://')
      ? endpoint
      : `https://${endpoint}`;

    this.s3Client = new S3Client({
      endpoint: formattedEndpoint,
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY || '',
        secretAccessKey: process.env.MINIO_SECRET_KEY || '',
      },
      forcePathStyle: true, // Necessário para compatibilidade com o MinIO
      region: 'us-east-1',  // Região padrão exigida pelo SDK
    });

    this.bucketName = process.env.MINIO_BUCKET_NAME || 'smart-churches';
  }

  /**
   * Faz o upload de um arquivo para o MinIO.
   * Retorna a chave (key) sob a qual o arquivo foi salvo.
   */
  async uploadFile(key: string, buffer: Buffer, mimeType: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      });

      await this.s3Client.send(command);
      return key;
    } catch (error: any) {
      console.error('Erro ao fazer upload para o MinIO:', error);
      throw new InternalServerErrorException(`Falha ao salvar o arquivo no MinIO: ${error.message}`);
    }
  }

  /**
   * Exclui um arquivo do MinIO com base em sua chave.
   */
  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
    } catch (error: any) {
      console.error('Erro ao deletar arquivo do MinIO:', error);
      // Apenas faz log do erro de deleção para não impedir a continuidade da operação principal
    }
  }
}
