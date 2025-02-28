import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentRepository {

  public items: QuestionComment[] = []

  async findById(id: string): Promise<null | QuestionComment> {
    const comment = this.items.find(answer => answer.id.toString() === id)

    if (!comment) {
      return null
    }

    return comment
  }

  async findManyByQuestionId(questionId: string,{ page}: PaginationParams) {
    const questionComments = this.items
    .filter(item => item.questionId.toValue() === questionId)
    .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === questionComment.id)

    this.items.splice(itemIndex, 1)
  }

}