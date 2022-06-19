export interface IQuark {
  name: string
  description: string
  price: number
  song: {}
}

export interface IQuarks {
  [key: string]: { name: string; description: string; price: string; song: {} }
}
