export interface Status {
  error: number;
  message: string;
}

export interface Result {
  status: Status;
  result: any;
}
