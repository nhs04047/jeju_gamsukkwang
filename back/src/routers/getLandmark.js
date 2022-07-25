import { Tour } from "../db/schemas/tour";

import { Router } from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// DB에 랜드마크 정보를 넣기 위한 파일. 라우터와 서비스 기능 통합되어 있음.
const getLandmark = Router();

const addLandmark = async ({
  title,
  roadaddress,
  introduction,
  image,
  phoneno,
  latitude,
  longitude,
}) => {
  const id = uuidv4();
  const newLandmark = await Tour.create({
    id,
    krTitle: title,
    address: roadaddress,
    description: introduction,
    image,
    phoneno,
    latitude,
    longitude,
  });
  return newLandmark;
};

getLandmark.post("/landmark", async (req, res, next) => {
  const { cid } = req.body;
  const response = await axios.get(
    `${process.env.VSJAPI_PATH}=${cid}`,
  );
  let { title, roadaddress, introduction, phoneno, latitude, longitude } =
    response.data.items[0];

  if (phoneno == null) {
    phoneno = "-";
  }
  if(phoneno.length < 6){
    phoneno = "-";
  }


  latitude = Number(latitude.toFixed(2));
  longitude = Number(longitude.toFixed(2));
  let image = response.data.items[0].repPhoto.photoid.thumbnailpath;

  const newLandmark = await addLandmark({
    title,
    roadaddress,
    introduction,
    image,
    phoneno,
    latitude,
    longitude,
  });

  res.status(201).json(newLandmark);
});

export { getLandmark };
