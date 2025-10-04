"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash } from "lucide-react"

interface Param {
  key: string
  value: string
  enabled: boolean
}

interface RequestParamsProps {
  params: Param[]
  setParams: (params: Param[]) => void
}

// Lista de parâmetros comuns (opcional, pode expandir depois)
const COMMON_PARAMS = ["id", "page", "limit", "sort", "filter"]

export function RequestParams({ params, setParams }: RequestParamsProps) {
  const addParam = () => {
    setParams([...params, { key: "", value: "", enabled: true }])
  }

  const removeParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index))
  }
  async function clearParams() {
    setParams([])
  }

  const updateParam = (index: number, field: keyof Param, value: string | boolean) => {
    const newParams = [...params]
    newParams[index] = { ...newParams[index], [field]: value }
    setParams(newParams)
  }

  return (
    <div className="space-y-3">
      {params.map((param, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={param.enabled}
            onChange={(e) => updateParam(index, "enabled", e.target.checked)}
            className="h-4 w-4 rounded border-border bg-input accent-primary"
          />

          {/* Input de parâmetro com suggestions */}
          <input
            list={`param-suggestions-${index}`}
            value={param.key}
            onChange={(e) => updateParam(index, "key", e.target.value)}
            placeholder="Param name"
            className="flex-1 bg-input font-mono text-sm border border-border rounded px-2 py-1"
          />
          <datalist id={`param-suggestions-${index}`}>
            {COMMON_PARAMS.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>

          <Input
            type="text"
            value={param.value}
            onChange={(e) => updateParam(index, "value", e.target.value)}
            placeholder="Value"
            className="flex-1 bg-input font-mono text-sm"
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeParam(index)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}

      <div className="flex gap-5">
        <Button
          variant="outline"
          onClick={addParam}
          className="flex-1 border-dashed flex items-center justify-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Param
        </Button>
        <Button
          disabled={params.length < 1}
          variant="destructive"
          onClick={clearParams}
          className="flex-1 border-dashed flex items-center justify-center"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete All
        </Button>
      </div>

    </div>
  )
}
