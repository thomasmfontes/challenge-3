import { useForm } from "react-hook-form";
import type { SubmitHandler } from 'react-hook-form';
import { useState } from "react";

type FormContato = {
  nome: string;
  email: string;
  assunto?: string;
  mensagem: string;
  website?: string;
};

export default function Contato() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormContato>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<FormContato> = async (data) => {
    // bloqueia envio se o honeypot tiver sido preenchido
    if (data.website) return;
    // simula envio
    await new Promise((r) => setTimeout(r, 500));
    setSent(true);
    reset({ nome: "", email: "", assunto: "", mensagem: "", website: "" });
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white">
      <section className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Contato</h1>
          <p className="mt-1 text-slate-600">Fale com a equipe do projeto.</p>
        </header>

        {sent && isSubmitSuccessful && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900"
          >
            ✅ Mensagem enviada com sucesso!
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid max-w-xl gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {/* Honeypot (oculto para humanos) */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
            className="hidden"
          />

          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-slate-800">
              Nome <span className="text-rose-600">*</span>
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome completo"
              aria-invalid={!!errors.nome || undefined}
              {...register("nome", {
                required: "Informe seu nome.",
                minLength: { value: 3, message: "Mínimo de 3 caracteres." },
              })}
              className={`mt-1 w-full rounded-lg border p-2.5 outline-none transition
                ${
                  errors.nome
                    ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                }`}
            />
            {errors.nome && (
              <p className="mt-1 text-sm text-rose-600">{errors.nome.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-800">
              E-mail <span className="text-rose-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="voce@exemplo.com"
              aria-invalid={!!errors.email || undefined}
              {...register("email", {
                required: "Informe seu e-mail.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "E-mail inválido.",
                },
              })}
              className={`mt-1 w-full rounded-lg border p-2.5 outline-none transition
                ${
                  errors.email
                    ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>
            )}
          </div>

          {/* Assunto (opcional) */}
          <div>
            <label htmlFor="assunto" className="block text-sm font-medium text-slate-800">
              Assunto
            </label>
            <input
              id="assunto"
              type="text"
              placeholder="Assunto da mensagem"
              {...register("assunto")}
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />
          </div>

          {/* Mensagem */}
          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-slate-800">
              Mensagem <span className="text-rose-600">*</span>
            </label>
            <textarea
              id="mensagem"
              placeholder="Como podemos ajudar?"
              rows={5}
              aria-invalid={!!errors.mensagem || undefined}
              {...register("mensagem", {
                required: "Descreva sua mensagem.",
                minLength: { value: 10, message: "Mínimo de 10 caracteres." },
              })}
              className={`mt-1 w-full rounded-lg border p-2.5 outline-none transition
                ${
                  errors.mensagem
                    ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                }`}
            />
            {errors.mensagem && (
              <p className="mt-1 text-sm text-rose-600">{errors.mensagem.message}</p>
            )}
          </div>

          {/* Ações */}
          <div className="mt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-2.5 font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Limpar
            </button>
          </div>

          <p className="text-xs text-slate-500">
            <span className="text-rose-600">*</span> campos obrigatórios.
          </p>
        </form>
      </section>
    </main>
  );
}