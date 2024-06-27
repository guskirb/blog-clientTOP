export type PropTypes = {
  postId?: string;
  comments?: Array<any>;
  refetch?: any;
  isLoading?: boolean;
  posts?: {
    posts: PostTypes;
    page: string;
    total: number;
  };
  title?: string;
  category?: any;
  page?: any;
  onSubmit?: any;
  post?: PostTypes;
  rootErrors?: any;
};

export type PostTypes = {
  title: string;
  category: string;
  image_url: string;
  post: string;
  public: boolean;
  _id: string;
  date_formatted: string;
};

export type CommentTypes = {
  comment: string;
  date: string;
  author: {
    username: string;
    _id: string;
  };
  _id: string;
};
