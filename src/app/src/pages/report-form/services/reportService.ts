import type FormReq from '../types/formReq'
import { RequestService } from '@/services'

export class ReportService {
  static requestService = new RequestService()

  static async submitForm(formReq: FormReq): Promise<void> {
    try {
      const formData = new FormData()
      formData.append(
        'report',
        new Blob(
          [
            JSON.stringify({
              name: formReq.name,
              email: formReq.email,
              companyName: formReq.companyName,
              website: formReq.website
            })
          ],
          { type: 'application/json' }
        )
      )

      if (formReq.dataSamples) {
        formReq.dataSamples.forEach((file, index) => {
          formData.append(`dataSample_${index}`, file)
        })
      }

      if (formReq.legalDocuments) {
        formReq.legalDocuments.forEach((file, index) => {
          formData.append(`legalDocument_${index}`, file)
        })
      }

      return await ReportService.requestService.post<any>('/account/report', formData, false)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }
}
