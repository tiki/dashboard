<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'

const data = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const loading = ref(true)

onMounted(async () => {
  data.value = await getDatasets()
  loading.value = false
})

const getDatasets = async () => {
  const headers = new Headers()
  headers.append('Access-Control-Allow-Origin', 'http://localhost:5173')
  const options = {
    method: 'GET',
    headers: headers
  }
  const data = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/uploads`, options)
  return await data.json()
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

      <Column field="database" header="DATABASE" style="min-width: 10rem">
        <template #body="{ data }">
          {{ data.database }}
        </template>
      </Column>

      <Column field="filename" header="FILENAME" :showFilterMenu="false" style="min-width: 10em">
        <template #body="{ data }">
          {{ data.filename }}
        </template>
      </Column>
      <Column field="lagoon" header="LAGOON" :showFilterMenu="false" style="min-width: 10em">
        <template #body="{ data }">
          {{ data.lagoon }}
        </template>
      </Column>
      <Column
        field="uploaded_datetime"
        header="UPLOADED DATETIME"
        style="min-width: 10rem"
        sortable
      >
        <template #body="{ data }">
          {{ data.uploaded_datetime }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
