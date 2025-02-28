import { QuestionCommentRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionUseCaseRequest {
 authorId: string;
 questionCommentId: string;
}

interface DeleteQuestionUseCaseResponse {}


export class DeleteQuestionUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentRepository
  ){}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse>{


   const questionComment =  await this.questionCommentsRepository.findById(questionCommentId)

   if(!questionComment){
    throw new Error('questionComment not found')
   }

   if(questionComment.authorId.toString() !== authorId) {
    throw new Error('Not allowed')
   }

  await this.questionCommentsRepository.delete(questionComment)

  return { questionComment }

  }
}