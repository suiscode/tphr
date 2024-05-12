export interface SessionInterface {
  iat: number;
  exp: number;
  user: UserInterface;
}
export interface userCV {
  _id: string;
  about?: string;
  education?: string;
  experience?: string;
  skills?: string[];
  firstName?: string;
  lastName?: string;
  registerID?: string;
  gender?: string;
  bDay?: Date;
  phoneNumber?: string;
  email: string;
  address?: string;
  career?: string;
  salaryExpectency?: number;
  workDuration?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface UserInterface {
  email?: string;
  _id?: string;
  image?: string;
  role?: string;
  cvId?: string;
  cv?: userCV;
}
