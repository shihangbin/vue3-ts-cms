import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'

function usePageConfig() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  const handleQueryClick = (queryInfo: any) => {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  const handleResetClick = () => {
    contentRef.value?.fetchPageListData()
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}
export default usePageConfig
