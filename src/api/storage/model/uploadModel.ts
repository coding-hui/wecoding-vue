export interface UploadApiResult {
  errorCode: number;
  errorMessage: string;
  success: boolean;
  result: {
    filename: string;
    url: string;
  };
}
