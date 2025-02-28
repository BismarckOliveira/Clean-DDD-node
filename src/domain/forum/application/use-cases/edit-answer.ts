import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface EditAnswerUseCaseRequest {
 authorId: string
 answerId: string
 content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository){}

  async execute({
      content,
      authorId,
      answerId
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse>{
    const answer = await this.answerRepository.findById(answerId)

    if(!answer) {
      throw new Error("Answer not Found.")
    }

    if(authorId !== answer.authorId.toString()) {
      throw new Error("Not Allowed.")
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {
      answer
    }

  }
}