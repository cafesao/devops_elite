export interface ILogContext {
  function: string
  file: string
}

export interface ILogContextDB extends ILogContext {
  data?: any
}
