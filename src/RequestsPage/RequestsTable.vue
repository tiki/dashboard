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
    { id: 1, title: 'Issue with login', lastRepliedBy: 'Amy Elsner', status: 'open' },
    { id: 2, title: 'Payment not processed', lastRepliedBy: 'Anna Fali', status: 'closed' },
    { id: 3, title: 'Bug in the system', lastRepliedBy: 'Asiya Javayant', status: 'pending' },
    { id: 4, title: 'Feature request', lastRepliedBy: 'Bernardo Dominic', status: 'open' },
    { id: 5, title: 'UI not responsive', lastRepliedBy: 'Elwin Sharvill', status: 'closed' },
    { id: 6, title: 'Error 404 on dashboard', lastRepliedBy: 'Ioni Bowcher', status: 'pending' },
    { id: 7, title: 'Slow performance', lastRepliedBy: 'Ivan Magalhaes', status: 'open' },
    { id: 8, title: 'Missing documentation', lastRepliedBy: 'Onyama Limba', status: 'closed' },
    { id: 9, title: 'Crash on save', lastRepliedBy: 'Stephen Shaw', status: 'pending' },
    { id: 10, title: 'Inconsistent data', lastRepliedBy: 'XuXue Feng', status: 'open' },
    { id: 11, title: 'Inconsistent data', lastRepliedBy: 'XuXue Feng', status: 'open' },
    { id: 12, title: 'Inconsistent data', lastRepliedBy: 'XuXue Feng', status: 'open' },
    { id: 13, title: 'Inconsistent data', lastRepliedBy: 'XuXue Feng', status: 'open' },
    { id: 14, title: 'Inconsistent data', lastRepliedBy: 'XuXue Feng', status: 'open' }
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
          <InputIcon class="w-[12rem]">
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['global'].value" placeholder="Search..." class="w-2/6" />
        </IconField>
      </div>
    </template>
    <template #empty> No items found. </template>
    <template #loading> Loading data. Please wait. </template>

    <Column field="title" header="TITLE">
      <template #body="{ data }">
        {{ data.title }}
      </template>
    </Column>

    <Column field="lastRepliedBy" header="LAST REPLIED BY">
      <template #body="{ data }">
        {{ data.lastRepliedBy }}
      </template>
    </Column>

    <Column field="status" header="STATUS" :showFilterMenu="false">
      <template #body="{ data }">
        <Tag :value="data.status" :severity="getSeverity(data.status)" />
      </template>
    </Column>
  </DataTable>
</template>

<style>
.p-datatable-tbody td {
  cursor: pointer;
}
</style>
