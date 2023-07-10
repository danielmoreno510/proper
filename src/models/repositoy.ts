export type RepositoryResponse = {
  incomplete_results: boolean
  items: Repository[]
  total_count: 7375278
}

export type Repository = {
  id: number
  name: string
  owner: Owner
  topics: string[]
  forks: number
  stargazers_count: number
  html_url: string
  description: string
}

export type Owner = {
  id: number
  login: string
  avatar_url: string
}
