import { defineEventHandler, readBody } from 'h3'
import type { ChunkRequest, DeleteResult } from '../../app/types/index'
import { DeleteStatus } from '../../app/types/index'

export default defineEventHandler(async (event): Promise<DeleteResult> => {
  const body = await readBody<ChunkRequest>(event)
  const dates = body?.dates ?? []
  const count = dates.length

  return {
    processedFileIds: dates.map((_: unknown, i: number) => `f${i + 1}`),
    failedFileIds: [],
    status: DeleteStatus.Completed,
    additionalInfo: `${count} files deleted successfully`
  }
})