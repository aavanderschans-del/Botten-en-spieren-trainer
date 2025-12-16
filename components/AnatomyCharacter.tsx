import React from 'react';

export const AnatomyCharacter: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg viewBox="0 0 200 400" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Background/Outline */}
      <defs>
        <clipPath id="left-half">
          <rect x="0" y="0" width="100" height="400" />
        </clipPath>
        <clipPath id="right-half">
          <rect x="100" y="0" width="100" height="400" />
        </clipPath>
      </defs>

      {/* --- LEFT SIDE: SKELETON (Bone colors) --- */}
      <g clipPath="url(#left-half)">
        {/* Skull Left */}
        <path d="M100 30 C 70 30, 50 50, 50 80 C 50 110, 70 120, 100 125" fill="#e5e7eb" stroke="#374151" strokeWidth="2" />
        <circle cx="70" cy="70" r="10" fill="#374151" opacity="0.2" /> {/* Eye socket */}
        
        {/* Spine/Ribs Left */}
        <line x1="100" y1="125" x2="100" y2="220" stroke="#374151" strokeWidth="4" />
        <path d="M100 140 Q 60 150, 65 170" fill="none" stroke="#9ca3af" strokeWidth="3" />
        <path d="M100 160 Q 60 170, 65 190" fill="none" stroke="#9ca3af" strokeWidth="3" />
        <path d="M100 180 Q 60 190, 65 210" fill="none" stroke="#9ca3af" strokeWidth="3" />

        {/* Pelvis Left */}
        <path d="M100 220 Q 50 220, 50 250 Q 60 270, 100 270" fill="#e5e7eb" stroke="#374151" strokeWidth="2" />

        {/* Arm Left (Humerus/Radius/Ulna simplified) */}
        <line x1="60" y1="140" x2="30" y2="200" stroke="#e5e7eb" strokeWidth="6" /> 
        <line x1="60" y1="140" x2="30" y2="200" stroke="#374151" strokeWidth="2" /> 
        <line x1="30" y1="200" x2="20" y2="260" stroke="#e5e7eb" strokeWidth="5" />
        <line x1="30" y1="200" x2="20" y2="260" stroke="#374151" strokeWidth="2" />

        {/* Leg Left (Femur/Tibia simplified) */}
        <line x1="70" y1="260" x2="60" y2="330" stroke="#e5e7eb" strokeWidth="8" />
        <line x1="70" y1="260" x2="60" y2="330" stroke="#374151" strokeWidth="2" />
        <circle cx="60" cy="330" r="4" fill="#e5e7eb" stroke="#374151" /> {/* Patella */}
        <line x1="60" y1="330" x2="55" y2="390" stroke="#e5e7eb" strokeWidth="7" />
        <line x1="60" y1="330" x2="55" y2="390" stroke="#374151" strokeWidth="2" />
      </g>

      {/* --- RIGHT SIDE: MUSCLES (Red colors) --- */}
      <g clipPath="url(#right-half)">
        {/* Head Muscle */}
        <path d="M100 30 C 130 30, 150 50, 150 80 C 150 110, 130 120, 100 125" fill="#f87171" stroke="#b91c1c" strokeWidth="2" />
        
        {/* Torso Muscles (Pectoralis/Abs) */}
        <path d="M100 130 Q 140 135, 140 160 Q 100 170, 100 180" fill="#ef4444" stroke="#991b1b" /> {/* Pec */}
        <rect x="100" y="185" width="30" height="15" rx="2" fill="#ef4444" stroke="#991b1b" /> {/* Abs 1 */}
        <rect x="100" y="205" width="28" height="15" rx="2" fill="#ef4444" stroke="#991b1b" /> {/* Abs 2 */}

        {/* Arm Muscle (Deltoid/Bicep) */}
        <ellipse cx="150" cy="140" rx="15" ry="10" fill="#dc2626" /> {/* Deltoid */}
        <ellipse cx="160" cy="170" rx="10" ry="20" fill="#ef4444" /> {/* Bicep */}
        <ellipse cx="165" cy="220" rx="8" ry="25" fill="#ef4444" /> {/* Forearm */}

        {/* Leg Muscle (Quad/Calf) */}
        <path d="M100 270 Q 150 290, 140 340 L 100 330" fill="#dc2626" stroke="#7f1d1d" /> {/* Quad */}
        <path d="M140 340 Q 150 360, 145 390 L 100 390" fill="#ef4444" stroke="#7f1d1d" /> {/* Calf */}
      </g>

      {/* Dividing Line */}
      <line x1="100" y1="20" x2="100" y2="390" stroke="#1f2937" strokeWidth="2" strokeDasharray="5,5" />
    </svg>
  );
};