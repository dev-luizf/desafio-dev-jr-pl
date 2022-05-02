import { expect } from "chai";
import sinon, { SinonStub } from "sinon";
import { GraphService } from "../../../services";
import { GraphModel } from '../../../models';

describe("Testa o service Graph:", () => {
  let graphService: GraphService;
  let graphModel = new GraphModel();

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

  let stub: SinonStub;
  const validID = "6266ff278549f1410bc91ad9";

  describe("1) Ao chamar o método create:", () => {
    before(() => {
      stub = sinon.stub(graphModel, "create").resolves(graphMock);
      graphService = new GraphService(graphModel);
    });

    after(() => {
      (graphModel.create as SinonStub).restore();
    });

    it("cria um novo grafo se os paramêtros estiverem corretos", async () => {
      const result = await graphService.create(graphMock);
      expect(result).to.be.deep.equal(graphMock);
      expect(stub.calledWith(graphMock)).to.be.true;
    });
  });

  describe("2) Ao chamar o método read:", () => {
    before(() => {
      sinon.stub(graphModel, "read").resolves([]);
      graphService = new GraphService(graphModel);
    });

    after(() => {
      (graphModel.read as SinonStub).restore();
    });

    it("lista todos os grafos", async () => {
      const result = await graphService.read();
      expect(result).to.be.deep.equal([]);
    });
  });

  describe("3) Ao chamar o método readOne:", () => {
    describe("a) com um id válido:", () => {
      before(() => {
        stub = sinon.stub(graphModel, "readOne").resolves(graphMock);
        graphService = new GraphService(graphModel);
      });
  
      after(() => {
        (graphModel.readOne as SinonStub).restore();
      });
  
      it("lista o grafo com um id específico", async () => {
        const result = await graphService.readOne(validID);
        expect(result).to.be.deep.equal(graphMock);
        expect(stub.calledWith(validID)).to.be.true;
      });
    })

    describe("b) com um id inválido:", () => {
      before(() => {
        stub = sinon.stub(graphModel, "readOne").resolves(null);
        graphService = new GraphService(graphModel);
      });
  
      after(() => {
        (graphModel.readOne as SinonStub).restore();
      });

      it("lança um erro com o code 'notfound'", async () => {
        try {
          await graphService.readOne("invalidID");
        } catch (error: any) {
          expect(error.code).to.be.deep.equal('notFound')
        }
      })
    })
  });

  describe("4) Ao chamar o método update:", () => {
    describe("a) com um id e data válidos:", () => {
      before(() => {
        sinon.stub(graphModel, "readOne").resolves(graphMock);
        sinon.stub(graphModel, "update").resolves(graphMock);
        graphService = new GraphService(graphModel);
      });
  
      after(() => {
        (graphModel.update as SinonStub).restore();
        (graphModel.readOne as SinonStub).restore();
      });
  
      it("atualiza informações do grafo com um id específico", async () => {
        const result = await graphService.update(validID, graphMock);
        expect(result).to.be.equal(graphMock);
      });
    })

    describe("b) com um id inválido:", () => {
      before(() => {
        sinon.stub(graphModel, "readOne").resolves(null);
        graphService = new GraphService(graphModel);
      });
  
      after(() => {
        (graphModel.readOne as SinonStub).restore();
      });
  
      it("lança um erro com o code 'notfound'", async () => {
        try {
          await graphService.update("invalidID", graphMock);
        } catch (error: any) {
          expect(error.code).to.be.equal('notFound')
        }
      });
    })
  });

  describe("5) Ao chamar o método delete", () => {
    describe("a) com um id válido:", () => {
      before(() => {
        sinon.stub(graphModel, "readOne").resolves(graphMock);
        sinon.stub(graphModel, "delete").resolves();
        graphService = new GraphService(graphModel);
      });
  
      after(() => {
        (graphModel.readOne as SinonStub).restore();
        (graphModel.delete as SinonStub).restore();
      });
  
      it("deleta informações do grafo com um id específico", async () => {
        const result = await graphService.delete(validID);
        expect(result).to.be.equal(undefined);
      });
    })
  })
});
