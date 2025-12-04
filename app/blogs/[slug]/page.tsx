'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

const blogs = [
  {
    title: 'End-to-End Digital Process',
    description:
      'Skip paperwork by processing your documents in a hassle-free, secure, and intuitive environment.',
    image: '/services/apostille.png',
    slug: 'end-to-end-digital-process',
  },
  {
    title: 'Real-Time Application Tracking',
    description:
      'Stay informed at every stage. Get real-time updates as your application moves forward.',
    image: '/services/e-visa.png',
    slug: 'real-time-application-tracking',
  },
  {
    title: 'Expert Guidance & Support',
    description:
      'Access professional advisors for questions and clarifications — timely, informed, and efficient support.',
    image: '/services/passport.png',
    slug: 'expert-guidance-support',
  },
  {
    title: 'Data Security You Can Trust',
    description:
      'We use bank-level encryption to protect your personal data and document uploads.',
    image: '/services/visa.png',
    slug: 'data-security-you-can-trust',
  },
];

const BlogDetailsPage = () => {
  const params = useParams();
  const router = useRouter();

  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => router.push('/blogs')}
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <Image
        src={blog.image}
        alt={blog.title}
        width={800}
        height={400}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700 text-lg">{blog.description}</p>

      <button
        onClick={() => router.push('/blogs')}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Blogs
      </button>
    </div>
  );
};

export default BlogDetailsPage;
