export type SelectOptions = {
  value: string;
  content: string;
};

export const categoryOptions: SelectOptions[] = [
  { value: "anime", content: "Anime" },
  { value: "tv", content: "TV" },
  { value: "sports", content: "Sports" },
  { value: "geography", content: "Geography" },
  { value: "music", content: "Music" },
  { value: "movies", content: "Movies" },
  { value: "fun", content: "Just for Fun" },
  { value: "miscellanous", content: "Miscellanous" },
  { value: "history", content: "History" },
  { value: "literature", content: "Literature" },
  { value: "language", content: "Language" },
  { value: "science", content: "Science" },
  { value: "gaming", content: "Gaming" },
  { value: "entertainment", content: "Entertainment" },
  { value: "religion", content: "Religion" },
  { value: "holiday", content: "Holiday" },
];

export const sortOptions: SelectOptions[] = [
  { value: "popular", content: "Popular" },
  { value: "desc", content: "Newest" },
  { value: "asc", content: "Oldest" },
  { value: "rating", content: "Highest Rated" },
];
