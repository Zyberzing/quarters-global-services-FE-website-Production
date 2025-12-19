import SectionTitle from '../SectionTitle/SectionTitle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../Buttons/Button';

const features = [
  {
    title: 'End-to-End Digital Process',
    description:
      'Skip paperwork by processing your documents in a hassle-free, secure, and intuitive environment.',
    image: '/img1.jpg',
    slug: 'end-to-end-digital-process',
  },
  {
    title: 'Real-Time Application Tracking',
    description:
      'Stay informed at every stage. Get real-time updates as your application moves forward.',
    image: '/img2.jpg',
    slug: 'real-time-application-tracking',
  },
  {
    title: 'Expert Guidance & Support',
    description:
      'Access professional advisors for questions and clarifications — timely, informed, and efficient support.',
    image: '/img3.jpg',
    slug: 'expert-guidance-support',
  },
  {
    title: 'Data Security You Can Trust',
    description:
      'We use bank-level encryption to protect your personal data and document uploads.',
    image: '/img4.jpg',
    slug: 'data-security-you-can-trust',
  },
  {
    title: 'Seamless Access: 20+ Countries',
    description:
      'Apply for services across 20+ countries through one single portal, no matter where you are.',
    image: '/img5.jpg',
    slug: 'seamless-access-20-countries',
  },
  {
    title: 'One Portal. All Services.',
    description:
      'Apply, upload, track, and get support — all through one central dashboard.',
    image: '/img6.jpg',
    slug: 'one-portal-all-services',
  },
];

export const WhyChoose = () => {
  const router = useRouter();

  return (
    <section className="bg-[linear-gradient(180deg,_#DEEBFF_0%,_#FFE3E3_100%)] md:p-20 p-4 flex flex-col items-center justify-center">
      <SectionTitle
        subtitle="Why Choose us"
        title="Why Choose Quartus Global Service"
        highlight="Quartus"
        align="center"
      />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white rounded-xl overflow-hidden">
          {features.map((feature, index) => {
            const isLastColumn = (index + 1) % 3 === 0;
            const isLastRow = index >= features.length - (features.length % 3 || 3);

            return (
              <div
                key={feature.slug}

                className={`
            p-4 cursor-pointer bg-white transition hover:bg-gray-50
            border-gray-200
            ${!isLastColumn ? "border-r" : ""}
            ${!isLastRow ? "border-b" : ""}
          `}
              >
                <Image
                  width={150}
                  height={150}
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='mt-4'>
        <Button iconPosition="right"
          name={"Learn more about Quartus Services"}
          link="/other-services"
          icon={
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12.5" r="12" fill="#D31021" />
              <path
                d="M7.33325 12.5H16.6666M16.6666 12.5L12.6666 8.5M16.6666 12.5L12.6666 16.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          } />
      </div>

    </section>
  );
};

export default WhyChoose;
