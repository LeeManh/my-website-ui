"use client";

import React, { useState } from "react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Editor as TiptapEditor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import TiptapImage from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { Button, Dropdown, Tooltip, Modal, Tabs, Input, Upload, message } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  Redo,
  Strikethrough,
  Undo,
  ChevronDown,
  Quote,
  List,
  ListOrdered,
  CodeXml,
  Minus,
  Image as ImageIcon,
  Upload as UploadIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

const extensions = [
  TextStyleKit,
  StarterKit,
  TiptapImage,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

interface ImageInsertModalProps {
  visible: boolean;
  onCancel: () => void;
  onInsert: (src: string, alt?: string) => void;
}

function ImageInsertModal({ visible, onCancel, onInsert }: ImageInsertModalProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState("");
  const [activeTab, setActiveTab] = useState("url");

  const handleUrlInsert = () => {
    if (!imageUrl.trim()) {
      message.error("Please enter image URL");
      return;
    }
    onInsert(imageUrl, imageAlt || undefined);
    handleClose();
  };

  const handleFileUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewImage(result);
    };
    reader.readAsDataURL(file);
    return false; // Prevent auto upload
  };

  const handleFileInsert = () => {
    if (!previewImage) {
      message.error("Please select an image first");
      return;
    }
    onInsert(previewImage, imageAlt || undefined);
    handleClose();
  };

  const handleClose = () => {
    setImageUrl("");
    setImageAlt("");
    setFileList([]);
    setPreviewImage("");
    setActiveTab("url");
    onCancel();
  };

  const tabItems = [
    {
      key: "url",
      label: "From URL",
      children: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alt text (optional)</label>
            <Input
              placeholder="Image description"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
            />
          </div>
          {imageUrl && (
            <div>
              <label className="block text-sm font-medium mb-2">Preview</label>
              <div className="border rounded-lg p-2 flex items-center justify-center">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  className="max-w-full max-h-48 object-contain"
                  onError={() => message.error("Invalid image URL")}
                  width={400}
                  height={300}
                />
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "upload",
      label: "Upload",
      children: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select image</label>
            <Upload.Dragger
              beforeUpload={handleFileUpload}
              fileList={fileList}
              accept="image/*"
              maxCount={1}
              showUploadList={false}
            >
              <div className="p-6 text-center">
                <UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg mb-2">Drag & drop or click to select image</p>
                <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF, WEBP</p>
              </div>
            </Upload.Dragger>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alt text (optional)</label>
            <Input
              placeholder="Image description"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
            />
          </div>
          {previewImage && (
            <div>
              <label className="block text-sm font-medium mb-2">Preview</label>
              <div className="border rounded-lg p-2 flex items-center justify-center">
                <Image
                  src={previewImage}
                  alt="Preview"
                  className="max-w-full max-h-48 object-contain"
                  width={400}
                  height={300}
                />
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Modal
      title="Insert Image"
      open={visible}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancel
        </Button>,
        <Button
          key="insert"
          type="primary"
          onClick={activeTab === "url" ? handleUrlInsert : handleFileInsert}
          disabled={activeTab === "url" ? !imageUrl.trim() : !previewImage}
        >
          Insert Image
        </Button>,
      ]}
      width={600}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
    </Modal>
  );
}

interface MenuBarProps {
  editor: TiptapEditor;
  allowInsertImage: boolean;
}

function MenuBar({ editor, allowInsertImage }: MenuBarProps) {
  const [imageModalVisible, setImageModalVisible] = useState(false);

  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        canInsertImage: allowInsertImage,
        currentTextAlign: ctx.editor.getAttributes("paragraph").textAlign || "left",
        isAlignLeft: (ctx.editor.getAttributes("paragraph").textAlign || "left") === "left",
        isAlignCenter: ctx.editor.getAttributes("paragraph").textAlign === "center",
        isAlignRight: ctx.editor.getAttributes("paragraph").textAlign === "right",
        isAlignJustify: ctx.editor.getAttributes("paragraph").textAlign === "justify",
      };
    },
  });

  const handleImageInsert = (src: string, alt?: string) => {
    editor.chain().focus().setImage({ src, alt }).run();
  };

  // Get current heading text for dropdown display
  const getCurrentHeadingText = () => {
    if (editorState.isParagraph) return "Paragraph";
    if (editorState.isHeading1) return "Heading 1";
    if (editorState.isHeading2) return "Heading 2";
    if (editorState.isHeading3) return "Heading 3";
    if (editorState.isHeading4) return "Heading 4";
    if (editorState.isHeading5) return "Heading 5";
    if (editorState.isHeading6) return "Heading 6";
    return "Paragraph";
  };

  // Dropdown menu items for headings
  const headingMenuItems = [
    {
      key: "paragraph",
      label: (
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 flex items-center justify-center">P</span>
          <span>Paragraph</span>
        </div>
      ),
      onClick: () => editor.chain().focus().setParagraph().run(),
    },
    {
      key: "heading1",
      label: (
        <div className="flex items-center gap-2">
          <Heading1 className="w-4 h-4" />
          Heading 1
        </div>
      ),
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      key: "heading2",
      label: (
        <div className="flex items-center gap-2">
          <Heading2 className="w-4 h-4" />
          Heading 2
        </div>
      ),
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      key: "heading3",
      label: (
        <div className="flex items-center gap-2">
          <Heading3 className="w-4 h-4" />
          Heading 3
        </div>
      ),
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      key: "heading4",
      label: (
        <div className="flex items-center gap-2">
          <Heading4 className="w-4 h-4" />
          Heading 4
        </div>
      ),
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    {
      key: "heading5",
      label: (
        <div className="flex items-center gap-2">
          <Heading5 className="w-4 h-4" />
          Heading 5
        </div>
      ),
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    },
    {
      key: "heading6",
      label: (
        <div className="flex items-center gap-2">
          <Heading6 className="w-4 h-4" />
          Heading 6
        </div>
      ),
      onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
    },
  ];

  return (
    <>
      <ImageInsertModal
        visible={imageModalVisible}
        onCancel={() => setImageModalVisible(false)}
        onInsert={handleImageInsert}
      />
      <div className="border-b border-gray-200 p-3">
        <div className="flex gap-2 flex-wrap items-center">
          {/* Undo/Redo */}
          <div className="flex gap-1">
            <Tooltip title="Undo">
              <Button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editorState.canUndo}
                icon={<Undo className="w-4 h-4" />}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>

            <Tooltip title="Redo">
              <Button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editorState.canRedo}
                icon={<Redo className="w-4 h-4" />}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
          </div>

          <div className="w-px h-7 bg-gray-300"></div>

          {/* Heading Dropdown */}
          <Dropdown menu={{ items: headingMenuItems }} placement="bottomLeft" trigger={["click"]}>
            <Button className="min-w-[130px]">
              <div className="flex items-center justify-between w-full text-[13px]">
                <span>{getCurrentHeadingText()}</span>
                <ChevronDown className="w-3 h-3 ml-1" />
              </div>
            </Button>
          </Dropdown>

          <div className="w-px h-7 bg-gray-300"></div>

          {/* Text Formatting */}
          <div className="flex gap-1">
            <Tooltip title="Bold">
              <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editorState.canBold}
                icon={<Bold className="w-4 h-4" />}
                type={editorState.isBold ? "primary" : "default"}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
            <Tooltip title="Italic">
              <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editorState.canItalic}
                icon={<Italic className="w-4 h-4" />}
                type={editorState.isItalic ? "primary" : "default"}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
            <Tooltip title="Strikethrough">
              <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editorState.canStrike}
                icon={<Strikethrough className="w-4 h-4" />}
                type={editorState.isStrike ? "primary" : "default"}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
            <Tooltip title="Inline Code">
              <Button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editorState.canCode}
                icon={<CodeXml className="w-4 h-4" />}
                type={editorState.isCode ? "primary" : "default"}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          {/* Lists and Blocks */}
          <div className="flex gap-1">
            <Tooltip title="Bullet List">
              <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                type={editorState.isBulletList ? "primary" : "default"}
                icon={<List className="w-4 h-4" />}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
            <Tooltip title="Numbered List">
              <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                type={editorState.isOrderedList ? "primary" : "default"}
                icon={<ListOrdered className="w-4 h-4" />}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
            <Tooltip title="Quote Block">
              <Button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                type={editorState.isBlockquote ? "primary" : "default"}
                icon={<Quote className="w-[13px] h-[13px]" />}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>

            <Tooltip title="Code Block">
              <Button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                type={editorState.isCodeBlock ? "primary" : "default"}
                icon={<Code className="w-4 h-4" />}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          {/* Text Alignment */}
          <div className="flex gap-1">
            <Tooltip title="Align Left">
              <Button
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                icon={<AlignLeft className="w-4 h-4" />}
                type={editorState.isAlignLeft ? "primary" : "default"}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
            <Tooltip title="Align Center">
              <Button
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                icon={<AlignCenter className="w-4 h-4" />}
                type={editorState.isAlignCenter ? "primary" : "default"}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
            <Tooltip title="Align Right">
              <Button
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                icon={<AlignRight className="w-4 h-4" />}
                type={editorState.isAlignRight ? "primary" : "default"}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
            <Tooltip title="Justify">
              <Button
                onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                icon={<AlignJustify className="w-4 h-4" />}
                type={editorState.isAlignJustify ? "primary" : "default"}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          {/* Insert Elements */}
          <div className="flex gap-1">
            {allowInsertImage && (
              <Tooltip title="Insert Image">
                <Button
                  onClick={() => setImageModalVisible(true)}
                  icon={<ImageIcon className="w-4 h-4" />}
                  className="!w-[30px] !h-[30px]"
                />
              </Tooltip>
            )}
            <Tooltip title="Horizontal Rule">
              <Button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                icon={<Minus className="w-4 h-4" />}
                className="!w-[30px] !h-[30px]"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

interface EditorProps {
  className?: string;
  minHeight?: string;
  allowInsertImage?: boolean;
}

export function Editor({ className, minHeight = "140px", allowInsertImage = false }: EditorProps) {
  const editor = useEditor({
    extensions,
    content: "",
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div
      className={clsx(
        "border border-gray-200 focus:border-gray-400 rounded-lg overflow-hidden bg-white w-full",
        className
      )}
    >
      <MenuBar editor={editor} allowInsertImage={allowInsertImage} />
      <EditorContent
        editor={editor}
        className="tiptap p-4 focus:outline-none"
        style={{ minHeight }}
      />
    </div>
  );
}
