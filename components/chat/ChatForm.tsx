'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Image, File } from 'lucide-react';

const ChatForm = () => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (newMessage.trim() || selectedFiles.length > 0) {
      setNewMessage('');
      setSelectedFiles([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Recalculate height whenever the value changes
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMessage]);

  return (
    <div className="p-3 sm:p-4">
      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-secondary rounded-lg px-2 py-1 sm:px-3 sm:py-2"
            >
              {file.type.startsWith('image/') ? (
                <Image className="w-4 h-4 flex-shrink-0" />
              ) : (
                <File className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[200px]">
                {file.name}
              </span>
              <button
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div
        onClick={() => textareaRef.current?.focus()}
        className="border p-4 rounded-lg grid grid-cols-2 gap-4"
      >
        <textarea
          ref={textareaRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type message"
          className="col-span-2 border-0 outline-0 focus:border-0 focus:outline-0 focus:shadow-none resize-none w-full overflow-auto max-h-[30svh]"
        />
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground flex-shrink-0 relative -left-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="size-6" />
          </Button>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() && selectedFiles.length === 0}
            size="sm"
            variant="destructive"
          >
            Send
            <Send className="size-4 rotate-45" />
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ChatForm;
