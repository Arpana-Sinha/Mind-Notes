export interface Note {
  _id?: string;
  title: string;
  body: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}
