import express, { Response, Request } from "express";

const router = express.Router();

// GET ALL BOOTCAMPS
router.get("/bootcamps", (_: Request, res: Response) => {
  // TODO: Fetch all bootcamps from mongoose database and respond
  return res.json({
    request: "Get bootcamps",
  });
});

// GET BOOTCAMP DETAILS
router.get("/bootcamps/:bootcampAddress", (_: Request, res: Response) => {
  // TODO: Return details of a bootcamp
  //   Calculate average rating from reviews modal
  type Bootcamp = {
    uri: string;
    // Wallet address
    address: string;
    rating: number;
  };
  return res.json({
    request: "Get bootcamp details",
  });
});

// GET BOOTCAMP REVIEWS
router.get(
  "/bootcamps/:bootcampAddress/reviews",
  (_: Request, res: Response) => {
    // TODO: Return reviews of a bootcamp
    // Filter reviews with bootcampAddress
    return res.json({
      request: "Get reviews",
    });
  }
);

// GET BOOTCAMP COURSES
router.get(
  "/bootcamps/:bootcampAddress/courses",
  (_: Request, res: Response) => {
    // TODO: Return reviews of a bootcamp
    // Filter courses with bootcamp address
    return res.json({
      request: "get courses",
    });
  }
);

export { router as routes };
