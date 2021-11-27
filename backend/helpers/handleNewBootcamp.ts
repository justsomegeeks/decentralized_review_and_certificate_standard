import Bootcamp from "../models/Bootcamp";

export default async function handleNewBootcamp(
  newBootcampAddress: string,
  newBootcampCID: string
) {
  await Bootcamp.create({
    cid: newBootcampCID,
    address: newBootcampAddress,
  });
}
