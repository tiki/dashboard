<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const data = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const loading = ref(true)

onMounted(() => {
  data.value = getMockData()
  loading.value = false
})

const getMockData = () => {
  return [
    { id: 1, name: 'Tiki', created_at: 'December 17, 1995 03:24:00' },
    { id: 2, name: 'Organization 2', created_at: 'December 17, 1995 03:24:00' },
    { id: 3, name: 'Organization 3', created_at: 'December 17, 1995 03:24:00' },
    { id: 4, name: 'Organization 4', created_at: 'December 17, 1995 03:24:00' }
  ]
}

const getSeverity = (status: any) => {
  switch (status) {
    case 'open':
      return 'success'
    case 'closed':
      return 'secondary'
    case 'pending':
      return 'secondary'
  }
}

const openThread = (event: any) => {
  router.push(`request/${event.data.id}`)
}
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="data"
    paginator
    :rows="5"
    dataKey="title"
    :loading="loading"
    :globalFilterFields="['title', 'lastRepliedBy', 'status']"
    :rowHover="true"
    @row-click="openThread"
  >
    <template #header>
      <div class="flex py-4 w-full">
        <IconField class="w-full">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['global'].value" placeholder="Search..." class="w-2/6" />
        </IconField>
      </div>
    </template>
    <template #empty> No items found. </template>
    <template #loading> Loading data. Please wait. </template>

    <Column field="name" header="NAME" style="min-width: 10em">
      <template #body="{ data }">
        {{ data.name }}
      </template>
    </Column>

    <Column field="created_at" header="CREATED AT" style="min-width: 10em">
      <template #body="{ data }">
        {{ data.created_at }}
      </template>
    </Column>

    <Column field="domains" header="DOMAINS" :showFilterMenu="false" style="min-width: 10em">
      <template #body="{ data }">
        <Button icon="pi pi-eye" aria-label="eye" rounded text severity="secondary" />
      </template>
    </Column>
  </DataTable>
</template>

<style></style>
