import { useMemo } from "react";

export type TableOfContent = {
  key: string;
  href: string;
  title: string;
  level: number;
};

interface UseTOCProps {
  content: string;
}

export const useTOC = ({ content }: UseTOCProps) => {
  const tableOfContents: TableOfContent[] = useMemo(() => {
    if (!content || content.length === 0) {
      return [];
    }

    const headingRegex = /<(h[1-6])[^>]*>(.*?)<\/h[1-6]>/g;

    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1].charAt(1));
      const text = match[2].replace(/<[^>]*>/g, ""); // Remove any HTML tags from heading text
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      headings.push({
        key: id,
        href: `#${id}`,
        title: text,
        level: level,
      });
    }

    return headings;
  }, [content]);

  // Update content with IDs for anchor links
  const contentWithIds = useMemo(() => {
    if (!content || content.length === 0) {
      return "";
    }

    const result = content.replace(
      /<(h[1-6])([^>]*)>(.*?)<\/h[1-6]>/g,
      (match, tag, attrs, text) => {
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
      }
    );

    return result;
  }, [content]);

  return {
    tableOfContents,
    contentWithIds,
  };
};
