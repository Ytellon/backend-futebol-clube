import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import User from "../database/models/UserModel";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

const userADM = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
};

describe("Test login http", () => {
  describe("post login", () => {
    before(() => {
      sinon.stub(User, "findOne").resolves(userADM as User);
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it("should return status 200", async () => {
      const response = await chai.request(app).post("/login").send({
        email: "admin@admin.com",
        password: "secret_admin",
      });
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property("token");
    });
  });
  describe("should return error if password and email are incorrects", () => {
    before(() => {
      sinon.stub(User, "findOne").resolves(null);
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });
    it("should return status 401", async () => {
      const response = await chai.request(app).post("/login").send({
        email: "teste@teste.com",
        password: "teste",
      });
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal("Incorrect email or password");
    });
  });
  describe('should return error if password is incorrect', () => {
    before(() => {
      sinon.stub(User, "findOne").resolves(userADM as User);
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });
    it('should return status 401', async () => {
      const response = await chai.request(app).post('/login').send({
        email: userADM.email,
        password: 'tresespiasdemais',
      });
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Incorrect email or password');
    });
  });
  describe('should return error if email is incorrect', () => {
    before(() => {
      sinon.stub(User, "findOne").resolves();
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });
    it('should return status 401', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'testbytest.com',
        password: 'passtest',
      });
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Incorrect email or password');
    });
    it('error when email or pass is empty', async () => {
      const response = await chai.request(app).post('/login').send({
        email: '',
        password: '',
      });
      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });
});
