import http from '../http'

/**
 * Get trending repositories from github.
 */
export const trendingRepositories = async () => {
  const { data } = await http.get(`search/repositories?q=stars:%3E1&sort=stars&order=desc`)
  return data
}

/**
 * Search github repositories.
 */
export const searchRepositories = async (search: string, page: number) => {
  const { data } = await http.get(`search/repositories?q=${search}&page=${page}`)
  return data
}


/**
 * Search github repository.
 */
export const searchRepository = async (id: string) => {
    const { data } = await http.get(`repositories/${id}`)
    return data
  }
  