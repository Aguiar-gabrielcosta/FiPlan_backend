import { Injectable } from '@nestjs/common'
import { AddPlanDTO } from './dto/addPlan.dto'
import { UpdatePlanDTO } from './dto/updatePlan.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Plan } from './entities/plan.entity'
import { Repository } from 'typeorm'
import { randomUUID } from 'crypto'

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
  ) {}

  addPlan(addPlanDTO: AddPlanDTO): Promise<Plan> {
    const plan = new Plan()
    plan.plan_id = randomUUID()
    plan.user_id = addPlanDTO.user_id
    plan.budget_value = addPlanDTO.budget_value
    plan.start_date = addPlanDTO.start_date
    plan.end_date = addPlanDTO.end_date
    return this.planRepository.save(plan)
  }

  getAllPlans(): Promise<Plan[]> {
    return this.planRepository.find()
  }

  getOnePlan(plan_id: string): Promise<Plan> {
    return this.planRepository.findOneBy({ plan_id })
  }

  updatePlan(plan_id: string, updatePlanDTO: UpdatePlanDTO): Promise<Plan> {
    const plan = new Plan()
    plan.plan_id = plan_id
    plan.user_id = updatePlanDTO.user_id
    plan.budget_value = updatePlanDTO.budget_value
    plan.start_date = updatePlanDTO.start_date
    plan.end_date = updatePlanDTO.end_date
    return this.planRepository.save(plan)
  }

  deletePlan(plan_id: string): Promise<{ affected?: number }> {
    return this.planRepository.delete({ plan_id })
  }

  // Recupera todos os planos do usuário com user_id
  getAllPlanOfUser(user_id: string): Promise<Plan[]> {
    return this.planRepository.find({
      select: {
        plan_id: true,
        budget_value: true,
        start_date: true,
        end_date: true,
      },
      where: { user_id },
    })
  }

  // Retira o andamento do plano, obtendo o budget e os gastos relativos a esse plano além das datas de inicio e fim.
  async getPlanProgress(
    user_id: string,
    plan_id: string,
  ): Promise<{
    budget_value: number
    start_date: string
    end_date: string
    total_expenses: number
    progress: number
  }> {
    const query = await this.planRepository.query(`
        SELECT plan.budget_value, plan.start_date, plan.end_date, SUM("transaction".transaction_value) AS total_expenses FROM plan
        INNER JOIN category ON plan.plan_id = category.plan_id
        INNER JOIN "transaction" ON category.category_id = "transaction".category_id
        WHERE plan.user_id='${user_id}'
        AND plan.plan_id='${plan_id}'
        AND transaction.transaction_type = 'expense'
        GROUP BY plan.plan_id;
      `)

    const { budget_value, start_date, end_date, total_expenses } = query[0]

    return {
      budget_value,
      start_date,
      end_date,
      total_expenses,
      progress: parseFloat((total_expenses / budget_value).toFixed(2)),
    }
  }
}
