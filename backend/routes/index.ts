import express, { Response, Request } from "express";
import Bootcamp from "../models/Bootcamp"

const router = express.Router();

// GET ALL BOOTCAMPS
router.get("/bootcamps", (_: Request, res: Response) => {
  const bootcamps = Bootcamp.find({}).populate("courses").populate("reviews").exec();
    return res.json({
      request: bootcamps,
    });
});

// GET BOOTCAMP DETAILS
router.get("/bootcamps/:bootcampAddress", async (req: Request, res: Response) => {
  // TODO: Return details of a bootcamp
  const bootcamp = await Bootcamp.findOne({ address: req.params.bootcampAddress })
    .populate("courses")
    .populate("reviews")
    .exec();

  return res.json({
    request: bootcamp,
  });
});

// GET BOOTCAMP REVIEWS
router.get(
  "/bootcamps/:bootcampAddress/reviews",
  async (req: Request, res: Response) => {
    const bootcamp = await Bootcamp.findOne({address: req.params.bootcampAddress})
    return res.json({
      request: bootcamp.reviews,
    });
  }
);

// GET BOOTCAMP COURSES
router.get(
  "/bootcamps/:bootcampAddress/courses",
  async (req: Request, res: Response) => {
    const bootcamp = await Bootcamp.findOne({address: req.params.bootcampAddress})
    return res.json({
      request: bootcamp.courses,
    });
  }
);

export { router as routes };
