interface SectionHeadingProps {
  label?: string; // e.g., "Contact Us"
  titleLeft: string; // e.g., "Need Assistance?"
  titleRight: string; // e.g., "Let’s Connect."
  leftColor?: string; // Tailwind color class e.g., 'text-gray-500'
  rightColor?: string; // Tailwind color class e.g., 'text-black'
}

export default function SectionHeading({
  label,
  titleLeft,
  titleRight,
  leftColor = "text-gray-500",
  rightColor = "text-black",
}: SectionHeadingProps) {
  return (
    <div className="text-center space-y-2">
      {label && (
        <p className="text-sm font-semibold text-blue-700 relative inline-block">
          {label}
          <span className="block w-6 h-[2px] bg-red-500 mx-auto mt-1" />
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold">
        <span className={`${leftColor}`}>{titleLeft} </span>
        <span className={`${rightColor}`}>{titleRight}</span>
      </h2>
    </div>
  );
}
