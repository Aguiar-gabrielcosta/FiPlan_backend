import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TransactionModule } from './transaction/transaction.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { PlanModule } from './plan/plan.module'
import { types } from 'pg'
import { AuthModule } from './auth/auth.module'
import { AuthGuard } from './auth/auth.guard'

// Parsing para o tipo NUMERIC
types.setTypeParser(1700, (val: string) => parseFloat(val))

@Module({
  imports: [
    // Configuração com .env
    ConfigModule.forRoot(),
    // Banco de dados
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
    }),
    TransactionModule,
    UserModule,
    PlanModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
