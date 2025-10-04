"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react"
import ResponseBodyTab from "./parts/response-body"
import ResponseHeaderTab from "./parts/response-header"
import { getStatusColor } from "@/lib/utils"
import type { ResponseProps } from "@/types/types"
interface ResponseViewerProps {
  response: ResponseProps | null
  error: string | null
  loading: boolean
}

export function ResponseComponent({ response, error, loading }: ResponseViewerProps) {
  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) return <CheckCircle2 className="h-5 w-5 text-green-500" />
    if (status >= 300 && status < 400) return <AlertCircle className="h-5 w-5 text-yellow-500" />
    return <XCircle className="h-5 w-5 text-red-500" />
  }

  return (
    <Card className="border-border bg-card p-4">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Response</h2>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Sending request...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex items-center gap-2 text-destructive">
            <XCircle className="h-5 w-5" />
            <span className="font-semibold">Error</span>
          </div>
          <p className="mt-2 text-sm text-destructive">{error}</p>
        </div>
      )}

      {response && !loading && (
        <div className="space-y-4">
          {/* Status Bar */}
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-secondary p-3">
            <div className="flex items-center gap-4 flex-wrap">
              <div className={`flex items-center gap-2 ${getStatusColor(response.status)}`}>
                {getStatusIcon(response.status)}
                <span className="font-mono text-sm font-semibold">
                  {response.status} {response.statusText}
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="font-mono text-sm">{response.time} ms</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-mono text-sm">
                  Size: {response.size} bytes
                </span>
              </div>

              {response.finalUrl && (
                <p className="font-mono text-xs text-muted-foreground truncate">{response.finalUrl}</p>
              )}
            </div>
          </div>

          {/* Response Tabs */}
          <Tabs defaultValue="body" className="w-full">
            <TabsList className="w-full bg-secondary">
              <TabsTrigger value="body" className="flex-1">
                Body
              </TabsTrigger>
              <TabsTrigger value="headers" className="flex-1">
                Headers ({Object.keys(response.headers).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="body" className="mt-4">
              <div className="overflow-x-hidden">
                <ResponseBodyTab data={response.data} />
              </div>
            </TabsContent>

            <TabsContent value="headers" className="mt-4">
              <ResponseHeaderTab headers={response.headers} />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {!response && !error && !loading && (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-muted-foreground">Send a request to see the response</p>
        </div>
      )}
    </Card>
  )
}
