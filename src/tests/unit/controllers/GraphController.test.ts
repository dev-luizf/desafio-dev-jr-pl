import sinon, { SinonStub } from "sinon";
import { expect } from "chai";
import { GraphService } from "../../../services";
import { GraphController } from "../../../controllers";
import { Request, Response } from "express";

describe("Testa o GraphController:", () => {
  let graphService = new GraphService();
  let graphController: GraphController;
  let stub: SinonStub;

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

  const res = {} as Response;
  const req = {} as Request;
  req.body = graphMock;
  req.params = { id: "6266ff278549f1410bc91ad9" };
  const error = { error: 'Id must have 24 hexadecimal characters' };

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({});
  });

  describe("1) Ao chamar o método create:", () => {
    before(() => {
      stub = sinon.stub(graphService, "create").resolves(graphMock);
      graphController = new GraphController(graphService);
    });

    after(() => {
      (graphService.create as SinonStub).restore();
    });

    describe("a) com informações válidas:", () => {
      it("é chamado service com o body da request", async () => {
        await graphController.create(req, res);
        expect(stub.calledWith(req.body)).to.be.true;
      });

      it("é chamado status com o código 201", async () => {
        await graphController.create(req, res);
        expect((res.status as SinonStub).calledWith(201)).to.be.true;
      });

      it("é chamado json com os dados do grafo cadastrado", async () => {
        await graphController.create(req, res);
        expect((res.json as SinonStub).calledWith(graphMock)).to.be.true;
      });
    });
  });

  describe("2) Ao chamar o método read:", () => {
    before(() => {
      stub = sinon.stub(graphService, "read").resolves([]);
      graphController = new GraphController(graphService);
    });

    after(() => {
      (graphService.read as SinonStub).restore();
    });

    it("é chamado status com o código 201", async () => {
      await graphController.read(req, res);
      expect((res.status as SinonStub).calledWith(200)).to.be.true;
    });

    it("é chamado json com os dados com o array de grafos", async () => {
      await graphController.read(req, res);
      expect((res.json as SinonStub).calledWith([])).to.be.true;
    });
  });

  describe("3) Ao chamar o método readOne:", () => {
    describe("a) com um id válido:", () => {
      before(() => {
        stub = sinon.stub(graphService, "readOne").resolves(graphMock);
        graphController = new GraphController(graphService);
        req.params.id = "6266ff278549f1410bc91ad9";
      });

      after(() => {
        (graphService.readOne as SinonStub).restore();
      });

      it("é chamado service com o id da request", async () => {
        await graphController.readOne(req, res);
        expect(stub.calledWith(req.params.id)).to.be.true;
      });

      it("é chamado status com o código 200", async () => {
        await graphController.readOne(req, res);
        expect((res.status as SinonStub).calledWith(200)).to.be.true;
      });

      it("é chamado json com os dados do grafo cadastrado", async () => {
        await graphController.readOne(req, res);
        expect((res.json as SinonStub).calledWith(graphMock)).to.be.true;
      });
    });

    describe("b) com um id inválido:", () => {
      before(() => {
        req.params.id = "invalidID";
        graphController = new GraphController();
      });

      it("é chamado status com o código 400", async () => {
        await graphController.readOne(req, res);
        expect((res.status as SinonStub).calledWith(400)).to.be.true;
      });

      it("é chamado json com o erro de id inválido", async () => {
        await graphController.readOne(req, res);
        expect((res.json as SinonStub).calledWith(error)).to.be.true;
      });
    });
  });

  describe("4) Ao chamar o método update:", () => {
    describe("a) com um id válido:", () => {
      before(() => {
        stub = sinon.stub(graphService, "update").resolves(graphMock);
        graphController = new GraphController(graphService);
        req.params.id = "6266ff278549f1410bc91ad9";
      });

      after(() => {
        (graphService.update as SinonStub).restore();
      });

      it("é chamado service com o id e body da request", async () => {
        await graphController.update(req, res);
        expect(stub.calledWith(req.params.id, graphMock)).to.be.true;
      });

      it("é chamado status com o código 200", async () => {
        await graphController.update(req, res);
        expect((res.status as SinonStub).calledWith(200)).to.be.true;
      });

      it("é chamado json com os dados do grafo cadastrado", async () => {
        await graphController.update(req, res);
        expect((res.json as SinonStub).calledWith(graphMock)).to.be.true;
      });
    });

    describe("b) com um id inválido:", () => {
      before(() => {
        req.params.id = "invalidID";
        graphController = new GraphController();
      });

      it("é chamado status com o código 400", async () => {
        await graphController.update(req, res);
        expect((res.status as SinonStub).calledWith(400)).to.be.true;
      });

      it("é chamado json com o erro de id inválido", async () => {
        await graphController.update(req, res);
        expect((res.json as SinonStub).calledWith(error)).to.be.true;
      });
    });
  });

  describe("5) Ao chamar o método delete:", () => {
    describe("a) com um id válido:", () => {
      before(() => {
        stub = sinon.stub(graphService, "delete").resolves(graphMock);
        graphController = new GraphController(graphService);
        req.params.id = "6266ff278549f1410bc91ad9";
      });

      after(() => {
        (graphService.delete as SinonStub).restore();
      });

      it("é chamado service com o id da request", async () => {
        await graphController.delete(req, res);
        expect(stub.calledWith(req.params.id)).to.be.true;
      });

      it("é chamado status com o código 204", async () => {
        await graphController.delete(req, res);
        expect((res.status as SinonStub).calledWith(204)).to.be.true;
      });

      it("é chamado json com os dados do grafo cadastrado", async () => {
        await graphController.delete(req, res);
        expect((res.json as SinonStub).calledWith(graphMock)).to.be.true;
      });
    });

    describe("b) com um id inválido:", () => {
      before(() => {
        req.params.id = "invalidID";
        graphController = new GraphController();
      });

      it("é chamado status com o código 400", async () => {
        await graphController.delete(req, res);
        expect((res.status as SinonStub).calledWith(400)).to.be.true;
      });

      it("é chamado json com o erro de id inválido", async () => {
        await graphController.delete(req, res);
        expect((res.json as SinonStub).calledWith(error)).to.be.true;
      });
    });
  });
});
