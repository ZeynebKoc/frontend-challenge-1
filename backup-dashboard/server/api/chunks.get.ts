import type { SignedFilesResponse } from '../../app/types/index'
import signedfiles from '../../../mock-data/signedfiles.json'

export default defineEventHandler((): SignedFilesResponse => {
  return signedfiles as SignedFilesResponse
})