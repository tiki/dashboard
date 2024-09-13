import { RequestService } from '@/services'

export interface Lagoon {
  lagoonId: string
  orgId: string
  status: string
  accountId: string
  created: string
}

export class LagoonService {
  static requestService = new RequestService()

  static async get(): Promise<Lagoon[]> {
    return await LagoonService.requestService.get<Lagoon[]>('/catalog/lagoon')
  }

  static async deploy(orgId: string): Promise<Lagoon> {
    return await LagoonService.requestService.post<Lagoon>('/catalog/lagoon', { orgId })
  }
}
