import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/questions-repository";

interface FetchRecentQuestionUseCaseRequest {
 page: number
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}


export class FetchRecentQuestionUseCase {
  constructor(private questionRepository: QuestionRepository){}

  async execute({
   page
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse>{
    const questions =  await this.questionRepository.findManyRecent({page})

    return {
      questions
    }

  }
}