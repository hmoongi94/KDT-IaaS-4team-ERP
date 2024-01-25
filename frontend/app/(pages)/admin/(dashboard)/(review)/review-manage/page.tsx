// 상품평 관리 페이지

"use client";
// import { ReviewContext } from "@/app/components/AdminComponent/ReviewProvier";
import AdminReviewManageList from "@/app/components/AdminComponent/review-manage/AdminReviewManageList";
import { Review } from "@/app/interfaces/Review/Review";
import { formatDate } from "@/app/utils/formatDate";
import React, { useEffect, useState } from "react";

// 새로운 컴포넌트: 댓글이 있는 리뷰 섹션
const ReviewsWithCommentSection: React.FC<{ reviews: Review[] }> = ({
  reviews,
}) => (
  <section>
    <h2 className="text-lg font-semibold mb-2">댓글이 있는 리뷰</h2>
    {reviews.map((review, index) => (
      <AdminReviewManageList key={index} review={review} />
    ))}
  </section>
);

// 새로운 컴포넌트: 댓글이 없는 리뷰 섹션
const ReviewsWithoutCommentSection: React.FC<{ reviews: Review[] }> = ({
  reviews,
}) => (
  <section>
    <h2 className="text-lg font-semibold mb-2">댓글이 없는 리뷰</h2>
    {reviews.map((review, index) => (
      <AdminReviewManageList key={index} review={review} />
    ))}
  </section>
);

export default function ReviewManagePage() {
  const [reviewsWithComment, setReviewsWithComment] = useState<Review[]>([]);
  const [reviewsWithoutComment, setReviewsWithoutComment] = useState<Review[]>(
    []
  );
  const [selectedSection, setSelectedSection] = useState<string>("withComment");

  // Logic for loading data (e.g., Fetch API)
  useEffect(() => {
    fetch("http://localhost:3560/api/reviewTable")
      .then((response) => response.json())
      // * data가공하는 파트
      .then((data) => {
        const processedReviews = data.map((review: Review) => ({
          ...review,
          reviewCreatedAt: formatDate(review.reviewCreatedAt),
          reviewUpdateAt: formatDate(review.reviewUpdateAt),
        }));

        // 댓글이 있는 리뷰와 없는 리뷰로 분류
        const reviewsWithComment = processedReviews.filter(
          (review: Review) =>
            review.reviewAdminContent !== null &&
            review.reviewAdminContent !== ""
        );
        const reviewsWithoutComment = processedReviews.filter(
          (review: Review) => review.reviewAdminContent === null
        );

        setReviewsWithComment(reviewsWithComment);
        setReviewsWithoutComment(reviewsWithoutComment);
        console.log("Fetched and processed review data: ", processedReviews); // 추가된 로그
      })
      .catch((error) => console.error(error));
  }, []);

  // todo 함수 선언 필요
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">리뷰 관리</h1>

      {/* Toggle buttons to switch between sections */}
      <div className="mb-4">
        <button onClick={() => setSelectedSection("withComment")}>
          댓글이 있는 리뷰/
        </button>
        <button onClick={() => setSelectedSection("withoutComment")}>
          댓글이 없는 리뷰
        </button>
      </div>

      {/* Render the selected section */}
      {selectedSection === "withComment" ? (
        <ReviewsWithCommentSection reviews={reviewsWithComment} />
      ) : (
        <ReviewsWithoutCommentSection reviews={reviewsWithoutComment} />
      )}
    </div>
  );
}
