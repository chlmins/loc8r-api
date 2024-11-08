var mongoose = require('mongoose');

// 리뷰에 대한 스키마 정의
const reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

// 영업 시간에 대한 스키마 정의
var openingTimeSchema = new mongoose.Schema({
    days: { type: String, required: true },
    opening: String,
    closing: String,
    closed: { type: Boolean, required: true }
});

// 장소(Location)에 대한 메인 스키마 정의
const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    coords: {
        type: { type: String },
        coordinates: [Number]
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

locationSchema.index({ coords: '2dsphere' });

mongoose.model('Location', locationSchema);