import { invalidMotorcycleMock, motorcycleMock } from './../../mocks/motorcycleMock';
import { errorCatalog } from '../../../errors/catalog';
import { ZodError } from 'zod';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import CustomError from '../../../errors/CustomError';
import Motorcycle from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleMockWithId } from '../../mocks/motorcycleMock';

const { expect } = chai;

chai.use(chaiAsPromised);

describe('Motorcycle service', () => {

  const motorcycleModel = new Motorcycle();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(async () => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcycleModel, 'readOne')
      .onFirstCall().resolves(motorcycleMockWithId)
      .onSecondCall().resolves(null);
    sinon.stub(motorcycleModel, 'delete')
      .onFirstCall().resolves(motorcycleMockWithId)
      .onSecondCall().resolves(null);
    sinon.stub(motorcycleModel, 'update')
      .onFirstCall().resolves(motorcycleMockWithId)
      .onSecondCall().resolves(null);
  });

  after(()=>{
    sinon.restore();
  });

  describe('creating a motorcycle', async () => {

    it('with valid data returns a new motorcycle', async () => {
      const newMotorcycle = await motorcycleService.create(motorcycleMock);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('with invalid data throws an error', async () => {
      return expect(motorcycleService.create(invalidMotorcycleMock))
        .to.eventually.be.rejectedWith()
        .and.be.an.instanceOf(ZodError);
    });

  });

  describe('updating a motorcycle', async () => {

    it('with valid data returns a updated motorcycle', async () => {
      const updatedMotorcycle = await motorcycleService.update(motorcycleMockWithId._id, motorcycleMock);
      expect(updatedMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('with invalid data throws an error', async () => {
      return expect(motorcycleService.update(motorcycleMockWithId._id, invalidMotorcycleMock))
        .to.eventually.be.rejectedWith()
        .and.be.an.instanceOf(ZodError);
    });

    it('with invalid id throws an error', async () => {
      return expect(motorcycleService.update('teste', invalidMotorcycleMock))
        .to.eventually.be.rejectedWith(errorCatalog.InvalidMongoId.message)
        .and.be.an.instanceOf(CustomError);
    });

    it('with valid data but not exists on database throws an error', async () => {
      return expect(motorcycleService.update(motorcycleMockWithId._id, motorcycleMock))
        .to.eventually.be.rejectedWith(errorCatalog.ObjectNotFound.message)
        .and.be.an.instanceOf(CustomError);
    });

  });

  describe('delete a motorcycle', async () => {

    it('with valid id returns a removed motorcycle', async () => {
      const deletedMotorcycle = await motorcycleService.delete(motorcycleMockWithId._id);
      expect(deletedMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('with invalid id throws an error', async () => {
      return expect(motorcycleService.delete('teste'))
        .to.eventually.be.rejectedWith(errorCatalog.InvalidMongoId.message)
        .and.be.an.instanceOf(CustomError);
    });

    it('with valid id but not exists on database throws an error', async () => {
      return expect(motorcycleService.delete(motorcycleMockWithId._id))
        .to.eventually.be.rejectedWith(errorCatalog.ObjectNotFound.message)
        .and.be.an.instanceOf(CustomError);
    });

  });

  describe('search a motorcycle', async () => {

    it('with valid id returns a motorcycle', async () => {
      const motorcycle = await motorcycleService.readOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('with invalid id throws an error', async () => {
      return expect(motorcycleService.readOne('teste'))
        .to.eventually.be.rejectedWith(errorCatalog.InvalidMongoId.message)
        .and.be.an.instanceOf(CustomError);
    });

    it('with valid id but not exists on database throws an error', async () => {
      return expect(motorcycleService.readOne(motorcycleMockWithId._id))
        .to.eventually.be.rejectedWith(errorCatalog.ObjectNotFound.message)
        .and.be.an.instanceOf(CustomError);
    });

  });

  describe('search for all motorcycles', async () => {

    it('return all cars', async () => {
      const motorcycles = await motorcycleService.read();
      expect(motorcycles).to.be.deep.equal([motorcycleMockWithId]);
    });

  });

});