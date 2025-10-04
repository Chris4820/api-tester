import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"

interface ResponseHeader {
  headers: Record<string, string>
}

export default function ResponseHeaderTab({ headers }: ResponseHeader) {
  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <TableRow>
            <TableHead className="w-1/3 font-semibold text-gray-700 py-3">Name</TableHead>
            <TableHead className="font-semibold text-gray-700 py-3 text-left">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(headers).map(([name, value]) => (
            <TableRow key={name} className="hover:bg-gray-50 transition-colors duration-150">
              <TableCell className="font-medium text-gray-900 py-2">
                {name
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join('-')}
              </TableCell>
              <TableCell className="text-gray-700 py-2 break-all">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}