import { ObjectUtils } from "../../utils";

export class RequestError extends Error {
  status: number; message: string; errors: any; error: any; alert: any; response: any;

  constructor(error: any) {
    super(error);

    const responseErrorMessage = ObjectUtils.getIn(error, 'response.data.message');
    this.message = responseErrorMessage || 'Unknow error from the system';
    this.status = ObjectUtils.getIn(error, 'response.status', 3001);

    // Handle axios error
    if (error.message === "Network Error") this.message = 'Unable to connect the system, please check your connection';
    else if (error.response && typeof error.response.data === 'string' && error.response.data) this.message = error.response.data;

    // Handle message
    if (this.status === 403 && !this.message) this.message = 'Permission denied.';

    // Handle fields error
    const resErrors = ObjectUtils.getIn(error, 'response.data.errors', {});
    this.errors = Object.keys(resErrors).reduce((obj: any, key: string) => {
      const value = resErrors[key];
      if (Array.isArray(value)) obj[key] = value[0];
      else obj[key] = value.toString();
      return obj;
    }, {})

    this.error = {
      message: this.message,
      errors: this.errors,
      status: this.status
    }

    this.alert = {
      message: this.message,
      type: 'danger',
    }

    this.response = error.response;
  }
}