/* eslint-disable react-hooks/static-components */
'use client';

import React, { useState } from 'react';

export default function AlreadyDoneTutorial() {
  const [step, setStep] = useState(0);
  const [flow, setFlow] = useState('pre'); // 'pre' | 'post'
  const [isCloning, setIsCloning] = useState(false);
  const [isDeepening, setIsDeepening] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const preFlowSteps = [
    {
      screen: 'welcome',
      title: 'Your dream life. Already done.',
      body: 'Start manifesting: enter a few details, pick your voice, and hear your manifestation narrated as already complete.',
      target: null,
      cardPosition: 'center',
    },
    {
      screen: 'personalize',
      title: 'Personalize Your Experience',
      body: "Enter your name, your dream location, your energy word, and someone you love. Then tap Continue. These details make every story unique to you.",
      target: 'personalize-form',
      cardPosition: 'bottom',
      arrowDirection: 'up',
    },
    {
      screen: 'category',
      title: 'Choose a Category',
      body: 'Pick the area of life you want to manifest. Love, Money, Career, Health, or Home.',
      target: 'categories',
      cardPosition: 'bottom',
      arrowDirection: 'up',
    },
    {
      screen: 'category',
      title: "Describe What's Already Yours",
      body: "Write your desired manifestation. Write it like it already happened. Be specific. Be emotional.",
      target: 'desire-input',
      cardPosition: 'bottom',
      arrowDirection: 'up',
    },
    {
      screen: 'category',
      title: 'Tap "Create My Story"',
      body: "Once you've described your manifestation, tap the gold button to continue building your story.",
      target: 'create-button',
      cardPosition: 'top',
      arrowDirection: 'down',
    },
    {
      screen: 'paywall',
      title: 'Unlock Your Voice',
      body: 'Start your 3-day free trial. Tap the gold button to unlock unlimited stories in your own voice.',
      target: 'paywall-cta',
      cardPosition: 'top',
      arrowDirection: 'down',
      isPaywall: true,
    },
  ];

  const postFlowSteps = [
    {
      screen: 'voice-select',
      title: "You're In",
      body: 'Now choose the voice that will narrate your manifestations. Your own voice is most powerful.',
      target: null,
      cardPosition: 'center',
    },
    {
      screen: 'voice-select',
      title: 'Pick "My Voice"',
      body: 'Select My Voice to clone yours, or pick from our pre-made voices to start instantly.',
      target: 'voice-options',
      cardPosition: 'bottom',
      arrowDirection: 'up',
    },
    {
      screen: 'voice-record',
      title: 'Tap "Start Recording"',
      body: 'Read the passage aloud 3 times, slowly and clearly. Recording auto-completes at 30 seconds.',
      target: 'start-recording',
      cardPosition: 'top',
      arrowDirection: 'down',
    },
    {
      screen: 'voice-clone',
      title: 'Tap "Create Clone Voice"',
      body: 'Your recording is ready. Tap the gold button to create your custom voice. Takes 30 to 45 seconds.',
      target: 'clone-button',
      cardPosition: 'top',
      arrowDirection: 'down',
    },
    {
      screen: 'voice-clone',
      title: "It's Already Done",
      body: 'Your voice is ready. Every manifestation will now be narrated in your own voice. Welcome home.',
      target: null,
      cardPosition: 'center',
    },
    {
      screen: 'player',
      title: 'Tap Play to Start Listening',
      body: 'Listen at least once. Once you do, you can continue and deepen your manifestation.',
      target: 'player-play',
      cardPosition: 'bottom',
      arrowDirection: 'up',
    },
    {
      screen: 'player',
      title: 'Tap Deepen This Manifestation',
      body: 'Deepen the story to bring in new specific details. This can take a bit—keep the app open.',
      target: 'deepen-button',
      cardPosition: 'top',
      arrowDirection: 'down',
    },
    {
      screen: 'player',
      title: 'You’re Already Done',
      body: 'Your onboarding is complete. You can now create and deepen stories anytime.',
      target: null,
      cardPosition: 'center',
      isFinal: true,
    },
  ];

  const tutorialSteps = flow === 'pre' ? preFlowSteps : postFlowSteps;
  const current = tutorialSteps[step];

  const resetInteractiveStates = () => {
    setIsCloning(false);
    setIsDeepening(false);
    setHasPlayedOnce(false);
  };

  const forceNext = () => {
    resetInteractiveStates();
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
      return;
    }
    if (flow === 'pre') {
      setFlow('post');
      setStep(0);
    } else {
      setFlow('pre');
      setStep(0);
    }
  };

  const handleNext = () => {
    if (isCloning || isDeepening) return;
    forceNext();
  };

  const handleSkip = () => {
    if (isCloning || isDeepening) return;
    resetInteractiveStates();
    setStep(tutorialSteps.length - 1);
  };

  const handleBack = () => {
    if (isCloning || isDeepening) return;
    if (step > 0) {
      resetInteractiveStates();
      setStep(step - 1);
      return;
    }

    // step === 0
    if (flow === 'post') {
      resetInteractiveStates();
      setFlow('pre');
      // preFlow steps are: welcome(0) -> personalize(1) -> category(2) -> desire(3) -> paywall(4)
      // We want to go back to the paywall screen, which is index (preFlowSteps.length - 1).
      setStep(preFlowSteps.length - 1);
      return;
    }

    resetInteractiveStates();
    // In pre flow, step 0 is welcome; back acts as restart to keep it simple.
    setFlow('pre');
    setStep(0);
  };

  const switchFlow = (newFlow) => {
    if (isCloning || isDeepening) return;
    resetInteractiveStates();
    setFlow(newFlow);
    setStep(0);
  };

  // Color tokens from the provided design.
  const c = {
    bg: '#f2ede2',
    bgCard: '#fffdf7',
    bgDark: '#1f1a14',
    gold: '#b8862f',
    goldLight: '#d4a047',
    goldDark: '#8a6722',
    goldSoft: '#fdf3df',
    goldFaint: '#fbe8c4',
    text: '#1a1612',
    textMuted: '#7a6f5e',
    borderSoft: '#efe8d8',
    border: '#e8e0d0',
    greenSoft: '#e3f0e0',
    green: '#5a8a4a',
    serif: '"Cormorant Garamond", Georgia, serif',
    sans: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
  };

  const highlightStyle = (targetName) => {
    const isOn = current.target === targetName;
    return {
      zIndex: isOn ? 35 : 1,
      padding: isOn ? '10px' : '0',
      margin: isOn ? '14px -10px 0' : '14px 0 0',
      borderRadius: '16px',
      boxShadow: isOn ? `0 0 0 3px ${c.gold}80, 0 0 30px ${c.gold}60` : 'none',
      background: isOn ? `${c.gold}15` : 'transparent',
      animation: isOn ? 'pulse 2s infinite' : 'none',
      transition: 'all 180ms ease',
    };
  };

  const Phone = () => {
    return (
      <div
        style={{
          width: '380px',
          height: '780px',
          background: '#000',
          borderRadius: '48px',
          padding: '12px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: c.bg,
            borderRadius: '38px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '28px',
              background: '#000',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
              zIndex: 50,
            }}
          />

          <div style={{ padding: '14px 28px 8px', display: 'flex', justifyContent: 'space-between', color: c.text, fontFamily: c.sans, fontWeight: 700, fontSize: 15, position: 'relative', zIndex: 10 }}>
            <span>10:08</span>
            <span style={{ fontSize: 11, display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ display: 'inline-block', width: 14, height: 10, background: c.text, borderRadius: 2 }} />
              <span style={{ display: 'inline-block', width: 24, height: 12, border: `1.5px solid ${c.text}`, borderRadius: 3, position: 'relative' }}>
                <span style={{ position: 'absolute', inset: '1.5px 4px 1.5px 1.5px', background: c.text, borderRadius: 1 }} />
              </span>
            </span>
          </div>

          {/* Screen content */}
          {current.screen === 'welcome' && (
            <div style={{ padding: '0 20px', position: 'relative', height: 'calc(100% - 40px)', overflow: 'hidden' }}>
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: 18, background: c.goldSoft, border: `2px solid ${c.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 10px 30px rgba(0,0,0,0.15)` }}>
                  <span style={{ fontSize: 28 }}>✨</span>
                </div>
              </div>

              <div style={{ marginTop: 18, textAlign: 'center', fontSize: 28, color: c.text, fontFamily: c.serif, fontWeight: 500, lineHeight: 1.1 }}>
                Your dream life.<br />
                <span style={{ fontStyle: 'italic', color: c.gold, fontWeight: 400 }}>Already done.</span>
              </div>

              <div style={{ marginTop: 8, textAlign: 'center', fontSize: 13, color: c.textMuted, fontFamily: c.sans }}>
                In your voice.
              </div>

              <button
                onClick={handleNext}
                style={{ width: '100%', marginTop: 18, padding: 16, background: c.gold, border: 'none', borderRadius: 14, color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: c.sans, cursor: 'pointer', boxShadow: `0 4px 14px ${c.gold}40` }}
              >
                Start Manifesting
              </button>
            </div>
          )}

          {current.screen === 'personalize' && (
            <div style={{ padding: '0 20px', position: 'relative', height: 'calc(100% - 40px)', overflow: 'hidden' }}>
              <div style={{ marginTop: 12, fontSize: 24, color: c.gold, lineHeight: 1 }}>←</div>
              <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.borderSoft, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.borderSoft, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.borderSoft, borderRadius: 2 }} />
              </div>

              <div style={{ marginTop: 14, fontSize: 22, fontFamily: c.serif, fontWeight: 500, color: c.text, lineHeight: 1.2 }}>
                First, let&apos;s personalize<br />
                your experience
              </div>
              <div style={{ marginTop: 6, fontSize: 12, color: c.textMuted, fontFamily: c.sans }}>
                These details make every story unique to you
              </div>

              <div style={highlightStyle('personalize-form')}>
                <div style={{ fontSize: 13, color: c.text, fontFamily: c.sans, fontWeight: 700 }}>Your First Name</div>
                <div style={{ marginTop: 6, padding: '12px 14px', background: c.bgCard, border: `1px solid ${c.borderSoft}`, borderRadius: 10, fontSize: 13, color: c.textMuted, fontFamily: c.sans }}>
                  Jordan
                </div>

                <div style={{ marginTop: 14, fontSize: 13, color: c.text, fontFamily: c.sans, fontWeight: 700 }}>Where does your dream life take place?</div>
                <div style={{ marginTop: 2, fontSize: 11, color: c.textMuted, fontFamily: c.sans }}>City or country</div>
                <div style={{ marginTop: 6, padding: '12px 14px', background: c.bgCard, border: `1px solid ${c.borderSoft}`, borderRadius: 10, fontSize: 13, color: c.textMuted, fontFamily: c.sans }}>
                  Bali
                </div>

                <div style={{ marginTop: 10, fontSize: 10, letterSpacing: '0.15em', fontFamily: c.sans, fontWeight: 700, color: c.text }}>
                  POPULAR LOCATIONS
                </div>
                <div style={{ marginTop: 6, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
                  {['New York City', 'Paris', 'Bali', 'Tokyo', 'Miami', 'London'].map((loc) => (
                    <div key={loc} style={{ padding: '6px 4px', background: c.bgCard, border: `1px solid ${c.borderSoft}`, borderRadius: 20, fontSize: 10, color: c.text, fontFamily: c.sans, fontWeight: 500, textAlign: 'center' }}>
                      {loc}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 14, fontSize: 13, color: c.text, fontFamily: c.sans, fontWeight: 700 }}>Choose Your Energy Word</div>
                <div style={{ marginTop: 6, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Powerful', selected: true },
                    { label: 'Peaceful', selected: false },
                    { label: 'Abundant', selected: false },
                  ].map((w) => (
                    <div key={w.label} style={{ padding: '5px 12px', background: w.selected ? c.goldSoft : c.bgCard, border: `1px solid ${w.selected ? c.gold : c.borderSoft}`, borderRadius: 20, fontSize: 11, color: w.selected ? c.gold : c.textMuted, fontFamily: c.sans, fontWeight: 600 }}>
                      {w.label}
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleNext} style={{ width: '100%', marginTop: 14, padding: 14, background: c.gold, border: 'none', borderRadius: 14, color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: c.sans, cursor: 'pointer', boxShadow: `0 4px 14px ${c.gold}40` }}>
                Continue
              </button>
            </div>
          )}

          {current.screen === 'category' && (
            <div style={{ padding: '0 20px', position: 'relative', height: 'calc(100% - 40px)', overflow: 'hidden' }}>
              <div style={{ marginTop: 12, fontSize: 24, color: c.gold }}>←</div>
              <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.borderSoft, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.borderSoft, borderRadius: 2 }} />
              </div>

              {(current.target === 'categories' || !current.target) && (
                <>
                  <div style={{ marginTop: 16, fontSize: 22, fontFamily: c.serif, fontWeight: 500, color: c.text, lineHeight: 1.2 }}>
                    What&apos;s already done<br />
                    for you?
                  </div>
                  <div style={{ marginTop: 4, fontSize: 13, color: c.textMuted, fontFamily: c.sans }}>Choose a category</div>
                </>
              )}

              {(current.target === 'categories' || !current.target) && (
                <div
                  style={{
                    marginTop: 14,
                    position: 'relative',
                    zIndex: current.target === 'categories' ? 35 : 1,
                    padding: current.target === 'categories' ? '8px' : 0,
                    margin: current.target === 'categories' ? '14px -8px 0' : '14px 0 0',
                    borderRadius: 18,
                    boxShadow: current.target === 'categories' ? `0 0 0 3px ${c.gold}60` : 'none',
                    background: current.target === 'categories' ? `${c.gold}10` : 'transparent',
                    transition: 'all 180ms ease',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      { emoji: '♡', label: 'Love', selected: true },
                      { emoji: '$', label: 'Money', selected: false },
                      { emoji: '✦', label: 'Career', selected: false },
                      { emoji: '🌿', label: 'Health', selected: false },
                      { emoji: '🏠', label: 'Home', selected: false },
                    ].map((item) => (
                      <div
                        key={item.label}
                        style={{
                          padding: 14,
                          background: item.selected ? c.goldFaint : c.bgCard,
                          border: `1.5px solid ${item.selected ? c.gold : c.borderSoft}`,
                          borderRadius: 12,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          minHeight: 70,
                        }}
                      >
                        <span style={{ fontSize: 18 }}>{item.emoji}</span>
                        <div style={{ fontSize: 12, color: c.text, fontFamily: c.sans, fontWeight: 600 }}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(current.target === 'desire-input' || current.target === 'create-button') && (
                <>
                  <div style={{ marginTop: 14, textAlign: 'center', fontSize: 11, color: c.textMuted, fontFamily: c.sans, fontStyle: 'italic', opacity: 0.7 }}>
                    ↑ Categories above
                  </div>

                  <div style={highlightStyle('desire-input')}>
                    <div style={{ fontSize: 14, color: c.text, fontFamily: c.sans, fontWeight: 700 }}>Describe What&apos;s Already Yours</div>
                    <div style={{ marginTop: 2, fontSize: 11, color: c.textMuted, fontFamily: c.sans }}>
                      (Write Your Desired Manifestation Here)
                    </div>
                    <div style={{ marginTop: 10, padding: 14, background: c.bgCard, border: `1px solid ${c.borderSoft}`, borderRadius: 12, minHeight: 110 }}>
                      <div style={{ fontSize: 12, color: c.textMuted, fontFamily: c.sans, lineHeight: 1.5 }}>
                        Write it like it already happened. Be specific. Be emotional.
                      </div>
                      <div style={{ marginTop: 10, fontSize: 12, color: c.textMuted, fontFamily: c.sans, lineHeight: 1.5 }}>
                        Example: The deeply loving relationship where I felt completely seen, valued, and cherished every single...
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    style={{
                      width: '100%',
                      marginTop: 20,
                      padding: 16,
                      background: c.gold,
                      border: 'none',
                      borderRadius: 14,
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: c.sans,
                      cursor: 'pointer',
                      boxShadow: current.target === 'create-button' ? `0 0 0 4px ${c.gold}40, 0 0 40px ${c.gold}80` : `0 4px 14px ${c.gold}40`,
                      position: 'relative',
                      zIndex: current.target === 'create-button' ? 35 : 1,
                      animation: current.target === 'create-button' ? 'pulse 2s infinite' : 'none',
                    }}
                  >
                    Create My Story
                  </button>
                </>
              )}
            </div>
          )}

          {current.screen === 'paywall' && (
            <div style={{ padding: '0 20px', position: 'relative', height: 'calc(100% - 40px)', overflow: 'hidden' }}>
              <div style={{ marginTop: 12, fontSize: 24, color: c.textMuted, lineHeight: 1 }}>←</div>

              <div style={{ marginTop: 20, textAlign: 'center', fontSize: 28, color: c.text, fontFamily: c.serif, fontWeight: 500, lineHeight: 1.1 }}>
                Your dream life.<br />
                <span style={{ fontStyle: 'italic', color: c.gold, fontWeight: 400 }}>Already done.</span>
              </div>
              <div style={{ marginTop: 8, textAlign: 'center', fontSize: 13, color: c.textMuted, fontFamily: c.sans }}>Unlimited stories in your voice</div>

              <div style={{ marginTop: 18, padding: 14, background: c.bgCard, border: `1px solid ${c.borderSoft}`, borderRadius: 14 }}>
                <div style={{ textAlign: 'center', fontSize: 10, color: c.text, fontFamily: c.sans, fontWeight: 700, letterSpacing: '0.18em', marginBottom: 10 }}>
                  TRUSTED BY THOUSANDS
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {[
                    { value: '4.8★', label: 'RATING' },
                    { value: '50K+', label: 'STORIES' },
                    { value: '12K+', label: 'USERS' },
                  ].map((stat) => (
                    <div key={stat.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 17, color: c.gold, fontFamily: c.serif, fontWeight: 600 }}>{stat.value}</div>
                      <div style={{ fontSize: 9, color: c.textMuted, fontFamily: c.sans, fontWeight: 600, letterSpacing: '0.12em', marginTop: 2 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                style={{
                  width: '100%',
                  marginTop: 14,
                  padding: 14,
                  background: `linear-gradient(135deg, ${c.goldLight} 0%, ${c.gold} 100%)`,
                  border: 'none',
                  borderRadius: 30,
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: c.sans,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  boxShadow: current.target === 'paywall-cta' ? `0 0 0 4px ${c.gold}40, 0 0 40px ${c.gold}80` : `0 4px 14px ${c.gold}40`,
                  position: 'relative',
                  zIndex: current.target === 'paywall-cta' ? 35 : 1,
                  animation: current.target === 'paywall-cta' ? 'pulse 2s infinite' : 'none',
                }}
              >
                <span style={{ fontSize: 14 }}>✨</span>
                Start your 3-day free trial today
              </button>

              <div style={{ marginTop: 14, padding: 14, background: c.greenSoft, border: `2px solid ${c.green}`, borderRadius: 14, position: 'relative' }}>
                <div style={{ position: 'absolute', top: -9, right: 12, padding: '3px 10px', background: c.green, borderRadius: 20, fontSize: 9, color: '#fff', fontFamily: c.sans, fontWeight: 700, letterSpacing: '0.1em' }}>
                  CURRENT PLAN
                </div>
                <div style={{ fontSize: 13, color: c.text, fontFamily: c.sans, fontWeight: 700 }}>Monthly</div>
                <div style={{ marginTop: 2, fontSize: 24, color: c.text, fontFamily: c.sans, fontWeight: 800 }}>
                  $29.99 <span style={{ fontSize: 12, color: c.textMuted, fontWeight: 500 }}>/month</span>
                </div>
                <div style={{ marginTop: 6, display: 'inline-block', padding: '3px 8px', background: '#d4ead0', borderRadius: 6, fontSize: 10, color: c.green, fontFamily: c.sans, fontWeight: 600 }}>
                  Save 30% vs weekly plan
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: c.text, fontFamily: c.sans }}>
                  Billed monthly · Cancel anytime
                </div>
              </div>
            </div>
          )}

          {current.screen === 'voice-select' && (
            <div style={{ padding: '0 20px', position: 'relative', height: 'calc(100% - 40px)', overflow: 'hidden' }}>
              <div style={{ marginTop: 12, fontSize: 24, color: c.gold, lineHeight: 1 }}>←</div>
              <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.borderSoft, borderRadius: 2 }} />
              </div>

              <div style={{ marginTop: 18, position: 'relative', zIndex: current.target === 'voice-options' ? 35 : 1 }}>
                <div
                  style={{
                    padding: 16,
                    background: c.goldSoft,
                    border: `2px solid ${c.gold}`,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    boxShadow: current.target === 'voice-options' ? `0 0 0 3px ${c.gold}40` : 'none',
                  }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${c.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.gold }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 17, color: c.text, fontFamily: c.sans, fontWeight: 700 }}>My Voice</span>
                      <span style={{ padding: '3px 8px', background: c.gold, borderRadius: 4, fontSize: 9, color: '#fff', fontFamily: c.sans, fontWeight: 700, letterSpacing: '0.08em' }}>
                        RECOMMENDED
                      </span>
                    </div>
                    <div style={{ marginTop: 4, fontSize: 12, color: c.textMuted, fontFamily: c.sans, lineHeight: 1.4 }}>
                      Your own cloned voice — the most powerful for manifestation
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 1, background: c.border }} />
                <span style={{ fontSize: 10, color: c.textMuted, fontFamily: c.sans, fontWeight: 700, letterSpacing: '0.18em' }}>
                  OR CHOOSE A PRE-MADE VOICE
                </span>
                <div style={{ flex: 1, height: 1, background: c.border }} />
              </div>

              <div style={{ marginTop: 16, fontSize: 11, color: c.text, fontFamily: c.sans, fontWeight: 700, letterSpacing: '0.15em' }}>MALE VOICES</div>
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { name: 'Matt', desc: 'Warm & Soothing' },
                  { name: 'David', desc: 'Confident & Powerful' },
                ].map((v) => (
                  <div key={v.name} style={{ padding: '12px 14px', background: c.bgCard, border: `1px solid ${c.borderSoft}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${c.border}` }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: c.text, fontFamily: c.sans, fontWeight: 700 }}>{v.name}</div>
                      <div style={{ fontSize: 11, color: c.textMuted, fontFamily: c.sans, marginTop: 1 }}>{v.desc}</div>
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12 }}>▶</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 14, fontSize: 11, color: c.text, fontFamily: c.sans, fontWeight: 700, letterSpacing: '0.15em' }}>FEMALE VOICES</div>
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[{ name: 'Sarah', desc: 'Warm & Nurturing' }].map((v) => (
                  <div key={v.name} style={{ padding: '12px 14px', background: c.bgCard, border: `1px solid ${c.borderSoft}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${c.border}` }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: c.text, fontFamily: c.sans, fontWeight: 700 }}>{v.name}</div>
                      <div style={{ fontSize: 11, color: c.textMuted, fontFamily: c.sans, marginTop: 1 }}>{v.desc}</div>
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12 }}>▶</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleNext}
                style={{
                  width: '100%',
                  marginTop: 18,
                  padding: 16,
                  background: c.gold,
                  border: 'none',
                  borderRadius: 14,
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: c.sans,
                  cursor: 'pointer',
                  boxShadow: `0 4px 14px ${c.gold}40`,
                }}
              >
                Continue
              </button>
            </div>
          )}

          {current.screen === 'voice-record' && (
            <div style={{ padding: '0 20px', position: 'relative', height: 'calc(100% - 40px)', overflow: 'hidden' }}>
              <div style={{ marginTop: 12, fontSize: 24, color: c.gold, lineHeight: 1 }}>←</div>
              <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.borderSoft, borderRadius: 2 }} />
              </div>

              <div style={{ marginTop: 18, textAlign: 'center', fontSize: 24, color: c.text, fontFamily: c.serif, fontWeight: 500 }}>
                Clone Your Voice
              </div>
              <div style={{ marginTop: 4, textAlign: 'center', fontSize: 12, color: c.textMuted, fontFamily: c.sans }}>
                Record yourself reading the words below
              </div>

              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', border: `1.5px solid ${c.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: c.bgCard }}>
                  <span style={{ fontSize: 22 }}>🎙️</span>
                  <div style={{ fontSize: 14, color: c.text, fontFamily: c.sans, fontWeight: 700, marginTop: -2 }}>0:30</div>
                </div>
              </div>

              <div style={{ marginTop: 16, padding: 14, background: c.bgCard, border: `1.5px solid ${c.gold}`, borderRadius: 14 }}>
                <div style={{ textAlign: 'center', fontSize: 10, color: c.gold, fontFamily: c.sans, fontWeight: 700, letterSpacing: '0.18em' }}>
                  READ THIS ALOUD 3 TIMES
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: c.text, fontFamily: c.serif, lineHeight: 1.5, textAlign: 'center' }}>
                  Three months later, I stood on the private terrace of my Newport Coast estate, watching the sunrise paint the Pacific in liquid gold...
                </div>
              </div>

              <button
                onClick={handleNext}
                style={{
                  width: '100%',
                  marginTop: 16,
                  padding: 15,
                  background: c.gold,
                  border: 'none',
                  borderRadius: 14,
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: c.sans,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  boxShadow: current.target === 'start-recording' ? `0 0 0 4px ${c.gold}40, 0 0 40px ${c.gold}80` : `0 4px 14px ${c.gold}40`,
                  position: 'relative',
                  zIndex: current.target === 'start-recording' ? 35 : 1,
                  animation: current.target === 'start-recording' ? 'pulse 2s infinite' : 'none',
                }}
              >
                <span style={{ fontSize: 14 }}>🎙️</span>
                Start Recording
              </button>
            </div>
          )}

          {current.screen === 'voice-clone' && (
            <div style={{ padding: '0 20px', position: 'relative', height: 'calc(100% - 40px)', overflow: 'hidden' }}>
              <div style={{ marginTop: 12, fontSize: 24, color: c.gold, lineHeight: 1 }}>←</div>
              <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.borderSoft, borderRadius: 2 }} />
              </div>

              <div style={{ marginTop: 18, textAlign: 'center', fontSize: 26, color: c.text, fontFamily: c.serif, fontWeight: 500 }}>
                Great Recording!
              </div>
              <div style={{ marginTop: 4, textAlign: 'center', fontSize: 12, color: c.textMuted, fontFamily: c.sans }}>
                Your voice clone is ready to create
              </div>

              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
                {(() => {
                  // Match Flutter `RecordingCircle` compact style (size=126), complete state.
                  const size = 126;
                  const strokeWidth = 4;
                  const r = size / 2 - strokeWidth / 2;
                  const cLen = 2 * Math.PI * r;
                  return (
                    <div style={{ width: size, height: size, position: 'relative' }}>
                      <svg
                        width={size}
                        height={size}
                        viewBox={`0 0 ${size} ${size}`}
                        style={{ position: 'absolute', inset: 0 }}
                      >
                        <defs>
                          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={c.goldLight} />
                            <stop offset="55%" stopColor={c.gold} />
                            <stop offset="100%" stopColor={c.goldDark} />
                          </linearGradient>
                        </defs>
                        {/* Background ring (AuthTheme.stone equivalent) */}
                        <circle
                          cx={size / 2}
                          cy={size / 2}
                          r={r}
                          fill="none"
                          stroke={c.border}
                          strokeWidth={strokeWidth}
                          strokeLinecap="round"
                        />
                        {/* Progress ring at 100% */}
                        <circle
                          cx={size / 2}
                          cy={size / 2}
                          r={r}
                          fill="none"
                          stroke="url(#ringGrad)"
                          strokeWidth={strokeWidth}
                          strokeLinecap="round"
                          strokeDasharray={cLen}
                          strokeDashoffset={0}
                          transform={`rotate(-90 ${size / 2} ${size / 2})`}
                        />
                      </svg>

                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            fontSize: 36,
                            fontWeight: 600,
                            color: c.gold,
                            lineHeight: 1,
                            fontFamily: c.sans,
                          }}
                        >
                          ✓
                        </div>
                        <div
                          style={{
                            marginTop: 6,
                            fontSize: 16,
                            fontWeight: 600,
                            color: c.text,
                            fontFamily: c.sans,
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          0:00
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {current.target === 'clone-button' ? (
                <>
                  <div style={{ marginTop: 16, padding: 12, background: c.greenSoft, border: `1px solid ${c.green}50`, borderRadius: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: c.green, fontFamily: c.sans, fontWeight: 600, lineHeight: 1.4 }}>
                      Perfect! 30 seconds recorded.<br />
                      Click &#39;Create Clone Voice&#39; below to continue.
                    </div>
                  </div>

                  <div style={{ marginTop: 12, padding: 12, background: c.bgCard, border: `1px solid ${c.borderSoft}`, borderRadius: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: c.text, fontFamily: c.sans, fontWeight: 700 }}>
                      ✨ What happens next?
                    </div>
                    <div style={{ marginTop: 6, fontSize: 11, color: c.textMuted, fontFamily: c.sans, lineHeight: 1.4 }}>
                      Click &#39;Create Clone Voice&#39; to generate your manifestation story with your cloned voice. Takes 30 to 45 seconds.
                    </div>
                  </div>

                  <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div style={{ padding: 11, background: c.bgCard, border: `1px solid ${c.borderSoft}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: c.text, fontFamily: c.sans, fontWeight: 600 }}>
                      <span style={{ fontSize: 12 }}>🎧</span> Listen
                    </div>
                    <div style={{ padding: 11, background: c.bgCard, border: `1px solid ${c.borderSoft}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: c.text, fontFamily: c.sans, fontWeight: 600 }}>
                      <span style={{ fontSize: 12 }}>🔄</span> Re-record
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (isCloning) return;
                      setIsCloning(true);
                      window.setTimeout(() => {
                        setIsCloning(false);
                        forceNext();
                      }, 2600);
                    }}
                    style={{
                      width: '100%',
                      marginTop: 12,
                      padding: 15,
                      background: c.gold,
                      border: 'none',
                      borderRadius: 14,
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: c.sans,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      cursor: isCloning ? 'not-allowed' : 'pointer',
                      boxShadow: `0 0 0 4px ${c.gold}40, 0 0 40px ${c.gold}80`,
                      position: 'relative',
                      zIndex: 35,
                      animation: 'pulse 2s infinite',
                    }}
                  >
                    <span style={{ fontSize: 14 }}>✨</span>
                    Create Clone Voice
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNext}
                  style={{ width: '100%', marginTop: 16, padding: 15, background: c.gold, border: 'none', borderRadius: 14, color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: c.sans, cursor: 'pointer', boxShadow: `0 4px 14px ${c.gold}40` }}
                >
                  Continue to Player
                </button>
              )}
            </div>
          )}

          {current.screen === 'player' && (
            <div style={{ padding: '0 20px', position: 'relative', height: 'calc(100% - 40px)', overflow: 'hidden' }}>
              <div style={{ marginTop: 12, fontSize: 24, color: c.gold, lineHeight: 1 }}>←</div>
              <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.gold, borderRadius: 2 }} />
                <div style={{ flex: 1, height: 3, background: c.borderSoft, borderRadius: 2 }} />
              </div>

              <div style={{ marginTop: 18, textAlign: 'center', fontSize: 18, color: c.text, fontFamily: c.serif, fontWeight: 600 }}>
                A Love That Was Already Yours
              </div>
              <div style={{ marginTop: 4, textAlign: 'center', fontSize: 12, color: c.textMuted, fontFamily: c.sans }}>
                In your voice
              </div>

              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: c.bgCard,
                    border: `1.5px solid ${c.borderSoft}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: current.target === 'player-play' ? `0 0 0 4px ${c.gold}40, 0 0 40px ${c.gold}80` : 'none',
                    animation: current.target === 'player-play' ? 'pulse 2s infinite' : 'none',
                  }}
                >
                  <button
                    onClick={() => {
                      if (isDeepening || isCloning) return;
                      if (current.target !== 'player-play') return;
                      if (!hasPlayedOnce) setHasPlayedOnce(true);
                      window.setTimeout(() => {
                        forceNext();
                      }, 650);
                    }}
                    disabled={current.target !== 'player-play'}
                    style={{
                      width: 74,
                      height: 74,
                      borderRadius: '50%',
                      border: 'none',
                      background: c.gold,
                      color: '#fff',
                      fontSize: 22,
                      fontWeight: 800,
                      cursor: current.target === 'player-play' ? 'pointer' : 'not-allowed',
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                  {[8, 20, 32, 16, 36, 12, 28, 24].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 10,
                        height: h,
                        background: hasPlayedOnce ? `linear-gradient(180deg, ${c.goldLight}, ${c.gold})` : c.borderSoft,
                        borderRadius: 6,
                        opacity: hasPlayedOnce ? 1 : 0.6,
                        transition: 'all 250ms ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (isDeepening || isCloning) return;
                  if (current.target !== 'deepen-button') return;
                  setIsDeepening(true);
                  window.setTimeout(() => {
                    setIsDeepening(false);
                    forceNext();
                  }, 2300);
                }}
                disabled={current.target !== 'deepen-button'}
                style={{
                  width: '100%',
                  marginTop: 16,
                  padding: 15,
                  background: current.target === 'deepen-button' ? c.gold : c.borderSoft,
                  border: 'none',
                  borderRadius: 14,
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: c.sans,
                  cursor: current.target === 'deepen-button' ? 'pointer' : 'not-allowed',
                  boxShadow: current.target === 'deepen-button' ? `0 0 0 4px ${c.gold}40, 0 0 40px ${c.gold}80` : 'none',
                  animation: current.target === 'deepen-button' ? 'pulse 2s infinite' : 'none',
                }}
              >
                Deepen This Manifestation
              </button>

              {current.isFinal && (
                <button
                  onClick={handleNext}
                  style={{ width: '100%', marginTop: 12, padding: 15, background: c.gold, border: 'none', borderRadius: 14, color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: c.sans, cursor: 'pointer', boxShadow: `0 4px 14px ${c.gold}40` }}
                >
                  Restart Tutorial
                </button>
              )}
            </div>
          )}

          {(isCloning || isDeepening) && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(20,15,10,0.6)',
                zIndex: 39,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: 260,
                  borderRadius: 16,
                  background: c.bgCard,
                  border: `1.5px solid ${c.gold}`,
                  padding: 18,
                  textAlign: 'center',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    border: `3px solid ${c.borderSoft}`,
                    borderTopColor: c.gold,
                    margin: '0 auto 12px',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                <div style={{ fontSize: 14, color: c.text, fontFamily: c.sans, fontWeight: 700, marginBottom: 6 }}>
                  {isCloning ? 'Creating clone voice...' : 'Deepening your manifestation...'}
                </div>
                <div style={{ fontSize: 12, color: c.textMuted, fontFamily: c.sans, lineHeight: 1.4 }}>
                  {isCloning ? 'Takes 30 to 45 seconds.' : 'This can take up to 60 to 90 seconds.'}
                </div>
              </div>
            </div>
          )}

          {/* Darkening overlay for focused highlight */}
          {current.target && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(20,15,10,0.55)',
                zIndex: 30,
                pointerEvents: 'none',
                animation: 'fadeIn 0.3s ease',
              }}
            />
          )}

          {/* Tutorial Card */}
          <div
            key={`${flow}-${step}`}
            style={{
              position: 'absolute',
              left: 20,
              right: 20,
              ...(current.cardPosition === 'top' && { top: 90 }),
              ...(current.cardPosition === 'bottom' && { bottom: 110 }),
              ...(current.cardPosition === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
              background: c.bgCard,
              borderRadius: 20,
              padding: '22px 20px',
              border: `1.5px solid ${c.gold}`,
              boxShadow: '0 20px 50px rgba(0,0,0,0.25), 0 0 60px rgba(184,134,47,0.2)',
              zIndex: 40,
              animation: 'slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {current.arrowDirection === 'down' && (
              <div style={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 18, height: 18, background: c.bgCard, borderRight: `1.5px solid ${c.gold}`, borderBottom: `1.5px solid ${c.gold}` }} />
            )}
            {current.arrowDirection === 'up' && (
              <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 18, height: 18, background: c.bgCard, borderLeft: `1.5px solid ${c.gold}`, borderTop: `1.5px solid ${c.gold}` }} />
            )}

            <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
              {tutorialSteps.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 3,
                    flex: 1,
                    background: i <= step ? c.gold : c.borderSoft,
                    borderRadius: 2,
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: c.gold, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: c.sans, fontWeight: 800 }}>
                {flow === 'pre' ? 'Getting Started' : 'Voice Setup'} · {step + 1}/{tutorialSteps.length}
              </div>
              {current.isPaywall && <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: c.gold, fontFamily: c.sans, fontWeight: 800 }}>🔒 PAYWALL</div>}
            </div>

            <div style={{ fontSize: 20, color: c.text, fontFamily: c.serif, fontWeight: 500, lineHeight: 1.2, marginBottom: 8 }}>
              {current.title}
            </div>
            <div style={{ fontSize: 13, color: c.textMuted, fontFamily: c.sans, lineHeight: 1.55, marginBottom: 18 }}>
              {current.body}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <button
                onClick={step > 0 ? handleBack : handleSkip}
                style={{ background: 'transparent', border: 'none', color: c.textMuted, fontSize: 13, fontFamily: c.sans, fontWeight: 500, cursor: 'pointer', padding: '8px 4px' }}
              >
                {step > 0 ? 'Back' : current.isFinal ? 'Restart' : 'Skip all'}
              </button>
              <button
                onClick={handleNext}
                style={{
                  background: c.gold,
                  border: 'none',
                  borderRadius: 12,
                  color: '#fff',
                  fontSize: 13,
                  fontFamily: c.sans,
                  fontWeight: 700,
                  padding: '11px 22px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: `0 4px 12px ${c.gold}40`,
                }}
              >
                {current.isFinal ? 'Restart' : 'Next'} <span style={{ fontSize: 14 }}>›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const sideSteps = tutorialSteps;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#2a241c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: c.serif,
        gap: 40,
        flexWrap: 'wrap',
      }}
    >
      <Phone />

      <div style={{ maxWidth: 320, color: c.bg }}>
        <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: c.goldLight, fontFamily: c.sans, fontWeight: 800, marginBottom: 12 }}>
          Tutorial Walkthrough
        </div>
        <div style={{ fontSize: 36, fontFamily: c.serif, fontWeight: 500, color: c.bg, lineHeight: 1.05, marginBottom: 8 }}>
          Already <span style={{ fontStyle: 'italic', color: c.goldLight }}>Done</span>
        </div>
        <div style={{ fontSize: 13, color: '#a89b85', fontFamily: c.sans, lineHeight: 1.5, marginBottom: 20 }}>
          New user onboarding flow, designed in your real app system.
        </div>

        <div style={{ display: 'flex', gap: 6, padding: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 12, marginBottom: 20 }}>
          <button
            onClick={() => switchFlow('pre')}
            style={{
              flex: 1,
              padding: 10,
              background: flow === 'pre' ? c.gold : 'transparent',
              border: 'none',
              borderRadius: 8,
              color: flow === 'pre' ? '#fff' : '#a89b85',
              fontSize: 12,
              fontFamily: c.sans,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Pre-Paywall
          </button>
          <button
            onClick={() => switchFlow('post')}
            style={{
              flex: 1,
              padding: 10,
              background: flow === 'post' ? c.gold : 'transparent',
              border: 'none',
              borderRadius: 8,
              color: flow === 'post' ? '#fff' : '#a89b85',
              fontSize: 12,
              fontFamily: c.sans,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Post-Paywall
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sideSteps.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                if (isCloning || isDeepening) return;
                resetInteractiveStates();
                setStep(i);
              }}
              style={{
                textAlign: 'left',
                padding: '11px 14px',
                background: step === i ? `${c.gold}25` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${step === i ? c.gold : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 10,
                color: c.bg,
                fontSize: 12,
                fontFamily: c.sans,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: step === i ? c.gold : 'rgba(255,255,255,0.08)',
                  color: step === i ? '#fff' : '#a89b85',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span style={{ flex: 1 }}>{s.title}</span>
              {s.isPaywall && <span style={{ fontSize: 14, color: c.goldLight }}>🔒</span>}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(184,134,47,0.3), 0 0 40px rgba(184,134,47,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(184,134,47,0.15), 0 0 60px rgba(184,134,47,0.7); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

