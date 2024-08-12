<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import Button from 'primevue/button'

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
    {
      id: 1,
      domain: 'Tiki',
      organization: 'Organization 1',
      created_at: 'December 17, 1995 03:24:00',
      secret: '*******y712az'
    },
    {
      id: 2,
      domain: 'Organization 2',
      organization: 'Organization 1',
      created_at: 'December 17, 1995 03:24:00',
      secret: '*******y712az'
    },
    {
      id: 3,
      domain: 'Organization 3',
      organization: 'Organization 2',
      created_at: 'December 17, 1995 03:24:00',
      secret: '*******y712az'
    },
    {
      id: 4,
      domain: 'Organization 4',
      organization: 'Organization 2',
      created_at: 'December 17, 1995 03:24:00',
      secret: '*******y712az'
    }
  ]
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

    <Column field="domain" header="DOMAIN" style="min-width: 10em">
      <template #body="{ data }">
        {{ data.domain }}
      </template>
    </Column>

    <Column field="organization" header="ORGANIZATION" style="min-width: 10em">
      <template #body="{ data }">
        {{ data.organization }}
      </template>
    </Column>

    <Column field="created_at" header="CREATED AT" style="min-width: 10em">
      <template #body="{ data }">
        {{ data.created_at }}
      </template>
    </Column>

    <Column field="secret" header="SECRET" :showFilterMenu="false" style="min-width: 10em">
      <template #body="{ data }">
        <div>
          <span> {{ data.secret }}</span>
          <Button
            icon="pi pi-refresh"
            aria-label="eye"
            rounded
            text
            severity="secondary"
            v-tooltip.top="'Refresh secret'"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style></style>
