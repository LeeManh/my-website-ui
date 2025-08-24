export enum PostStatus {
  DRAFT = 1,
  PUBLISHED = 2,
  SCHEDULED = 3,
}

export enum PostVisibility {
  PUBLIC = 1,
  PRIVATE = 2,
}

export enum Reaction {
  LIKE = "like",
  DISLIKE = "dislike",
}

export enum LikeTargetType {
  POST = 1,
  SERIES = 2,
  COMMENT = 3,
}

export enum BookmarkTargetType {
  POST = 1,
  SERIES = 2,
}
