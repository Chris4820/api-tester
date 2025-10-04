
interface ResponseBody {
  data: string | Record<string, unknown> | null
}

export default function ResponseBodyTab({ data }: ResponseBody) {
  return (
    <div className="rounded-lg border border-border bg-input p-4">
      <pre className="overflow-x-auto font-mono text-xs text-foreground">
        {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}