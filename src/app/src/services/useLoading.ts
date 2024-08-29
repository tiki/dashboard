import { ref } from 'vue'

export const useLoading = () => {
  const isLoading = ref(false)

  const withLoading = async (fn: Function) => {
    try {
      isLoading.value = true
      await fn()
    } catch (err) {
      // Handle error
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, withLoading }
}
