const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectRobotArmyDataBase = require("../../database");
const Robot = require("../../database/models/Robot");

const app = require("../index");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();

  await connectRobotArmyDataBase(connectionString);
});

beforeEach(async () => {
  await Robot.create({
    statistics: {
      velocity: 8,
      endurance: 3,
      creationDate: 2018,
    },
    name: "Daft Punk",
    image:
      "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/b/0/4/4/b0447b356e101b6b75b93a6451ddc670.jpg\n",
  });
  await Robot.create({
    statistics: {
      velocity: 8,
      endurance: 3,
      creationDate: 2018,
    },
    name: "Not Daft Punk",
    image:
      "https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/12/daft-punk.jpg?fit=2500%2C1402&ssl=1",
  });
});

afterEach(async () => {
  await Robot.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a /robots endpoint ", () => {
  describe("When it receives a get request", () => {
    test("Then it should return a 200 status and an array of robots", async () => {
      const { body } = await request(app).get("/robots").expect(200);

      expect(body).toHaveProperty("robots");
    });
  });
});

describe("Given a /robots/create endpoint", () => {
  describe("When it receives a request witout a token", () => {
    test("Then it should return an error with a  401 status and trown an error with a message", async () => {
      const expectedErrorMessage = "The token is missing";

      const { body } = await request(app).post("/robots/create").expect(401);

      expect(body.message).toBe(expectedErrorMessage);
    });
  });

  /* describe("When it receives a request with valid token", () => {
    test("Then it should return a 200 status and the robot object created", async () => {
      const robot = {
        name: "Chiki bot",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQsoHcnA9tE67fzooOqY9FrHTlvxStGGVLw&usqp=CAU",
        statistics: {
          velocity: 1,
          endurance: 2,
          creationDate: 2032,
        },
      };

      await request(app)
        .post("/robots/create")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRyaXBpZGlwaSIsImlkIjoiNjIxM2U5MDFkYzRiNTdhYjM2YmM5ZmYzIiwiaWF0IjoxNjQ1NTMwNTU5fQ.p2wmnqxVkb_AQ-LCdtWdXSJLpAscyNMEFYVF_RGn8YM"
        )
        .send(robot)
        .expect(201);
    });
  }); */
});

describe("Given a /robots/:id endpoint", () => {
  describe("When it receives and id and there is no robot with that id", () => {
    test("Then i should respond with a 404 status and have a message error", async () => {
      const expectedErrorMessage = "That robot is no in the database";
      const { body } = await request(app).get("/robots/62f7c");
      expect(body.message).toBe(expectedErrorMessage);
    });
  });

  /* describe("When it receibes an id that has a match in the database", () => {
    test("Thne it should return a robot in the response", async () => {
      const robotRequested = {
        statistics: {
          velocity: 8,
          endurance: 3,
          creationDate: 2018,
        },
        _id: "621125ae228fef803425af81",
        name: "Not Daft Punk",
        image:
          "https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/12/daft-punk.jpg?fit=2500%2C1402&ssl=1",
        __v: 0,
      };

      const robotReceived = await request(app).get(
        "/robtos/621125ae228fef803425af81"
      );

      expect(robotReceived).toEqual(robotRequested);
    });
  }); */
});
