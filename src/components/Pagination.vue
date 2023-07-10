<script setup lang="ts">
defineProps<{
  currentPage: number
  pages: number
  changePage: (value: number) => void
}>()
</script>

<template>
  <div>
    <div v-if="currentPage !== 1" class="pagination">
      <div v-if="currentPage - 3 >= 1" class="flex">
        <div class="page" v-on:click="changePage(1)">1</div>
        <div v-if="currentPage - 3 != 1" class="points">...</div>
      </div>
      <div style="flex-direction: row-reverse; display: flex">
        <div v-for="i in currentPage">
          <div
            v-if="currentPage - i > 0 && currentPage - i > currentPage - 3"
            class="page"
            v-on:click="changePage(currentPage - i)"
          >
            {{ currentPage - i }}
          </div>
        </div>
      </div>
      <div class="page active">{{ currentPage }}</div>
      <div v-if="currentPage < pages" class="flex">
        <div v-for="i in currentPage" class="flex">
          <div
            v-if="i < pages && currentPage + i < currentPage + 3"
            class="page"
            v-on:click="changePage(currentPage + i)"
          >
            {{ currentPage + i }}
          </div>
        </div>
      </div>
      <div v-if="currentPage + 3 <= pages" class="flex">
        <div v-if="currentPage + 3 != pages" class="points">...</div>
        <div class="page" v-on:click="changePage(pages)">{{ pages }}</div>
      </div>
    </div>

    <div v-else class="pagination">
      <div class="page active">1</div>
      <div v-for="i in pages" :key="i">
        <div v-if="i < 5 && i > 1" class="page" v-on:click="changePage(i)">{{ i }}</div>
      </div>
      <div v-if="currentPage + 3 < pages" class="points">...</div>
      <div class="page" v-on:click="changePage(pages)">{{ pages }}</div>
    </div>
  </div>
</template>

<style>
@import '../assets/base.css';

.pagination {
  display: flex;
  margin-top: 32px;
  margin-bottom: 18px;
  justify-content: end;
}

.flex {
  display: flex;
}

.page {
  background-color: var(--link-color);
  padding: 4px;
  padding-left: 12px;
  padding-right: 12px;
  margin-left: 6px;
  cursor: pointer;
  font-weight: bold;
  color: white;
}

.page:hover {
  opacity: 0.8;
}

.active {
  opacity: 1 !important;
  background-color: var(--color-background);
  border: 1px solid var(--link-color);
  cursor: auto;
}

.points {
  margin-left: 6px;
}
</style>
