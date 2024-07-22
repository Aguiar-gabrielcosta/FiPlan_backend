import { PartialType } from '@nestjs/mapped-types'
import { AddTransactionDTO } from './addTransactionDTO'

export class UpdateTransactionDTO extends PartialType(AddTransactionDTO) {}
