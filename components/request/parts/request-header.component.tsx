"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { RequestHeaderProps } from "@/types/types"
import { Plus, Trash } from "lucide-react"


interface RequestHeadersProps {
  headers: RequestHeaderProps[]
  setHeaders: (headers: RequestHeaderProps[]) => void
}

// Lista de headers comuns para sugestões
const COMMON_HEADERS = [
  "Content-Type",
  "Authorization",
  "Accept",
  "User-Agent",
  "Cache-Control",
  "Cookie",
  "X-Requested-With",
  "Referer",
]

export function RequestHeaders({ headers, setHeaders }: RequestHeadersProps) {
  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "", enabled: true }])
  }

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index))
  }

  const updateHeader = (index: number, field: keyof RequestHeaderProps, value: string | boolean) => {
    const newHeaders = [...headers]
    newHeaders[index] = { ...newHeaders[index], [field]: value }
    setHeaders(newHeaders)
  }

  return (
    <div className="space-y-3">
      {headers.map((header, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="checkbox"
            disabled={header.fixed} // não permitir alterar os obrigatórios
            checked={header.enabled}
            onChange={(e) => updateHeader(index, "enabled", e.target.checked)}
            className="h-4 w-4 rounded border-border bg-input accent-primary"
          />

          {/* Input de header com suggestions */}
          <input
            list={`header-suggestions-${index}`}
            value={header.key}
            onChange={(e) => updateHeader(index, "key", e.target.value)}
            placeholder="Header name"
            disabled={header.fixed} // não permitir alterar os obrigatórios
            className="flex-1 bg-input font-mono text-sm border border-border rounded px-2 py-1"
          />
          <datalist id={`header-suggestions-${index}`}>
            {COMMON_HEADERS.map((h) => (
              <option key={h} value={h} />
            ))}
          </datalist>

          <Input
            type="text"
            value={header.value}
            onChange={(e) => updateHeader(index, "value", e.target.value)}
            placeholder="Value"
            className="flex-1 bg-input font-mono text-sm"
            disabled={header.fixed} // não permitir alterar os obrigatórios
          />
          {!header.fixed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeHeader(index)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          )}

        </div>
      ))}

      <Button variant="outline" size="sm" onClick={addHeader} className="w-full border-dashed bg-transparent">
        <Plus className="mr-2 h-4 w-4" />
        Add Header
      </Button>
    </div>
  )
}
