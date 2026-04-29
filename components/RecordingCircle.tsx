'use client';

import React, { useId } from 'react';

type RecordingCircleProps = {
  size?: number;
  progress: number;
  timerText: string;
  showCheckmark?: boolean;
  label?: string;
  outerGradient?: boolean;
};

export default function RecordingCircle({
  size = 180,
  progress,
  timerText,
  showCheckmark = false,
  label = '',
  outerGradient = false,
}: RecordingCircleProps) {
  const id = useId().replace(/:/g, '');

  const strokeWidth = size <= 130 ? 4 : 6;
  const r = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, progress));
  const dashOffset = circumference * (1 - clamped);

  const iconSize = size <= 130 ? 43 : 48;
  const timeFontSize = size <= 130 ? 16 : 24;
  const checkSize = size <= 130 ? 36 : 56;

  const inner = (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', inset: 0 }}
        aria-hidden
      >
        <defs>
          <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4a047" />
            <stop offset="55%" stopColor="#b8862f" />
            <stop offset="100%" stopColor="#8f6a22" />
          </linearGradient>
        </defs>

        {/* background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e8e0d0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* progress arc */}
        {clamped > 0 ? (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={`url(#${id}-grad)`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              transformOrigin: '50% 50%',
              transform: 'rotate(-90deg)',
              transition: 'stroke-dashoffset 220ms ease',
            }}
          />
        ) : null}
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {showCheckmark ? (
          <div
            style={{
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
              fontSize: checkSize,
              fontWeight: 600,
              color: '#b8862f',
              lineHeight: 1,
            }}
          >
            ✓
          </div>
        ) : (
          <div
            style={{
              fontSize: iconSize,
              lineHeight: 1,
              transformOrigin: '50% 60%',
              animation: 'ad-mic-breathe 1400ms ease-in-out infinite alternate',
            }}
          >
            🎙️
          </div>
        )}

        <div style={{ height: size <= 130 ? 6 : 8 }} />

        <div
          style={{
            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
            fontSize: timeFontSize,
            fontWeight: 600,
            color: '#1a1612',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
          }}
        >
          {timerText}
        </div>

        {label ? (
          <>
            <div style={{ height: size <= 130 ? 2 : 4 }} />
            <div
              style={{
                fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
                fontSize: 11,
                color: '#7a6f5e',
                letterSpacing: '0.1em',
              }}
            >
              {label}
            </div>
          </>
        ) : null}
      </div>

      <style>{`
        @keyframes ad-mic-breathe {
          from { transform: scale(0.92); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );

  if (!outerGradient) return inner;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        background: 'linear-gradient(135deg, #fbe8c4 0%, #f2ede2 100%)',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {inner}
    </div>
  );
}

