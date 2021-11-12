export interface PostsParams {
  page?: string;
  sort?: string;
  order?: string;
  start?: string;
  end?: string;
  q?: string;
}

export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}
