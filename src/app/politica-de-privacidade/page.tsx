import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Política de Privacidade da ${SITE.name} — como tratamos seus dados conforme a LGPD.`,
  robots: { index: true, follow: true },
};

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-night">
      <header className="border-b border-white/8">
        <Container className="flex items-center justify-between py-5">
          <Link href="/" className="relative block h-7 w-[124px]">
            <Image
              src="/brand/logo.png"
              alt="Lone Mídia"
              fill
              sizes="124px"
              className="object-contain object-left"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </Link>
        </Container>
      </header>

      <Container className="py-16">
        <article className="prose-invert mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm text-ink-mute">
            Última atualização: junho de 2026
          </p>

          <div className="mt-10 space-y-8 text-ink-soft leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                1. Quem somos (Controlador)
              </h2>
              <p className="mt-2">
                {SITE.name} é a controladora dos dados coletados neste site.
                Contato: {SITE.email}.{" "}
                <span className="text-ink-mute">
                  {/* PLACEHOLDER — confirmar razão social, CNPJ e encarregado/DPO (ver docs/OPEN-QUESTIONS) */}
                  (Razão social, CNPJ e encarregado de dados a confirmar.)
                </span>
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                2. Dados que coletamos
              </h2>
              <p className="mt-2">
                No formulário de diagnóstico: nome, WhatsApp, e-mail, empresa,
                segmento, faixa de faturamento e o desafio que você descreve.
                Coletamos também dados de navegação e atribuição (cookies de
                marketing, como o Meta Pixel) mediante o seu consentimento.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                3. Para que usamos
              </h2>
              <p className="mt-2">
                Para entrar em contato sobre o seu diagnóstico, qualificar o
                atendimento e, com seu consentimento, medir e otimizar nossos
                anúncios. Não tomamos decisões automatizadas que afetem você sem
                revisão humana.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                4. Bases legais (LGPD)
              </h2>
              <p className="mt-2">
                O contato comercial se apoia na execução de procedimentos
                preliminares a contrato, a seu pedido (art. 7º, V). O uso de
                cookies de marketing (Meta Pixel) se apoia no seu{" "}
                <strong className="text-ink">consentimento</strong> (art. 7º,
                I), que você pode recusar ou revogar a qualquer momento.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                5. Compartilhamento
              </h2>
              <p className="mt-2">
                Não vendemos seus dados. Utilizamos operadores que tratam dados
                em nosso nome para viabilizar o atendimento e o marketing — por
                exemplo Google (planilhas/analytics), Meta/WhatsApp (contato e
                mensuração) e a infraestrutura de automação (n8n). Esses
                provedores podem processar dados fora do Brasil; adotamos
                garantias adequadas para essas transferências.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                6. Seus direitos
              </h2>
              <p className="mt-2">
                Você pode solicitar acesso, correção, exclusão, portabilidade e
                revogação do consentimento a qualquer momento, escrevendo para{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-brand underline underline-offset-2"
                >
                  {SITE.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                7. Retenção
              </h2>
              <p className="mt-2">
                Mantemos os dados pelo tempo necessário às finalidades acima.
                Leads não convertidos são expurgados periodicamente.{" "}
                <span className="text-ink-mute">
                  {/* PLACEHOLDER — confirmar prazo de retenção (sugerido 12–24 meses) */}
                  (Prazo de retenção a confirmar.)
                </span>
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                8. Cookies
              </h2>
              <p className="mt-2">
                Cookies estritamente necessários mantêm o site funcionando.
                Cookies de marketing só são ativados se você aceitar no banner de
                consentimento. Você pode mudar sua escolha limpando os dados do
                site no navegador.
              </p>
            </section>
          </div>

          <div className="mt-12 border-t border-white/8 pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-hi"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para a página inicial
            </Link>
          </div>
        </article>
      </Container>
    </div>
  );
}
