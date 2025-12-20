"use client"
import BannerLayout from "@/components/Banner/BannerLayout";
import Button from "@/components/Buttons/Button";
import ButtonTwo from "@/components/Buttons/ButtonTwo";
import VisaServiceCard from "@/components/Cards/VisaServiceCard";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import SectionHeading from "@/components/SectionTitle/SectionHeading";
import TestimonialSlider from "@/components/TestimonialSlider ";
import DropdownForm from "@/components/DropdownForm/DropdownForm";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import TrustedSection from "@/components/TrustedSection";
import SupportForm from "@/components/SupportForm";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const blogPosts = [
  {
    tag: "Visa",
    title: 'Real-Time Application Tracking',
    slug: "real-time-application-tracking",
    description:
      'Stay informed at every stage. Get real-time updates as your application moves forward.',
    image: "/1.jpg",
    author: "Eleanor Pena",
    date: "20 April 2024",
    authorImage: "/p1.jpeg",
  },
  {
    tag: "Apostille",
    title: "What is an Apostille and Why Do You Need It?",
    slug: "expert-guidance-support",
    description:
      "Access professional advisors for questions and clarifications — timely, informed, and efficient support.",
    image: "/2.jpg",
    author: "Albert Flores",
    date: "20 April 2024",
    authorImage: "/p2.jpeg",
  },
  {
    tag: "Feature",
    title: "Expert Guidance & Support",
    slug: "end-to-end-digital-process",
    description:
      "Skip paperwork by processing your documents in a hassle-free, secure, and intuitive environment.",
    image: "/services/apostille.png",
    author: "Quartus Team",
    date: "20 April 2024",
    authorImage: "/p3.jpeg",
  },
];


export default function Home() {
  const [activeTab, setActiveTab] = useState<"Services" | "apostille" | "e-visa">("Services");
  const router = useRouter()
  return (
    <>
      <BannerLayout
        bg={
          activeTab === "Services"
            ? "/visa.jpg"
            : activeTab === "apostille"
              ? "/services/apostille.png"
              : "/password.jpg"
        }
      >
        {/* Heading Overlay */}
        <h4 className="bg-black/40 py-2 px-4 sm:py-3 sm:px-6 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] m-auto rounded-lg text-white text-center font-bold mb-4 text-[clamp(1.25rem,2vw,2.5rem)]">
          Quartus Global Service
        </h4>

        <h1 className="text-white text-center font-bold mb-6 text-[clamp(1.5rem,3vw,3.5rem)]">
          Smart Travel Starts Here – Fast, Secure, Digital
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center py-6">
          <Button
            iconPosition="right"
            name={"Book a consultation"}
            link="/other-services/consultancy_service"
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
            }
          />
        </div>

        {/* Dropdown Form */}
        <div className="px-4 sm:px-6 md:px-8">
          <DropdownForm setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
      </BannerLayout>


      <section className="py-12 px-4 lg:px-28  ">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text and Image */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium text-blue-600">Our services</h4>
            <h2 className="text-3xl font-bold text-gray-800">
              You Receive Personalized <br />
              <span className="text-gray-900">Service and Secure Technology</span>
            </h2>
            <div className="rounded-xl overflow-hidden w-full max-w-md">
              <Image
                width={600}
                height={600}
                src="/home.png" // Replace with your actual image path
                alt="Travel Passport"
                className="w-full rounded-xl"
              />
            </div>
          </div>

          {/* Right: Cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            <VisaServiceCard
              id="1"
              icon={<svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="74" height="74" rx="16" fill="#96C6FF" />
                <rect x="23" y="20" width="28" height="34" rx="4" fill="white" />
                <path d="M43.3253 42.91H30.6749C30.4362 42.91 30.2073 43.0049 30.0385 43.1736C29.8697 43.3424 29.7749 43.5713 29.7749 43.81C29.7749 44.0487 29.8697 44.2776 30.0385 44.4464C30.2073 44.6152 30.4362 44.71 30.6749 44.71H43.3253C43.564 44.71 43.7929 44.6152 43.9617 44.4464C44.1305 44.2776 44.2253 44.0487 44.2253 43.81C44.2253 43.5713 44.1305 43.3424 43.9617 43.1736C43.7929 43.0049 43.564 42.91 43.3253 42.91Z" fill="#022146" />
                <path d="M41.0415 47.4844H32.9583C32.7197 47.4844 32.4907 47.5792 32.322 47.748C32.1532 47.9168 32.0583 48.1457 32.0583 48.3844C32.0583 48.6231 32.1532 48.852 32.322 49.0208C32.4907 49.1896 32.7197 49.2844 32.9583 49.2844H41.0415C41.2802 49.2844 41.5092 49.1896 41.6779 49.0208C41.8467 48.852 41.9415 48.6231 41.9415 48.3844C41.9415 48.1457 41.8467 47.9168 41.6779 47.748C41.5092 47.5792 41.2802 47.4844 41.0415 47.4844Z" fill="#022146" />
                <path d="M37 24.7156C35.457 24.7156 33.9487 25.1732 32.6659 26.0305C31.383 26.8879 30.3833 28.1064 29.7931 29.532C29.2029 30.9576 29.0488 32.5263 29.3503 34.0395C29.6517 35.5527 30.3952 36.9425 31.4866 38.0331C32.5781 39.1237 33.9685 39.8661 35.4819 40.1664C36.9954 40.4667 38.5639 40.3114 39.989 39.7201C41.4142 39.1288 42.632 38.1281 43.4883 36.8447C44.3447 35.5612 44.8011 34.0525 44.8 32.5096C44.7984 30.4419 43.9759 28.4595 42.5133 26.998C41.0507 25.5365 39.0676 24.7156 37 24.7156ZM42.904 31.6096H40.3276C40.1508 29.935 39.6447 28.3119 38.8384 26.8336C39.892 27.1749 40.83 27.8021 41.5479 28.6455C42.2658 29.4888 42.7353 30.515 42.904 31.6096ZM35.482 33.4096H38.518C38.3152 34.9535 37.7986 36.4396 37 37.7764C36.2013 36.4396 35.6847 34.9535 35.482 33.4096ZM35.482 31.6096C35.6847 30.0657 36.2013 28.5796 37 27.2428C37.7986 28.5796 38.3152 30.0657 38.518 31.6096H35.482ZM35.1628 26.8336C34.356 28.3118 33.8495 29.9349 33.6724 31.6096H31.096C31.2646 30.5148 31.7342 29.4884 32.4523 28.6451C33.1705 27.8017 34.1088 27.1745 35.1628 26.8336ZM31.096 33.4096H33.6724C33.8495 35.0842 34.356 36.7074 35.1628 38.1856C34.1088 37.8446 33.1705 37.2174 32.4523 36.3741C31.7342 35.5307 31.2646 34.5043 31.096 33.4096ZM38.8384 38.1856C39.6447 36.7073 40.1508 35.0842 40.3276 33.4096H42.904C42.7353 34.5042 42.2658 35.5304 41.5479 36.3737C40.83 37.217 39.892 37.8443 38.8384 38.1856Z" fill="#D31021" />
                <path d="M51.208 49V25C51.2061 23.4889 50.6049 22.0402 49.5364 20.9716C48.4679 19.9031 47.0191 19.302 45.508 19.3H28.492C26.9808 19.302 25.5321 19.9031 24.4636 20.9716C23.395 22.0402 22.7939 23.4889 22.792 25V49C22.7939 50.5112 23.395 51.9599 24.4636 53.0285C25.5321 54.097 26.9808 54.6981 28.492 54.7001H45.508C47.0191 54.6981 48.4679 54.097 49.5364 53.0285C50.6049 51.9599 51.2061 50.5112 51.208 49ZM49.408 49C49.4067 50.034 48.9954 51.0252 48.2643 51.7564C47.5332 52.4875 46.5419 52.8988 45.508 52.9001H28.492C27.458 52.8988 26.4668 52.4875 25.7357 51.7564C25.0046 51.0252 24.5933 50.034 24.592 49V25C24.5933 23.9661 25.0046 22.9749 25.7357 22.2437C26.4668 21.5126 27.458 21.1013 28.492 21.1H45.508C46.5419 21.1013 47.5332 21.5126 48.2643 22.2437C48.9954 22.9749 49.4067 23.9661 49.408 25V49Z" fill="#022146" />
              </svg>
              }
              title="Visa Services"
              description="Travel, study, work, or reunite with family abroad."

              save={() => {
                sessionStorage.setItem(
                  "platformServiceStep",
                  JSON.stringify({
                    citizenship: "india",
                    citizenship_code: "IN",
                    country: "united-states",
                    countryCode: "US",
                  })
                );
                sessionStorage.setItem("main_service_type", "united-states")

                router.push("/category?toCountrySlug=united-states&Slug=visa")
              }}
            />
            <div className="mt-14">
              <VisaServiceCard
                id="1"
                icon={<svg width="74" height="75" viewBox="0 0 74 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.5" width="74" height="74" rx="16" fill="#FFA6AE" />
                  <rect x="25" y="28.5" width="24" height="24" rx="3" fill="white" />
                  <rect x="25" y="28.5" width="24" height="24" rx="3" fill="white" />
                  <path d="M25 28.5836C25 27.0986 26.0864 25.837 27.555 25.6168L42.0714 23.4393C43.6949 23.1958 45.2126 24.3025 45.4772 25.9227L48.4313 44.0166C48.7293 45.8422 47.3203 47.5 45.4705 47.5H28C26.3431 47.5 25 46.1569 25 44.5V28.5836Z" fill="white" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M37 33.375C33.8934 33.375 31.375 35.8935 31.375 39C31.375 42.1066 33.8934 44.625 37 44.625C40.1067 44.625 42.625 42.1066 42.625 39C42.625 35.8935 40.1067 33.375 37 33.375ZM33.625 39C33.625 37.1361 35.1361 35.625 37 35.625C38.8639 35.625 40.375 37.1361 40.375 39C40.375 40.864 38.8639 42.375 37 42.375C35.1361 42.375 33.625 40.864 33.625 39Z" fill="#D31021" />
                  <path d="M34 46.875C33.3787 46.875 32.875 47.3787 32.875 48C32.875 48.6213 33.3787 49.125 34 49.125H40C40.6213 49.125 41.125 48.6213 41.125 48C41.125 47.3787 40.6213 46.875 40 46.875H34Z" fill="#D31021" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M42.4166 21.8756C44.9017 21.5206 47.125 23.4489 47.125 25.9591V28.0239C48.9092 28.967 50.125 30.8416 50.125 33.0001V48.0001C50.125 51.1067 47.6066 53.6251 44.5 53.6251H29.5C26.3934 53.6251 23.875 51.1067 23.875 48.0001V27.0001H23.877C23.8757 26.9647 23.875 26.9292 23.875 26.8935C23.875 25.5341 24.8746 24.3816 26.2203 24.1894L42.4166 21.8756ZM26.6066 29.6251L26.5937 29.6251H26.125V48.0001C26.125 49.8641 27.636 51.3751 29.5 51.3751H44.5C46.3639 51.3751 47.875 49.8641 47.875 48.0001V33.0001C47.875 31.1409 46.3717 29.6329 44.5144 29.6251H26.6066ZM44.875 27.3751H44.5187L44.5 27.3751H26.6011C26.3377 27.3721 26.125 27.1577 26.125 26.8935C26.125 26.6538 26.3012 26.4507 26.5385 26.4168L42.7348 24.103C43.8644 23.9416 44.875 24.8181 44.875 25.9591V27.3751Z" fill="#022146" />
                </svg>
                }
                title="Passport Services"
                description="Quick support for new or renewed passports."

                save={() => {
                  sessionStorage.setItem(
                    "platformServiceStep",
                    JSON.stringify({
                      citizenship: "india",
                      citizenship_code: "IN",
                      country: "united-states",
                      countryCode: "US",
                    })
                  );
                  sessionStorage.setItem("main_service_type", "united-states")

                  router.push("/category?toCountrySlug=united-states&Slug=passport")
                }}

              />
            </div>

            <VisaServiceCard
              id="1"
              icon={<svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="74" height="74" rx="16" fill="#96C6FF" />
                <rect x="13" y="20" width="48" height="34" rx="6" fill="white" />
                <rect x="13" y="20" width="48" height="34" rx="6" stroke="#022146" strokeWidth="2" />
                <path d="M29.436 43.208C28.38 43.208 27.452 42.9787 26.652 42.52C25.8627 42.0613 25.244 41.4213 24.796 40.6C24.3587 39.768 24.14 38.808 24.14 37.72C24.14 36.6107 24.3587 35.6453 24.796 34.824C25.244 34.0027 25.8627 33.3627 26.652 32.904C27.452 32.4453 28.38 32.216 29.436 32.216C30.492 32.216 31.4147 32.4453 32.204 32.904C33.004 33.352 33.6227 33.9867 34.06 34.808C34.4973 35.6187 34.716 36.568 34.716 37.656C34.716 38.7653 34.4973 39.736 34.06 40.568C33.6227 41.4 33.004 42.0507 32.204 42.52C31.4147 42.9787 30.492 43.208 29.436 43.208ZM29.436 41.176C30.3213 41.176 31.0253 40.8613 31.548 40.232C32.0707 39.6027 32.332 38.7653 32.332 37.72C32.332 37.0267 32.2093 36.4187 31.964 35.896C31.7293 35.3733 31.3933 34.968 30.956 34.68C30.5187 34.392 30.012 34.2533 29.436 34.264C28.86 34.2533 28.3533 34.392 27.916 34.68C27.4893 34.968 27.1533 35.3733 26.908 35.896C26.6627 36.4187 26.54 37.0267 26.54 37.72C26.54 38.4133 26.6573 39.0213 26.892 39.544C27.1373 40.056 27.4787 40.456 27.916 40.744C28.3533 41.032 28.86 41.176 29.436 41.176ZM41.6898 43.208C39.9938 43.208 38.6604 42.7493 37.6898 41.832C36.7298 40.9147 36.2498 39.6187 36.2498 37.944C36.2498 36.7813 36.4738 35.7733 36.9218 34.92C37.3804 34.056 38.0204 33.384 38.8418 32.904C39.6738 32.424 40.6391 32.184 41.7378 32.184C42.1964 32.184 42.6391 32.2267 43.0658 32.312C43.4924 32.3973 43.9031 32.5147 44.2978 32.664L43.8658 34.728C43.5138 34.568 43.1618 34.4453 42.8098 34.36C42.4578 34.2747 42.1058 34.232 41.7538 34.232C40.7724 34.232 39.9991 34.552 39.4338 35.192C38.8791 35.832 38.6018 36.6747 38.6018 37.72C38.6018 38.7973 38.9004 39.6347 39.4978 40.232C40.0951 40.8293 40.9218 41.128 41.9778 41.128C42.2978 41.128 42.6284 41.1013 42.9698 41.048C43.3218 40.984 43.6631 40.8987 43.9938 40.792L44.3458 42.76C43.5671 43.0587 42.6818 43.208 41.6898 43.208ZM46.3418 43V32.344H48.6618V43H46.3418Z" fill="#D31021" />
              </svg>
              }
              title="E-Visas"
              description="Hassle-free application or reissue process."
              link="/e-visa"
            />

            <div className="mt-14">
              <VisaServiceCard
                id="1"
                icon={<svg width="74" height="75" viewBox="0 0 74 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.5" width="74" height="74" rx="16" fill="#FFA6AE" />
                  <path d="M48 33.5C49.2 28.7 47.5 28.1667 46.5 28.5C46.8333 28.3333 47.1 28.1 45.5 28.5C43.9 28.9 44.1667 31 44.5 32L45 36.5L40.5 38V41C44.5 43.4 50.1667 42 52.5 41V37.5L47.5 36.5L48 33.5Z" fill="white" stroke="black" />
                  <rect x="25" y="25.5" width="20" height="28" fill="white" />
                  <rect x="21" y="22.5" width="21" height="28" fill="white" />
                  <path d="M41.092 21.3496C42.2027 21.3496 43.1153 22.2541 43.1155 23.3721V24.1484H43.7961C44.9069 24.1485 45.8186 25.0528 45.8186 26.1709V27.5859C46.0084 27.5518 46.2108 27.5322 46.425 27.5322C47.5394 27.5323 48.3145 28.0099 48.8069 28.6426C49.295 29.2698 49.5031 30.0453 49.5032 30.6504C49.5032 30.9117 49.4358 31.2695 49.3362 31.6807C49.2358 32.0951 49.0985 32.5783 48.9524 33.0947V33.0957C48.8024 33.6205 48.6435 34.1775 48.5217 34.6729C48.3988 35.173 48.3176 35.594 48.3176 35.8525C48.3176 35.9172 48.3199 35.9792 48.3215 36.0391C49.0515 36.1018 50.1968 36.2397 51.1819 36.54C51.6983 36.6975 52.1818 36.903 52.5393 37.1729C52.8984 37.4439 53.1467 37.7938 53.1467 38.2354V40.7881C53.1467 41.2783 52.8417 41.6607 52.3958 41.9521C51.9497 42.2435 51.3378 42.4625 50.6624 42.625C49.3093 42.9505 47.6537 43.0625 46.425 43.0625C46.2312 43.0625 46.0285 43.0561 45.8186 43.0508V51.6279C45.8185 52.7384 44.9143 53.6504 43.7961 53.6504H25.5793C25.041 53.6504 24.5269 53.4288 24.1458 53.0479C23.7629 52.6651 23.5569 52.1568 23.5569 51.6143V50.8516H22.8694C21.7586 50.8516 20.8459 49.9472 20.8459 48.8291V23.3721C20.8461 22.2612 21.7584 21.3496 22.8694 21.3496H41.092ZM25.6614 25.4697C25.2743 25.4697 24.9602 25.784 24.9602 26.1709L24.8713 51.6211L24.885 51.7607C24.9118 51.8964 24.9777 52.0194 25.0793 52.1211C25.2149 52.2566 25.3881 52.3291 25.5793 52.3291H43.8098C44.1967 52.329 44.5108 52.0147 44.511 51.6279V42.9814C43.4098 42.8886 42.2543 42.7067 41.3577 42.3877C40.891 42.2216 40.4832 42.0155 40.1907 41.7578C39.8957 41.498 39.7102 41.1778 39.7102 40.7949V38.2422C39.7102 37.8007 39.9571 37.4508 40.3157 37.1797C40.6727 36.9098 41.156 36.7043 41.6721 36.5469C42.6564 36.2466 43.8016 36.1086 44.5344 36.0459C44.536 35.9861 44.5383 35.924 44.5383 35.8594C44.5383 35.6009 44.4581 35.1798 44.3352 34.6797C44.2135 34.1843 44.0535 33.6273 43.9036 33.1025V33.1016C43.7574 32.585 43.6202 32.0998 43.5198 31.6846C43.4202 31.2728 43.3528 30.9151 43.3528 30.6572C43.3528 29.8968 43.6925 28.8599 44.5042 28.1904V26.1709C44.5042 25.7856 44.1847 25.4698 43.7961 25.4697H25.6614ZM22.8694 22.6709C22.4824 22.6709 22.1684 22.9853 22.1682 23.3721V48.8291C22.1682 49.216 22.4823 49.5303 22.8694 49.5303H23.5637L23.6379 26.1562C23.6384 25.0449 24.5512 24.1416 25.6614 24.1416H41.7942V23.3721C41.794 22.9853 41.479 22.6709 41.092 22.6709H22.8694ZM41.0315 40.7559C41.0341 40.7594 41.0368 40.7646 41.0413 40.7695C41.0559 40.7858 41.0779 40.8065 41.1096 40.8301C41.1736 40.8775 41.2674 40.9314 41.3928 40.9893C41.6435 41.1049 42.0062 41.2288 42.4739 41.3418C43.4082 41.5675 44.75 41.748 46.4319 41.748C48.1103 41.748 49.452 41.5652 50.3879 41.3369C50.8562 41.2227 51.2198 41.0986 51.4719 40.9814C51.5979 40.9229 51.6922 40.8676 51.7571 40.8193C51.8033 40.7849 51.8267 40.7583 51.8381 40.7432V39.707C51.1483 40.0051 50.2555 40.2043 49.343 40.3301C48.329 40.4699 47.2783 40.5234 46.4319 40.5234C45.5852 40.5234 44.536 40.4688 43.5237 40.3281C42.6124 40.2015 41.7209 40.0016 41.0315 39.7061V40.7559ZM46.425 28.8604C45.6957 28.8604 45.2633 29.1831 45.0081 29.5635C44.7475 29.9522 44.6683 30.4079 44.6682 30.6572C44.6682 30.8049 44.7302 31.1075 44.8293 31.4961C44.9266 31.8774 45.0537 32.3208 45.1731 32.7402C45.3397 33.3248 45.5105 33.9229 45.6399 34.4619C45.7686 34.9981 45.8596 35.4897 45.8596 35.8594C45.8596 36.8439 45.6706 37.4903 45.5667 37.7744V38.4189H44.2454V37.6494C44.2454 37.5645 44.2608 37.4749 44.2991 37.3887V37.3867C43.1557 37.5047 42.3503 37.696 41.8186 37.8828C41.5351 37.9824 41.3322 38.0804 41.1975 38.1621C41.1391 38.1976 41.0948 38.2287 41.0637 38.2549C41.0754 38.2646 41.0877 38.2768 41.1038 38.2881C41.1696 38.3344 41.2652 38.3877 41.3918 38.4443C41.6448 38.5575 42.009 38.6792 42.4768 38.791C43.4115 39.0143 44.75 39.1953 46.425 39.1953C48.1069 39.1953 49.4481 39.0123 50.3831 38.7832C50.851 38.6685 51.2136 38.5428 51.4651 38.4248C51.5911 38.3657 51.6856 38.3106 51.7502 38.2617C51.7628 38.2522 51.7721 38.2415 51.7815 38.2334C51.753 38.2124 51.7171 38.1855 51.6702 38.1582C51.5369 38.0809 51.3342 37.9867 51.051 37.8887C50.5193 37.7047 49.7101 37.5117 48.5569 37.3936C48.5963 37.477 48.6106 37.5675 48.6106 37.6494V38.4189H47.2893V37.7744C47.1854 37.4902 46.9964 36.8438 46.9963 35.8594C46.9963 35.4899 47.0851 34.9984 47.2122 34.4619C47.3399 33.9227 47.5094 33.3251 47.676 32.7402C47.7954 32.321 47.9225 31.8753 48.0198 31.4932C48.1189 31.1036 48.1819 30.8015 48.1819 30.6572C48.1818 30.4114 48.1021 29.9553 47.8411 29.5654C47.5857 29.1841 47.1539 28.8604 46.425 28.8604Z" fill="#022146" stroke="#022146" strokeWidth="0.3" />
                  <path d="M35.1467 39.3496V40.6504H26.8459V39.3496H35.1467Z" fill="#022146" stroke="#022146" strokeWidth="0.3" />
                  <path d="M31.1467 43.3496V44.6504H26.8459V43.3496H31.1467Z" fill="#022146" stroke="#022146" strokeWidth="0.3" />
                  <path d="M38.1467 36.3496V37.6504H26.8459V36.3496H38.1467Z" fill="#022146" stroke="#022146" strokeWidth="0.3" />
                  <path d="M42.1467 32.3496V33.6504H26.8459V32.3496H42.1467Z" fill="#022146" stroke="#022146" strokeWidth="0.3" />
                  <path d="M36.1467 29.3496V30.6504H26.8459V29.3496H36.1467Z" fill="#022146" stroke="#022146" strokeWidth="0.3" />
                  <path d="M36.9963 41.3496C39.8225 41.3496 42.1467 43.4199 42.1467 46C42.1467 48.5801 39.8225 50.6504 36.9963 50.6504C34.1701 50.6504 31.8459 48.5801 31.8459 46C31.8459 43.4199 34.1701 41.3496 36.9963 41.3496ZM36.9963 42.6201C34.9016 42.6201 33.2239 44.1512 33.2239 46C33.2239 47.8488 34.9016 49.3799 36.9963 49.3799C39.0911 49.3799 40.7688 47.8488 40.7688 46C40.7688 44.1512 39.0911 42.6201 36.9963 42.6201Z" fill="#022146" stroke="#022146" strokeWidth="0.3" />
                  <path d="M38.4954 44.3975L39.1057 45.0459L39.2024 45.1494L39.1057 45.252L37.0217 47.4678C36.9066 47.5902 36.7576 47.6504 36.6077 47.6504C36.4577 47.6503 36.3087 47.5902 36.1936 47.4678L34.887 46.0781L34.7903 45.9756L34.887 45.873L35.4973 45.2236L35.6057 45.1074L35.7151 45.2236L36.6125 46.1729L38.2766 44.3975L38.386 44.2812L38.4954 44.3975Z" fill="#022146" stroke="#022146" strokeWidth="0.3" />
                </svg>
                }
                title="Apostille & Legalization"
                description="Make your documents valid internationally."
                save={() => {
                  sessionStorage.setItem(
                    "platformServiceStep",
                    JSON.stringify({
                      citizenship: "india",
                      citizenship_code: "IN",
                      country: "united-states",
                      countryCode: "US",
                    })
                  );
                  router.push("/category?toCountrySlug=united-states&Slug=apostille-and-legalization")
                }}

              />
            </div>

          </div>
        </div>
      </section>

      <div className="bg-[url('/img.jpg')] bg-cover bg-center p-6 sm:p-10 md:p-16 max-w-7xl mx-auto my-10 rounded-3xl text-white">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
          Ready to Start Your Visa or Immigration Process?
        </h3>
        <p className="text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
          Get expert guidance, track your application in real time, and submit <br className="hidden sm:inline" />
          everything securely right from your device.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <ButtonTwo
            iconPosition="right"
            name={"Log in to portal"}
            link="/login"
            icon={
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12.5" r="12" fill="white" />
                <path
                  d="M7.33325 12.5H16.6666M16.6666 12.5L12.6666 8.5M16.6666 12.5L12.6666 16.5"
                  stroke="#022146"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />


        </div>
      </div>

      <WhyChoose />

      <section className="py-12 px-4 lg:px-28 bg-gray-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h4 className="text-sm text-blue-bold">Partner With us</h4>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              <span className="text-[#8B8B8B]"> Become a</span>  Global <br />
              Visa Partner  <span className="text-[#8B8B8B]"> with Quartus</span>
            </h2>

            <p className="font-normal mt-4">Join Our Trusted Network of Certified Visa Agents Worldwide</p>
            <p className="text-sm mt-5 mb-5">{`Quartus Global Service empowers agents across the globe to connect, collaborate, and offer streamlined visa and immigration services through our secure digital platform. Whether you're an individual consultant or an agency, our cloud-based system gives you the tools to manage client applications, upload documents, and track statuses in real-time—all from one centralized portal.`}</p>
            <ButtonTwo
              iconPosition="right"
              name="Become a  Agent"
              link="https://quartus-five.vercel.app/"
              icon={
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12.5" r="12" fill="white" />
                  <path
                    d="M7.33325 12.5H16.6666M16.6666 12.5L12.6666 8.5M16.6666 12.5L12.6666 16.5"
                    stroke="#022146"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
          <div className="flex justify-end">
            <Image src="/serviceImg.png" width={500} height={500} alt="serve"></Image>
          </div>
        </div>
      </section>

      <div className="md:max-w-7xl w-full mx-auto md:px-10 py-12  ">
        <SectionTitle
          subtitle="Our Testimonials"
          title="Real Stories. Real Success."
          highlight="Quartus"
          align="center"
        />
        <TestimonialSlider />
      </div>

      <div className="bg-[linear-gradient(180deg,#DEEBFF_0%,#FFE3E3_100%)] py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

          {blogPosts.map((post, index) => (
            <Link
              key={index}
              href={`/blogs/${post.slug}`}
              className="block"
            >
              <div
                className="
  w-full max-w-[464px] min-h-[460px]
  bg-white rounded-[36px] p-4
  flex flex-col gap-6 sm:gap-8
  border border-[#F2F2F2] shadow-sm
  hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]
  hover:border-[#E7000B]
  transition-all duration-300 ease-in-out
  cursor-pointer
"
              >

                <Image
                  width={150}
                  height={150}
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 sm:h-40 md:h-44 lg:h-48 object-cover rounded-[20px]"
                />

                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <p className="text-sm text-blue-600 font-semibold mb-1">
                      {post.tag}
                    </p>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {post.description}
                      <span className="text-red-600 font-semibold ml-1">
                        Read More
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    <Image
                      width={32}
                      height={32}
                      src={post.authorImage}
                      alt={post.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium">{post.author}</p>
                      <p className="text-gray-500 text-xs">{post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

        </div>

        <div className="flex items-center justify-center my-10">
          <Button
            iconPosition="right"
            name={"Explore All Blogs"}
            link="/blogs"
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
            }
          />
        </div>
      </div>

      <TrustedSection />

      <section className="mt-10">
        <SectionHeading
          label="Contact Us"
          titleLeft="Need Assistance?"
          titleRight="Let’s Connect."
          leftColor="text-gray-400"
          rightColor="text-black"
        />

        <div className=" w-full md:max-w-7xl mx-auto  flex flex-col lg:flex-row items-center justify-between gap-8 px-6 lg:px-16 py-12 bg-white">
          {/* Left Form */}

          <SupportForm />

          {/* Right Map */}
          <div className="w-full lg:w-1/2 relative">
            <Image
              width={150}
              height={150}
              src="/map.png" // Place your uploaded map here
              alt="World Map"
              className="w-full rounded"
            />
          </div>
        </div>
      </section>
    </>
  );
}
