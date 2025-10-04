"use client"

import { Send } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { RequestHeaders } from "./parts/request-header.component"
import { RequestBody } from "./parts/request-body.component"
import { RequestParams } from "./parts/request-params.component"
import type { HttpMethod, RequestProps } from "@/types/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { requestSchema, type RequestFormData } from "@/schema/request.schema"

const DEFAULT_HEADERS = [
  { key: "Content-Type", value: "application/json", enabled: true, fixed: true },
  { key: "Accept", value: "*/*", enabled: true, fixed: true }
]

interface RequestComponentProps {
  onSubmit: (data: RequestProps) => void
  loading: boolean
}

export default function RequestComponent({ loading, onSubmit }: RequestComponentProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      url: "https://jsonplaceholder.typicode.com/posts/1",
      method: "GET",
      headers: DEFAULT_HEADERS,
      body: "{\n  \n}",
      params: [],
    },
  })

  const method = watch("method")
  const headers = watch("headers")
  const body = watch("body")
  const params = watch("params")

  function onSubmitRequest(data: RequestFormData) {
    // O data já vem validado pelo zod
    console.log(data);
    onSubmit(data)
  }

  return (
    <div className="space-y-4">
      <Card className="border-border bg-card p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Request</h2>

        <form onSubmit={handleSubmit(onSubmitRequest)} className="space-y-4">
          {/* URL e Method */}
          <div className="mb-4 flex gap-2">
            <Select
              value={method}
              onValueChange={(value) => setValue("method", value as HttpMethod)}
            >
              <SelectTrigger className="w-32 bg-secondary text-secondary-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
                <SelectItem value="PATCH">PATCH</SelectItem>
                <SelectItem value="HEAD">HEAD</SelectItem>
                <SelectItem value="OPTIONS">OPTIONS</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1">
              <Input
                {...register("url")}
                placeholder="https://api.example.com/endpoint"
                className="bg-input font-mono text-sm"
              />
              {errors.url && (
                <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Sending
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send
                </span>
              )}
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="headers" className="w-full">
            <TabsList className="w-full bg-secondary">
              <TabsTrigger value="headers" className="flex-1">Headers</TabsTrigger>
              <TabsTrigger value="query-parameters" className="flex-1">Query parameters</TabsTrigger>
              <TabsTrigger value="body" className="flex-1">Body</TabsTrigger>
            </TabsList>

            <TabsContent value="headers" className="mt-4">
              <RequestHeaders
                headers={headers}
                setHeaders={(val) => setValue("headers", val)}
              />
            </TabsContent>

            <TabsContent value="body" className="mt-4">
              <RequestBody
                body={body}
                setBody={(val) => setValue("body", val)}
              />
            </TabsContent>

            <TabsContent value="query-parameters" className="mt-4">
              <RequestParams
                params={params}
                setParams={(val) => setValue("params", val)}
              />
            </TabsContent>
          </Tabs>
        </form>
      </Card>
    </div>
  )
}
