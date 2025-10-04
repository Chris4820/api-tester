

export type ResponseBodyProps = {
  data: any;
}

export type ResponseHeaderProps = {
  header: Record<string, string>
}

export interface RequestProps {
  url: string
  method: HttpMethod
  headers: RequestHeaderProps[]
  params: RequestParamProps[]
  body: any
}

export type ResponseProps = {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  time: number
  size: number
  finalUrl: string
};

export interface RequestHeaderProps {
  key: string
  value: string
  enabled: boolean
  fixed?: boolean
}

export interface RequestParamProps {
  key: string
  value: string
  enabled: boolean
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"