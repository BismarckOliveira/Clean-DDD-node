import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
 answerId: string
 authorId: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository){}

  async execute({
      answerId,
      authorId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse>{
    const answer = await this.answerRepository.findById(answerId)

    if(!answer) {
      throw new Error("Answer not Found.")
    }

    if(authorId !== answer.authorId.toString()) {
      throw new Error("Not Allowed.")
    }

    await this.answerRepository.delete(answer)

    return {
      answer
    }

  }
}