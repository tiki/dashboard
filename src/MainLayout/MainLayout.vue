<script setup lang="ts">
import Drawer from 'primevue/drawer'
import Avatar from 'primevue/avatar'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const currentRoute = useRoute()
const shouldShowSidebar = computed(() => currentRoute.meta.sidebar !== false)

const navigationList = [
  {
    header: 'account',
    children: [
      {
        name: 'organization',
        icon: 'pi pi-user mr-2',
        route: 'account/organization'
      },
      {
        name: 'team',
        icon: 'pi pi-users mr-2',
        route: 'account/team'
      },
      {
        name: 'billing',
        icon: 'pi pi-receipt mr-2',
        route: 'account/billing'
      }
    ]
  },
  {
    header: 'data publishing',
    children: []
  },
  {
    header: 'messages',
    children: [
      {
        name: 'my requests',
        icon: 'pi pi-list mr-2',
        route: 'messages/requests'
      },
      {
        name: 'new request',
        icon: 'pi pi-plus mr-2',
        route: 'messages/new-request'
      }
    ]
  }
]
</script>

<template>
  <Drawer
    :visible="true"
    header="Drawer"
    v-if="shouldShowSidebar"
    :modal="false"
    :showCloseIcon="false"
    :baseZIndex="0"
    :autoZIndex="false"
    pt:root:style="box-shadow: none;"
    pt:mask:style="width: auto;"
  >
    <template #container="{ closeCallback }">
      <div class="flex flex-col h-full">
        <div class="flex items-center px-6 pt-4 shrink-0 w-full">
          <span class="flex items-center gap-2 w-full justify-center">
            <img src="../assets/images/tiki-logo-2.svg" alt="" class="w-1/12" />
            <span class="font-semibold text-2xl text-primary">TIKI</span>
          </span>
        </div>

        <div class="overflow-y-auto">
          <ul class="list-none p-4 m-0" v-for="section in navigationList">
            <li class="py-2">
              <span class="font-bold uppercase">{{ section.header }}</span>
              <ul class="list-none p-0 m-0 overflow-hidden" v-for="route in section.children">
                <li>
                  <router-link :to="`/${route.route}`">
                    <a
                      class="flex items-center cursor-pointer p-2 rounded hover:bg-tiki-green/10"
                      :class="
                        currentRoute.name == route.name ? 'bg-tiki-green/10 text-tiki-green' : ''
                      "
                    >
                      <i :class="route.icon"></i>
                      <span class="font-medium capitalize">{{ route.name }}</span>
                    </a>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="mt-auto">
          <hr class="mb-4 mx-4 border-t border border-tiki-green/20" />
          <a class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded">
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              shape="circle"
            />
            <span class="font-bold">Miro Benício</span>
          </a>
        </div>
      </div>
    </template>
  </Drawer>
</template>

<style>
.p-drawer-mask .p-drawer-open .p-drawer-left {
  width: auto !important;
}
</style>
