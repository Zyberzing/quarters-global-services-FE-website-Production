'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { blogs } from './[slug]/page';

const Page = () => {
  const router = useRouter();

  return (
    <section className="bg-[linear-gradient(180deg,#DEEBFF_0%,#FFE3E3_100%)] px-4 py-16 md:px-20">
      {/* Section Title */}
      <SectionTitle
        subtitle="Our Blog"
        title="Insights, Updates & Helpful Guides"
        highlight="Insights"
        align="center"
      />

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {blogs.map((blog) => (
            <article
              key={blog.slug}
              onClick={() => router.push(`/blogs/${blog.slug}`)}
              className="
                group cursor-pointer bg-white
                rounded-xl overflow-hidden
                border border-gray-100
                shadow-sm
                hover:shadow-lg hover:-translate-y-1
                transition-all duration-300
              "
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[17px] font-semibold text-gray-900 mb-2 leading-snug group-hover:text-[#2563eb] transition">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {blog.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#2563eb] group-hover:gap-2 transition-all">
                  Read more
                  <span aria-hidden>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
