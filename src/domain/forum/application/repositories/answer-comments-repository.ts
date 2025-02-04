import { AnswerComment } from "../../enterprise/entities/answer-comment"

interface AnswerCommentRepository{
  create(answerComment: AnswerComment): Promise<void>

}

export { AnswerCommentRepository }
