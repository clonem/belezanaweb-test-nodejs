import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from './../../../src/app.module';
import products from './../../../src/data/products.data';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/products (GET)', () => {
    it('return 200', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.OK);
    });
  });

  describe('/products/{sku} (GET)', () => {
    it('return 200', () => {
      return request(app.getHttpServer())
        .get('/products/43264')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.OK);
    });

    it('return 404', () => {
      return request(app.getHttpServer())
        .get('/products/1')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/products (POST)', () => {
    it('return 201', () => {
      const validBody = products[0];

      const response = request(app.getHttpServer())
        .post('/products')
        .send(validBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.CREATED);
    });

    it('return 400', () => {
      const validBody = {
        ...products[0],
      };

      const response = request(app.getHttpServer())
        .post('/products')
        .send(validBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/products/{sku} (PUT)', () => {
    it('return 200', () => {
      const validBody = products[0];

      const response = request(app.getHttpServer())
        .put('/products/43264')
        .send(validBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.OK);
    });

    it('return 400', () => {
      const validBody = {
        ...products[0],
      };

      const response = request(app.getHttpServer())
        .put('/products/43264')
        .send(validBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('return 404', () => {
      const validBody = {
        ...products[0],
      };

      const response = request(app.getHttpServer())
        .put('/products/1')
        .send(validBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/products/{sku} (DELETE)', () => {
    it('return 200', () => {
      const response = request(app.getHttpServer())
        .delete('/products/43264')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.OK);
    });

    it('return 404', () => { 
      const response = request(app.getHttpServer())
        .delete('/products/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
