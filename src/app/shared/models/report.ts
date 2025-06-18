import { User } from './user';

export type StudentWithMark = {
  student: User;
  submitted: boolean;
  mark: number;
  responseId: string | null;
};

export type StudentWithAverageMark = {
  user: User;
  averageMark: number;
  submitted: boolean;
};

export type ChartDataObject = {
  '0': number;
  '2': number;
  '5': number;
  '8': number;
  '-1': number;
};

export type QuizReport = {
  name: string;
  studentWithMarkOver8: StudentWithMark[];
  studentWithMarkOver5: StudentWithMark[];
  studentWithMarkOver2: StudentWithMark[];
  studentWithMarkOver0: StudentWithMark[];
  studentWithNoResponse: StudentWithMark[];
  maxDefaultMark: number;
  markDistributionCount: ChartDataObject;
  questionCount: number;
  avgStudentMarkBase10: number;
  maxStudentMarkBase10: number;
  minStudentMarkBase10: number;
  attemptCount: number;
  avgTimeSpend: number;
  completionRate: number;
  students: User[];
  trueFalseQuestionCount: number;
  multipleChoiceQuestionCount: number;
  shortAnswerQuestionCount: number;
};

export type QuizOverallReport = {
  quizCount: number;
  avgCompletionPercentage: number;
  minQuestionCount: number;
  maxQuestionCount: number;
  minStudentScoreBase10: number;
  maxStudentScoreBase10: number;
  studentWithMarkOver8: StudentWithMark[];
  studentWithMarkOver5: StudentWithMark[];
  studentWithMarkOver2: StudentWithMark[];
  studentWithMarkOver0: StudentWithMark[];
  studentWithNoResponse: StudentWithMark[];
  markDistributionCount: ChartDataObject;
  singleQuizReports: QuizReport[];
  trueFalseQuestionCount: number;
  multipleChoiceQuestionCount: number;
  shortAnswerQuestionCount: number;
};

export type AssignmentReport = {
  name: string;
  studentMarks: StudentWithMark[];
  studentWithMarkOver8: StudentWithMark[];
  studentWithMarkOver5: StudentWithMark[];
  studentWithMarkOver2: StudentWithMark[];
  studentWithMarkOver0: StudentWithMark[];
  studentWithNoResponse: StudentWithMark[];
  markDistributionCount: ChartDataObject;
  submissionCount: number;
  gradedSubmissionCount: number;
  fileCount: number;
  avgMark: number;
  maxMark: number;
  completionRate: number;
  students: User[];
  fileTypeCount: Record<string, number>;
};

export type AssignmentOverallReport = {
  assignmentsCountInProgress: number;
  assignmentCount: number;
  avgMark: number;
  avgCompletionRate: number;
  numberOfAssignmentEndsAtThisMonth: number;
  closestNextEndAssignment: string | null;
  markDistributionCount: ChartDataObject;
  studentWithMarkOver8: StudentWithAverageMark[];
  studentWithMarkOver5: StudentWithAverageMark[];
  studentWithMarkOver2: StudentWithAverageMark[];
  studentWithMarkOver0: StudentWithAverageMark[];
  studentWithNoResponse: StudentWithAverageMark[];
  fileTypeCount: Record<string, number>;
  singleAssignmentReports: AssignmentReport[];
};

export type TopicWithMark = {
  topic: {
    id: string;
    sectionId: string;
    title: string;
    type: string;
    data: any;
    response: any;
    course: any;
  };
  responseId: string | null;
  mark: number | null;
  doneTime: string | null;
};

export type StudentReport = {
  totalQuizCount: number;
  totalAssignmentCount: number;
  quizToDoCount: number;
  assignmentToDoCount: number;
  avgQuizMark: number;
  avgAssignmentMark: number;
  topTopicQuiz: TopicWithMark[];
  topTopicAssignment: TopicWithMark[];
};
