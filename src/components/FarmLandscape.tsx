type CowProps = { transform: string; className?: string }

function GrazingCow({ transform, className = '' }: CowProps) {
  return <g className={`farm-cow ${className}`} transform={transform}>
    <path className="farm-cow-tail" d="M18 30C2 40 8 64 0 76" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="7" />
    <ellipse cx="72" cy="34" rx="57" ry="29" fill="currentColor" />
    <path d="M30 51l-5 54h11l10-51m59-3 4 54h11l2-61" fill="currentColor" />
    <path d="M63 10c12-11 33-7 43 1l-12 18-34-2z" fill="currentColor" />
    <g className="farm-cow-head" transform="translate(119 31) rotate(24)">
      <path d="M-3-9c17-12 38-6 45 7 5 11-1 30-16 33-18 3-32-6-35-18z" fill="currentColor" />
      <path d="M3-7-8-20M35-6l12-13" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5" />
      <ellipse cx="35" cy="20" rx="14" ry="9" fill="#d9e6bd" opacity=".62" />
    </g>
  </g>
}

export function FarmBackdrop() {
  return <div className="farm-theme-layer" aria-hidden="true"><svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
    <g className="farm-cloud cloud-one"><path d="M72 153c44-50 101-26 112 5 45-27 95-5 105 28H25c4-22 20-34 47-33z" /></g>
    <g className="farm-cloud cloud-two"><path d="M1040 225c33-39 78-20 88 4 34-20 74-4 82 23H1004c4-17 14-27 36-27z" /></g>
    <path className="farm-theme-hill hill-back" d="M0 406Q180 245 365 390T750 370T1110 345T1440 392V900H0Z" />
    <path className="farm-theme-hill hill-front" d="M0 570Q220 410 430 540T850 500T1180 525T1440 475V900H0Z" />
    <g className="farm-village" transform="translate(920 375)"><path d="M0 65 65 8l70 57v75H0z" /><path d="M19 72h96v68H19z" /><path d="M43 91h24v49H43zm46 0h15v18H89z" /><path d="M155 83 205 39l55 44v57H155z" /><path d="M177 91h64v49h-64z" /></g>
    <GrazingCow transform="translate(176 570) scale(1.05)" />
    <GrazingCow transform="translate(610 655) scale(.62)" className="cow-delay" />
    <g className="farm-grass"><path d="M0 760q180-75 360 0t360 0 360 0 360 0v140H0z" /></g>
  </svg></div>
}

export function FooterFarmScene() {
  return <div className="footer-farm-scene" aria-hidden="true"><svg viewBox="0 0 1440 440" preserveAspectRatio="xMidYMid slice">
    <rect className="footer-sky" width="1440" height="440" />
    <g className="farm-cloud footer-cloud"><path d="M210 92c37-39 87-18 97 9 37-22 81-3 88 28H171c2-20 17-34 39-37z" /></g>
    <path className="footer-hill footer-hill-back" d="M0 178Q190 45 390 160T785 140T1120 122T1440 156V440H0Z" />
    <path className="footer-hill footer-hill-mid" d="M0 235Q220 127 430 220T830 192T1160 209T1440 177V440H0Z" />
    <g className="footer-village" transform="translate(1020 72)"><path className="barn-roof" d="M-25 72 90 0l122 72z" /><path className="barn-wall" d="M0 69h186v132H0z" /><path className="barn-door" d="M68 118h53v83H68z" /><path className="barn-trim" d="m68 118 53 83m0-83-53 83" /><rect className="silo" x="218" y="27" width="67" height="174" rx="5" /><path className="silo-top" d="M212 31Q251-10 291 31Z" /></g>
    <path className="footer-field" d="M0 284q190-64 366 0t350-4 365 8 359-9v161H0z" />
    <path className="footer-field-line" d="M-20 342q210-55 420 3t430-5 610 4M-30 397q250-48 490 1t470 0 530-2" />
    <GrazingCow transform="translate(160 245) scale(1.15)" />
    <GrazingCow transform="translate(590 284) scale(.72)" className="cow-delay" />
    <GrazingCow transform="translate(830 315) scale(.48)" className="cow-delay-two" />
    <g className="footer-grass-tufts"><path d="M80 424q7-34 14 0 8-46 16 0m270 0q8-38 15 0 9-49 17 0m520 0q8-43 16 0 10-55 19 0m350 0q7-34 14 0 8-46 16 0" /></g>
  </svg></div>
}
