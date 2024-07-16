<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Fieldset from 'primevue/fieldset'
import Avatar from 'primevue/avatar'

import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()

const requestId = route.params.id

const messages = ref([
  {
    id: 1,
    author: 'Miro Benício',
    photo: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
  },
  {
    id: 2,
    author: 'Ricardo Gonçalves',
    photo: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
  },
  {
    id: 3,
    author: 'Mike Audi',
    photo: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
  }
])

const newMessage = ref<string>()

const sendNewMessage = () => {
  messages.value.push({
    id: messages.value.length + 1,
    author: 'Miro Benício',
    photo: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    content: newMessage.value!
  })
  newMessage.value = ''
}
</script>

<template>
  <div class="ml-[12rem] flex justify-start items-between h-screen flex-col gap-4 py-10 px-16">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl uppercase text-dark-blue font-bold">Request #{{ requestId }}</h1>
      <router-link :to="`/messages/requests`">
        <Button icon="pi pi-times" severity="contrast" aria-label="Close" outlined rounded />
      </router-link>
    </div>
    <div
      class="flex flex-col border border-solid border-black/20 rounded-md p-4 max-w-50 overflow-y-auto gap-4"
    >
      <Fieldset
        class="w-1/2"
        v-for="message in messages"
        pt:root:style="border: 1px solid #00000033;"
      >
        <template #legend>
          <div class="flex items-center pl-2">
            <Avatar :image="message.photo" shape="circle" />
            <span class="font-bold p-2">{{ message.author }}</span>
          </div>
        </template>
        <p class="m-0 text-sm">
          {{ message.content }}
        </p>
      </Fieldset>
    </div>
    <div class="flex justify-between items-center">
      <InputText
        type="text"
        class="w-11/12"
        size="small"
        placeholder="Send a new message..."
        v-model="newMessage"
      />
      <Button
        icon="pi pi-send"
        severity="success"
        aria-label="Send"
        rounded
        @click="sendNewMessage"
      />
    </div>
  </div>
</template>
