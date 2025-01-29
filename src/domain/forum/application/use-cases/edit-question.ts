import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/questions-repository";

interface EditQuestionUseCaseRequest {
 authorId: string
 questionId: string
 title: string
 content: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository){}

  async execute({
      content,
      title,
      authorId,
      questionId
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse>{
    const question = await this.questionRepository.findById(questionId)

    if(!question) {
      throw new Error("Question not Found.")
    }

    if(authorId !== question.authorId.toString()) {
      throw new Error("Not Allowed.")
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {
      question
    }

  }
}