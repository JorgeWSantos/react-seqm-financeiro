import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  XIcon,
} from 'react-share';
import { ShareOptionsContainer, IconButton } from './styles';

interface ShareOptionsProps {
  url: string;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({ url }) => (
  <ShareOptionsContainer>
    <FacebookShareButton url={url}>
      <IconButton>
        <FacebookIcon style={{ borderRadius: '50%', width: 32, height: 32 }} />
      </IconButton>
    </FacebookShareButton>
    <TwitterShareButton url={url}>
      <IconButton>
        <XIcon style={{ borderRadius: '50%', width: 32, height: 32 }} />
      </IconButton>
    </TwitterShareButton>
  </ShareOptionsContainer>
);

export default ShareOptions;
