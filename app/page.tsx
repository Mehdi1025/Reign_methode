import Script from "next/script";
import { loadFramerHtml, type FramerScript } from "@/lib/framer";

function FramerScriptTag({ script, index }: { script: FramerScript; index: number }) {
  const id = script.id ?? `framer-script-${index}`;
  const strategy = index === 0 ? "beforeInteractive" : "afterInteractive";

  if (script.src) {
    return (
      <Script
        id={id}
        src={script.src}
        type={script.type}
        strategy={strategy}
        {...(script.async ? { async: true } : {})}
        {...(script.fetchPriority
          ? { fetchPriority: script.fetchPriority as "high" | "low" | "auto" }
          : {})}
        {...(script.dataFramerBundle
          ? { "data-framer-bundle": script.dataFramerBundle }
          : {})}
      />
    );
  }

  if (!script.content) {
    return (
      <Script
        id={id}
        strategy={strategy}
        {...(script.dataFramerAppearAnimation
          ? { "data-framer-appear-animation": script.dataFramerAppearAnimation }
          : {})}
      />
    );
  }

  return (
    <Script
      id={id}
      strategy={strategy}
      dangerouslySetInnerHTML={{ __html: script.content }}
      {...(script.dataFramerAppearAnimation
        ? { "data-framer-appear-animation": script.dataFramerAppearAnimation }
        : {})}
    />
  );
}

export default function Home() {
  const { bodyHtml, scripts } = loadFramerHtml();

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      {scripts.map((script, index) => (
        <FramerScriptTag key={`${script.src ?? script.id ?? index}`} script={script} index={index} />
      ))}
    </>
  );
}
