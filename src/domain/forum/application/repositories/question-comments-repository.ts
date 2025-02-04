import { QuestionComment } from "../../enterprise/entities/question-comment"

interface QuestionCommentRepository{
  create(questionComment: QuestionComment): Promise<void>

}

export { QuestionCommentRepository }
