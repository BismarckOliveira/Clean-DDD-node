import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}


export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository){}

  async execute({content, instructorId, questionId}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse>{
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.answersRepository.create(answer)

    return {
      answer
    }
  }
}