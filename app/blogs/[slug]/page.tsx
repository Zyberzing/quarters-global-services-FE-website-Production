'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
export const blogs = [
  {
    title: 'End-to-End Digital Process',
    slug: 'end-to-end-digital-process',
    image: '/services/apostille.png',
    description:
      'A fully digital visa and documentation process that removes paperwork, delays, and confusion.',
    content: `
Modern visa and immigration processes are often complicated and time-consuming.
Quartus Global Service simplifies this journey with a complete end-to-end digital experience.

### What Does End-to-End Digital Mean?
From application submission to final approval, everything happens online—securely and efficiently.

### Key Advantages
• Paperless documentation  
• Faster approvals  
• Secure uploads  
• Real-time tracking  

Quartus replaces confusion with clarity and control.
`,
  },

  {
    title: 'Real-Time Application Tracking',
    slug: 'real-time-application-tracking',
    image: '/services/e-visa.png',
    description:
      'Track your visa or immigration application live from submission to final approval.',
    content: `
Uncertainty is the biggest challenge in visa processing.
Quartus solves this with real-time tracking.

### Track Every Stage
• Submission  
• Verification  
• Review  
• Approval  

No follow-ups. No guessing. Just transparency.
`,
  },

  {
    title: 'Expert Guidance & Support',
    slug: 'expert-guidance-support',
    image: '/services/passport.png',
    description:
      'Get expert-led assistance to ensure accurate, error-free visa applications.',
    content: `
Visa rules vary by country and category.
Quartus provides expert-led guidance for error-free applications.

### Why Expert Support Matters
• Prevents rejection  
• Saves time  
• Ensures accuracy  

You’re never alone in the process.
`,
  },

  {
    title: 'Data Security You Can Trust',
    slug: 'data-security-you-can-trust',
    image: '/services/visa.png',
    description:
      'Your documents and personal data are protected with bank-grade security.',
    content: `
Your personal documents deserve top-level protection.

### Our Security Promise
• Bank-grade encryption  
• Secure cloud storage  
• Access control  

Your privacy is our priority.
`,
  },

  {
    title: 'Why Digital Visas Are the Future',
    slug: 'why-digital-visas-are-the-future',
    image: '/services/e-visa.png',
    description:
      'Learn why governments worldwide are shifting toward digital visa systems.',
    content: `
Governments worldwide are moving towards digital visa systems.

### Benefits of Digital Visas
• Faster processing  
• Reduced paperwork  
• Better transparency  

Quartus is built for the future.
`,
  },

  {
    title: 'Common Visa Mistakes and How to Avoid Them',
    slug: 'common-visa-mistakes',
    image: '/services/passport.png',
    description:
      'Avoid common visa application errors that lead to delays or rejections.',
    content: `
Small mistakes can lead to big delays.

### Common Errors
• Incorrect documents  
• Missing details  
• Wrong visa category  

Expert review prevents costly errors.
`,
  },

  {
    title: 'How Apostille Services Simplify Global Travel',
    slug: 'apostille-services-global-travel',
    image: '/services/apostille.png',
    description:
      'Understand how apostille services make your documents legally valid abroad.',
    content: `
Apostille validates documents for international use.

### Why Apostille Matters
• Legal acceptance abroad  
• Faster approvals  
• Reduced embassy visits  

Quartus handles it end-to-end.
`,
  },

  {
    title: 'Student Visa Application Made Simple',
    slug: 'student-visa-made-simple',
    image: '/services/visa.png',
    description:
      'A simplified and guided student visa application process for faster approvals.',
    content: `
Students face tight deadlines and complex rules.

### How Quartus Helps Students
• Accurate documentation  
• Fast processing  
• Expert guidance  

Focus on your education—we handle the paperwork.
`,
  },

  {
    title: 'How Secure Document Uploads Protect You',
    slug: 'secure-document-uploads',
    image: '/services/passport.png',
    description:
      'Discover how encrypted document uploads keep your sensitive data safe.',
    content: `
Uploading sensitive documents requires trust.

### Our Upload Protection
• Encrypted transfers  
• Secure storage  
• Controlled access  

Your documents are safe with us.
`,
  },

  {
    title: 'Why Transparency Builds Applicant Confidence',
    slug: 'transparency-builds-confidence',
    image: '/services/e-visa.png',
    description:
      'Transparency and real-time updates reduce stress during visa processing.',
    content: `
Clear communication reduces stress.

### Transparency Benefits
• Trust  
• Reduced anxiety  
• Faster decision-making  

Quartus keeps you informed.
`,
  },

  {
    title: 'The Role of Technology in Immigration',
    slug: 'technology-in-immigration',
    image: '/services/visa.png',
    description:
      'How technology is reshaping immigration through automation and accuracy.',
    content: `
Technology is transforming immigration services.

### Tech Advantages
• Automation  
• Accuracy  
• Speed  

Quartus leads the digital shift.
`,
  },

  {
    title: 'Why Choose Quartus Global Service',
    slug: 'why-choose-quartus',
    image: '/services/apostille.png',
    description:
      'A digital-first immigration platform combining expertise, security, and speed.',
    content: `
Quartus combines technology, expertise, and security.

### What Sets Us Apart
• Digital-first platform  
• Expert support  
• Secure infrastructure  

A smarter way to apply.
`,
  },
];



const BlogDetailsPage = () => {
  const params = useParams();
  const router = useRouter();

  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          onClick={() => router.push('/blogs')}
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        {blog.title}
      </h1>

      <Image
        src={blog.image}
        alt={blog.title}
        width={1000}
        height={500}
        className="w-full h-[420px] object-cover rounded-3xl mb-10"
      />

      <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {blog.content.split('\n').map((line, index) => {
          if (line.startsWith('###')) {
            return (
              <h2 key={index} className="mt-10 mb-4 text-gray-900">
                {line.replace('###', '')}
              </h2>
            );
          }

          if (line.startsWith('•')) {
            return (
              <li key={index} className="ml-6 list-disc">
                {line.replace('•', '')}
              </li>
            );
          }

          return <p key={index}>{line}</p>;
        })}
      </article>

      <div className="mt-12">
        <button
          onClick={() => router.push('/blogs')}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                     bg-blue-600 text-white font-semibold
                     hover:bg-blue-700 hover:scale-105
                     transition-all duration-300"
        >
          ← Back to Blogs
        </button>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
