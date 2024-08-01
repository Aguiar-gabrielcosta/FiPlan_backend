import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Validação em todas as entradas de dados.
  app.useGlobalPipes(new ValidationPipe())
  const PORT = process.env.PORT || 4000
  await app.listen(PORT)

  console.log(`App listening PORT ${PORT}`)
}
bootstrap()
