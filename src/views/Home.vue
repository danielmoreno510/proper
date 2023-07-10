<script setup lang="ts">
// @ts-ignore
import { trendingRepositories, searchRepositories } from '../services/api/repositoryServices'
import Input from '../components/Input.vue'
import Card from '../components/Card.vue'
import Pagination from '../components/Pagination.vue'
// @ts-ignore
import { RepositoryResponse, Repository } from '../models/repositoy'
</script>

<template>
  <div class="home-container">
    <h1>Repositories</h1>
    <div class="input-container">
      <Input :value="search" :changeValue="changeValue" :placeHolder="'Search'" />
      <div v-on:click="searchResults()" class="search-button">&#128269;</div>
    </div>
  </div>
  <Pagination v-if="!loading && pages > 0" :currentPage="page" :pages="pages" :changePage="changePage" />
  <h2 v-if="hasError" class="loading">
    There was an error getting the repositories, please try again later
  </h2>
  <h2 v-if="loading" class="loading">Loading...</h2>
  <div class="repositories" v-else>
    <Card v-for="repository in repositories" :repository="repository" class="card-size" />
    <h2 v-if="repositories.length === 0" class="loading">No repositories found :(</h2>
  </div>
  <Pagination v-if="!loading && pages > 0" :currentPage="page" :pages="pages" :changePage="changePage" />
</template>

<script lang="ts">
export default {
  data: () => ({
    loading: <boolean>false,
    hasError: <boolean>false,
    search: <string>'',
    repositories: <Repository[]>[],
    page: 1,
    pages: 0
  }),
  methods: {
    changeValue(value: string) {
      this.search = value
    },
    async searchResults() {
      this.hasError = false
      this.loading = true
      try {
        let response: RepositoryResponse
        if (this.search) {
          response = await searchRepositories(this.search, this.page)
          this.pages = 34
        } else {
          response = await trendingRepositories()
          this.pages = 0
        }
        //this.pages = Math.round(response.total_count / 30)
        this.repositories = response.items
      } catch {
        this.hasError = true
        this.repositories = []
      } finally {
        this.loading = false
      }
    },
    changePage(value: number) {
      this.page = value
      this.searchResults()
    }
  },
  created() {
    this.searchResults()
  },
  components: { Pagination }
}
</script>

<style>
.home-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.input-container {
  display: flex;
}

.search-button {
  background: green;
  padding: 4px;
  color: blue;
  font-weight: bold;
  font-size: 20px;
  padding: 8px;
  padding-left: 14px;
  padding-right: 14px;
  cursor: pointer;
}

.search-button:hover {
  opacity: 0.8;
}

.repositories {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card-size {
  width: 200px;
}
</style>
