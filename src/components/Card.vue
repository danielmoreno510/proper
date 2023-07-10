<script setup lang="ts">
// @ts-ignore
import type { Repository } from '../models/repositoy'

defineProps<{
  repository: Repository
  single?: boolean
}>()
</script>

<template>
  <div class="card" v-on:click="goToRepository(repository)">
    <img :src="repository.owner.avatar_url" class="avatar" alt="" />
    <div :class="single ? 'justify' : ''">
      <div>
        <span class="title">Name:</span> <span>{{ repository.name }}</span>
      </div>
      <div>
        <span class="title">Id:</span> <span>{{ repository.id }}</span>
      </div>
      <div>
        <span class="title">Owner:</span> <span>{{ repository.owner.login }}</span>
      </div>
      <div>
        <span class="title">Forks:</span> <span>{{ repository.forks }}</span>
      </div>
      <div>
        <span class="title">Stars:</span> <span>{{ repository.stargazers_count }}</span>
      </div>
      <div v-if="repository.topics.length > 0 && !single">
        <span class="title">Topics:</span>
        <p class="ellipsis">{{ repository.topics.join(', ') }}</p>
      </div>
    </div>
    <div v-if="single" class="description">
      {{ repository.description }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    goToRepository(repository: Repository) {
      if (this.single) {
        window.open(repository.html_url, '_blank')
      } else {
        this.$router.push(`/repository/${repository.id}`)
      }
    }
  }
}
</script>

<style>
.card {
  border: 1px solid var(--link-color);
  padding: 8px;
  text-align: center;
  margin: 8px;
  cursor: pointer;
}

.justify {
  display: flex;
    justify-content: space-between;
}

.card:hover {
  opacity: 0.6;
}

.avatar {
  width: -webkit-fill-available;
  max-width: 400px;
}

.title {
  color: white;
  font-weight: 500;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.description {
  margin-top: 12px;
  font-weight: 600;
  color: white;
}
</style>
