import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentRepository {
  public items: QuestionComment[] = []


  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

}