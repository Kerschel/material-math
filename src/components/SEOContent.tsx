interface SEOContentProps {
  title: string;
  materialName: string;
  length: number;
  width: number;
  depth: number;
  depthUnit: string;
  resultsSummary: string;
  className?: string;
}

export function SEOContent({
  title,
  materialName,
  length,
  width,
  depth,
  depthUnit,
  resultsSummary,
  className = "",
}: SEOContentProps) {
  return (
    <article className={`prose prose-green max-w-none mt-12 ${className}`}>
      <h1>{title}</h1>
      <p className="lead text-lg text-gray-600">
        Use our free {materialName.toLowerCase()} calculator to find exactly how much{" "}
        {materialName.toLowerCase()} you need for your {length}×{width} foot project at{" "}
        {depth} {depthUnit} deep. {resultsSummary}
      </p>

      <h2>How Much {materialName} Do You Need?</h2>
      <p>
        For a {length}&prime; × {width}&prime; area with a depth of {depth} {depthUnit}, here&apos;s
        what you need:
      </p>
      <ul>
        <li>Total area: {length * width} square feet</li>
        <li>Depth: {depth} {depthUnit}</li>
        <li>{resultsSummary}</li>
      </ul>

      <h2>How to Measure for {materialName}</h2>
      <p>
        To accurately measure your project area, follow these simple steps:
      </p>
      <ol>
        <li>
          <strong>Measure the length and width</strong> of the area in feet. For irregular shapes,
          break the area into smaller rectangles and measure each one.
        </li>
        <li>
          <strong>Determine the desired depth</strong>. For most{" "}
          {materialName.toLowerCase()} projects, {depth} {depthUnit} is a common depth.
        </li>
        <li>
          <strong>Multiply length × width × depth</strong> to get the total volume needed.
          Don&apos;t forget to add 5-10% extra for settling and irregularities.
        </li>
        <li>
          <strong>Use our calculator above</strong> to convert your measurements into cubic yards,
          tons, or bags — whatever unit your supplier uses.
        </li>
      </ol>

      <h2>Why Choose Our {materialName} Calculator?</h2>
      <p>
        Our calculator saves you time and money by giving accurate material estimates. No more
        guessing or expensive over-ordering. Simply enter your dimensions and get instant results
        with cost estimates from national averages.
      </p>

      <h2>Common {materialName} Projects</h2>
      <p>
        Homeowners typically use {materialName.toLowerCase()} for a variety of projects. Whether
        you&apos;re working on a small garden bed or a large landscaping overhaul, accurate
        measurements ensure you buy exactly what you need.
      </p>
    </article>
  );
}
