import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Verificação básica para saber se é um webhook do Prismic
        // Opcional: Adicionar verificação de secret (PRISMIC_WEBHOOK_SECRET)
        if (body.type === "api-update" || body.type === "test-trigger") {
            console.log("Recebido Webhook do Prismic. Revalidando tag 'prismic'...");

            // Revalida todas as requisições que possuem a tag 'prismic' definida no prismicio.ts
            // @ts-ignore - Next.js 15+ sometimes requires a profile or is experiencing type mismatches in experimental versions
            revalidateTag("prismic", "default");

            return NextResponse.json({ revalidated: true, now: Date.now() });
        }

        return NextResponse.json({ revalidated: false, message: "Tipo de evento não suportado" });
    } catch (err) {
        console.error("Erro ao revalidar:", err);
        return NextResponse.json({ message: "Erro na revalidação", error: err }, { status: 500 });
    }
}
