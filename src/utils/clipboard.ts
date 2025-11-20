export const copyToClip = (str: string) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  const tooltip = document.getElementById('myTooltip');
  if (tooltip) {
    tooltip.innerHTML = 'Copied: ' + el.value.substr(0, 5) + '...';
  }
};

export const outFunc = () => {
  const tooltip = document.getElementById('myTooltip');
  if (tooltip) {
    tooltip.innerHTML = 'Copy to clipboard';
  }
};
