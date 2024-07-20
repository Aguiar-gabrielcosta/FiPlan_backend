import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TransactionModule } from './transaction/transaction.module'
import { ConfigModule } from '@nestjs/config'
import { PlansModule } from './plans/plans.module'

@Module({
  imports: [ConfigModule.forRoot(), TransactionModule, PlansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
