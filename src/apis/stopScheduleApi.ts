import { LineCode } from '../constants/line.js'
import { StopCode } from '../constants/stop.js'
import { apiClient } from './apiClient.js'

export type ScheduleItem = {
  seq: string
  dest: string
  plat: string
  time: string
  ttnt: string
  valid: string
  source: string
}

type Schedule = {
  sys_time: string
  curr_time: string
  data: {
    [key in `${LineCode}-${StopCode}`]: {
      curr_time: string
      sys_time: string
      UP?: ScheduleItem[]
      DOWN?: ScheduleItem[]
    }
  }
  status: number
  message: string
  isdelay: string
}

const get = ({ line, stop }: { line: LineCode; stop: StopCode }) =>
  apiClient
    .url('/transport/mtr/getSchedule.php')
    .query({ line, sta: stop })
    .get()
    .json<Schedule>()

export const stopScheduleApi = { get }
