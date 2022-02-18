const Robot = require("../../database/models/Robot");
const { getAllRobots } = require("./robotsControllers");

jest.mock("../../database/models/Robot");

describe("Given a getRobot controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call method json with a group of Robots", async () => {
      const res = {
        json: jest.fn(),
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
