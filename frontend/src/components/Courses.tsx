import axios from "axios";
import { useEffect, useState } from "react";
import { joinClasses, SERVER } from "../helpers";
import CourseCard from "./cards/CourseCard";

type CourseType = {
  cid: string;
  address: string;
};

type CoursesProps = {
  bootcampAddress: string;
};

export default function Courses({ bootcampAddress }: CoursesProps) {
  const [courses, setCourses] = useState<CourseType[]>();
  useEffect(() => {
    async function init() {
      const _courses = (
        await axios.get(`${SERVER}/bootcamps/${bootcampAddress}/courses`)
      ).data as CourseType[];

      setCourses(_courses);
    }
    init();
  }, [bootcampAddress]);
  return (
    <div className={joinClasses("p-5", "bg-gray-50")}>
      <h1 className="heading">Courses</h1>
      {courses?.length
        ? courses.map((course) => <CourseCard {...course} />)
        : "Loading..."}
    </div>
  );
}
