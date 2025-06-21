export default function EmployeeSkeleton() {
  return (
    <div className="p-4 border rounded-md shadow animate-pulse space-y-2 bg-white dark:bg-gray-800">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
  )
}
