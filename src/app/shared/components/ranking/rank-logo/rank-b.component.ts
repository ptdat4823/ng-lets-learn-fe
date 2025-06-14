import { Component } from '@angular/core';

@Component({
  selector: 'rank-b',
  template: `
    <svg
      width="30"
      height="35"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1115_5231)">
        <path
          d="M6.31282 8.20899C5.19466 8.8242 4.5 9.99926 4.5 11.2755V18.7245C4.5 20.0007 5.19466 21.1758 6.31282 21.791L13.3128 25.6424C14.3633 26.2204 15.6367 26.2204 16.6872 25.6424L23.6872 21.791C24.8053 21.1758 25.5 20.0007 25.5 18.7245V11.2755C25.5 9.99926 24.8053 8.8242 23.6872 8.20899L16.6872 4.3576C15.6367 3.7796 14.3633 3.7796 13.3128 4.3576L6.31282 8.20899Z"
          fill="url(#paint0_radial_1115_5231)"
          stroke="#93C5FD"
          stroke-linejoin="round"
        />
        <path
          d="M12.6091 19C12.3451 19 12.1411 18.932 11.9971 18.796C11.8611 18.652 11.7931 18.448 11.7931 18.184V11.356C11.7931 11.092 11.8611 10.892 11.9971 10.756C12.1411 10.612 12.3451 10.54 12.6091 10.54H15.4891C16.0811 10.54 16.5851 10.628 17.0011 10.804C17.4171 10.98 17.7331 11.232 17.9491 11.56C18.1731 11.888 18.2851 12.28 18.2851 12.736C18.2851 13.248 18.1371 13.68 17.8411 14.032C17.5451 14.384 17.1411 14.62 16.6291 14.74V14.56C17.2211 14.648 17.6811 14.872 18.0091 15.232C18.3371 15.592 18.5011 16.06 18.5011 16.636C18.5011 17.388 18.2451 17.972 17.7331 18.388C17.2291 18.796 16.5251 19 15.6211 19H12.6091ZM13.2691 17.836H15.4291C15.9731 17.836 16.3731 17.732 16.6291 17.524C16.8851 17.308 17.0131 16.988 17.0131 16.564C17.0131 16.132 16.8851 15.812 16.6291 15.604C16.3731 15.396 15.9731 15.292 15.4291 15.292H13.2691V17.836ZM13.2691 14.128H15.2251C15.7531 14.128 16.1451 14.028 16.4011 13.828C16.6651 13.62 16.7971 13.316 16.7971 12.916C16.7971 12.516 16.6651 12.216 16.4011 12.016C16.1451 11.808 15.7531 11.704 15.2251 11.704H13.2691V14.128Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1115_5231"
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
            values="0 0 0 0 0.576471 0 0 0 0 0.772549 0 0 0 0 0.992157 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1115_5231"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1115_5231"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_1115_5231"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(15 15) rotate(90) scale(11 10)"
        >
          <stop stop-color="#3B82F6" />
          <stop offset="1" stop-color="#234C90" />
        </radialGradient>
      </defs>
    </svg>
  `,
  standalone: false,
})
export class RankBComponent {}
