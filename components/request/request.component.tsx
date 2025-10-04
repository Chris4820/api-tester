import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RequestHeaders } from "./parts/request-header.component";
import { RequestBody } from "./parts/request-body.component";
import { RequestParams } from "./parts/request-params.component";
import type { HttpMethod } from "@/types/types";
import type { RequestHeaderProps, RequestParamProps, RequestProps } from "@/app/page";
import { useState } from "react";


const DEFAULT_HEADERS: RequestHeaderProps[] = [
  { key: "Content-Type", value: "application/json", enabled: true, fixed: true },
  { key: "Accept", value: "*/*", enabled: true, fixed: true }
]

interface RequestComponentProps {
  onSubmit: (data: RequestProps) => void,
  loading: boolean,
}
export default function RequestComponent({ loading, onSubmit }: RequestComponentProps) {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1")
  const [method, setMethod] = useState<HttpMethod>("GET")
  const [headers, setHeaders] = useState<RequestHeaderProps[]>(DEFAULT_HEADERS)
  const [body, setBody] = useState("{\n  \n}")
  const [params, setParams] = useState<RequestParamProps[]>([])

  async function onSubmitRequest() {
    onSubmit({
      url: url,
      body: body,
      headers: headers,
      method: method,
      params: params
    })
  }

  return (
    <div className="space-y-4">
      <Card className="border-border bg-card p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Request</h2>

        {/* URL and Method */}
        <div className="mb-4 flex gap-2">
          <Select value={method} onValueChange={(v) => setMethod(v as HttpMethod)}>
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

          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/endpoint"
            className="flex-1 bg-input font-mono text-sm"
          />

          <Button
            onClick={onSubmitRequest}
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

        {/* Tabs for Headers and Body */}
        <Tabs defaultValue="headers" className="w-full">
          <TabsList className="w-full bg-secondary">
            <TabsTrigger value="headers" className="flex-1">
              Headers
            </TabsTrigger>
            <TabsTrigger value="query-parameters" className="flex-1">
              Query parameters
            </TabsTrigger>
            <TabsTrigger value="body" className="flex-1">
              Body
            </TabsTrigger>

          </TabsList>

          <TabsContent value="headers" className="mt-4">
            <RequestHeaders headers={headers} setHeaders={setHeaders} />
          </TabsContent>

          <TabsContent value="body" className="mt-4">
            <RequestBody body={body} setBody={setBody} />
          </TabsContent>
          <TabsContent value="query-parameters" className="mt-4">
            <RequestParams params={params} setParams={setParams} />
          </TabsContent>

        </Tabs>
      </Card>
    </div>
  )
}