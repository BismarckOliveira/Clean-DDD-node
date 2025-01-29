import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { AnswerQuestionUseCase } from './answer-question';

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase


describe('Create Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })



test('Should be ale to create an answer', async () => {

  const {answer} = await sut.execute({
    questionId: '1',
    instructorId: "1",
    content: "Conteudo da Resposta",
  })

  expect(answer.id).toBeTruthy()
  expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
})


})
