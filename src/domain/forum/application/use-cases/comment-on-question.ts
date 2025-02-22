import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentRepository } from "../repositories/question-comments-repository";
import { QuestionRepository } from "../repositories/questions-repository";

interface CommentOnQuestionUseCaseRequest {
 authorId: string;
 questionId: string;
 content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}


export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentsRepository: QuestionCommentRepository
  ){}

  async execute({
    authorId,
    questionId,
    content
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse>{


   const question =  await this.questionRepository.findById(questionId)

   if(!question){
    throw new Error('Question not found')
   }

   const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content
   })

  await this.questionCommentsRepository.create(questionComment)

  return { questionComment }

  }
}