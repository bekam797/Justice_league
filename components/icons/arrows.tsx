import { SVGProps } from 'react'

export function DoubleArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.727 12L12.667 11.06L9.61366 8L12.667 4.94L11.727 4L7.72699 8L11.727 12Z"
        fill="currentColor"
      />
      <path
        d="M7.33344 12L8.27344 11.06L5.2201 8L8.27344 4.94L7.33344 4L3.33344 8L7.33344 12Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function DoubleArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.27301 4L3.33301 4.94L6.38634 8L3.33301 11.06L4.27301 12L8.27301 8L4.27301 4Z"
        fill="currentColor"
      />
      <path
        d="M8.66656 4L7.72656 4.94L10.7799 8L7.72656 11.06L8.66656 12L12.6666 8L8.66656 4Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function PrevArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z" fill="white" />
    </svg>
  )
}

export function NextArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z" fill="white" />
    </svg>
  )
}

export function ArrowDownward(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.584 6.54158L2.49905 6.54158L6.76667 10.8092L6.00067 11.5833L0.417359 5.99994L6.00067 0.416626L6.76667 1.19065L2.49905 5.45829L11.584 5.45829L11.584 6.54158Z"
        fill="white"
      />
    </svg>
  )
}

export function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id="mask0_843_1434" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
        <rect x="32" width="32" height="32" transform="rotate(90 32 0)" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_843_1434)">
        <path
          d="M15.9992 17.7232L22.1325 11.5898L23.0762 12.5335L15.9992 19.6105L8.92217 12.5335L9.86584 11.5898L15.9992 17.7232Z"
          fill="white"
        />
      </g>
    </svg>
  )
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id="mask0_843_1443" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
        <rect width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_843_1443)">
        <path
          d="M5.33203 23.0255V21.6921H26.6654V23.0255H5.33203ZM5.33203 16.6665V15.3331H26.6654V16.6665H5.33203ZM5.33203 10.3075V8.97412H26.6654V10.3075H5.33203Z"
          fill="white"
        />
      </g>
    </svg>
  )
}

export function ArrowCoolDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="arrow_cool_down">
        <mask id="mask0_932_465" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_932_465)">
          <path
            id="arrow_cool_down_2"
            d="M11.9992 21.5002L5.32617 14.8272L6.37042 13.758L11.2492 18.6367V11.4907H12.7492V18.6465L17.6279 13.783L18.6722 14.8272L11.9992 21.5002ZM11.2492 9.49072V6.49072H12.7492V9.49072H11.2492ZM11.2492 4.49072V2.49072H12.7492V4.49072H11.2492Z"
            fill="white"
          />
        </g>
      </g>
    </svg>
  )
}
