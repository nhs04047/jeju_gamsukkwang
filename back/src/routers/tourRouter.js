import { loginRequired } from "../middlewares/";
import { TourService } from "../services/TourService";

import { Router } from "express";
import * as Joi from "joi"
import { idValidator } from "../validators"

const tourRouter = Router();

// 모든 랜드마크 정보 GET
tourRouter.get("/tour", async (req, res, next) => {
	try {
		const allLandmarks = await TourService.getAllLandmarks({});

		res.status(200).send(allLandmarks);
	} catch (err) {
		next(err);
	}
});

// 랜드마크 ID로 특정 랜드마크 정보 GET
tourRouter.get("/tour/:id", async (req, res, next) => {
	try {

		const id = await idValidator.validateAsync(req.params.id)

		const landmark = await TourService.getLandmark({ id });

		res.status(200).send(landmark);
	} catch (err) {
		next(err);
	}
});

// 랜드마크 좋아요 추가
tourRouter.put("/tour/:id/like", loginRequired, async (req, res, next) => {
	try {

		const userId = req.currentUserId;

		const id = await idValidator.validateAsync(req.params.id)

		const addLiketoLandmark = await TourService.addLike({
			id,
			currentUserId: userId,
		});

		res.status(200).json(addLiketoLandmark);
	} catch (err) {
		next(err);
	}
});

// 랜드마크 싫어요 추가
tourRouter.put("/tour/:id/dislike", loginRequired, async (req, res, next) => {
	try {

		const userId = req.currentUserId;

		const id = await idValidator.validateAsync(req.params.id)

		const removeLikefromLandmark = await TourService.removeLike({
			id,
			currentUserId: userId,
		});

		res.status(200).json(removeLikefromLandmark);
	} catch (err) {
		next(err);
	}
});

// 랜드마크 좋아요 높은 순으로 정리
tourRouter.get("/recommend/likes", async (req, res, next) => {
	try {
		const sortedLandmarks = await TourService.sortByLiked({});

		res.status(200).json(sortedLandmarks);
	} catch (err) {
		next(err);
	}
});

tourRouter.get("/recommend/reviews", async (req, res, next) => {
	try {
		const sortedLandmarks = await TourService.sortByReviews({});

		res.status(200).json(sortedLandmarks);
	} catch (err) {
		next(err);
	}
});

tourRouter.get("/recommend/rating", async (req, res, next) => {
	try {
		const sortedLandmarks = await TourService.sortByRating({});

		res.status(200).json(sortedLandmarks);
	} catch (err) {
		next(err);
	}
});

export { tourRouter };
