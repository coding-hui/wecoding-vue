/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = '00000',
  ERROR = 1,
  TIMEOUT = 401,
  LOGIN_EXPIRED = 'A0215',
  TOKEN_ERROR = 'A0220',
  PARSE_TOKEN_ERROR = 'A0222',
  NOT_LOGIN = 'A0330',
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
