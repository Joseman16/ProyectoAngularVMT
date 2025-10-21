export interface IColumn {
  header: string;
  field: string;
  format?: IFormat;
}

interface IFormat {
  type: typeFormat;
  params?: string // ! Solo funciona con la propiedad format
}

type typeFormat = 'currency' | 'date'


export interface IAccionOutput<T> {
  type: typeAccionOutput
  data: T
}

export type typeAccionOutput = 'editable' | 'delete'
