import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TransactionModule } from './transaction/transaction.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
