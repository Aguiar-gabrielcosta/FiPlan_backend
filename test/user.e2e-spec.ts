import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UserModule } from '../src/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../src/user/entities/user.entity'
import * as request from 'supertest'
import { ConfigModule } from '@nestjs/config'
import { randomUUID } from 'crypto'

describe('UserController (e2e)', () => {
  let app: INestApplication
  let repository: Repository<User>

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        // .env
        ConfigModule.forRoot(),
        // Test database
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: Number.parseInt(process.env.DB_PORT),
          password: process.env.DB_PASSWORD,
          username: process.env.DB_USERNAME,
          database: process.env.DB_DATABASE_TEST,
          synchronize: false,
          entities: [User],
        }),
      ],
    }).compile()
    app = module.createNestApplication()
    await app.init()
    repository = module.get('UserRepository')
  })

  it('/user/data (GET) - should get users list', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/user/data')
      .expect(200)

    expect(body).toEqual([
      {
        user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        username: 'testerDev',
        password: 'teste123456',
      },
      {
        user_id: '2dc5221a-ab37-4c1a-bdee-863d0a467483',
        username: 'testerFresh',
        password: 'testefresh123456',
      },
    ])
  }, 3000)

  it('/user/data/:id (GET) - should get user by id', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/user/data/2dc5231a-ab37-4c1a-bdee-863d0a467483')
      .expect(200)

    expect(body).toEqual({
      user_id: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      username: 'testerDev',
      password: 'teste123456',
    })
  }, 3000)

  it('/user/data/:id (GET) - should return empty user', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/user/data/2dc5232a-ab37-4c1a-bdee-863d0a467483')
      .expect(200)

    expect(body).toEqual({})
  }, 3000)

  it('/user/data (POST) - should add a user', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/user/data')
      .send({ username: 'e2e-test', password: 'e2etest' })
      .expect(201)

    expect(body).toEqual({ user_id: expect.any(String) })

    await repository.delete(body.user_id)
  }, 3000)

  it('/user/data/:id (DELETE) - should delete a user', async () => {
    const user_id = randomUUID()

    await repository.save({
      user_id: user_id,
      username: 'testdelete',
      password: 'testedelete',
    })

    const { body } = await request(app.getHttpServer())
      .delete(`/user/data/${user_id}`)
      .expect(200)

    expect(body).toEqual({ raw: [], affected: 1 })
  }, 3000)

  it('/user/data/:id (PATCH) - should update a user', async () => {
    const user_id = randomUUID()

    await repository.save({
      user_id: user_id,
      username: 'testupdate',
      password: 'testupdate',
    })

    const { body } = await request(app.getHttpServer())
      .patch(`/user/data/${user_id}`)
      .send({ username: 'testupdated', password: 'testupdated123' })
      .expect(200)

    expect(body).toEqual({
      user_id: user_id,
      username: 'testupdated',
      password: 'testupdated123',
    })

    await repository.delete(user_id)
  }, 3000)

  it('/user/data/:id (PATCH) - should update only password from user', async () => {
    const user_id = randomUUID()

    await repository.save({
      user_id: user_id,
      username: 'testupdate',
      password: 'testupdate',
    })

    const { body } = await request(app.getHttpServer())
      .patch(`/user/data/${user_id}`)
      .send({ password: 'testupdated123' })
      .expect(200)

    expect(body).toEqual({
      user_id: user_id,
      password: 'testupdated123',
    })

    await repository.delete(user_id)
  }, 3000)

  it('/user/data/:id (PATCH) - should fail to update user', async () => {
    await request(app.getHttpServer())
      .patch(`/user/data/invalidid`)
      .send({ password: 'testupdated123' })
      .expect(500)
  }, 3000)

  afterAll(async () => {
    await app.close()
  })
})
