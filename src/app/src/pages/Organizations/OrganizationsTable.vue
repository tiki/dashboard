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
  const orgIdToNameMap: Record<string, string> = orgs.reduce(
    (map, org) => {
      map[org.orgId] = org.name
      return map
    },
    {} as Record<string, string>
  )
  const mergedArray = domains.map((domain) => ({
    hostName: domain.hostname,
    domainId: domain.domainId,
    orgId: domain.orgId,
    orgName: orgIdToNameMap[domain.orgId || ''] || 'Unknown'
  }))
  data.value = mergedArray
  console.log(mergedArray)
  loading.value = false
})

const copySecret = (domainId: string) => {
  console.log(domainId)
}

const refreshSecret = (domainId: string) => {
  console.log(domainId)
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
    :globalFilterFields="['orgName', 'hostName']"
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

    <Column field="orgName" header="NAME" style="min-width: 10em">
      <template #body="{ data }">
        {{ data.orgName }}
      </template>
    </Column>

    <Column field="hostName" header="DOMAIN" style="min-width: 10em">
      <template #body="{ data }">
        {{ data.hostName }}
      </template>
    </Column>

    <Column field="lagoon" header="LAGOON" style="min-width: 10em">
      <template #body="{ data }">
        {{ data.orgName + ' lagoon' }}
      </template>
    </Column>

    <Column field="secret" header="SECRET" :showFilterMenu="false" style="min-width: 10em">
      <template #body="{ data }">
        <div class="flex gap-4">
          <Button
            icon="pi pi-clone"
            aria-label="copy"
            text
            severity="secondary"
            v-tooltip.top="'Copy secret'"
            @click="copySecret(data.domainId)"
          />
          <Button
            icon="pi pi-refresh"
            aria-label="refresh"
            rounded
            text
            severity="secondary"
            v-tooltip.top="'Refresh secret'"
            @click="refreshSecret(data.domainId)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style></style>
./services/organizationService
