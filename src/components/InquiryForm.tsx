import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

type Field = { name: string; label: string; required?: boolean; type?: string; textarea?: boolean; span?: boolean };

const technical: Field[] = [
  { name: "manufacturer", label: "Производитель", required: true },
  { name: "equipment", label: "Оборудование", required: true },
  { name: "model", label: "Модель" },
  { name: "oem", label: "OEM / Part Number" },
  { name: "serial", label: "Serial Number" },
  { name: "need", label: "Что необходимо?", required: true, textarea: true, span: true },
];
const contact: Field[] = [
  { name: "name", label: "Имя", required: true },
  { name: "company", label: "Компания", required: true },
  { name: "email", label: "E-mail", required: true, type: "email" },
  { name: "phone", label: "Телефон", type: "tel" },
];

export function InquiryForm({ defaults = {} }: { defaults?: Record<string, string | undefined> }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    for (const f of [...technical, ...contact]) {
      const v = String(fd.get(f.name) ?? "").trim();
      if (f.required && !v) errs[f.name] = "Обязательное поле";
      else if (f.type === "email" && v && !/^\S+@\S+\.\S+$/.test(v)) errs[f.name] = "Укажите корректный e-mail";
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    // TODO: connect to backend / email delivery
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border-t border-navy/15 py-16" role="status">
        <p className="label text-signal">Запрос сформирован</p>
        <h2 className="mt-6 text-4xl md:text-5xl">Спасибо. Мы рассмотрим ваш технический запрос.</h2>
      </div>
    );
  }

  const render = (f: Field) => (
    <div key={f.name} className={cn("group relative border-b border-navy/15 pt-6", f.span && "md:col-span-2")}>
      <label htmlFor={`f-${f.name}`} className="label flex justify-between text-muted-foreground">
        <span>{f.label}{f.required && <span className="text-signal"> *</span>}</span>
        {errors[f.name] && <span id={`e-${f.name}`} className="normal-case tracking-normal text-destructive">{errors[f.name]}</span>}
      </label>
      {f.textarea ? (
        <textarea
          id={`f-${f.name}`} name={f.name} rows={4} defaultValue={defaults[f.name]}
          aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `e-${f.name}` : undefined}
          className="mt-2 w-full resize-y bg-transparent pb-3 text-lg outline-none focus-visible:outline-none"
        />
      ) : (
        <input
          id={`f-${f.name}`} name={f.name} type={f.type ?? "text"} defaultValue={defaults[f.name]}
          aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `e-${f.name}` : undefined}
          className="mt-2 h-11 w-full bg-transparent text-lg outline-none focus-visible:outline-none"
        />
      )}
      <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-signal transition-transform duration-500 group-focus-within:scale-x-100" />
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-16">
      <fieldset>
        <legend className="label mb-2 text-muted-foreground"><span className="text-signal">A</span> — Оборудование</legend>
        <div className="grid gap-x-10 md:grid-cols-2">{technical.map(render)}</div>
      </fieldset>
      <fieldset>
        <legend className="label mb-6 text-muted-foreground"><span className="text-signal">B</span> — Документация</legend>
        <label className="flex min-h-32 cursor-pointer flex-col justify-center border border-dashed border-navy/30 p-6 transition-colors hover:border-signal focus-within:border-signal">
          <span className="font-display text-xl">Фото / чертёж / документ</span>
          <span className="mt-2 text-sm text-muted-foreground">
            {files.length ? files.join(", ") : "Нажмите, чтобы прикрепить файлы — JPG, PNG, PDF, DWG"}
          </span>
          <input
            type="file" multiple name="files" className="sr-only"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend className="label mb-2 text-muted-foreground"><span className="text-signal">C</span> — Контакты</legend>
        <div className="grid gap-x-10 md:grid-cols-2">{contact.map(render)}</div>
      </fieldset>
      <button type="submit" className="label inline-flex min-h-14 items-center gap-3 bg-signal px-8 text-ink transition-colors hover:bg-navy">
        Отправить запрос ↗
      </button>
    </form>
  );
}
