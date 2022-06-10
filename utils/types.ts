export interface INft {
  name: string
  description: string
  price: number
  song: {}
}

export interface INfts {
  [key: string]: { name: string; description: string; price: string; song: {} }
}
