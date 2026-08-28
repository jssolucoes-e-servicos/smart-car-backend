import { Module } from '@nestjs/common';
import { CompaniesService } from './services/companies.service';
import { CompaniesController } from './controllers/companies.controller';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [S3Module],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}

