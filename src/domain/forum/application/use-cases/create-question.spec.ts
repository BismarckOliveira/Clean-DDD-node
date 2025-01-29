import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CreateQuestionUseCase } from './create-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase


describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })


test('Should be able to create a question', async () => {
  const {question} = await sut.execute({
    authorId: '1',
    content: "Conteudo da Pergunta",
    title: "Nova Pergunta ?"
  })

  expect(question.id).toBeTruthy()
  expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)

})

})
