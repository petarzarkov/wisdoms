import { getWisdom } from './dom/wisdomDom';
import { copyToClip, outFunc } from './utils/clipboard';

export interface Wisdom {
  getWisdom: typeof getWisdom;
  copyToClip: typeof copyToClip;
  outFunc: typeof outFunc;
}

// Expose functions globally for onclick handlers in HTML
(window as Window & typeof globalThis & { wisdom: Wisdom }).wisdom = {
  getWisdom,
  copyToClip,
  outFunc,
};

// Load a default wisdom on page load
getWisdom('en');
