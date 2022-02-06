interface Blog {
  id: string;
  title: string;
  description: string;
  authors: Author[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

interface Author {
  id: string;
  name: string;
  avatar: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Comment {
  id: string;
  title: string;
  description: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}
