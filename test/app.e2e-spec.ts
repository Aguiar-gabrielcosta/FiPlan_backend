import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UserModule } from '../src/user/user.module'
import { TransactionModule } from '../src/transaction/transaction.module'
import { PlanModule } from '../src/plan/plan.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../src/user/entities/user.entity'
import { Transaction } from '../src/transaction/entities/transaction.entity'
import { Category } from '../src/plan/entities/category.entity'
import { Plan } from '../src/plan/entities/plan.entity'
import * as request from 'supertest'
import { ConfigModule } from '@nestjs/config'
import { randomUUID } from 'crypto'
import { types } from 'pg'

let app: INestApplication
let userRepository: Repository<User>
let transactionRepository: Repository<Transaction>
let categoryRepository: Repository<Category>
let planRepository: Repository<Plan>

beforeAll(async () => {
  // Configuração do parser para os dados numéricos
  types.setTypeParser(1700, (val: string) => parseFloat(val))

  // Configuração do módulo de testes
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      // .env
      ConfigModule.forRoot(),
      // Test database
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST_TEST,
        port: Number.parseInt(process.env.DB_PORT_TEST),
        password: process.env.DB_PASSWORD_TEST,
        username: process.env.DB_USERNAME_TEST,
        database: process.env.DB_DATABASE_TEST,
        synchronize: false,
        logging: true,
        entities: [User, Transaction, Category, Plan],
      }),
      UserModule,
      TransactionModule,
      PlanModule,
    ],
  }).compile()

  // Inicializção do módulo de testes
  app = module.createNestApplication()
  await app.init()

  // Acesso às tabelas do banco de dados
  userRepository = module.get('UserRepository')
  transactionRepository = module.get('TransactionRepository')
  categoryRepository = module.get('CategoryRepository')
  planRepository = module.get('PlanRepository')

  await userRepository.save([
    {
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      username: 'testuser1',
      password: 'testpw1',
    },
    {
      user_id: '3dc5231a-ab37-4c1a-bdee-863d0a467483',
      username: 'testuser2',
      password: 'testpw2',
    },
  ])

  await planRepository.save([
    {
      plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      budget_value: 10000,
      start_date: '2024-07-21T21:54:12.669Z',
      end_date: '2024-07-30T03:00:00.669Z',
    },
    {
      plan_id: '2796460d-4c46-4cfd-ad45-a95e93d4553c',
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      budget_value: 7600.32,
      start_date: '2024-07-30T21:54:12.669Z',
      end_date: '2024-12-21T21:54:12.669Z',
    },
  ])

  await categoryRepository.save([
    {
      category_id: 1,
      category: 'category1',
      plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
      category_budget: 3000,
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
    },
    {
      category_id: 2,
      category: 'category2',
      plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
      category_budget: 1500,
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
    },
  ])

  await transactionRepository.save([
    {
      transaction_id: '61f6c7d7-3f03-427c-bc28-d0429faeb399',
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      category_id: 1,
      transaction_type: 'expense',
      transaction_value: 1000,
      transaction_date: '2024-07-21',
    },
    {
      transaction_id: 'd223a945-d627-40d7-9bc4-4cff7dece4ca',
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      category_id: 2,
      transaction_type: 'income',
      transaction_value: 543.2,
      transaction_date: '2024-07-21',
    },
  ])
})

// Testes no módulo de usuários
describe('UserController (e2e)', () => {
  it('/user/data (GET) - should get users list', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/user/data')
      .expect(200)

    expect(body).toEqual([
      {
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        username: 'testuser1',
        password: 'testpw1',
      },
      {
        user_id: '3dc5231a-ab37-4c1a-bdee-863d0a467483',
        username: 'testuser2',
        password: 'testpw2',
      },
    ])
  }, 3000)

  it('/user/data/:id (GET) - should get user by id', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/user/data/3dc5231a-ab37-4c1a-bdee-863d0a467483')
      .expect(200)

    expect(body).toEqual({
      user_id: '3dc5231a-ab37-4c1a-bdee-863d0a467483',
      username: 'testuser2',
      password: 'testpw2',
    })
  }, 3000)

  it('/user/data/:id (GET) - should return empty user', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/user/data/2dc5232a-ab37-4c1a-bdee-863d0a467483')
      .expect(200)

    expect(body).toEqual({})
  }, 3000)

  it('/user/data (POST) - should add an user', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/user/data')
      .send({ username: 'e2e-test', password: 'e2etest' })
      .expect(201)

    expect(body).toEqual({ user_id: expect.any(String) })

    await userRepository.delete(body.user_id)
  }, 3000)

  it('/user/data/:id (DELETE) - should delete a user', async () => {
    const user_id = randomUUID()

    await userRepository.save({
      user_id: user_id,
      username: 'testdelete',
      password: 'testedelete',
    })

    const { body } = await request(app.getHttpServer())
      .delete(`/user/data/${user_id}`)
      .expect(200)

    expect(body).toEqual({ raw: [], affected: 1 })
  }, 3000)

  it('/user/data/:id (PATCH) - should update an user', async () => {
    const user_id = randomUUID()

    await userRepository.save({
      user_id: user_id,
      username: 'testupdate',
      password: 'testupdate',
    })

    const { body } = await request(app.getHttpServer())
      .patch(`/user/data/${user_id}`)
      .send({ username: 'testupdated', password: 'testupdated123' })
      .expect(200)

    expect(body.affected).toEqual(1)

    await userRepository.delete(user_id)
  }, 3000)

  it('/user/data/:id (PATCH) - should update only password from user', async () => {
    const user_id = randomUUID()

    await userRepository.save({
      user_id: user_id,
      username: 'testupdate',
      password: 'testupdate',
    })

    const { body } = await request(app.getHttpServer())
      .patch(`/user/data/${user_id}`)
      .send({ password: 'testupdated123' })
      .expect(200)

    expect(body.affected).toEqual(1)

    await userRepository.delete(user_id)
  }, 3000)

  it('/user/data/:id (PATCH) - should fail to update user', async () => {
    await request(app.getHttpServer())
      .patch(`/user/data/invalidid`)
      .send({ password: 'testupdated123' })
      .expect(500)
  }, 3000)
})

// Testes no módulo de transações
describe('TransactionController (e2e)', () => {
  it('/transaction/data (GET) - should get transactions list', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/transaction/data')
      .expect(200)

    expect(body).toEqual([
      {
        transaction_id: '61f6c7d7-3f03-427c-bc28-d0429faeb399',
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        category_id: 1,
        transaction_type: 'expense',
        transaction_value: 1000,
        transaction_date: '2024-07-21T03:00:00.000Z',
      },
      {
        transaction_id: 'd223a945-d627-40d7-9bc4-4cff7dece4ca',
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        category_id: 2,
        transaction_type: 'income',
        transaction_value: 543.2,
        transaction_date: '2024-07-21T03:00:00.000Z',
      },
    ])
  }, 3000)

  it('/transaction/data/:id (GET) - should get transaction by id', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/transaction/data/d223a945-d627-40d7-9bc4-4cff7dece4ca')
      .expect(200)

    expect(body).toEqual({
      transaction_id: 'd223a945-d627-40d7-9bc4-4cff7dece4ca',
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      category_id: 2,
      transaction_type: 'income',
      transaction_value: 543.2,
      transaction_date: '2024-07-21T03:00:00.000Z',
    })
  }, 3000)

  it('/transaction/data (POST) - should add a transaction', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/transaction/data')
      .send({
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        category_id: 1,
        transaction_type: 'income',
        transaction_value: 50,
        transaction_date: '2024-07-31T18:06:25.299Z',
      })
      .expect(201)

    expect(body).toEqual({ transaction_id: expect.any(String) })

    await transactionRepository.delete(body.transaction_id)
  }, 3000)

  it('/transaction/data/:id (DELETE) - should delete a transacrion by id', async () => {
    const transaction_id = randomUUID()

    await transactionRepository.save({
      transaction_id: transaction_id,
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      category_id: 1,
      transaction_type: 'expense',
      transaction_value: 2000,
      transaction_date: '2024-07-31T18:06:25.299Z',
    })

    const { body } = await request(app.getHttpServer())
      .delete(`/transaction/data/${transaction_id}`)
      .expect(200)

    expect(body).toEqual({ raw: [], affected: 1 })
  }, 3000)

  it('/transaction/data/:id (PATCH) - should update a user by id', async () => {
    const transaction_id = randomUUID()

    await transactionRepository.save({
      transaction_id: transaction_id,
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      category_id: 2,
      transaction_type: 'expense',
      transaction_value: 100,
      transaction_date: '2024-07-31T18:06:25.299Z',
    })

    const { body } = await request(app.getHttpServer())
      .patch(`/transaction/data/${transaction_id}`)
      .send({
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        category_id: 2,
        transaction_type: 'income',
        transaction_value: 50,
        transaction_date: '2024-08-01T10:06:25.299Z',
      })
      .expect(200)

    expect(body.affected).toEqual(1)

    await transactionRepository.delete(transaction_id)
  }, 3000)

  it('/transaction/balance/:userid (GET) - should get the monthly balance of user', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/transaction/balance/2dc5231a-ab37-4c1a-bdee-863d0a467483')
      .expect(200)

    expect(body).toEqual({
      month_expense: 0,
      month_income: 0,
    })
  }, 3000)

  it('/transaction/expenses/category/:userid/:planid (GET) - should get expenses per category of a given user and plan', async () => {
    const user_id = '2dc5231a-ab37-4c1a-bdee-863d0a467483'
    const plan_id = '2796460d-4c46-4cfd-ae9f-a95e93d4189b'

    const { body } = await request(app.getHttpServer())
      .get(`/transaction/expenses/category/${user_id}/${plan_id}`)
      .expect(200)

    expect(body).toEqual([
      {
        category: 'category1',
        expenses: 1000,
        category_budget: 3000,
        progress: 0.33,
      },
    ])
  }, 3000)
})

// Testes no módulo de planos, controlador de categorias
describe('CategoryController (e2e)', () => {
  it('/category/data (GET) - should get all categories', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/category/data')
      .expect(200)

    expect(body).toEqual([
      {
        category_id: 1,
        category: 'category1',
        plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        category_budget: 3000,
      },
      {
        category_id: 2,
        category: 'category2',
        plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        category_budget: 1500,
      },
    ])
  }, 3000)

  it('/category/data/:id (GET) - should get a category by id', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/category/data/1')
      .expect(200)

    expect(body).toEqual({
      category_id: 1,
      category: 'category1',
      plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      category_budget: 3000,
    })
  }, 3000)

  it('/category/data (POST) - should add a new category', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/category/data')
      .send({
        category: 'categoryTest',
        plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        category_budget: 2500,
      })
      .expect(201)

    expect(body).toEqual({ category_id: expect.any(Number) })

    await categoryRepository.delete(body.category_id)
  }, 3000)

  it('/category/data/batch (POST) - should add an array of categories', async () => {
    const newCategories = {
      categories: [
        {
          category: 'category1BatchTest',
          plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
          user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
          category_budget: 1000,
        },
        {
          category: 'category2BatchTest',
          plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
          user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
          category_budget: 2000,
        },
      ],
    }

    const { body } = await request(app.getHttpServer())
      .post('/category/data/batch')
      .send(newCategories)
      .expect(201)

    expect(body).toEqual([
      { category_id: expect.any(Number) },
      { category_id: expect.any(Number) },
    ])

    await categoryRepository.delete(body)
  }, 3000)

  it('/category/data/:id (DELETE) - should delete a category', async () => {
    const { category_id } = await categoryRepository.save({
      category: 'categoryTestDelete',
      plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      category_budget: 2500,
    })

    const { body } = await request(app.getHttpServer())
      .delete(`/category/data/${category_id}`)
      .expect(200)

    expect(body).toEqual({ raw: [], affected: 1 })
  }, 3000)

  it('/plan/data/:id (PATCH) - should update a category', async () => {
    const { category_id } = await categoryRepository.save({
      category: 'categoryTestUpdate',
      plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      category_budget: 2500,
    })

    const { body } = await request(app.getHttpServer())
      .patch(`/category/data/${category_id}`)
      .send({
        category: 'categoryTestUpdated',
        plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        category_budget: 3000,
      })
      .expect(200)

    expect(body.affected).toEqual(1)

    await categoryRepository.delete(category_id)
  }, 3000)

  it('/category/:id (GET) - should get all categories from user', async () => {
    const user_id = '2dc5231a-ab37-4c1a-bdee-863d0a467483'

    const { body } = await request(app.getHttpServer())
      .get(`/category/${user_id}`)
      .expect(200)

    expect(body).toEqual([
      {
        category_id: 1,
        category: 'category1',
        plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        category_budget: 3000,
      },
      {
        category_id: 2,
        category: 'category2',
        plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        category_budget: 1500,
      },
    ])
  }, 3000)

  it('/category/progress/:userid/:planid (GET) = should get all categories progress', async () => {
    const user_id = '2dc5231a-ab37-4c1a-bdee-863d0a467483'
    const plan_id = '2796460d-4c46-4cfd-ae9f-a95e93d4189b'

    const { body } = await request(app.getHttpServer())
      .get(`/category/progress/${user_id}/${plan_id}`)
      .expect(200)

    expect(body).toEqual([
      {
        category_id: 1,
        category: 'category1',
        category_budget: 3000,
        total_expenses: 1000,
        progress: 0.33,
      },
      {
        category_id: 2,
        category: 'category2',
        category_budget: 1500,
        total_expenses: 0,
        progress: 0,
      },
    ])
  })
})

// Testes no módulo de planos, controlador de planos
describe('PlanController (e2e)', () => {
  it('/plan/data (GET) - should get all plans', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/plan/data')
      .expect(200)

    expect(body).toEqual([
      {
        plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        budget_value: 10000,
        start_date: '2024-07-21T21:54:12.669Z',
        end_date: '2024-07-30T03:00:00.669Z',
      },
      {
        plan_id: '2796460d-4c46-4cfd-ad45-a95e93d4553c',
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        budget_value: 7600.32,
        start_date: '2024-07-30T21:54:12.669Z',
        end_date: '2024-12-21T21:54:12.669Z',
      },
    ])
  }, 3000)

  it('/plan/data/:id (GET) - should get a plan by id', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/plan/data/2796460d-4c46-4cfd-ad45-a95e93d4553c')
      .expect(200)

    expect(body).toEqual({
      plan_id: '2796460d-4c46-4cfd-ad45-a95e93d4553c',
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      budget_value: 7600.32,
      start_date: '2024-07-30T21:54:12.669Z',
      end_date: '2024-12-21T21:54:12.669Z',
    })
  }, 3000)

  it('/plan/data (POST) - should add a new plan', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/plan/data')
      .send({
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        budget_value: 5000,
        start_date: '2024-07-31T21:00:00.669Z',
        end_date: '2024-08-30T21:00:00.669Z',
      })
      .expect(201)

    expect(body).toEqual({ plan_id: expect.any(String) })

    await planRepository.delete(body.plan_id)
  }, 3000)

  it('/plan/data/:id (DELETE) - should delete a plan', async () => {
    const plan_id = randomUUID()

    await planRepository.save({
      plan_id: plan_id,
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      budget_value: 5000,
      start_date: '2024-07-31T18:00:00.669Z',
      end_date: '2024-08-30T18:00:00.669Z',
    })

    const { body } = await request(app.getHttpServer())
      .delete(`/plan/data/${plan_id}`)
      .expect(200)

    expect(body).toEqual({ raw: [], affected: 1 })
  }, 3000)

  it('/plan/data/:id (PATCH) - should update a plan', async () => {
    const plan_id = randomUUID()

    await planRepository.save({
      plan_id: plan_id,
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      budget_value: 5000,
      start_date: '2024-07-31T18:00:00.669Z',
      end_date: '2024-08-30T18:00:00.669Z',
    })

    const { body } = await request(app.getHttpServer())
      .patch(`/plan/data/${plan_id}`)
      .send({
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        budget_value: 3000,
        start_date: '2024-07-31T20:00:00.669Z',
        end_date: '2024-08-30T20:00:00.669Z',
      })
      .expect(200)

    expect(body.affected).toEqual(1)

    await planRepository.delete(plan_id)
  }, 3000)

  it('/plan/:id (GET) - should get all plans from user', async () => {
    const user_id = '2dc5231a-ab37-4c1a-bdee-863d0a467483'

    const { body } = await request(app.getHttpServer())
      .get(`/plan/${user_id}`)
      .expect(200)

    expect(body).toEqual([
      {
        plan_id: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        budget_value: 10000,
        start_date: '2024-07-21T21:54:12.669Z',
        end_date: '2024-07-30T03:00:00.669Z',
      },
      {
        plan_id: '2796460d-4c46-4cfd-ad45-a95e93d4553c',
        budget_value: 7600.32,
        start_date: '2024-07-30T21:54:12.669Z',
        end_date: '2024-12-21T21:54:12.669Z',
      },
    ])
  }, 3000)

  it('/plan/:id (GET) - should get empty array if user do not have plans', async () => {
    const user_id = '3dc5231a-ab37-4c1a-bdee-863d0a467483'

    const { body } = await request(app.getHttpServer())
      .get(`/plan/${user_id}`)
      .expect(200)

    expect(body).toEqual([])
  }, 3000)

  it('/plan/progress/:userid/:planid (GET) - should get plan progress from a given plan from user', async () => {
    const user_id = '2dc5231a-ab37-4c1a-bdee-863d0a467483'
    const plan_id = '2796460d-4c46-4cfd-ae9f-a95e93d4189b'

    const { body } = await request(app.getHttpServer())
      .get(`/plan/progress/${user_id}/${plan_id}`)
      .expect(200)

    expect(body).toEqual({
      budget_value: 10000,
      start_date: '2024-07-21T21:54:12.669Z',
      end_date: '2024-07-30T03:00:00.669Z',
      total_expenses: 1000,
      progress: 0.1,
    })
  }, 3000)

  it('/plan/progress/:userid/:planid (GET) - should get plan progress from a given plan from user with no transactions', async () => {
    const user_id = '2dc5231a-ab37-4c1a-bdee-863d0a467483'
    const plan_id = '2796460d-4c46-4cfd-ad45-a95e93d4553c'

    const { body } = await request(app.getHttpServer())
      .get(`/plan/progress/${user_id}/${plan_id}`)
      .expect(200)

    expect(body).toEqual({
      budget_value: 7600.32,
      start_date: '2024-07-30T21:54:12.669Z',
      end_date: '2024-12-21T21:54:12.669Z',
      total_expenses: 0,
      progress: 0,
    })
  }, 3000)
})

// Encerra a aplicação de testes
afterAll(async () => {
  await app.close()
})
