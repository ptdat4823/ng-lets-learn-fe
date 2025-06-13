import { Component } from '@angular/core';

@Component({
  selector: 'rank-a',
  template: `
    <svg
      width="30"
      height="35"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1115_5259)">
        <path
          d="M6.31282 8.20899C5.19466 8.8242 4.5 9.99926 4.5 11.2755V18.7245C4.5 20.0007 5.19466 21.1758 6.31282 21.791L13.3128 25.6424C14.3633 26.2204 15.6367 26.2204 16.6872 25.6424L23.6872 21.791C24.8053 21.1758 25.5 20.0007 25.5 18.7245V11.2755C25.5 9.99926 24.8053 8.8242 23.6872 8.20899L16.6872 4.3576C15.6367 3.7796 14.3633 3.7796 13.3128 4.3576L6.31282 8.20899Z"
          fill="url(#paint0_radial_1115_5259)"
          stroke="#67E8F9"
          stroke-linejoin="round"
        />
        <path
          d="M11.5432 19.096C11.3512 19.096 11.1952 19.052 11.0752 18.964C10.9632 18.876 10.8952 18.76 10.8712 18.616C10.8472 18.464 10.8752 18.296 10.9552 18.112L14.1232 11.092C14.2272 10.86 14.3512 10.696 14.4952 10.6C14.6472 10.496 14.8192 10.444 15.0112 10.444C15.1952 10.444 15.3592 10.496 15.5032 10.6C15.6552 10.696 15.7832 10.86 15.8872 11.092L19.0672 18.112C19.1552 18.296 19.1872 18.464 19.1632 18.616C19.1392 18.768 19.0712 18.888 18.9592 18.976C18.8472 19.056 18.6992 19.096 18.5152 19.096C18.2912 19.096 18.1152 19.044 17.9872 18.94C17.8672 18.828 17.7592 18.66 17.6632 18.436L16.8832 16.624L17.5312 17.044H12.4672L13.1152 16.624L12.3472 18.436C12.2432 18.668 12.1352 18.836 12.0232 18.94C11.9112 19.044 11.7512 19.096 11.5432 19.096ZM14.9872 12.208L13.3072 16.204L12.9952 15.82H17.0032L16.7032 16.204L15.0112 12.208H14.9872Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1115_5259"
          x="0"
          y="3.4241"
          width="30"
          height="31.1518"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.403922 0 0 0 0 0.909804 0 0 0 0 0.976471 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1115_5259"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1115_5259"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_1115_5259"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(15 15) rotate(90) scale(11 10)"
        >
          <stop stop-color="#06B6D4" />
          <stop offset="1" stop-color="#035E6E" />
        </radialGradient>
      </defs>
    </svg>
  `,
  standalone: false,
})
export class RankAComponent {}
