import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/questions-repository";

interface CreateQuestionUseCaseRequest {
 authorId: string;
 title: string;
 content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}


export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository){}

  async execute({
    authorId,
    content,
    title
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse>{
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    })

    await this.questionRepository.create(question)

    return {
      question
    }

  }
}