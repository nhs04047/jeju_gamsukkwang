import is from "@sindresorhus/is";
import Joi from "joi";

import { loginRequired } from "../middlewares/";
import { ReviewService } from "../services/ReviewService.js";
import { s3Multi } from "../middlewares/multerS3";
import { Router } from "express";

const reviewRouter = Router();
reviewRouter.use(loginRequired);

// 리뷰 작성하기
reviewRouter.post("/review", s3Multi(), async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error("system.error.badRequest");
		}

		const bodySchema = Joi.object().keys({
			title: Joi.string().required(),
			content: Joi.string().required(),
			head: Joi.string().valid("free", "info", "question").required(),
			imgFile: Joi.any(),
		});

		await bodySchema.validateAsync(req.body);

		const loginUserId = req.currentUserId;
		const { tourId, content, rating } = req.body;
		const images = req.files.map(
			(image) => image.location.split("amazonaws.com/")[1]
		);

		const newReview = await ReviewService.addReview({
			loginUserId,
			tourId,
			content,
			rating,
			images,
		});

		res.status(201).json(newReview);
		return;
		return;
	} catch (err) {
		next(err);
	}
});

// 해당 랜드마크의 리뷰 목록 불러오기
reviewRouter.get("/review/:tourId/list", async (req, res, next) => {
	try {
		const paramSchema = Joi.object().keys({
			tourId: Joi.string().required(),
		});

		await paramSchema.validateAsync(req.params);

		const tourId = req.params.tourId;
		const reviews = await ReviewService.getReviews({ tourId });

		res.status(200).json(reviews);
		return;
	} catch (err) {
		next(err);
	}
});

// 리뷰 수정하기
reviewRouter.put("/review/:id", s3Multi(), async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error("system.error.badRequest");
		}

		const paramSchema = Joi.object().keys({
			id: Joi.string().required(),
		});

		await paramSchema.validateAsync(req.params);

		const loginUserId = req.currentUserId;
		const reviewId = req.params.id;

		let toUpdate = req.body;

		if (req.files) {
			const images = req.files.map(
				(image) => image.location.split("amazonaws.com/")[1]
			);
			toUpdate.saveFileName = images;
		}

		const editedReview = await ReviewService.setReview({
			loginUserId,
			reviewId,
			toUpdate,
		});

		res.status(201).json(editedReview);
		return;
	} catch (err) {
		next(err);
	}
});

// 리뷰 삭제하기
reviewRouter.delete("/review/:id", async (req, res, next) => {
	try {
		const paramSchema = Joi.object().keys({
			id: Joi.string().required(),
		});

		await paramSchema.validateAsync(req.params);

		const loginUserId = req.currentUserId;
		const reviewId = req.params.id;

		const deleteResult = await ReviewService.deleteReview({
			loginUserId,
			reviewId,
		});

		res.status(200).send(deleteResult);
		return;
	} catch (err) {
		next(err);
	}
});

export { reviewRouter };
