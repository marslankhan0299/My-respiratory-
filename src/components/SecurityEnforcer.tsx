import React, { useEffect, useState } from 'react';

export function SecurityEnforcer() {
  const [isTampered, setIsTampered] = useState(false);

  useEffect(() => {
    // 1. Disable Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    // 2. Block Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        setIsTampered(true);
      }
      // Ctrl+Shift+I / J / C
      if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        setIsTampered(true);
      }
      // Ctrl+U
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        setIsTampered(true);
      }
      // Mac variations (Cmd+Opt+I / J / C / U)
      if (e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67 || e.keyCode === 85)) {
        e.preventDefault();
        setIsTampered(true);
      }
    };

    // 3. Block Selection and Dragging
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      e.preventDefault();
    };
    const handleDragStart = (e: Event) => e.preventDefault();

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('selectstart', handleSelectStart);
    window.addEventListener('dragstart', handleDragStart);

    // 4. Advanced Anti-Debugging & DevTools Detection
    // Disabled aggressive polling as it causes false positives in preview environments
    /*
    let isDevToolsOpen = false;
    
    // A. The classical debugger loop
    const _0x1a2b = setInterval(() => {
      const _0x3c4d = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const _0x5e6f = performance.now();
      if (_0x5e6f - _0x3c4d > 100) {
        setIsTampered(true);
      }
    }, 500);

    // B. Advanced trick: console.profile
    const devtoolsCheck = setInterval(() => {
        const devtools = /./;
        devtools.toString = function() {
            isDevToolsOpen = true;
            setIsTampered(true);
            return '';
        }
        console.log('%c', devtools);
    }, 1000);
    */

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('selectstart', handleSelectStart);
      window.removeEventListener('dragstart', handleDragStart);
      // clearInterval(_0x1a2b);
      // clearInterval(devtoolsCheck);
    };
  }, []);

  if (isTampered) {
    return (
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2147483647,
          backgroundColor: '#ff0000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontFamily: 'monospace',
          padding: '2rem',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 900, mb: '1rem', letterSpacing: '2px' }}>
          256-SSH ALERT
        </h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>
          - UNAUTHORIZED ACCESS DETECTED -
        </h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.6 }}>
          SYSTEM TAMPERING, DEVELOPER TOOLS, OR SOURCE CODE INSPECTION ATTEMPT LOGGED.
          <br /><br />
          HALTING SYSTEM PROCESSES AND LOCKING APPLICATION.
        </p>
      </div>
    );
  }

  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        *:not(input):not(textarea) {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-user-drag: none !important;
        }
      `
    }} />
  );
}
