import express, { Response, Request } from "express";
import Bootcamp from "../models/Bootcamp";
import Review from "../models/Review";

const router = express.Router();

// GET ALL BOOTCAMPS
router.get("/bootcamps", async (_: Request, res: Response) => {
  const bootcamps = await Bootcamp.find({}).populate("courses").exec();
  return res.json(bootcamps);
});

// GET BOOTCAMP DETAILS
router.get(
  "/bootcamps/:bootcampAddress",
  async (req: Request, res: Response) => {
    // TODO: Return details of a bootcamp
    const bootcamp = await Bootcamp.findOne({
      address: req.params.bootcampAddress,
    })
      .populate("courses")
      .populate("reviews")
      .exec();

    return res.json(bootcamp);
  }
);

// GET BOOTCAMP REVIEWS
router.get(
  "/bootcamps/:bootcampAddress/reviews",
  async (req: Request, res: Response) => {
    console.log();
    const { bootcampAddress } = req.params;
    const reviews = await Review.find({
      bootcampAddress,
    });
    return res.json(reviews);
  }
);
// GET Average rating
router.get(
  "/bootcamps/:bootcampAddress/averageRating",
  async (req: Request, res: Response) => {
    const { bootcampAddress } = req.params;
    const reviews = await Review.find({
      bootcampAddress,
    });
    const averageRating =
      reviews.reduce(
        (acculumate, review) => acculumate + review.overallRating,
        0
      ) / reviews.length;

    res.json({
      rating: averageRating,
    });
  }
);

// GET BOOTCAMP COURSES
router.get(
  "/bootcamps/:bootcampAddress/courses",
  async (req: Request, res: Response) => {
    const bootcamp = await Bootcamp.findOne({
      address: req.params.bootcampAddress,
    })
      .populate("courses")
      .exec();
    return res.json(bootcamp.courses);
  }
);

export { router as routes };
