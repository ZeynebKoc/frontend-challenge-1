import type { DownloadFile, ChunkRequest, ChunkDate } from '../../../app/types/index'
import { defineEventHandler, readBody } from 'h3'
import signedfiles from '../../../../mock-data/signedfiles.json'

export default defineEventHandler(async (event): Promise<DownloadFile[]> => { 
  const body = await readBody<ChunkRequest>(event)
  const dates = body?.dates ?? []

  return dates.map((date: ChunkDate, i: number) => {
    const pad = (n: number) => String(n).padStart(2, '0')
    const fileName = `chunk_${date.year}_${pad(date.month)}_${pad(date.day)}_${pad(date.hour)}_${pad(date.minute!)}.dat`

    const group = signedfiles.groups.find(g => g.date.hour === date.hour)
    const bucket = group?.buckets.find(b => b.date.minute === date.minute)
    const fileSize = bucket?.sizeOnDisk ?? Math.floor(Math.random() * (209888 - 89808 + 1)) + 89808

    return {
      fileId: `f${i + 1}`,
      fileName,
      downloadUrl: `https://storage.example.com/signed/${fileName}?token=mock-token-${i + 1}&expires=1740400000`,
      expirationDate: '2026-02-22T00:00:00Z',
      fileSize
    }
  })
})