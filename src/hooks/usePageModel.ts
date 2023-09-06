import { ref } from 'vue'
import type PageModel from '@/components/page-model/page-model.vue'

type EditFnType = (data: any) => void
function usePageModel(editCallback?: EditFnType) {
  const modelRef = ref<InstanceType<typeof PageModel>>()
  const handleNewClick = () => {
    modelRef.value?.setModelVisible()
  }
  const handleEditClick = (itemData: any) => {
    modelRef.value?.setModelVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }

  return {
    modelRef,
    handleNewClick,
    handleEditClick
  }
}
export default usePageModel
