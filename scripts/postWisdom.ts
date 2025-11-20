import { getRandomWisdom } from '../src/services/wisdomService';

export const postWisdomToSlack = async (
  botToken: string,
  channel: string,
  wisdom: string,
) => {
  try {
    await fetch(`https://slack.com/api/chat.postMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${botToken}`,
      },
      body: JSON.stringify({
        username: 'Pepo the Wise',
        channel: channel,
        text: wisdom,
      }),
    });
  } catch (error) {
    console.error('Failed to send Slack message', { error });
  }
};

(async () => {
  const botToken = process.env.SLACK_BOT_TOKEN;
  if (!botToken) {
    throw new Error('SLACK_BOT_TOKEN is not set');
  }
  const lang: 'bg' | 'en' = Math.random() < 0.5 ? 'bg' : 'en';
  const wisdom = await getRandomWisdom(lang);
  console.log({ lang, wisdom });
  if (wisdom) {
    await postWisdomToSlack(botToken, 'C09UW5JB5FS', wisdom);
  }
})();
