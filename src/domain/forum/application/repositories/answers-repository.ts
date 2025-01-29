import { Answer } from '@/domain/forum/enterprise/entities/answer'

interface AnswersRepository{
  findById(id: string): Promise<Answer | null>
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
}

export { AnswersRepository }
