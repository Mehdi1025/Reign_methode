import { readFileSync } from "fs";
import { join } from "path";

export type FramerScript = {
  src?: string;
  type?: string;
  content?: string;
  id?: string;
  async?: boolean;
  fetchPriority?: string;
  dataFramerBundle?: string;
  dataFramerAppearAnimation?: string;
};

export type FramerPageData = {
  headHtml: string;
  bodyHtml: string;
  scripts: FramerScript[];
};

function parseScriptAttributes(attrs: string): FramerScript {
  const script: FramerScript = {};

  const srcMatch = attrs.match(/\ssrc=["']([^"']+)["']/i);
  const typeMatch = attrs.match(/\stype=["']([^"']+)["']/i);
  const idMatch = attrs.match(/\sid=["']([^"']+)["']/i);
  const fetchPriorityMatch = attrs.match(/\sfetchpriority=["']([^"']+)["']/i);
  const dataFramerBundleMatch = attrs.match(
    /\sdata-framer-bundle=["']([^"']+)["']/i,
  );

  if (srcMatch) script.src = srcMatch[1];
  if (typeMatch) script.type = typeMatch[1];
  if (idMatch) script.id = idMatch[1];
  if (fetchPriorityMatch) script.fetchPriority = fetchPriorityMatch[1];
  if (dataFramerBundleMatch) script.dataFramerBundle = dataFramerBundleMatch[1];
  if (/\sasync(?:\s|>|=)/i.test(attrs)) script.async = true;
  if (/\sdata-framer-appear-animation=/i.test(attrs)) {
    script.dataFramerAppearAnimation = "no-preference";
  }

  return script;
}

export function loadFramerHtml(): FramerPageData {
  const htmlPath = join(process.cwd(), "public", "index.html");
  const html = readFileSync(htmlPath, "utf-8");

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  let bodyHtml = bodyMatch?.[1] ?? "";
  const scripts: FramerScript[] = [];

  bodyHtml = bodyHtml.replace(
    /<script([^>]*)>([\s\S]*?)<\/script>/gi,
    (_match, attrs, content) => {
      const script = parseScriptAttributes(attrs);
      const trimmedContent = content.trim();
      if (trimmedContent) script.content = trimmedContent;
      scripts.push(script);
      return "";
    },
  );

  return {
    headHtml: headMatch?.[1]?.trim() ?? "",
    bodyHtml: bodyHtml.trim(),
    scripts,
  };
}
