import { Module } from '@nestjs/common'
import { DataTempService } from './data.service'

@Module({
  imports: [],
  controllers: [],
  providers: [DataTempService],
  exports: [DataTempService],
})
export class DataBaseModule {}
