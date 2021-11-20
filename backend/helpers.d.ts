export type ReviewProps = {
  bootcampAddress: string;
  courseAddress: string;
  reviewer: string;
  reviewCID: string;
  rating: number;
};

export type BootcampProps = {
  bootcampAddress: string;
  name: string;
  location: string;
};

export type GraduateProps = {
  bootcampAddress: string;
  courseAddress: string;
  proof: string;
  graduationCID: string;
};

export type CourseProps = {
  courseAddress: string;
  courseCID: string;
  bootcampAddress: string;
};
