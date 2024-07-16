<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import Select from 'primevue/select'
import Column from 'primevue/column'

const data = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  table: { value: null, matchMode: FilterMatchMode.CONTAINS },
  dataset: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const statuses = ref(['uploaded', 'prepared', 'processed'])
const loading = ref(true)

onMounted(() => {
  data.value = getMockData()
  loading.value = false
})

const getMockData = () => {
  return [
    {
      id: 1,
      table: 'Ocean',
      dataset: 'Receipts',
      status: 'processed',
      lastUpdate: '2024-07-15T12:00:00Z'
    },
    {
      id: 2,
      table: 'Lake',
      dataset: 'Demographics',
      status: 'uploaded',
      lastUpdate: '2024-07-15T12:00:00Z'
    },
    {
      id: 3,
      table: 'River',
      dataset: 'Transactions',
      status: 'prepared',
      lastUpdate: '2024-07-15T12:00:00Z'
    },
    {
      id: 4,
      table: 'Sea',
      dataset: 'Retails',
      status: 'processed',
      lastUpdate: '2024-07-15T12:00:00Z'
    }
  ]
}

const getSeverity = (status: any) => {
  switch (status) {
    case 'processed':
      return 'success'
    case 'uploaded':
      return 'secondary'
    case 'prepared':
      return 'secondary'
  }
}
</script>

<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      :value="data"
      paginator
      :rows="10"
      dataKey="title"
      :loading="loading"
      :globalFilterFields="['table', 'dataset', 'status']"
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

      <Column field="table" header="TABLE" style="min-width: 10rem">
        <template #body="{ data }">
          {{ data.table }}
        </template>
      </Column>

      <Column field="dataset" header="DATASET" style="min-width: 10rem">
        <template #body="{ data }">
          {{ data.dataset }}
        </template>
      </Column>

      <Column field="status" header="STATUS" :showFilterMenu="false" style="min-width: 10em">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
      </Column>
      <Column field="lastUpdate" header="LAST UPDATE" style="min-width: 10rem" sortable>
        <template #body="{ data }">
          {{ data.lastUpdate }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
