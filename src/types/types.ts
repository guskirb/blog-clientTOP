export type PropTypes = {
  postId?: string;
  comments?: Array<any>;
  refetch?: any;
  isLoading?: boolean;
  posts?: {
    posts: Array<PostTypes>;
    page: string;
    total: number;
  };
  title?: any;
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
  posts: Array<PostTypes>;
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

export type ResponseTypes = {
  expires: string;
  token: string;
};

export type DataTypes = {
  username?: string;
  email?: string;
  password?: string;
  confirm?: string;
  comment?: string;
  title?: string;
  category?: string;
  image_url?: string;
  post?: string;
  public?: boolean;
  _id?: string;
  date_formatted?: string;
  posts?: Array<PostTypes>;
};
