'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Typography from '@tiptap/extension-typography';
import { common, createLowlight } from 'lowlight';
import { 
  Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, 
  Link as LinkIcon, Image as ImageIcon, Code, CheckSquare, Heading1, Heading2, 
  Heading3, Quote, Undo, Redo, Strikethrough
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Initialize lowlight with common languages
const lowlight = createLowlight(common);

export default function RichTextEditor({ content = '', onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block to use lowlight
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'list', 'bulletList', 'orderedList'],
      }),
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'rounded-md bg-gray-800 text-gray-100 p-4',
        },
      }),
      Typography,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[400px] prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find(item => item.type.indexOf('image') === 0);
        
        if (imageItem) {
          event.preventDefault();
          const file = imageItem.getAsFile();
          const reader = new FileReader();
          
          reader.onload = () => {
            editor.chain().focus().setImage({ src: reader.result }).run();
          };
          
          reader.readAsDataURL(file);
          return true;
        }
        return false;
      },
    },
  });

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg">
      <div className="flex flex-wrap gap-2 p-2 border-b">
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className="w-8 h-8 p-0"
        >
          <Heading1 size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="w-8 h-8 p-0"
        >
          <Heading2 size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className="w-8 h-8 p-0"
        >
          <Heading3 size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('bold') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="w-8 h-8 p-0"
        >
          <Bold size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('italic') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="w-8 h-8 p-0"
        >
          <Italic size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('strike') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="w-8 h-8 p-0"
        >
          <Strikethrough size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('bulletList') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="w-8 h-8 p-0"
        >
          <List size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('orderedList') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="w-8 h-8 p-0"
        >
          <ListOrdered size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('taskList') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className="w-8 h-8 p-0"
        >
          <CheckSquare size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('blockquote') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="w-8 h-8 p-0"
        >
          <Quote size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('codeBlock') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className="w-8 h-8 p-0"
        >
          <Code size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className="w-8 h-8 p-0"
        >
          <AlignLeft size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className="w-8 h-8 p-0"
        >
          <AlignCenter size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className="w-8 h-8 p-0"
        >
          <AlignRight size={16} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('link') ? 'default' : 'outline'}
          onClick={addLink}
          className="w-8 h-8 p-0"
        >
          <LinkIcon size={16} />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={addImage}
          className="w-8 h-8 p-0"
        >
          <ImageIcon size={16} />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="w-8 h-8 p-0"
        >
          <Undo size={16} />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="w-8 h-8 p-0"
        >
          <Redo size={16} />
        </Button>
      </div>
      <EditorContent editor={editor} className="p-4 prose max-w-none min-h-[400px]" />
    </div>
  );
} 