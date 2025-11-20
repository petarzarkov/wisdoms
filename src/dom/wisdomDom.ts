import { getRandomWisdom } from '../services/wisdomService';
import { getRandomEmote } from '../utils/emote';

export const getWisdom = async (lang: 'bg' | 'en' = 'bg') => {
  const wisdomText = await getRandomWisdom(lang);
  const wisdomPlaceholder = document.getElementById('wisdom');
  const randomEmoteUrl = await getRandomEmote();
  if (wisdomPlaceholder) {
    wisdomPlaceholder.innerHTML = `${wisdomText} <img src=${randomEmoteUrl}>
            <div class="tooltip">
            <button onclick="window.wisdom.copyToClip('${wisdomText.replace(
              /'/g,
              '',
            )}')" style="margin: 5px; border: 0; color: green; background-color: transparent;" class="fa fa-copy">
            <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
            </button>
            </div>`;
  }
};
