export default function CommitmentSection() {
  return (
    <section className="bg-[#012169] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">

        {/* Left Text Content */}
        <div className="mb-6 sm:mb-0 sm:w-2/3">
          <h2 className="text-2xl font-bold mb-2">Your Journey, Our Commitment</h2>
          <p className="text-gray-200">
            Always Here to Help with Innovative Support<br />
            The Quartus Global service offices are staffed with knowledgeable specialists who will handle all your requests every step of the way.
          </p>
        </div>

        {/* Right Chat Button (same CSS, WhatsApp redirect added) */}
        <div>
          <a
            href="https://wa.me/919876543210?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-[#D20F21] text-white font-semibold px-5 py-3 rounded hover:bg-green-600 transition gap-4"
          >
            <svg
              width="34"
              height="36"
              viewBox="0 0 34 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_493_39685)">
                <g filter="url(#filter0_d_493_39685)">
                  <path
                    d="M30 18C30 25.1797 24.1797 31 17 31C14.2615 31 11.7208 30.1533 9.62538 28.7073L5.18182 29.8182L6.34624 25.4516C4.86766 23.3416 4 20.7721 4 18C4 10.8203 9.8203 5 17 5C24.1797 5 30 10.8203 30 18Z"
                    fill="url(#paint0_linear_493_39685)"
                  />
                </g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17 31C24.1797 31 30 25.1797 30 18C30 10.8203 24.1797 5 17 5C9.82029 5 4 10.8203 4 18C4 20.3315 4.61379 22.5197 5.68858 24.4118L4 31L10.7924 29.425C12.637 30.4293 14.7518 31 17 31ZM17 29C23.0752 29 28 24.0752 28 18C28 11.9249 23.0752 7 17 7C10.9249 7 6 11.9249 6 18C6 20.3457 6.73418 22.5198 7.98528 24.3052L7 28L10.7599 27.06C12.533 28.2836 14.6828 29 17 29Z"
                  fill="white"
                />
                <path
                  d="M13.5573 11.5907C13.2389 10.944 12.7504 11.0013 12.257 11.0013C11.3751 11.0013 10 12.0694 10 14.0574C10 15.6866 10.71 17.4699 13.1023 20.1377C15.4111 22.7124 18.4448 24.0442 20.9633 23.9989C23.4818 23.9536 24 21.7621 24 21.022C24 20.694 23.7986 20.5303 23.66 20.4859C22.8018 20.0693 21.2188 19.2933 20.8587 19.1475C20.4985 19.0018 20.3105 19.199 20.1936 19.3063C19.867 19.6209 19.2196 20.5485 18.9978 20.7572C18.7762 20.9658 18.4457 20.8602 18.3081 20.7814C17.802 20.576 16.4298 19.9588 15.3361 18.8866C13.9833 17.5606 13.9039 17.1044 13.649 16.6983C13.4452 16.3734 13.5948 16.1742 13.6694 16.087C13.9609 15.747 14.3633 15.222 14.5438 14.9611C14.7242 14.7001 14.581 14.304 14.495 14.0574C14.1253 12.9963 13.812 12.108 13.5573 11.5907Z"
                  fill="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_493_39685"
                  x="-4"
                  y="1"
                  width="42"
                  height="42"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="4" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_493_39685"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_493_39685"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_493_39685"
                  x1="28.375"
                  y1="8.25"
                  x2="4"
                  y2="31"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#5BD066" />
                  <stop offset="1" stopColor="#27B43E" />
                </linearGradient>
                <clipPath id="clip0_493_39685">
                  <rect width="34" height="36" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Click to Chat
          </a>
        </div>
      </div>
    </section>
  );
}
