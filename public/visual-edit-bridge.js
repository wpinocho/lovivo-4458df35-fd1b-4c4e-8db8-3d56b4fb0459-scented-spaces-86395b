// Visual Edit Bridge - Bidirectional communication
(function() {
  console.log('🎨 Visual Edit Bridge initialized');

  let highlightOverlay = null;

  // Create highlight overlay element
  function createHighlightOverlay() {
    if (highlightOverlay) return highlightOverlay;
    
    highlightOverlay = document.createElement('div');
    highlightOverlay.style.cssText = `
      position: fixed;
      pointer-events: none;
      border: 2px solid #3b82f6;
      background: rgba(59, 130, 246, 0.1);
      z-index: 999999;
      transition: all 0.15s ease;
    `;
    document.body.appendChild(highlightOverlay);
    return highlightOverlay;
  }

  // Highlight element
  function highlightElement(selector) {
    try {
      const element = document.querySelector(selector);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const overlay = createHighlightOverlay();
      
      overlay.style.top = `${rect.top + window.scrollY}px`;
      overlay.style.left = `${rect.left + window.scrollX}px`;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
      overlay.style.display = 'block';
    } catch (error) {
      console.error('Error highlighting element:', error);
    }
  }

  // Clear highlight
  function clearHighlight() {
    if (highlightOverlay) {
      highlightOverlay.style.display = 'none';
    }
  }

  // Generate unique selector for element
  function generateSelector(element) {
    try {
      // Priority 1: Check for data attributes
      const dataAttrs = ['data-testid', 'data-id', 'data-component', 'id'];
      for (const attr of dataAttrs) {
        const value = element.getAttribute(attr);
        if (value) {
          return attr === 'id' ? `#${value}` : `[${attr}="${value}"]`;
        }
      }

      // Priority 2: Use classes if available
      if (element.className && typeof element.className === 'string') {
        const classes = element.className.trim().split(/\s+/).filter(c => c);
        if (classes.length > 0) {
          const classSelector = '.' + classes.join('.');
          // Verify uniqueness
          const matches = document.querySelectorAll(classSelector);
          if (matches.length === 1) {
            return classSelector;
          }
        }
      }

      // Priority 3: Use tag + nth-child
      const parent = element.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children);
        const index = siblings.indexOf(element) + 1;
        const tagName = element.tagName.toLowerCase();
        return `${tagName}:nth-child(${index})`;
      }

      // Fallback: just the tag name
      return element.tagName.toLowerCase();
    } catch (error) {
      console.error('Error generating selector:', error);
      return null;
    }
  }

  // Detect element at position
  function detectElementAtPosition(x, y) {
    try {
      const element = document.elementFromPoint(x, y);
      if (!element || element.tagName === 'HTML' || element.tagName === 'BODY') {
        return null;
      }
      return element;
    } catch (error) {
      console.error('Error detecting element at position:', error);
      return null;
    }
  }

  // Get element info
  function getElementInfo(selector) {
    try {
      const element = document.querySelector(selector);
      if (!element) {
        console.warn('Element not found:', selector);
        return null;
      }

      const computedStyles = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      return {
        selector,
        tagName: element.tagName,
        className: element.className,
        textContent: element.textContent?.trim() || '',
        computedStyles: {
          color: computedStyles.color,
          backgroundColor: computedStyles.backgroundColor,
          fontSize: computedStyles.fontSize,
          padding: computedStyles.padding,
          margin: computedStyles.margin,
          width: computedStyles.width,
          height: computedStyles.height,
        },
        boundingRect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
        sourceFile: element.getAttribute('data-source-file'),
        sourceLine: element.getAttribute('data-source-line'),
      };
    } catch (error) {
      console.error('Error getting element info:', error);
      return null;
    }
  }

  // Listen for messages from parent
  window.addEventListener('message', (event) => {
    const { type, selector, x, y, action } = event.data;

    switch (type) {
      case 'VISUAL_EDIT_HIGHLIGHT':
        highlightElement(selector);
        break;

      case 'VISUAL_EDIT_CLEAR_HIGHLIGHT':
        clearHighlight();
        break;

      case 'VISUAL_EDIT_REQUEST_INFO':
        const info = getElementInfo(selector);
        if (info) {
          window.parent.postMessage({
            type: 'ELEMENT_INFO',
            data: info,
          }, '*');
        }
        break;

      case 'VISUAL_EDIT_DETECT_ELEMENT':
        const element = detectElementAtPosition(x, y);
        
        if (element) {
          const detectedSelector = generateSelector(element);
          
          if (detectedSelector) {
            window.parent.postMessage({
              type: action === 'hover' ? 'ELEMENT_HOVERED' : 'ELEMENT_CLICKED',
              selector: detectedSelector
            }, '*');
          } else {
            window.parent.postMessage({
              type: 'NO_ELEMENT_DETECTED',
              action: action
            }, '*');
          }
        } else {
          window.parent.postMessage({
            type: 'NO_ELEMENT_DETECTED',
            action: action
          }, '*');
        }
        break;
    }
  });
})();
