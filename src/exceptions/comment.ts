class CommentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CommentError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CommentError;
