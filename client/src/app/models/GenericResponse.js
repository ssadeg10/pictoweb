class GenericResponse {
  constructor(error = false, status = 200, message, data) {
    this.error = error;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
export default GenericResponse;
