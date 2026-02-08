/** connpass イベント */
export type ConnpassEvent = {
  event_id: number;
  title: string;
  catch: string;
  description: string;
  event_url: string;
  started_at: string;
  ended_at: string;
  place: string;
  address: string;
  lat: number | null;
  lon: number | null;
  limit: number | null;
  accepted: number;
  waiting: number;
  owner_display_name: string;
};

/** note 記事（RSS由来） */
export type NotePost = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  creator: string;
  thumbnail: string;
};

/** X 投稿 */
export type XPost = {
  id: string;
  text: string;
  createdAt: string;
  authorName: string;
  authorUsername: string;
  url: string;
};
