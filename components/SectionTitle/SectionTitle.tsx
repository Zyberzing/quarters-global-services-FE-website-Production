// components/SectionTitle.tsx
import React from 'react';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  highlight?: string;
  align?: 'left' | 'center' | 'right'; // dynamic alignment
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  highlight,
  align = 'left', // default to left
}) => {
  const alignmentMap: Record<'left' | 'center' | 'right', string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`${alignmentMap[align]} mb-8`}>
      <h4 className="text-sm font-medium text-blue-700 capitalize mb-2 underline underline-offset-4 decoration-red-500">
        {subtitle}
      </h4>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
        {highlight ? (
          <>
            {title.split(highlight)[0]}
            <span className="text-red-600">{highlight}</span>
            {title.split(highlight)[1]}
          </>
        ) : (
          title
        )}
        ?
      </h2>
    </div>
  );
};

export default SectionTitle;
