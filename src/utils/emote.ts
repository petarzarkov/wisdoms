export const getRandomEmote = async (size = '1x') => {
  const res = await (
    await fetch(
      'https://api.betterttv.net/3/emotes/shared/trending?offset=0&limit=50',
    )
  ).json();
  const random = res[Math.floor(Math.random() * Math.floor(res.length))];
  if (random?.emote) {
    return `https://cdn.betterttv.net/emote/${random.emote.id}/${size}`;
  }
  return 'https://cdn.betterttv.net/emote/5ada077451d4120ea3918426/1x';
};
