import { type TableOfContent } from "@/hooks/useTOC";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Typography, Anchor } from "antd";

const { Title } = Typography;

interface TOCProps {
  tableOfContents: TableOfContent[];
}

export const TOC = ({ tableOfContents }: TOCProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <UnorderedListOutlined className="text-gray-600" />
        <Title level={5} className="!mb-0 text-gray-800">
          Mục lục
        </Title>
      </div>

      <Anchor
        affix={false}
        items={tableOfContents.map((item) => ({
          key: item.key,
          href: item.href,
          title: item.title,
          className: `toc-level-${item.level}`,
        }))}
        className="toc-anchor"
      />

      <style jsx>{`
        :global(.toc-anchor .ant-anchor-link) {
          padding: 2px 0;
        }
        :global(.toc-anchor .ant-anchor-link-title) {
          font-size: 13px;
          line-height: 1.4;
          color: #666;
          transition: color 0.3s;
        }
        :global(.toc-anchor .ant-anchor-link-title:hover) {
          color: #1890ff;
        }
        :global(.toc-anchor .ant-anchor-link-active .ant-anchor-link-title) {
          color: #1890ff;
          font-weight: 500;
        }
        :global(.toc-level-3 .ant-anchor-link-title) {
          padding-left: 12px;
          font-size: 12px;
        }
        :global(.toc-level-4 .ant-anchor-link-title) {
          padding-left: 24px;
          font-size: 12px;
        }
        :global(.toc-level-5 .ant-anchor-link-title) {
          padding-left: 36px;
          font-size: 11px;
        }
        :global(.toc-level-6 .ant-anchor-link-title) {
          padding-left: 48px;
          font-size: 11px;
        }
      `}</style>
    </div>
  );
};
