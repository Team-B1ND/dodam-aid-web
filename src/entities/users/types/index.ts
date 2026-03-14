export interface User {
  publicId: string;
  username: string;
  name: string;
  phone: string;
  profileImage: string;
  status: "DEACTIVATED" | "ACTIVATED";
  roles: ("STUDENT" | "TEACHER")[];
  student?: {
    grade: number;
    room: number;
    number: number;
  };
  teacher?: {
    position: string;
  };
  createdAt: string;
}
