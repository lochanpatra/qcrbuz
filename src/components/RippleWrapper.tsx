// import React, { useRef, useState } from 'react';

// type RippleWrapperProps = {
//   children: React.ReactNode;
//   onClick?: () => void;
//   style?: React.CSSProperties;
//   className?: string;
// };

// type Ripple = {
//   x: number;
//   y: number;
//   key: number;
// };

// const RippleWrapper: React.FC<RippleWrapperProps> = ({
//   children,
//   onClick,
//   style,
//   className,
// }) => {
//   const [ripples, setRipples] = useState<Ripple[]>([]);
//   const rippleKey = useRef(0);

//   const handleClick = (
//     e: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left - 100;
//     const y = e.clientY - rect.top - 100;

//     const newRipple = { x, y, key: rippleKey.current++ };
//     setRipples(prev => [...prev, newRipple]);

//     setTimeout(() => {
//       setRipples([]);
//       onClick?.();
//     }, 400);
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className={className}
//       style={{
//         position: 'relative',
//         overflow: 'hidden',
//         cursor: 'pointer',
//         ...style,
//       }}
//     >
//       {children}
//       {ripples.map(r => (
//         <span
//           key={r.key}
//           style={{
//             position: 'absolute',
//             left: r.x,
//             top: r.y,
//             width: 200,
//             height: 200,
//             borderRadius: '50%',
//             backgroundColor: 'rgba(0, 0, 0, 0.1)',
//             transform: 'scale(0)',
//             animation: 'ripple 0.6s linear',
//             pointerEvents: 'none',
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default RippleWrapper;

// // Add keyframe only once
// const sheet = document.styleSheets[0];
// const rippleRule = `
// @keyframes ripple {
//   to {
//     transform: scale(4);
//     opacity: 0;
//   }
// }`;
// try {
//   sheet.insertRule(rippleRule, sheet.cssRules.length);
// } catch {}


import React, { useRef, useState } from 'react';

type RippleWrapperProps = {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
};

type Ripple = {
  x: number;
  y: number;
  key: number;
};

const RippleWrapper: React.FC<RippleWrapperProps> = ({
  children,
  onClick,
  style,
  className,
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleKey = useRef(0);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 100;
    const y = e.clientY - rect.top - 100;

    const newRipple = { x, y, key: rippleKey.current++ };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples([]);
      onClick?.();
    }, 400);
  };

  return (
    <div
      onClick={handleClick}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
      {ripples.map(r => (
        <span
          key={r.key}
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: 'var(--ripple-color)',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
};

export default RippleWrapper;

// Insert CSS ripple animation and theme-based ripple color once
const styleSheet = document.styleSheets[0];

const rippleAnimation = `
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}`;
const rippleColorCSS = `
:root {
  --ripple-color: rgba(0, 0, 0, 0.15);
}

@media (prefers-color-scheme: dark) {
  :root {
    --ripple-color: rgba(255, 255, 255, 0.2);
  }
}
`;

try {
  styleSheet.insertRule(rippleAnimation, styleSheet.cssRules.length);
  styleSheet.insertRule(rippleColorCSS, styleSheet.cssRules.length);
} catch (e) {
  // Silent fail for SSR or style injection errors
}
