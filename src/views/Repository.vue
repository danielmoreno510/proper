<script setup lang="ts">
import { searchRepository } from '../services/api/repositoryServices'
import Card from '../components/Card.vue'
import type { Repository } from '../models/repositoy'
</script>

<template>
  <h2 v-if="hasError" class="loading">
    There was an error getting the repository with the id: {{ id }}, please try again later
  </h2>
  <h2 v-if="loading" class="loading">Loading...</h2>
  <div v-if="repository">
    <div class="home-container">
      <h1>{{ repository.name }}</h1>
    </div>
    <Card :repository="repository" :single="true" />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      id: <string>this.$route.params.id,
      loading: <boolean>false,
      hasError: <boolean>false,
      repository: <Repository | null>null
    }
  },
  async mounted() {
    this.hasError = false
    this.loading = true
    try {
      console.log('here', this.id)
      let response: Repository
      response = await searchRepository(this.id)
      this.repository = response
    } catch {
      this.hasError = true
      this.repository = null
    } finally {
      this.loading = false
    }
  },
  components: { Card }
}
</script>
