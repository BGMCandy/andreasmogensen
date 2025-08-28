import React from "react";
import Image from "next/image";

export interface FlipBlockElement {
  type: 'h2' | 'h3' | 'p';
  content: string;
  className?: string;
}

export interface FlipBlockProps {
  elements: FlipBlockElement[];
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  className?: string;
  containerClassName?: string;
  spacing?: 'tight' | 'normal' | 'loose';
  imageClassName?: string;
}

const FlipBlock: React.FC<FlipBlockProps> = ({
  elements,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  className = "",
  containerClassName = "",
  spacing = "normal",
  imageClassName = ""
}) => {
  const spacingClasses = {
    tight: "space-y-2",      // 8px
    normal: "space-y-3",     // 12px
    loose: "space-y-4"       // 16px
  };

  const renderElement = (element: FlipBlockElement, index: number) => {
    switch (element.type) {
      case 'h2':
        return (
          <h2 
            key={index}
            className={`text-2xl md:text-3xl font-audiowide font-bold text-white tracking-wide leading-tight ${element.className || ""}`}
            dangerouslySetInnerHTML={{ __html: element.content }}
          />
        );
      
      case 'h3':
        return (
          <h3 
            key={index}
            className={`text-xl font-audiowide font-semibold text-blue-200 tracking-wide leading-relaxed ${element.className || ""}`}
            dangerouslySetInnerHTML={{ __html: element.content }}
          />
        );
      
      case 'p':
        return (
          <p 
            key={index}
            className={`text-base md:text-lg font-noto-sans text-zinc-300 leading-relaxed ${element.className || ""}`}
            dangerouslySetInnerHTML={{ __html: element.content }}
          />
        );
      
      default:
        return null;
    }
  };

  const isImageLeft = imagePosition === 'left';

  return (
    <div className={`w-full max-w-4xl mx-auto cursor-default ${containerClassName} ${className}`}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center ${isImageLeft ? 'lg:grid-flow-col' : ''}`}>
        {/* Text Content */}
        <div className={`order-1 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'} ${spacingClasses[spacing]} relative`}>
          <div className="relative p-6 rounded-xl backdrop-blur-sm border border-white/10 bg-white/5">
            {elements.map((element, index) => renderElement(element, index))}
          </div>
        </div>
        
        {/* Image */}
        <div className={`order-2 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'} flex justify-center lg:justify-start`}>
          <div className={`relative group ${imageClassName}`}>
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={400}
                height={300}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipBlock;
