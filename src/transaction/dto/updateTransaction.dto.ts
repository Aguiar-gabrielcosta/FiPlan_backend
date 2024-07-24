import { PartialType } from '@nestjs/mapped-types'
import { AddTransactionDTO } from './addTransaction.dto'

export class UpdateTransactionDTO extends PartialType(AddTransactionDTO) {}
