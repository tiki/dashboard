import { RequestService } from '@/services'

export interface Domain {
  domainId: string
  hostname: string
  secret: string
  created: string
  modified: string
}

export class DomainService {
  static requestService = new RequestService()

  static async get(): Promise<Domain[]> {
    return await DomainService.requestService.get<Domain[]>('/account/domain')
  }

  static async create(hostname: string, orgId: string): Promise<Domain> {
    return await DomainService.requestService.post<Domain>('/account/domain', { hostname, orgId })
  }
}
