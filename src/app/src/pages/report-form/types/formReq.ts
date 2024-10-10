export default interface FormReq {
  name: string
  email: string
  companyName: string
  website: string
  dataSamples?: File[]
  legalDocuments?: File[]
}
