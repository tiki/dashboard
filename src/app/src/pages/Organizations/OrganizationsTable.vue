<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { FilterMatchMode } from '@primevue/core/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import Button from 'primevue/button'

import { OrganizationService, type Organization, type Domain, DomainService } from './services'

const data = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const loading = ref(true)

onMounted(async () => {
  const orgs: Organization[] = await OrganizationService.get()
  const domains: Domain[] = await DomainService.get()
  console.log(orgs, domains)
  // data.value = response
  loading.value = false
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="data"
    paginator
    :rows="5"
    dataKey="title"
    :loading="loading"
    :globalFilterFields="['domain', 'organization']"
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

    <Column field="domain" header="DOMAIN" style="min-width: 10em">
      <template #body="{ data }">
        {{ data.domain }}
      </template>
    </Column>

    <Column field="lagoon" header="LAGOON" style="min-width: 10em">
      <template #body="{ data }">
        {{ data.lagoon }}
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
./services/organizationService
