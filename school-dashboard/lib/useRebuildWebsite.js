// react hook to send a post to rebuild the website

export default function useRebuildWebsite() {
  const sendPost = async () => {
    const response = await fetch(
      'https://api.vercel.com/v1/integrations/deploy/prj_Wv5cMY4wbdFSQHXkE8nSIzT0WfiQ/xCu6xNjpzQ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const body = await response.text();
    console.log('body', body);
  };
  return sendPost;
}
