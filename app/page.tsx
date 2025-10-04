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
    if (!url) {
      setError("Please enter a URL")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Serializar params ativos
      const activeParams = params?.filter(p => p.enabled && p.key)
      const queryString =
        activeParams && activeParams.length > 0
          ? '?' + activeParams.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&')
          : ''
      const targetUrl = url + queryString

      // Preparar payload para o Worker
      const workerPayload = {
        url: targetUrl,
        method,
        headers: headers.filter(h => h.enabled && h.key && h.value)
          .reduce((acc, h) => ({ ...acc, [h.key]: h.value }), {}),
        body: method !== "GET" && method !== "HEAD" ? body : undefined,
      }

      const res = await fetch('https://requestapi.chrismoreiraa02.workers.dev/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workerPayload),
      })

      const data: ResponseProps = await res.json()

      setResponse(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Request failed")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Request Panel */}
          <RequestComponent
            loading={loading}
            onSubmit={handleSendRequest}
          />

          {/* Response Panel */}
          <div className="space-y-4">
            <ResponseComponent response={response} error={error} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}
