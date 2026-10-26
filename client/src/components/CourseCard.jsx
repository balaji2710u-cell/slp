
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Clock,
  BookOpen,
  UserRound,
  PlayCircle,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import ProgressBar from "./ProgressBar";
import "./CourseCard.css";

const DEFAULT_THUMBNAIL =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80";

function getGroupClass(group = "") {
  if (group.includes("6–8") || group.includes("6-8")) return "group-sky";
  if (group.includes("7–10") || group.includes("7-10")) return "group-indigo";
  return "group-violet";
}

export default function CourseCard({
  course,
  isEnrolled = false,
  progress = null,
  onEnroll = null,
}) {
  const navigate = useNavigate();

  const targetId = course?.id || course?._id || course?.slug;
  const completedCount = progress?.completedLessons?.length || 0;
  const totalLessons = course?.lessons?.length || 0;

  const percentage = Math.min(
    100,
    Math.max(0, Number(progress?.percentage) || 0)
  );

  const isCompleted = percentage === 100;

  const openCourse = () => {
    if (targetId) navigate(`/course/${targetId}`);
  };

  const handleEnroll = (event) => {
    event.stopPropagation();

    if (onEnroll && targetId) {
      onEnroll(targetId);
    } else {
      openCourse();
    }
  };

  return (
    <article className="advanced-course-card">
      <button
        className="course-card-image-button"
        type="button"
        onClick={openCourse}
        aria-label={`View ${course?.title || "course"} `}
      >
        <img
          className="course-card-thumbnail"
          src={course?.thumbnail || DEFAULT_THUMBNAIL}
          alt=""
          loading="lazy"
          onError={(event) => {
            if (event.currentTarget.src !== DEFAULT_THUMBNAIL) {
              event.currentTarget.src = DEFAULT_THUMBNAIL;
            }
          }}
        />

        <span className="course-card-image-overlay" />

        <span className="course-card-category">
          {course?.category || "Learning"}
        </span>

        {course?.level && (
          <span className="course-card-level">{course.level}</span>
        )}

        <span className="course-card-image-icon" aria-hidden="true">
          <PlayCircle size={22} />
        </span>

        {isEnrolled && (
          <span
            className={`course-card-status ${
              isCompleted ? "status-completed" : "status-learning"
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 size={14} />
            ) : (
              <PlayCircle size={14} />
            )}
            {isCompleted ? "Completed" : "In progress"}
          </span>
        )}
      </button>

      <div className="course-card-content">
        <div className="course-card-meta">
          <span className="course-card-rating">
            <Star size={15} fill="currentColor" />
            <strong>{course?.rating ?? "4.9"}</strong>
            <span className="course-card-learners">
              {Number(course?.enrolledCount ?? 1200).toLocaleString()} learners
            </span>
          </span>

          <span className="course-card-duration">
            <Clock size={14} />
            {course?.duration || "Self-paced"}
          </span>
        </div>

        <button
          className="course-card-title-button"
          type="button"
          onClick={openCourse}
        >
          <h3 className="course-card-title">
            {course?.title || "Untitled Course"}
          </h3>
          <ArrowUpRight
            className="course-card-title-arrow"
            size={18}
            aria-hidden="true"
          />
        </button>

        <p className="course-card-description">
          {course?.description || "Explore lessons and build new skills."}
        </p>

        <div className="course-card-instructor">
          <span className="course-card-instructor-avatar">
            <UserRound size={16} />
          </span>
          <span className="course-card-instructor-name">
            {course?.instructor || "SmartLearn Faculty"}
          </span>
          <Sparkles
            className="course-card-instructor-sparkle"
            size={15}
            aria-hidden="true"
          />
        </div>

        <div className="course-card-tags">
          <span className="course-card-tag course-card-lessons">
            <BookOpen size={14} />
            {totalLessons} lessons
          </span>

          {course?.learningGroup && (
            <span
              className={`course-card-tag ${getGroupClass(
                course.learningGroup
              )}`}
            >
              {course.learningGroup}
            </span>
          )}
        </div>

        <div className="course-card-footer">
          {isEnrolled ? (
            <>
              <div className="course-card-progress-heading">
                <span>
                  {completedCount} of {totalLessons} lessons completed
                </span>
                <strong className={isCompleted ? "progress-done" : ""}>
                  {percentage}%
                </strong>
              </div>

              <div className="course-card-progress">
                <ProgressBar
                  value={percentage}
                  max={100}
                  showLabel={false}
                  height={7}
                />
              </div>

              <button
                type="button"
                className={`course-card-action ${
                  isCompleted ? "action-completed" : "action-primary"
                }`}
                onClick={openCourse}
                disabled={!targetId}
              >
                {isCompleted ? "Review Course" : "Continue Learning"}
                <ArrowUpRight size={17} />
              </button>
            </>
          ) : (
            <div className="course-card-actions">
              <button
                type="button"
                className="course-card-action action-secondary"
                onClick={openCourse}
                disabled={!targetId}
              >
                Explore
              </button>

              <button
                type="button"
                className="course-card-action action-primary"
                onClick={handleEnroll}
                disabled={!targetId}
              >
                Enroll Free
                <ArrowUpRight size={17} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

