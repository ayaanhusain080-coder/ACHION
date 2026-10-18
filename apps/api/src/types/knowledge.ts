export type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  folderId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};