<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import Select from 'primevue/select'
import Column from 'primevue/column'

const data = ref([])
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  lastRepliedBy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  status: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const statuses = ref(['open', 'closed', 'pending'])
const loading = ref(true)

onMounted(() => {
  data.value = getMockData()
  loading.value = false
})

const getMockData = () => {
  return [
    { title: 'Issue with login', lastRepliedBy: 'Amy Elsner', status: 'open' },
    { title: 'Payment not processed', lastRepliedBy: 'Anna Fali', status: 'closed' },
    { title: 'Bug in the system', lastRepliedBy: 'Asiya Javayant', status: 'pending' },
    { title: 'Feature request', lastRepliedBy: 'Bernardo Dominic', status: 'open' },
    { title: 'UI not responsive', lastRepliedBy: 'Elwin Sharvill', status: 'closed' },
    { title: 'Error 404 on dashboard', lastRepliedBy: 'Ioni Bowcher', status: 'pending' },
    { title: 'Slow performance', lastRepliedBy: 'Ivan Magalhaes', status: 'open' },
    { title: 'Missing documentation', lastRepliedBy: 'Onyama Limba', status: 'closed' },
    { title: 'Crash on save', lastRepliedBy: 'Stephen Shaw', status: 'pending' },
    { title: 'Inconsistent data', lastRepliedBy: 'XuXue Feng', status: 'open' },
    { title: 'Inconsistent data', lastRepliedBy: 'XuXue Feng', status: 'open' },
    { title: 'Inconsistent data', lastRepliedBy: 'XuXue Feng', status: 'open' },
    { title: 'Inconsistent data', lastRepliedBy: 'XuXue Feng', status: 'open' },
    { title: 'Inconsistent data', lastRepliedBy: 'XuXue Feng', status: 'open' }
  ]
}

const getSeverity = (status) => {
  switch (status) {
    case 'open':
      return 'info'
    case 'closed':
      return 'success'
    case 'pending':
      return 'warn'
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
      :globalFilterFields="['title', 'lastRepliedBy', 'status']"
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

      <Column field="title" header="Title" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.title }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search by title"
          />
        </template>
      </Column>

      <Column field="lastRepliedBy" header="Last Replied By" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.lastRepliedBy }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search by name"
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
            placeholder="Select One"
            style="min-width: 12rem"
            :showClear="true"
          >
            <template #option="slotProps">
              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
            </template>
          </Select>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
