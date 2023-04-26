export interface BlockRoot {
  data: Daum[];
}

export interface Daum {
  sections: Section[];
}

export interface Section {
  instructor: Instructor[];
  meetings: Meeting[];
  component: string;
  course: string;
  credits: string;
  department: string;
  description: string;
  id: string;
  instructionMode: string;
  sectionNumber: string;
  subject: string;
  subjectId: string;
  title: string;
}

export interface Instructor {
  name: string;
}

export interface Meeting {
  days: string;
  startTime: number;
  endTime: number;
  location: string;
  meetingType: string;
  startDate: string;
  endDate: string;
  building: string;
  buildingDescription: string;
  room: string;
}
