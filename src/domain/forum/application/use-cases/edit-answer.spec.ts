import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { EditAnswerUseCase } from './edit-answer';

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase


describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })


test('Should be able to edit a answer', async () => {
  const newAnswer = makeAnswer({authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('answer-1'))

  await inMemoryAnswersRepository.create(newAnswer)

  await sut.execute({
    answerId: newAnswer.id.toValue(),
    authorId: 'author-1',
    content: 'Conteudo Teste',
  })


  expect(inMemoryAnswersRepository.items[0]).toMatchObject({
    content: 'Conteudo Teste',
  })
})

test('Should be able to edit a answer', async () => {
  const newAnswer = makeAnswer({authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('answer-1'))

  await inMemoryAnswersRepository.create(newAnswer)

  expect(() => {
    return  sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-2',
      content: 'Conteudo Teste',
    })
  }).rejects.toBeInstanceOf(Error)
})

})
