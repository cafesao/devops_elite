import senselogs from "senselogs"
import { ILogContext, ILogContextDB } from "../interface/log"

const logs = new senselogs()

const controllerLogs = {
  info: (info: string, context: ILogContext) => logs.info(info, context),
  infoContext: (context: ILogContext) => logs.info("Info context", context),
  createRecordDB: (context: ILogContext) =>
    logs.info("Create record in DB", context),
  readRecordDB: (context: ILogContextDB) =>
    logs.info("Searching record in DB", context),
  updateRecordDB: (context: ILogContext) =>
    logs.info("Update record in DB", context),
  deleteRecordDB: (context: ILogContext) =>
    logs.info("Delete record in DB", context),
  dataRecordDB: (context: ILogContextDB, data: any) =>
    logs.info("Return data", {
      ...context,
      data
    }),
  error: (error: any, context: ILogContext) => logs.error(error, context)
}

export default controllerLogs
