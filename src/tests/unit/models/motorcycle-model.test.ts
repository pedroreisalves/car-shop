import { motorcycleMock, motorcycleMockWithId } from './../../mocks/motorcycleMock';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import chai from 'chai';
import Motorcycle from '../../../models/Motorcycle';
const { expect } = chai;

describe('Motorcycle Model', () => {
  const motorcycleModel = new Motorcycle();

  before(async () => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findOneAndUpdate').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
    sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findOneAndDelete').resolves(motorcycleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a motorcycle', () => {

    it('returns a new motorcycle', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

  });

  describe('updating a motorcycle', () => {

    it('returns the updated motorcycle', async () => {
      const updatedMotorcycle = await motorcycleModel.update(motorcycleMockWithId._id, motorcycleMock);
      expect(updatedMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

  });

  describe('searching for all motorcycles', () => {

    it('returns an motorcycles array', async () => {
      const motorcycles = await motorcycleModel.read();
      expect(motorcycles).to.be.deep.equal([motorcycleMockWithId]);
    });

  });

  describe('searching for one motorcycle', () => {

    it('returns an motorcycle', async () => {
      const motorcycle = await motorcycleModel.readOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

  });

  // describe('removing one motorcycle', () => {

  //   it('returns the removed motorcycle', async () => {
  //     const removedMotorcycle = await motorcycleModel.delete(motorcycleMockWithId._id);
  //     expect(removedMotorcycle).to.be.deep.equal(motorcycleMockWithId);
  //   });

  // });

});