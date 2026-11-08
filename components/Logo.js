// HubCart Movie logo mark: lime -> teal gradient squircle tile, dark play
// triangle, glossy highlight and a small orbit dot (brand continuity with
// the Hub Cart logo). Pure inline SVG, so it stays crisp at any size.
export default function LogoMark({ size = 36, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ flex: 'none', display: 'block' }}
    >
      <defs>
        <linearGradient id="hcm-logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bef264" />
          <stop offset="0.55" stopColor="#a3e635" />
          <stop offset="1" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="43" height="43" rx="13.5" fill="url(#hcm-logo-g)" />
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="13.5"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />
      <ellipse cx="17" cy="11" rx="12" ry="5.5" fill="#ffffff" opacity="0.3" />
      <path
        d="M19.8 15.6v16.8c0 1.05.95 1.7 1.85 1.15l13.4-8.4c.85-.55.85-1.75 0-2.3l-13.4-8.4c-.9-.55-1.85.1-1.85 1.15Z"
        fill="#0d1206"
      />
      <circle cx="38.6" cy="9.4" r="3.1" fill="#ffffff" stroke="#0d1119" strokeWidth="1.5" />
    </svg>
  );
}
