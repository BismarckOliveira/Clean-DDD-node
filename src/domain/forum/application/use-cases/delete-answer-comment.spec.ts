import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { DeleteAnswerUseCase } from './delete-answer-comment';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerUseCase


describe('Delete on Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new DeleteAnswerUseCase(
      inMemoryAnswerCommentsRepository
    )
  })


test('Should be able to delete a answer comment', async () => {
  const answer = makeAnswerComment()

  await inMemoryAnswerCommentsRepository.create(answer)

   await sut.execute({
    answerCommentId: answer.id.toString(),
    authorId: answer.authorId.toString(),
  })

  expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)

})

test('Should not be able to delete another user answer comment', async () => {
  const answer = makeAnswerComment({
    authorId: new UniqueEntityID('author-1')
  })

  await inMemoryAnswerCommentsRepository.create(answer)



  expect(() =>{
    return  sut.execute({
      answerCommentId: answer.id.toString(),
      authorId: 'author-2',
    })
  }).rejects.toBeInstanceOf(Error)

})

})
