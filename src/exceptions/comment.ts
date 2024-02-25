class CommentError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'CommentError';
      Object.setPrototypeOf(this, CommentError.prototype);
    }
}

export default CommentError;