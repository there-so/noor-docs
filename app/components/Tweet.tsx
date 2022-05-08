import { TwitterTweetEmbed } from "react-twitter-embed";

export const Tweet = ({ id }: { id: string }) => {
  return <TwitterTweetEmbed tweetId={id} />;
};
