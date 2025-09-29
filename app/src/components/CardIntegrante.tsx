import type { Integrante } from "../types/integrante";
import { useNavigate } from "react-router-dom";

type Props = { data: Integrante };

export default function CardIntegrante({ data }: Props) {
  const navigate = useNavigate();

  return (
    <li className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Avatar */}
      <img
        src={data.avatar}
        alt={`Foto de ${data.nome}`}
        loading="lazy"
        decoding="async"
        className="mb-4 h-24 w-24 rounded-full object-cover ring-4 ring-sky-100"
      />

      {/* Nome */}
      <h3 className="text-lg font-semibold text-slate-900">{data.nome}</h3>

      {/* RM / Turma */}
      <p className="mt-1 text-sm text-slate-500">
        RM {data.rm} • {data.turma}
      </p>

      {/* Botão */}
      <button
        onClick={() => navigate(`/integrantes/${data.rm}`)}
        className="mt-5 inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        Ver detalhes
      </button>
    </li>
  );
}