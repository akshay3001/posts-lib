export interface PostsParams {
  _page: string;
  _sort: string;
  _order: string;
  _start: string;
  _end: string;
  _q: string;
}

export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}
