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
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['table', 'dataset', 'status']"
    >
      <template #header>
        <div class="flex">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </IconField>
        </div>
      </template>
      <template #empty> No items found. </template>
      <template #loading> Loading data. Please wait. </template>

      <Column field="table" header="Table" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.table }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search by table"
          />
        </template>
      </Column>

      <Column field="dataset" header="Dataset" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.dataset }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search by dataset"
          />
        </template>
      </Column>

      <Column field="status" header="Status" :showFilterMenu="false" style="min-width: 12rem">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="statuses"
            placeholder="Filter by status"
            style="min-width: 12rem"
            :showClear="true"
          >
            <template #option="slotProps">
              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
            </template>
          </Select>
        </template>
      </Column>
      <Column field="lastUpdate" header="Last Update" style="min-width: 12rem" sortable>
        <template #body="{ data }">
          {{ data.lastUpdate }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
