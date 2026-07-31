import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import * as tasksApi from '../api'

const EXTENSIONS = { csv: 'csv', json: 'json', xlsx: 'xlsx' }

// content-type comes back generic for json/xlsx since express just
// sets it once — filename is what actually tells the browser what it is
function triggerDownload(blob, format) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `tasks.${EXTENSIONS[format]}`
  link.click()
  URL.revokeObjectURL(url)
}

export function useExportTasks() {
  const mutation = useMutation({
    mutationFn: async ({ teamId, format, filters }) => {
      const { data } = await tasksApi.exportTasks(teamId, format, filters)
      return { blob: data, format }
    },
    onSuccess: ({ blob, format }) => {
      triggerDownload(blob, format)
      toast.success('Export ready')
    },
    onError: () => toast.error('Export failed'),
  })

  return {
    exportTasks: mutation.mutateAsync,
    exporting: mutation.isPending,
  }
}
