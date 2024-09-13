<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import { type Lagoon, LagoonService } from './services/lagoonService'
import LoadingComponent from '@/components/LoadingComponent.vue'

const data = ref<Lagoon[]>()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const loading = ref(true)

onMounted(async () => {
  data.value = await getLagoon()
  loading.value = false
})

const getLagoon = async () => {
  try {
    return await LagoonService.get()
  } catch (error) {
    console.log(error)
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
      :globalFilterFields="['orgName', 'lagoonId', 'status']"
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
      <template #loading>
        <LoadingComponent />
      </template>

      <Column field="lagoonId" header="LAGOON ID" style="min-width: 10rem">
        <template #body="{ data }">
          {{ data.lagoonId }}
        </template>
      </Column>

      <Column field="orgName" header="ORGANIZATION" style="min-width: 10rem">
        <template #body="{ data }">
          {{ data.orgName }}
        </template>
      </Column>

      <Column field="status" header="STATUS" :showFilterMenu="false" style="min-width: 10em">
        <template #body="{ data }">
          {{ data.status }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
