const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

// JWT 미들웨어 설정
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'], // JWT 기본 알고리즘 설정
    userProperty: 'req.auth'   // 토큰 정보를 req.auth에 저장
});

const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlAuth = require('../controllers/authentication');

// locations
router
    .route('/locations')
    .get(ctrlLocations.locationsListByDistance)
    .post(ctrlLocations.locationsCreate);

router
    .route('/locations/:locationid')
    .get(ctrlLocations.locationsReadOne)
    .put(ctrlLocations.locationsUpdateOne)
    .delete(ctrlLocations.locationsDeleteOne);

// reviews
router
    .route('/locations/:locationid/reviews')
    .post(auth, ctrlReviews.reviewsCreate); // 인증 미들웨어 추가

router
    .route('/locations/:locationid/reviews/:reviewid')
    .get(ctrlReviews.reviewsReadOne)
    .put(auth, ctrlReviews.reviewsUpdateOne) // 인증 미들웨어 추가
    .delete(auth, ctrlReviews.reviewsDeleteOne); // 인증 미들웨어 추가

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
