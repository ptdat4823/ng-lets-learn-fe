import { Component } from '@angular/core';

@Component({
  selector: 'rank-c',
  template: `
    <svg
      width="30"
      height="35"
      viewBox="0 0 30 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1115_5298)">
        <path
          d="M6.31282 8.20899C5.19466 8.8242 4.5 9.99926 4.5 11.2755V18.7245C4.5 20.0007 5.19466 21.1758 6.31282 21.791L13.3128 25.6424C14.3633 26.2204 15.6367 26.2204 16.6872 25.6424L23.6872 21.791C24.8053 21.1758 25.5 20.0007 25.5 18.7245V11.2755C25.5 9.99926 24.8053 8.8242 23.6872 8.20899L16.6872 4.3576C15.6367 3.7796 14.3633 3.7796 13.3128 4.3576L6.31282 8.20899Z"
          fill="url(#paint0_radial_1115_5298)"
          stroke="#FDE047"
          stroke-linejoin="round"
        />
        <path
          d="M15.7819 19.12C14.9019 19.12 14.1459 18.944 13.5139 18.592C12.8899 18.232 12.4099 17.728 12.0739 17.08C11.7379 16.424 11.5699 15.652 11.5699 14.764C11.5699 14.1 11.6659 13.504 11.8579 12.976C12.0499 12.44 12.3259 11.984 12.6859 11.608C13.0459 11.224 13.4859 10.932 14.0059 10.732C14.5339 10.524 15.1259 10.42 15.7819 10.42C16.2219 10.42 16.6539 10.476 17.0779 10.588C17.5019 10.7 17.8739 10.86 18.1939 11.068C18.3619 11.172 18.4739 11.3 18.5299 11.452C18.5859 11.596 18.5979 11.74 18.5659 11.884C18.5339 12.02 18.4659 12.136 18.3619 12.232C18.2659 12.328 18.1419 12.384 17.9899 12.4C17.8459 12.408 17.6859 12.356 17.5099 12.244C17.2619 12.084 16.9939 11.968 16.7059 11.896C16.4179 11.824 16.1259 11.788 15.8299 11.788C15.2619 11.788 14.7819 11.904 14.3899 12.136C13.9979 12.368 13.7019 12.704 13.5019 13.144C13.3019 13.584 13.2019 14.124 13.2019 14.764C13.2019 15.396 13.3019 15.936 13.5019 16.384C13.7019 16.832 13.9979 17.172 14.3899 17.404C14.7819 17.636 15.2619 17.752 15.8299 17.752C16.1339 17.752 16.4339 17.716 16.7299 17.644C17.0259 17.564 17.3059 17.444 17.5699 17.284C17.7459 17.18 17.9019 17.136 18.0379 17.152C18.1819 17.16 18.3019 17.208 18.3979 17.296C18.4939 17.384 18.5579 17.496 18.5899 17.632C18.6219 17.76 18.6139 17.896 18.5659 18.04C18.5179 18.176 18.4219 18.296 18.2779 18.4C17.9579 18.632 17.5739 18.812 17.1259 18.94C16.6859 19.06 16.2379 19.12 15.7819 19.12Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1115_5298"
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
            values="0 0 0 0 0.992157 0 0 0 0 0.878431 0 0 0 0 0.278431 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1115_5298"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1115_5298"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_1115_5298"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(15 15) rotate(90) scale(11 10)"
        >
          <stop stop-color="#EAB308" />
          <stop offset="1" stop-color="#846505" />
        </radialGradient>
      </defs>
    </svg>
  `,
  standalone: false,
})
export class RankCComponent {}
