import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import MotorcycleController from '../../../controllers/MotorcycleController';
import MotorcycleService from '../../../services/MotorcycleService';
import Motorcycle from '../../../models/Motorcycle';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMock';
const { expect } = chai;

describe('Motorcycle controller', () => {

  const motorcycleModel = new Motorcycle();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request; 
  const res = {} as Response;

  before(async () => {
    sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'update').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'delete').resolves(motorcycleMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a motorcycle', async () => {

    it('returns a new motorcycle', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });

  });

  describe('searching a motorcycle', async () => {

    it('returns a motorcycle', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });

  });

  describe('searching all motorcycles', async () => {

    it('returns all motorcycles', async () => {
      await motorcycleController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motorcycleMockWithId])).to.be.true;
    });

  });

  describe('deleting a motorcycle', async () => {

    it('returns the deleted motorcycle', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });

  });

  describe('updating a car', async () => {

    it('returns the updated car', async () => {
      req.params = { id: motorcycleMockWithId._id };
      req.body = motorcycleMock;
      await motorcycleController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });

  });

});