import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentRepository } from "../repositories/answer-comments-repository";
import { AnswersRepository } from "../repositories/answers-repository";

interface CommentOnAnswerUseCaseRequest {
 authorId: string;
 answerId: string;
 content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}


export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentRepository
  ){}

  async execute({
    authorId,
    answerId,
    content
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse>{


   const answer =  await this.answerRepository.findById(answerId)

   if(!answer){
    throw new Error('Answer not found')
   }

   const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content
   })

  await this.answerCommentsRepository.create(answerComment)

  return { answerComment }

  }
}