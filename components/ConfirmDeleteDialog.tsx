'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import {  Trash2 } from 'lucide-react'

interface Props {
  onConfirm: () => void
}

export default function ConfirmDeleteDialog({ onConfirm }: Props) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="inline-flex items-center text-red-600 hover:underline cursor-pointer">
           <Trash2 className="w-4 h-4 mr-1" />
           Delete
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg w-[90%] max-w-md shadow-lg space-y-4">
          <AlertDialog.Title className="text-lg font-bold">Are you sure?</AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-gray-600 dark:text-gray-300">
            This will permanently delete the employee. This action cannot be undone.
          </AlertDialog.Description>
          <div className="flex justify-end gap-3 pt-4">
            <AlertDialog.Cancel className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 cursor-pointer">
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              onClick={onConfirm}
            >
              Confirm
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
