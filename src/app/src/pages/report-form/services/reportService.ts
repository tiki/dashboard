import type FormReq from '../types/formReq'
import { RequestService } from '@/services'

export class ReportService {
  static requestService = new RequestService()

  static async submitForm(formReq: FormReq): Promise<void> {
    try {
      const formData = new FormData()
      const token = `eyJraWQiOiIreDJmMVJVeG4xMzZYSkkwSHNEdTRhMVlyOEc0OFFhMDh5N0ltTzFZbVwvdz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwMTNiZTU4MC0zMDkxLTcwMjktMTVhYy0zOTllYzEwMjllZDMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9LWW9za2x3NlkiLCJjbGllbnRfaWQiOiIzNTA2cTdydGFqNGs1Z25zZzRjZm1kcWYybyIsIm9yaWdpbl9qdGkiOiI3OTg4MjFjNy05YjdkLTRmOTctYTcxZS1hZDc4YTdhOTA5MjEiLCJldmVudF9pZCI6IjFjYWMyNmEwLTk5Y2MtNGE2MS1hNmQ1LTk1ODk3ZjVjMzQzNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3Mjg5MTYxNDMsImV4cCI6MTcyOTYwOTg4MywiaWF0IjoxNzI5NjA2MjgzLCJqdGkiOiIwOWM0ZTFlOS0yZDMwLTRjMTktYTg2NC0wZDRlODI0NTc0MmUiLCJ1c2VybmFtZSI6IjAxM2JlNTgwLTMwOTEtNzAyOS0xNWFjLTM5OWVjMTAyOWVkMyJ9.LustlcD7URLWtP8JKeW0Q2d828idw2CcvrvYxBr5GB6dHsP939jfTeV6gT3xqhVEP8Rcq-qLXCE6RVQ_vPEWBOBNEPouvunurgJfMGgizKkkC4zeMEDa78J76MuMHPEVZ07MdDaMRcRl6cuU0UP0ds8bX4mmwp2bun0MM1b2J5GlWw420mMESOuGZjKQsfzrQG4q3qeX3_snwbAlM8wv6i0GWh-Urg6X1lLfA73bUX12bDEvl_QYALhQky2KWG4c4-nZ0HmiDGr-vJXYGF47BNbWBk6WDSyNUMJZ0GhpVLbA5bCW3J2tWrUgeV7iDjbojgXrv1yQnmqhn6D_1yaWwg`
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

      return await ReportService.requestService.post<any>('/account/report', formData)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }
}
