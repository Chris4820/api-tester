import { z } from "zod";

export const requestSchema = z.object({
  url: z
    .string()
    .url({ message: "URL inválida" })
    .refine(
      (val) => val.startsWith("http://") || val.startsWith("https://"),
      { message: "URL deve começar com http:// ou https://" }
    ),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"], {
    message: "Método HTTP inválido",
  }),
  headers: z
    .array(
      z.object({
        key: z.string().min(1, { message: "Chave do header é obrigatória" }),
        value: z.string().min(1, { message: "Valor do header é obrigatório" }),
        enabled: z.boolean(),
        fixed: z.boolean().optional(),
      })
    )
    .min(1, { message: "Pelo menos um header é necessário" }),
  body: z
    .string()
    .refine(
      (value) => {
        if (value.trim() === "") return true; // Permite vazio
        try {
          JSON.parse(value); // Valida JSON
          return true;
        } catch {
          return false;
        }
      },
      { message: "Corpo deve ser um JSON válido ou vazio" }
    ),
  params: z.array(
    z.object({
      key: z.string().min(1, { message: "Chave do parâmetro é obrigatória" }),
      value: z.string().min(1, { message: "Valor do parâmetro é obrigatório" }),
      enabled: z.boolean(),
    })
  ),
});

export type RequestFormData = z.infer<typeof requestSchema>;
