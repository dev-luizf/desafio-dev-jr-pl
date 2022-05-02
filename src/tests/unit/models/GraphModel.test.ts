import { expect } from "chai";
import mongoose, { Model } from "mongoose";
import sinon, { SinonStub } from "sinon";
import { GraphModel } from '../../../models';
import { graphSchema } from '../../../models/Graph';

describe("Testa o model Graph:", () => {
  let graphModel: GraphModel;
  let model: Model<any>;

  const graphMock = {
    data: [
      {
        source: "A", target: "B", distance: 6
      },
      {
        source: "A", target: "E", distance: 4
      },
      {
        source: "B", target: "A", distance: 6
      },
    ]
  };

  const validID = "6266ff278549f1410bc91ad9";
  const idMock = { _id: validID }

  describe("1) Ao chamar o método create:", () => {
    before(() => {
      sinon.stub(mongoose, "model").returns({
        create: sinon.stub().resolves({}),
      });

      model = mongoose.model('Graphs', graphSchema);
      graphModel = new GraphModel(model);
    });

    after(() => {
      (mongoose.model as SinonStub).restore();
    });

    it("cria um novo grafo se os paramêtros estiverem corretos", async () => {
      const result = await graphModel.create(graphMock);
      expect(result).to.be.deep.equal({});
      expect((model.create as SinonStub).calledWith(graphMock)).to.be.true;
    });
  });

  describe("2) Ao chamar o método read:", () => {
    before(() => {
      sinon.stub(mongoose, "model").returns({
        find: sinon.stub().resolves([]),
      });

      graphModel = new GraphModel();
    });

    after(() => {
      (mongoose.model as SinonStub).restore();
    });

    it("lista todos os grafos", async () => {
      const result = await graphModel.read();
      expect(result).to.be.deep.equal([]);
    });
  });

  describe("3) Ao chamar o método readOne:", () => {
    before(() => {
      sinon.stub(mongoose, "model").returns({
        findOne: sinon.stub().resolves({}),
      });

      model = mongoose.model('Graphs', graphSchema);
      graphModel = new GraphModel(model);
    });

    after(() => {
      (mongoose.model as SinonStub).restore();
    });

    it("lista o grafo com um id específico", async () => {
      const result = await graphModel.readOne(validID);
      expect(result).to.be.deep.equal({});
      expect((model.findOne as SinonStub).calledWith(idMock)).to.be.true;
    });
  });

  describe("4) Ao chamar o método update:", () => {    
    before(() => {
      sinon.stub(mongoose, "model").returns({
        findOneAndUpdate: sinon.stub().resolves({}),
      });

      model = mongoose.model('Graphs', graphSchema);
      graphModel = new GraphModel(model);
    });

    after(() => {
      (mongoose.model as SinonStub).restore();
    });

    it("atualiza informações do grafo com um id específico", async () => {
      const result = await graphModel.update(validID, graphMock);
      expect(result).to.be.deep.equal({});
      expect((model.findOneAndUpdate as SinonStub).calledWith(idMock, graphMock)).to.be.true;
    });
  });
});
