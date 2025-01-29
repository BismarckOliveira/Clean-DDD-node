import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { EditQuestionUseCase } from './edit-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase


describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })


test('Should be able to edit a question', async () => {
  const newQuestion = makeQuestion({authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('question-1'))

  await inMemoryQuestionsRepository.create(newQuestion)

  await sut.execute({
    questionId: newQuestion.id.toValue(),
    authorId: 'author-1',
    content: 'Conteudo Teste',
    title: 'Pergunta Teste'
  })


  expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
    content: 'Conteudo Teste',
    title: 'Pergunta Teste'
  })
})

test('Should be able to edit a question', async () => {
  const newQuestion = makeQuestion({authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('question-1'))

  await inMemoryQuestionsRepository.create(newQuestion)

  expect(() => {
    return  sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-2',
      content: 'Conteudo Teste',
      title: 'Pergunta Teste'
    })
  }).rejects.toBeInstanceOf(Error)
})

})
