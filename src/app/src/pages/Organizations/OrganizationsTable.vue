<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { FilterMatchMode } from '@primevue/core/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import ConfirmPopup from 'primevue/confirmpopup'

const toast = useToast()

const confirm = useConfirm()

import { OrganizationService, type Organization, type Domain, DomainService } from './services'

const data = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const loading = ref<boolean>()

const emit = defineEmits(['copied', 'refreshed'])

const requestTable = async () => {
  loading.value = true
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
  orgs.forEach((org) => {
    const orgHasDomain = mergedArray.some((entry) => entry.orgId === org.orgId)

    if (!orgHasDomain) {
      mergedArray.push({
        hostName: '', // No domain associated
        domainId: '', // No domain associated
        orgId: org.orgId,
        orgName: org.name
      })
    }
  })

  data.value = mergedArray
  loading.value = false
}

onMounted(async () => {
  await requestTable()
})

const copySecret = async (domainId: string) => {
  const { secret } = await DomainService.getSecret(domainId)
  navigator.clipboard.writeText(secret!)
  emit('copied')
}

const refreshSecret = async (domainId: string) => {
  const { secret } = await DomainService.refreshSecret(domainId)
  navigator.clipboard.writeText(secret!)
  emit('refreshed')
}

const deleteOrgDomain = (event: Event, type: 'domain' | 'org', id: string) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: 'Do you want to delete this record?',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: async () => {
      type === 'domain' ? await DomainService.delete(id) : await OrganizationService.delete(id)
      toast.add({
        severity: 'success',
        summary: 'Confirmed',
        detail: 'Record deleted',
        life: 3000,
        group: 'bc'
      })

      await requestTable()
    }
  })
}
</script>

<template>
  <Toast position="bottom-center" group="bc" />
  <ConfirmPopup></ConfirmPopup>
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

    <Column field="orgName" header="NAME" style="min-width: 10em" class="flex items-center gap-2">
      <template #body="{ data }">
        {{ data.orgName }}
        <Button
          icon="pi pi-trash"
          aria-label="delete organization"
          text
          severity="danger"
          @click="deleteOrgDomain($event, 'org', data.orgId)"
        />
      </template>
    </Column>

    <Column field="hostName" header="DOMAIN" style="min-width: 10em">
      <template #body="{ data }">
        {{ data.hostName }}
        <Button
          icon="pi pi-trash"
          aria-label="delete domain"
          text
          severity="danger"
          v-if="data.domainId"
          @click="deleteOrgDomain($event, 'domain', data.domainId)"
        />
        <Button
          icon="pi pi-plus"
          aria-label="create domain"
          text
          severity="secondary"
          v-tooltip.top="'Create domain'"
          v-else
          @click=""
        />
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
