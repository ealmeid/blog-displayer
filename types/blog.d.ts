interface Blog {
  id: string;
  title: string;
  description: string;
  authors: Author[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

interface Author {
  id: string;
  name: string;
  avatar: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: string;
  title: string;
  description: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}
