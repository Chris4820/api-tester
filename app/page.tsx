"use client"

import { useState } from "react"
import { ResponseComponent } from "@/components/response/response.component"
import RequestComponent from "@/components/request/request.component"
import type { RequestProps, ResponseProps } from "@/types/types"

export default function Home() {
  const [response, setResponse] = useState<ResponseProps | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSendRequest({ body, headers, method, url, params }: RequestProps) {

    setLoading(true)
    setError(null)

    try {
      const activeParams = params?.filter(p => p.enabled && p.key)
      const queryString =
        activeParams && activeParams.length > 0
          ? '?' + activeParams.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&')
          : ''
      const targetUrl = url + queryString

      const workerPayload = {
        url: targetUrl,
        method,
        headers: headers.filter(h => h.enabled && h.key && h.value)
          .reduce((acc, h) => ({ ...acc, [h.key]: h.value }), {}),
        body: method !== "GET" && method !== "HEAD" ? body : undefined,
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_WORKER_API}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workerPayload),
      })

      const data: ResponseProps = await res.json()
      setResponse(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Request failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background min-h-screen w-full overflow-hidden">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="grid gap-6 lg:grid-cols-2 max-w-full">
          {/* Painel de Request */}
          <div className="w-full max-w-full overflow-hidden">
            <RequestComponent loading={loading} onSubmit={handleSendRequest} />
          </div>

          {/* Painel de Response */}
          <div className="w-full max-w-full overflow-hidden">
            <ResponseComponent response={response} error={error} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}

