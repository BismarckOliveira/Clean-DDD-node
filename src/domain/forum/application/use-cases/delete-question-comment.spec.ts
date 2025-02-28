import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { DeleteQuestionUseCase } from './delete-question-comment';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionUseCase


describe('Delete on Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionUseCase(
      inMemoryQuestionCommentsRepository
    )
  })


test('Should be able to delete a question comment', async () => {
  const question = makeQuestionComment()

  await inMemoryQuestionCommentsRepository.create(question)

   await sut.execute({
    questionCommentId: question.id.toString(),
    authorId: question.authorId.toString(),
  })

  expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)

})

test('Should not be able to delete another user question comment', async () => {
  const question = makeQuestionComment({
    authorId: new UniqueEntityID('author-1')
  })

  await inMemoryQuestionCommentsRepository.create(question)



  expect(() =>{
    return  sut.execute({
      questionCommentId: question.id.toString(),
      authorId: 'author-2',
    })
  }).rejects.toBeInstanceOf(Error)

})

})
