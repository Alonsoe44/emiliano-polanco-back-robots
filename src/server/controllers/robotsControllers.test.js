const Robot = require("../../database/models/Robot");
const { getAllRobots, getRobot } = require("./robotsControllers");

jest.mock("../../database/models/Robot");

describe("Given a getAllRobots controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call method json with a group of Robots", async () => {
      const res = {
        json: jest.fn(),
        setHeader: jest.fn(),
      };
      const robots = [
        {
          name: "Robocop",
          image: "iouhdfoiuhdfs",
          statistics: {
            velocity: 8,
            endurance: 3,
            creationDate: 2018,
          },
        },
      ];

      Robot.find = jest.fn().mockResolvedValue(robots);

      await getAllRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ robots });
    });
  });
});

// This is a test de mierda because the match it's always positive and doesn't goes to the data base

// Must be refactored to a supertest with a local data base to solve this problem

describe("Given a getRobotController", () => {
  describe("When it receibes a req with and id ....", () => {
    test("Then it should call the findById method and respond with the matching robot", async () => {
      const robot = {
        name: "Robocop",
        image: "iouhdfoiuhdfs",
        statistics: {
          velocity: 8,
          endurance: 3,
          creationDate: 2018,
        },
      };

      const req = {
        params: {
          id: jest.fn(),
        },
      };

      const res = {
        json: jest.fn(),
      };

      Robot.findById = jest.fn().mockResolvedValue(robot);

      const robotReceived = await getRobot(req, res);

      expect(robotReceived).toEqual();
    });
  });
});
