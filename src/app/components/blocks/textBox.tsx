import React from "react";

export interface TextElement {
  type: 'h2' | 'h3' | 'p';
  content: string;
  className?: string;
}

export interface TextBoxProps {
  elements: TextElement[];
  className?: string;
  containerClassName?: string;
  spacing?: 'tight' | 'normal' | 'loose';
}

const TextBox: React.FC<TextBoxProps> = ({
  elements,
  className = "",
  containerClassName = "",
  spacing = "normal"
}) => {
  const spacingClasses = {
    tight: "space-y-1.5",    // 6px
    normal: "space-y-1.5",   // 6px (default)
    loose: "space-y-2"       // 8px
  };

  const renderElement = (element: TextElement, index: number) => {
    const baseClasses = "transition-all duration-300 ease-out";
    
    switch (element.type) {
      case 'h2':
        return (
          <h2 
            key={index}
            className={`text-3xl md:text-4xl font-audiowide font-bold text-zinc-100 tracking-wide leading-tight ${baseClasses} ${element.className || ""}`}
            dangerouslySetInnerHTML={{ __html: element.content }}
          />
        );
      
      case 'h3':
        return (
          <h3 
            key={index}
            className={`text-xl md:text-2xl font-audiowide font-semibold text-zinc-200 tracking-wide leading-relaxed ${baseClasses} ${element.className || ""}`}
            dangerouslySetInnerHTML={{ __html: element.content }}
          />
        );
      
      case 'p':
        return (
          <p 
            key={index}
            className={`text-base md:text-lg font-noto-sans text-zinc-300 leading-relaxed ${baseClasses} ${element.className || ""}`}
            dangerouslySetInnerHTML={{ __html: element.content }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto cursor-default ${spacingClasses[spacing]} ${containerClassName} ${className}`}>
      {elements.map((element, index) => renderElement(element, index))}
    </div>
  );
};

export default TextBox;
