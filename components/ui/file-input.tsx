import * as React from 'react';

import { cn } from '@/lib/utils';
import { Upload, X, Download } from 'lucide-react';

interface FileInputProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  onFileChange?: (file: File | null) => void;
  selectedFileValue?: File | null;
  existingFileUrl?: string;
  existingFileName?: string;
}
function FileInput({
  className,
  onFileChange,
  selectedFileValue,
  existingFileUrl,
  existingFileName,
  ...props
}: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(selectedFileValue || null);
  const [showExisting, setShowExisting] = React.useState<boolean>(!!existingFileUrl);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setShowExisting(false); // Hide existing file when new file is selected
    onFileChange?.(selectedFile);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    onFileChange?.(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClearExisting = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowExisting(false);
    // Don't call onFileChange here as we want to allow uploading new file
  };

  React.useEffect(() => {
    setShowExisting(!!existingFileUrl);
  }, [existingFileUrl]);

  return (
    <div
      className={cn(
        'border-input flex h-12 w-full min-w-0 rounded-md border bg-transparent items-center px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
    >
      <input
        {...props}
        ref={inputRef}
        accept={props.accept}
        onChange={handleInputChange}
        type="file"
        data-slot="input"
        hidden
      />
      {!file && !showExisting && props.placeholder && (
        <span className="text-current/40">{props.placeholder}</span>
      )}

      {/* Show new uploaded file */}
      {file ? (
        <div className="w-full flex items-center gap-3 justify-between">
          <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{file.name}</p>
          {!props.disabled && (
            <button type="button" onClick={handleRemoveFile}>
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : showExisting && existingFileUrl ? (
        /* Show existing file with download option */
        <div className="w-full flex items-center gap-3 justify-between">
          <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
            {existingFileName || 'Existing file'}
          </p>
          <div className="flex items-center gap-2">
            <a
              href={existingFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-1 bg-blue-100 text-blue-600 py-1 px-2 rounded text-xs hover:bg-blue-200"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="h-3 w-3" />
              Download
            </a>
            {!props.disabled && (
              <button type="button" onClick={handleClearExisting}>
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Show upload button */
        <button
          type="button"
          className={cn(
            'flex items-center gap-2 ms-auto py-2 px-4 rounded-lg',
            props.disabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-secondary cursor-pointer hover:bg-secondary/80',
          )}
          onClick={props.disabled ? undefined : handleClick}
          disabled={props.disabled}
        >
          Upload
          <Upload />
        </button>
      )}
    </div>
  );
}

export { FileInput };