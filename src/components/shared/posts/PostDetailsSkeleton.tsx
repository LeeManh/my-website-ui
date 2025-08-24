export const PostDetailsSkeleton = () => {
  return (
    <div className="container mx-auto flex gap-6">
      {/* Sidebar Skeleton */}
      <aside className="w-16 sticky top-20 h-fit flex flex-col gap-3 p-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-3 w-8 bg-gray-200 rounded mt-1 animate-pulse" />
          </div>
        ))}
      </aside>

      {/* Main Content Skeleton */}
      <section className="flex-1">
        <div className="mb-6">
          {/* Title Skeleton */}
          <div className="h-8 bg-gray-200 rounded-lg mb-4 animate-pulse w-3/4" />

          {/* Metadata Skeleton */}
          <div className="flex items-center gap-6 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Tags Skeleton */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6" />

        {/* Content Skeleton */}
        <div className="space-y-4 mt-6">
          {/* Heading */}
          <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />

          {/* Paragraphs */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
            </div>
          ))}

          {/* Another Heading */}
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse mt-8" />

          {/* More Paragraphs */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            </div>
          ))}

          {/* Code Block */}
          <div className="bg-gray-100 p-4 rounded-lg mt-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8" />

        {/* Navigation Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 border border-gray-200 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 my-8" />

        {/* Comments Skeleton */}
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOC Skeleton */}
      <aside className="w-64 sticky top-20 h-fit">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-3 w-3 bg-gray-200 rounded animate-pulse" />
                <div
                  className="h-4 bg-gray-200 rounded animate-pulse"
                  style={{ width: `${60 + i * 10}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};
