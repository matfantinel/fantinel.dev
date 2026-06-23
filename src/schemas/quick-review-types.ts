export enum QuickReviewType {
  Movie = 'Movie',
  TvShow = 'TV Show',
  Game = 'Game',
  Album = 'Album',
  Book = 'Book'
}

export enum QuickReviewRating {
  DidntLikeIt = 'Didn\'t like it',
  Decent = 'Decent',
  LikeIt = 'I like it',
  LovedIt = 'Loved it!'
}

export function getTypeFromLowercaseKey(lowercaseKey: string) {
  const enumKey = Object.keys(QuickReviewType).find(
    key => key.toLowerCase() === lowercaseKey.toLowerCase()
  );

  return enumKey ? QuickReviewType[enumKey as keyof typeof QuickReviewType] : undefined;
}

export function getRatingFromLowercaseKey(lowercaseKey: string) {
  const enumKey = Object.keys(QuickReviewRating).find(
    key => key.toLowerCase() === lowercaseKey.toLowerCase()
  );

  return enumKey ? QuickReviewRating[enumKey as keyof typeof QuickReviewRating] : undefined;
}

export function getRatingSlug(rating: QuickReviewRating): string {
  const enumKey = Object.keys(QuickReviewRating).find(
    key => QuickReviewRating[key as keyof typeof QuickReviewRating] === rating
  );
  return enumKey ? enumKey.toLowerCase() : '';
}